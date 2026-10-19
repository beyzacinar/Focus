import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// System instruction shared across all digital well-being reflection calls
const SYSTEM_INSTRUCTION = `You are a digital well-being reflection assistant.

Your job is to help users understand their self-reported or device-provided screen-time patterns.

You are not a doctor, therapist or diagnostic system.

Never diagnose digital addiction, ADHD, anxiety, depression, sleep disorders or any other medical or psychological condition.

Separate observed data from interpretation.

Use cautious language when interpreting behavior.

Use phrases such as:
‘based on your usage data’
‘one possible pattern’
‘may be’
‘appears to’
‘could be worth exploring’

Do not shame users.

Do not moralize screen use.

Do not imply that technology itself is bad.

The goal is intentional digital use, not zero digital use.

Create realistic, small behavioral experiments.

Do not recommend extreme restrictions.

Keep reflections concise.

Focus on actionable, personalized insights rather than generic advice.`;

// Lazy Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Prototype will use smart fallback generators.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Health check & status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.7-flash',
  });
});

// 2. Prompt Inspector endpoint for Hackathon Presentation
app.get('/api/prompts', (req, res) => {
  res.json({
    systemInstruction: SYSTEM_INSTRUCTION,
    endpoints: [
      {
        name: 'Screen-Time Reflection',
        path: '/api/gemini/reflect',
        method: 'POST',
        purpose: 'Separates observed statistics from cautious habit hypotheses.',
        schema: {
          observation: 'string (Specific facts from data)',
          possiblePattern: 'string (Cautious interpretation starting with may/could)',
          reflection: 'string (Mindful inquiry prompt)',
          focusArea: 'string (Concise theme for today)'
        }
      },
      {
        name: 'Personalized Daily Challenge',
        path: '/api/gemini/challenge',
        method: 'POST',
        purpose: 'Generates ONE realistic, small offline behavioral experiment.',
        schema: {
          title: 'string (Short inspiring challenge name)',
          description: 'string (Clear single-action instructions)',
          durationMinutes: 'integer (5-30 minutes)',
          difficulty: 'string (Gentle | Easy | Medium)',
          alternativeActivities: 'string[] (3 tangible offline alternatives)',
          focusPoints: 'integer (20-50 points)',
          reason: 'string (Why this relates to their day)'
        }
      },
      {
        name: 'Weekly Insight',
        path: '/api/gemini/weekly-insight',
        method: 'POST',
        purpose: 'Synthesizes 7-day trend without claiming false causation.',
        schema: {
          weeklyObservation: 'string (Weekly trend observation)',
          possiblePattern: 'string (Cautious trend interpretation)',
          nextExperiment: 'string (Gentle recommendation for next week)'
        }
      }
    ]
  });
});

