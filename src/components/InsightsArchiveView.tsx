import React, { useState } from 'react';
import { AIReflection, DailyChallenge } from '../types';
import { ShieldCheck, Terminal, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface InsightsArchiveViewProps {
  savedReflections: { reflection: AIReflection; challenge: DailyChallenge; date: string }[];
  onOpenResponsibleAI: () => void;
}

export const InsightsArchiveView: React.FC<InsightsArchiveViewProps> = ({
  savedReflections,
  onOpenResponsibleAI,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [activeSubTab, setActiveSubTab] = useState<'history' | 'patterns' | 'how_it_works'>('history');

  return (
    <div className="space-y-4 pt-1 pb-16">
      {/* Title */}
      <div className="pt-2 px-1">
        <h2 className="text-[22px] font-bold text-[#101828] tracking-[-0.4px] leading-[1.25]">Insights & Patterns</h2>
        <p className="text-[14px] font-medium text-[#667085] mt-0.5 leading-[1.55]">Past reflections, detected habits & AI transparency.</p>
      </div>

      {/* Sub-tab Segmented Control */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F2F4F7] border border-[#EAECF0]">
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer truncate ${
            activeSubTab === 'history'
              ? 'bg-[#FFFFFF] text-[#101828] shadow-2xs'
              : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          Past Reflections
        </button>
        <button
          onClick={() => setActiveSubTab('patterns')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer truncate ${
            activeSubTab === 'patterns'
              ? 'bg-[#FFFFFF] text-[#101828] shadow-2xs'
              : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          Habit Patterns
        </button>
        <button
          onClick={() => setActiveSubTab('how_it_works')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer truncate ${
            activeSubTab === 'how_it_works'
              ? 'bg-[#FFFFFF] text-[#101828] shadow-2xs'
              : 'text-[#667085] hover:text-[#101828]'
          }`}
        >
          How Focus AI Works
        </button>
      </div>

      {/* SUB-TAB 1: PAST REFLECTIONS */}
      {activeSubTab === 'history' && (
        <div className="space-y-3">
          {savedReflections.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3 transition-all"
              >
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-semibold tracking-wider text-[#B54708]">
                      {item.date}
                    </span>
                    <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">
                      “{item.reflection.focusArea}”
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#F8F9FA] border border-[#EAECF0] flex items-center justify-center text-[#667085]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-[#F2F4F7] space-y-3">
                    {/* Observation */}
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase font-semibold text-[#027A48] tracking-wider block">
                        Observed Fact
                      </span>
                      <p className="text-[14px] font-medium text-[#101828] pl-3.5 border-l-2 border-[#D1FADF] leading-[1.55]">
                        {item.reflection.observation}
                      </p>
                    </div>

                    {/* Hypothesis */}
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase font-semibold text-[#5925DC] tracking-wider block">
                        Possible Pattern
                      </span>
                      <p className="text-[14px] font-medium text-[#344054] pl-3.5 border-l-2 border-[#ECE9FE] italic leading-[1.55]">
                        “{item.reflection.possiblePattern}”
                      </p>
                    </div>

                    {/* Challenge record */}
                    <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-[#EAECF0] flex items-center justify-between text-[12px]">
                      <div>
                        <span className="font-bold text-[#101828] block">
                          {item.challenge.title}
                        </span>
                        <span className="text-[11px] text-[#667085] font-medium">
                          {item.challenge.durationMinutes} min • {item.challenge.difficulty}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[#027A48] font-semibold bg-[#ECFDF3] px-2.5 py-1 rounded-full border border-[#ABEFC6]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-TAB 2: DETECTED HABIT PATTERNS */}
      {activeSubTab === 'patterns' && (
        <div className="space-y-3">
          <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A5AF8]" />
              <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Late-Evening Decompression Buffer</h3>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
                Observed Behavior
              </span>
              <p className="text-[14px] font-medium text-[#101828] leading-[1.55] pl-3.5 border-l-2 border-[#EAECF0]">
                Usage spikes between 21:00 and midnight consistently involve short-form feeds (TikTok, Instagram) following mentally demanding workdays.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5925DC] block">
                Possible Interpretation
              </span>
              <p className="text-[14px] font-medium text-[#344054] leading-[1.55] italic pl-3.5 border-l-2 border-[#ECE9FE]">
                Late-night scrolling may be functioning as an automatic cognitive off-ramp when energy is low.
              </p>
            </div>
            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-[#EAECF0] text-[12px] text-[#344054]">
              <span className="font-bold text-[#101828]">Gentle Exploration: </span>
              A 15–20 minute tactile transition (audiobook, stretching, or reading) allows natural melatonin onset without abrupt restrictions.
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A]" />
              <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Micro-Transitions Between Tasks</h3>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
                Observed Behavior
              </span>
              <p className="text-[14px] font-medium text-[#101828] leading-[1.55] pl-3.5 border-l-2 border-[#EAECF0]">
                Phone pickups during the 14:00–16:00 window average under 90 seconds each, usually coinciding with switching browser tabs or finishing meetings.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#027A48] block">
                Possible Interpretation
              </span>
              <p className="text-[14px] font-medium text-[#344054] leading-[1.55] italic pl-3.5 border-l-2 border-[#D1FADF]">
                Quick device checks often fill micro-gaps between cognitive tasks rather than serving an urgent communication need.
              </p>
            </div>
            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-[#EAECF0] text-[12px] text-[#344054]">
              <span className="font-bold text-[#101828]">Gentle Exploration: </span>
              Taking one conscious breath before unlocking the screen turns an automatic reflex into an intentional choice.
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: HOW FOCUS AI WORKS */}
      {activeSubTab === 'how_it_works' && (
        <div className="space-y-3">
          <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5925DC]" />
              <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Our 5 AI Principles</h3>
            </div>
            <div className="space-y-3 text-[13px] text-[#344054]">
              <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
                <span className="font-bold text-[#101828] block">1. Observation vs. Hypothesis</span>
                <p className="text-[12px] text-[#667085] leading-relaxed">
                  Strict separation between concrete usage data and cautious exploratory patterns. We never present AI theories as undisputed truths.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
                <span className="font-bold text-[#101828] block">2. Non-Diagnostic Language</span>
                <p className="text-[12px] text-[#667085] leading-relaxed">
                  Focus AI never diagnoses digital addiction, ADHD, anxiety, depression, or medical disorders.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
                <span className="font-bold text-[#101828] block">3. No Moralizing or Shaming</span>
                <p className="text-[12px] text-[#667085] leading-relaxed">
                  Higher screen time is never framed as a moral failure. Technology is a tool, and we avoid judgmental vocabulary.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
                <span className="font-bold text-[#101828] block">4. Personalized Experiments</span>
                <p className="text-[12px] text-[#667085] leading-relaxed">
                  Challenges suggest concrete offline activities based on your expressed preferences and schedule.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
                <span className="font-bold text-[#101828] block">5. Offline-Oriented Gamification</span>
                <p className="text-[12px] text-[#667085] leading-relaxed">
                  Focus Points (+40) are awarded exclusively for intentional time spent away from the phone—never for opening the app.
                </p>
              </div>
            </div>
          </div>

          {/* AI Guardrails Excerpt */}
          <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#B54708]" />
              <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Gemini 3.7 Flash System Guardrails</h3>
            </div>
            <p className="text-[12px] font-medium text-[#667085] leading-[1.45]">
              Excerpt from our active system prompt ensuring non-diagnostic and supportive responses:
            </p>
            <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-[#EAECF0] font-mono text-[11px] text-[#344054] leading-relaxed max-h-40 overflow-y-auto">
              {`You are a digital well-being reflection assistant.
Your job is to help users understand their screen-time patterns.
You are not a doctor, therapist or diagnostic system.
Never diagnose digital addiction, ADHD, anxiety, depression, sleep disorders.
Separate observed data from interpretation.
Use cautious language: 'based on your usage data', 'one possible pattern', 'may be', 'appears to', 'could be worth exploring'.
Do not shame users. Do not moralize screen use.
The goal is intentional digital use, not zero digital use.
Create realistic, small behavioral experiments.`}
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Responsible AI Banner */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-2xs flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#027A48]">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy & Responsible AI</span>
          </div>
          <p className="text-[12px] font-medium text-[#667085] leading-[1.45]">
            Screen-time metrics are processed ephemerally. Focus never stores private messages, location, or personal identifiers.
          </p>
        </div>
        <button
          onClick={onOpenResponsibleAI}
          className="text-[12px] font-bold text-[#027A48] bg-[#ECFDF3] hover:bg-[#D1FADF] px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 mt-1"
        >
          View Modal
        </button>
      </div>
    </div>
  );
};
