import React from 'react';
import { WeeklyData, Badge, WeeklyInsight } from '../types';
import { Award, TrendingDown, TrendingUp, Sparkles, Moon, BookOpen, Compass, Clock, ArrowRight } from 'lucide-react';
import { SunIllustration } from './AbstractIllustrations';

interface WeeklyProgressViewProps {
  weeklyData: WeeklyData;
  badges: Badge[];
  weeklyInsight: WeeklyInsight | null;
  isLoadingInsight: boolean;
  onGenerateWeeklyInsight: () => void;
  onNavigateToInsights?: () => void;
}

export const WeeklyProgressView: React.FC<WeeklyProgressViewProps> = ({
  weeklyData,
  badges,
  weeklyInsight,
  isLoadingInsight,
  onGenerateWeeklyInsight,
  onNavigateToInsights,
}) => {
  const avgHours = Math.floor(weeklyData.averageDailyMinutes / 60);
  const avgMins = weeklyData.averageDailyMinutes % 60;

  const lastWeekHours = Math.floor(weeklyData.lastWeekAvgMinutes / 60);
  const lastWeekMins = weeklyData.lastWeekAvgMinutes % 60;

  const isDecreased = weeklyData.changeMinutes <= 0;
  const absChangeMins = Math.abs(weeklyData.changeMinutes);

  // Maximum value for 7-day bar scale
  const maxDayMinutes = Math.max(...weeklyData.days.map((d) => d.totalMinutes), 420);

  return (
    <div className="space-y-4 pt-1 pb-16">
      {/* Title */}
      <div className="pt-2 px-1">
        <h2 className="text-[22px] font-bold text-[#101828] tracking-[-0.4px] leading-[1.25]">Your week</h2>
        <p className="text-[14px] font-medium text-[#667085] mt-0.5 leading-[1.55]">{weeklyData.weekLabel} • Weekly summary</p>
      </div>

      {/* Average Daily Screen-Time Hero Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#667085]">
              Average daily screen time
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[36px] font-bold tracking-[-0.6px] text-[#101828] leading-none">
                {avgHours}<span className="text-[22px] font-semibold text-[#667085]">h</span> {avgMins}<span className="text-[22px] font-semibold text-[#667085]">m</span>
              </span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] flex items-center justify-center">
            <SunIllustration className="w-9 h-9" />
          </div>
        </div>

        {/* Comparison row */}
        <div className="pt-3.5 border-t border-[#F2F4F7] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-1.5 text-[#667085] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span>Last week: {lastWeekHours}h {lastWeekMins}m</span>
          </div>

          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${
              isDecreased
                ? 'bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]'
                : 'bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]'
            }`}
          >
            {isDecreased ? (
              <>
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-{absChangeMins} min net change</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{absChangeMins} min net change</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 7-Day Chart Mon - Sun (Pastel Vertical Bars) */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold leading-[1.3] text-[#101828] tracking-[-0.3px]">Daily screen time</h3>
          <span className="text-[11px] font-medium text-[#667085]">7-day overview</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 pt-3">
          {weeklyData.days.map((day) => {
            const dayH = Math.floor(day.totalMinutes / 60);
            const dayM = day.totalMinutes % 60;
            const barHeightPct = Math.round((day.totalMinutes / maxDayMinutes) * 100);

            return (
              <div key={day.dayOfWeek} className="flex flex-col items-center">
                {/* Visual Bar with calm pastel styling */}
                <div className="h-28 w-full max-w-[26px] bg-[#F2F4F7] rounded-xl flex items-end justify-center p-1 relative group">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      day.isToday
                        ? 'bg-[#101828]'
                        : 'bg-[#C7D7FE]'
                    }`}
                    style={{ height: `${Math.max(16, barHeightPct)}%` }}
                  />
                  {day.isToday && (
                    <div className="absolute -top-1 w-2 h-2 rounded-full bg-[#101828] border border-white" />
                  )}
                </div>

                {/* Day Label & Time */}
                <span className={`text-[11px] mt-2 font-medium ${day.isToday ? 'text-[#101828] font-bold' : 'text-[#667085]'}`}>
                  {day.dayOfWeek}
                </span>
                <span className="text-[10px] text-[#98A2B3] font-medium tracking-tight">
                  {dayH}h{dayM > 0 ? `${dayM}` : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Grid: Goal, Focus Points */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weekly Mindful Goal Card */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#EAECF0] shadow-2xs space-y-1.5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B54708] block">
            Weekly Goal
          </span>
          <div className="text-[20px] font-bold text-[#101828]">
            {weeklyData.completedChallengesCount} <span className="text-[13px] font-medium text-[#667085]">/ {weeklyData.weeklyGoalTarget} challenges completed</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#F2F4F7] overflow-hidden mt-2">
            <div
              className="h-full rounded-full bg-[#F79009]"
              style={{ width: `${(weeklyData.completedChallengesCount / weeklyData.weeklyGoalTarget) * 100}%` }}
            />
          </div>
        </div>

        {/* Focus Points Balance */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#EAECF0] shadow-2xs space-y-1.5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#027A48] block">
            Focus Points
          </span>
          <div className="text-[20px] font-bold text-[#101828] flex items-center gap-1.5">
            <Award className="w-4.5 h-4.5 text-[#D97706]" />
            <span>{weeklyData.focusPointsTotal}</span>
          </div>
          <span className="text-[11px] text-[#667085] font-medium block">
            Earned away from screen
          </span>
        </div>
      </div>

      {/* Most Improved Period Card */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#EAECF0] flex items-center gap-3 shadow-2xs">
        <div className="w-9 h-9 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] flex items-center justify-center text-[#027A48] shrink-0">
          <TrendingDown className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#027A48] block">
            Most improved period
          </span>
          <p className="text-[13px] font-bold text-[#101828] mt-0.5">
            {weeklyData.mostImprovedPeriod}
          </p>
        </div>
      </div>

      {/* Mindful Milestones Badges */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold leading-[1.3] text-[#101828] tracking-[-0.3px]">Mindful Milestones</h3>
          <span className="text-[12px] text-[#667085] font-medium">Intentional badges</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="p-3 rounded-2xl border border-[#EAECF0] bg-[#F8F9FA] flex items-start gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFFFFF] border border-[#EAECF0] flex items-center justify-center text-[#101828] shrink-0 mt-0.5 shadow-2xs">
                {badge.icon === 'Moon' && <Moon className="w-4 h-4 text-[#5925DC]" />}
                {badge.icon === 'BookOpen' && <BookOpen className="w-4 h-4 text-[#B54708]" />}
                {badge.icon === 'Sparkles' && <Sparkles className="w-4 h-4 text-[#D97706]" />}
                {badge.icon === 'Compass' && <Compass className="w-4 h-4 text-[#027A48]" />}
              </div>
              <div className="min-w-0">
                <span className="text-[13px] font-bold text-[#101828] block truncate">
                  {badge.title}
                </span>
                <span className="text-[11px] text-[#667085] font-medium block leading-tight mt-0.5 line-clamp-2">
                  {badge.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly AI Insight Card (Generated by Gemini) */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5925DC]" />
            <h3 className="text-[17px] font-bold leading-[1.3] text-[#101828] tracking-[-0.3px]">Weekly AI Insight</h3>
          </div>

          <button
            id="btn-generate-weekly-insight"
            onClick={onGenerateWeeklyInsight}
            disabled={isLoadingInsight}
            className="text-[12px] text-[#3538CD] hover:text-[#2D31A6] font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50 transition-colors"
          >
            {isLoadingInsight ? 'Analyzing week...' : 'Generate Weekly Insight'}
          </button>
        </div>

        {weeklyInsight ? (
          <div className="space-y-3 pt-1">
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#EAECF0]">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-[#667085] block mb-1">
                Weekly observation
              </span>
              <p className="text-[13px] font-medium text-[#101828] leading-[1.55]">
                {weeklyInsight.weeklyObservation}
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#EAECF0]">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-[#5925DC] block mb-1">
                Possible pattern
              </span>
              <p className="text-[13px] font-medium text-[#344054] italic leading-[1.55]">
                “{weeklyInsight.possiblePattern}”
              </p>
            </div>

            {/* View Patterns CTA */}
            {onNavigateToInsights && (
              <div className="pt-2">
                <button
                  id="btn-view-patterns"
                  onClick={onNavigateToInsights}
                  className="w-full py-3 px-4 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[13px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>View Patterns</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <p className="text-[12px] font-medium text-[#667085]">
              Tap below to synthesize a non-judgmental reflection of this week's trends with Gemini.
            </p>
            <button
              onClick={onGenerateWeeklyInsight}
              disabled={isLoadingInsight}
              className="py-2.5 px-5 rounded-xl bg-[#101828] text-[#FFFFFF] text-[13px] font-bold cursor-pointer transition-colors shadow-2xs hover:bg-[#1D2939]"
            >
              {isLoadingInsight ? 'Synthesizing...' : 'Generate Weekly Insight'}
            </button>
          </div>
        )}

        <p className="text-[11px] font-medium text-center text-[#98A2B3] pt-1">
          Never claims causation based on limited data • Focuses on gentle exploratory experiments.
        </p>
      </div>
    </div>
  );
};