// 3. Screen-Time Reflection API
app.post('/api/gemini/reflect', async (req, res) => {
  try {
    const { screenTimeData, userProfile } = req.body;
    if (!screenTimeData) {
      return res.status(400).json({ error: 'screenTimeData is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback for seamless demo if no key
      return res.json(generateFallbackReflection(screenTimeData));
    }

    const goalContext = userProfile?.goal ? `User's stated focus goal: "${userProfile.customGoal || userProfile.goal}".` : '';

    const promptText = `Analyze this user's screen-time usage for today:
- Total screen time today: ${Math.floor(screenTimeData.totalMinutes / 60)}h ${screenTimeData.totalMinutes % 60}m
- Total screen time yesterday: ${Math.floor(screenTimeData.yesterdayMinutes / 60)}h ${screenTimeData.yesterdayMinutes % 60}m
- Change from yesterday: ${screenTimeData.changeMinutes > 0 ? '+' : ''}${screenTimeData.changeMinutes} minutes
- Peak usage period: ${screenTimeData.peakPeriod}
- Top apps: ${screenTimeData.apps.map((a: any) => `${a.name} (${Math.floor(a.minutes / 60)}h ${a.minutes % 60}m, category: ${a.category})`).join(', ')}
- Time-of-day distribution: ${screenTimeData.timeOfDay.map((t: any) => `${t.shortLabel}: ${t.minutes}m (${t.percentage}%)`).join(', ')}
- User context: ${screenTimeData.contextNote || 'None provided'}
${goalContext}

Generate a structured reflection that strictly separates factual data observation from cautious behavioral interpretation. Do not diagnose anything. Keep it non-judgmental, calm, and encouraging.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            observation: {
              type: Type.STRING,
              description: 'A strictly factual summary of 1 or 2 specific usage details (e.g. apps and peak hours).'
            },
            possiblePattern: {
              type: Type.STRING,
              description: 'A cautious, non-judgmental hypothesis about how or why that time occurred (e.g. using phrases like "may be" or "could be worth exploring").'
            },
            reflection: {
              type: Type.STRING,
              description: 'A gentle 1-sentence mindful inquiry asking the user to reflect on how they felt.'
            },
            focusArea: {
              type: Type.STRING,
              description: 'A short 4-8 word focal theme for today (e.g. "Create a small screen-free buffer before bedtime").'
            }
          },
          required: ['observation', 'possiblePattern', 'reflection', 'focusArea']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isMockFallback: false });
  } catch (err: any) {
    console.error('Error generating reflection with Gemini:', err);
    // Provide fallback so UI never breaks
    const { screenTimeData } = req.body;
    return res.json(generateFallbackReflection(screenTimeData));
  }
});

// 4. Personalized Challenge Generation API
app.post('/api/gemini/challenge', async (req, res) => {
  try {
    const { screenTimeData, reflection, userProfile } = req.body;
    if (!screenTimeData || !reflection) {
      return res.status(400).json({ error: 'screenTimeData and reflection are required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json(generateFallbackChallenge(screenTimeData, reflection, userProfile));
    }

    const preferredActivities = userProfile?.preferredOfflineActivities?.length
      ? userProfile.preferredOfflineActivities.join(', ')
      : 'Reading, Walking, Listening to music, Preparing for tomorrow';
    const preferredDuration = userProfile?.preferredDurationMinutes || 20;
    const preferredDifficulty = userProfile?.preferredDifficulty || 'Balanced';
    const userGoal = userProfile?.goal ? (userProfile.customGoal || userProfile.goal) : 'Reduce unnecessary evening scrolling';

    const promptText = `Based on the following screen-time data and reflection, generate ONE personalized, realistic mindful challenge for today:
- User Goal: "${userGoal}"
- Reflection Focus: "${reflection.focusArea}"
- Observation: "${reflection.observation}"
- Possible Pattern: "${reflection.possiblePattern}"
- Peak Usage Period: ${screenTimeData.peakPeriod}
- Top apps: ${screenTimeData.apps.slice(0, 3).map((a: any) => `${a.name} (${a.minutes}m)`).join(', ')}
- Preferred Offline Activities: ${preferredActivities}
- Preferred Duration: ~${preferredDuration} minutes
- Preferred Difficulty: ${preferredDifficulty}

Create ONE single small behavioral experiment (not multiple). Keep the required time around ${preferredDuration} minutes. Provide 3 calm offline alternative activities selected from or inspired by their preferred offline activities (${preferredActivities}). Reward 30-50 Focus Points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'A short, memorable, calm challenge title (e.g. "20-Minute Evening Reset").'
            },
            description: {
              type: Type.STRING,
              description: 'Clear, encouraging 1-2 sentence instructions for the experiment.'
            },
            durationMinutes: {
              type: Type.INTEGER,
              description: 'Suggested challenge duration in minutes (10 to 30).'
            },
            difficulty: {
              type: Type.STRING,
              description: 'Difficulty level: Gentle, Easy, or Medium.'
            },
            alternativeActivities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 offline, relaxing alternative activities.'
            },
            focusPoints: {
              type: Type.INTEGER,
              description: 'Award points between 30 and 50.'
            },
            reason: {
              type: Type.STRING,
              description: '1 sentence explaining why this experiment connects directly to their usage today.'
            }
          },
          required: ['title', 'description', 'durationMinutes', 'difficulty', 'alternativeActivities', 'focusPoints', 'reason']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      id: `challenge-${Date.now()}`,
      status: 'pending',
      ...parsed,
      isMockFallback: false
    });
  } catch (err: any) {
    console.error('Error generating challenge with Gemini:', err);
    const { screenTimeData, reflection, userProfile } = req.body;
    return res.json(generateFallbackChallenge(screenTimeData, reflection, userProfile));
  }
});

