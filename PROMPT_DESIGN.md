# Focus — AI Prompt Design & Responsible Architecture

This document outlines the Generative AI prompt architecture powering **Focus**, a non-judgmental screen-time reflection assistant built for digital well-being.

---

## 1. What Information is Sent to Gemini

Focus communicates with Gemini (`gemini-3.7-flash`) by sending aggregated behavioral usage metrics without storing or transmitting personal identifiers. 

The payload includes:
* **Quantitative Durations:** Total screen time for today, comparison with previous day, and net change (in minutes).
* **Application Distribution:** Top application breakdown by name, category (e.g. Social, Entertainment, Productivity), and active minutes.
* **Temporal Patterns:** Time-of-day histogram (Morning, Afternoon, Evening, Late Night) and peak usage window (e.g., `21:00 – 00:00`).
* **Micro-Interactions:** Pickup counts and first pickup time of the day.
* **Optional User Context:** A short user note or mood context (e.g., "Busy day at work, unwound with videos in bed").

---

## 2. Why Structured Output is Used

Structured JSON output (`responseSchema` with `@google/genai`) guarantees deterministic, safe, and easily consumable frontend rendering:

1. **Explicit Semantic Separation:** By enforcing fields like `observation` (factual) versus `possiblePattern` (interpretive), the model is mechanically constrained to decouple raw stats from behavioral hypotheses.
2. **Actionable Downstream Parsing:** The `challenge` endpoint guarantees fields like `durationMinutes` (integer), `difficulty`, `alternativeActivities` (array), and `focusPoints` (integer). This eliminates unstructured parsing errors and prevents hallucinated multi-step lists.
3. **Safety & Length Control:** Bounding output into specific JSON fields naturally limits verbose commentary and prevents unsolicited medical or diagnostic claims.

---

## 3. How Observations are Separated from Hypotheses

A core design flaw in legacy screen-time tools is conflating raw data with moral labels (e.g., "You scrolled too much"). Focus solves this at the prompt level:

* **Observation (Data Fact):** Factual recitation of what happened according to device sensors.
  * *Example:* `"TikTok and Instagram accounted for most of your usage between 21:00 and midnight (2h 17m total)."`
* **Possible Pattern (Hypothesis):** A tentative, non-definitive interpretation presented with epistemic humility.
  * *Example:* `"Late-evening scrolling may be one area where screen engagement becomes more automatic rather than intentional."`

The model is explicitly forbidden from asserting causation or definitive psychological motives.

---

## 4. How Diagnostic Language is Prevented

The system prompt enforces strict clinical and psychological guardrails:

* **Explicit Negations:** The system instruction commands:
  * *"Never diagnose digital addiction, ADHD, anxiety, depression, sleep disorders or any other medical or psychological condition."*
  * *"Do NOT say: 'You are addicted', 'You have a problem', 'You are unhealthy', 'You suffer from...'."*
* **Epistemic Softening:** System instructions mandate cautious qualifiers:
  * *"based on your usage data"*
  * *"one possible pattern"*
  * *"may be"*
  * *"appears to"*
  * *"could be worth exploring"*

---

## 5. How Personalization Works

Instead of generic advice (e.g., "Use your phone less"), Gemini tailors the single daily challenge to the user's specific context:

1. **Targeting the Real Peak:** If peak usage is late night, the challenge suggests an evening wind-down buffer (e.g., 20-minute screen-free transition before bed).
2. **Category Replacement:** If the dominant app is short-form video (TikTok/Reels), the challenge provides tactile, low-cognitive-load offline alternatives (e.g., stretching, listening to music without screens, preparing for tomorrow).
3. **Realistic Friction:** Durations are constrained between 10 to 25 minutes to ensure high completion probability without feeling restrictive or punishing.

---

## 6. How Prompts Avoid Judgmental & Moralizing Responses

* **Technology Neutrality:** The system instruction dictates: *"Do not shame users. Do not moralize screen use. Do not imply that technology itself is bad. The goal is intentional digital use, not zero digital use."*
* **Reframing 'Missed Goals':** When screen time increases, it is never framed as a failure. Prompts guide the AI to frame deviations as *"something to explore next week"* rather than failure.
* **Calm Gamification Alignment:** Rewards (+40 Focus Points) celebrate intentional offline moments rather than in-app time, reinforcing that the best digital well-being tool is one you close.