// 5. Micro-Reflection Insight API
app.post('/api/gemini/micro-reflection', async (req, res) => {
  try {
    const { challenge, beforeUrge, afterUrge, note } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json(generateFallbackMicroInsight(beforeUrge, afterUrge, note));
    }

    const promptText = `A user just completed or attempted a mindful digital well-being experiment ("${challenge?.title || 'Daily experiment'}").
- Urge to scroll before: ${beforeUrge}/10
- Urge to scroll after: ${afterUrge}/10
- User notes/reflection: "${note || 'None provided'}"

Generate a short 1-2 sentence supportive, non-judgmental reflection synthesizing this experiment. Note that one attempt is not enough to establish causation, but highlight the positive shift or mindful effort calmly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: {
              type: Type.STRING,
              description: 'A 1-2 sentence cautious, supportive reflection on their before/after urge and effort.'
            }
          },
          required: ['insight']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isMockFallback: false });
  } catch (err: any) {
    console.error('Error generating micro insight with Gemini:', err);
    const { beforeUrge, afterUrge, note } = req.body;
    return res.json(generateFallbackMicroInsight(beforeUrge, afterUrge, note));
  }
});

// 6. Weekly AI Insight API
app.post('/api/gemini/weekly-insight', async (req, res) => {
  try {
    const { weeklyData } = req.body;
    if (!weeklyData) {
      return res.status(400).json({ error: 'weeklyData is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json(generateFallbackWeeklyInsight(weeklyData));
    }

    const promptText = `Analyze this user's weekly screen-time summary:
- Average daily screen time: ${Math.floor(weeklyData.averageDailyMinutes / 60)}h ${weeklyData.averageDailyMinutes % 60}m (Last week: ${Math.floor(weeklyData.lastWeekAvgMinutes / 60)}h ${weeklyData.lastWeekAvgMinutes % 60}m)
- Net Change: ${weeklyData.changeMinutes > 0 ? '+' : ''}${weeklyData.changeMinutes} min
- Mindful Challenges Completed: ${weeklyData.completedChallengesCount} of ${weeklyData.weeklyGoalTarget} target
- Daily minutes (Mon-Sun): ${weeklyData.days.map((d: any) => `${d.dayOfWeek}: ${Math.floor(d.totalMinutes / 60)}h ${d.totalMinutes % 60}m`).join(', ')}
- Most improved period: "${weeklyData.mostImprovedPeriod}"

Generate a short weekly reflection. Important: Never claim strict causation based on limited data. Use cautious framing like "may be", "appears", "could be worth exploring", "based on this week". Do not frame higher screen time as failure. Suggest one gentle exploration for next week.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weeklyObservation: {
              type: Type.STRING,
              description: 'A factual summary of the weekly trends and challenge completion pattern.'
            },
            possiblePattern: {
              type: Type.STRING,
              description: 'A cautious hypothesis about how mindful routines interacted with their week.'
            },
            nextExperiment: {
              type: Type.STRING,
              description: 'A single, low-pressure experiment to explore for the upcoming week.'
            }
          },
          required: ['weeklyObservation', 'possiblePattern', 'nextExperiment']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isMockFallback: false });
  } catch (err: any) {
    console.error('Error generating weekly insight with Gemini:', err);
    const { weeklyData } = req.body;
    return res.json(generateFallbackWeeklyInsight(weeklyData));
  }
});

// Smart fallback helpers
function generateFallbackReflection(data: any) {
  const topApp = data?.apps?.[0]?.name || 'Social apps';
  const secondApp = data?.apps?.[1]?.name || 'Entertainment';
  const peak = data?.peakPeriod || '21:00–00:00';

  return {
    observation: `${topApp} and ${secondApp} accounted for most of your evening usage between 21:00 and midnight.`,
    possiblePattern: `Late-evening short-form scrolling may be one area where your phone use becomes less intentional.`,
    reflection: `Notice how your energy levels feel when you start scrolling compared to when you set the phone down.`,
    focusArea: `Create a short transition between scrolling and bedtime.`,
    isMockFallback: true
  };
}

function generateFallbackChallenge(data: any, reflection: any, userProfile?: any) {
  const activities = userProfile?.preferredOfflineActivities?.length
    ? userProfile.preferredOfflineActivities.slice(0, 3)
    : ['Read a few pages of a book', 'Listen to calm instrumental music', 'Take a short evening walk'];

  return {
    id: `challenge-${Date.now()}`,
    title: `${userProfile?.preferredDurationMinutes || 20}-Minute Evening Reset`,
    description: 'Before bed, spend 20 minutes away from short-form video apps and choose one of your preferred offline activities.',
    durationMinutes: userProfile?.preferredDurationMinutes || 20,
    difficulty: userProfile?.preferredDifficulty || 'Balanced',
    alternativeActivities: activities,
    focusPoints: 40,
    reason: `Offers a calm offline wind-down buffer during your peak ${data?.peakPeriod || 'evening'} period.`,
    status: 'pending',
    isMockFallback: true
  };
}

function generateFallbackMicroInsight(beforeUrge: number, afterUrge: number, note?: string) {
  if (beforeUrge > afterUrge) {
    return {
      insight: `Your urge to scroll decreased from ${beforeUrge} to ${afterUrge} during this experiment. One attempt isn't enough to establish causation, but a short offline transition may be worth exploring again.`,
      isMockFallback: true
    };
  } else {
    return {
      insight: `Noticing your urge (${afterUrge}/10) without judgment is itself a valuable mindful practice. Consistency with small experiments matters more than immediate shifts.`,
      isMockFallback: true
    };
  }
}

function generateFallbackWeeklyInsight(weeklyData: any) {
  return {
    weeklyObservation: `Your evening screen time was lower on the days when you completed a challenge (${weeklyData?.completedChallengesCount || 3} mindful experiments completed this week).`,
    possiblePattern: `This is only a short-term observation, but intentional evening wind-down routines appear to naturally reduce passive scrolling.`,
    nextExperiment: `Next week, explore charging your phone slightly further from your nightstand.`,
    isMockFallback: true
  };
}

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Focus app server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
