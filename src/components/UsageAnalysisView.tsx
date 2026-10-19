import React from 'react';
import { DayScreenTime } from '../types';
import { Sparkles, TrendingDown, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { MoonIllustration, HourglassIllustration } from './AbstractIllustrations';

interface UsageAnalysisViewProps {
  data: DayScreenTime;
  onStartReflection: () => void;
  isLoadingReflection: boolean;
}

export const UsageAnalysisView: React.FC<UsageAnalysisViewProps> = ({
  data,
  onStartReflection,
  isLoadingReflection,
}) => {
  const hours = Math.floor(data.totalMinutes / 60);
  const minutes = data.totalMinutes % 60;

  const yesterdayHours = Math.floor(data.yesterdayMinutes / 60);
  const yesterdayMinutes = data.yesterdayMinutes % 60;

  const isDecreased = data.changeMinutes <= 0;
  const absChangeMinutes = Math.abs(data.changeMinutes);

  return (
    <div className="space-y-4 pb-2">
      {/* Title & Subtitle */}
      <div className="pt-2 px-1">
        <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.4px] text-[#101828]">
          Your screen time
        </h2>
        <p className="text-[14px] font-medium leading-[1.55] text-[#667085] mt-0.5">
          Here’s how your digital day looks.
        </p>
      </div>

      {/* Main Screen-Time Hero Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#667085]">
              Total today
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[36px] font-bold tracking-[-0.6px] text-[#101828] leading-none">
                {hours}<span className="text-[22px] font-semibold text-[#667085]">h</span> {minutes}<span className="text-[22px] font-semibold text-[#667085]">m</span>
              </span>
            </div>
          </div>

          {/* Calming abstract icon */}
          <div className="w-13 h-13 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] flex items-center justify-center">
            <HourglassIllustration className="w-9 h-9" />
          </div>
        </div>

        {/* Yesterday Comparison Metric Pill */}
        <div className="mt-4 pt-3.5 border-t border-[#F2F4F7] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-1.5 text-[#667085] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span>Yesterday: {yesterdayHours}h {yesterdayMinutes}m</span>
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
                <span>-{absChangeMinutes} min</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{absChangeMinutes} min</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Peak Usage Period Card */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#EAECF0] flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4F3FF] border border-[#E0EAFF] flex items-center justify-center text-[#5925DC]">
            <MoonIllustration className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block leading-tight">Peak usage period</span>
            <span className="text-[15px] font-bold text-[#101828] tracking-[-0.2px]">{data.peakPeriod}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-[#5925DC] bg-[#F4F3FF] px-2.5 py-0.5 rounded-full font-semibold border border-[#D9D6FE]">
            Evening focus
          </span>
        </div>
      </div>

      {/* Most-Used Apps Section */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)]">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-[17px] font-bold leading-[1.3] text-[#101828] tracking-[-0.3px]">Most-used apps</h3>
          <span className="text-[12px] font-medium text-[#667085]">Active duration</span>
        </div>

        <div className="space-y-3">
          {data.apps.map((app) => {
            const appHours = Math.floor(app.minutes / 60);
            const appMins = app.minutes % 60;
            const timeStr = appHours > 0 ? `${appHours}h ${appMins > 0 ? `${appMins}m` : ''}` : `${appMins}m`;
            const widthPct = Math.min(100, Math.round((app.minutes / (data.apps[0].minutes || 1)) * 100));

            return (
              <div key={app.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: app.color }}
                    />
                    <span className="font-semibold text-[#101828] text-[13px]">{app.name}</span>
                    <span className="text-[10px] text-[#667085] font-medium px-1.5 py-0.2 rounded bg-[#F2F4F7]">
                      {app.category}
                    </span>
                  </div>
                  <span className="font-bold text-[#344054] text-[13px]">{timeStr}</span>
                </div>

                {/* Peaceful progress bar */}
                <div className="w-full h-2 rounded-full bg-[#F2F4F7] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: app.color,
                      opacity: 0.9,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage by Time of Day Histogram */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[17px] font-bold leading-[1.3] text-[#101828] tracking-[-0.3px]">Usage by time of day</h3>
          <span className="text-[12px] font-medium text-[#667085]">24-hour distribution</span>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2">
          {data.timeOfDay.map((block) => (
            <div
              key={block.shortLabel}
              className={`p-2.5 rounded-2xl border text-center transition-all ${
                block.highlight
                  ? 'bg-[#FFFAEB] border-[#FEDF89] shadow-2xs'
                  : 'bg-[#F8F9FA] border-[#EAECF0]'
              }`}
            >
              <div className="h-16 flex items-end justify-center mb-2">
                <div
                  className={`w-full max-w-[26px] rounded-t-lg transition-all duration-500 ${
                    block.highlight ? 'bg-[#F79009]' : 'bg-[#D0D5DD]'
                  }`}
                  style={{ height: `${Math.max(12, block.percentage * 1.3)}px` }}
                />
              </div>
              <span className="text-[12px] font-bold text-[#101828] block leading-tight">
                {block.minutes}m
              </span>
              <span className="text-[11px] font-medium text-[#667085] block mt-0.5 truncate">
                {block.shortLabel}
              </span>
              {block.highlight && (
                <span className="text-[9px] uppercase tracking-wider text-[#B54708] font-bold block mt-1">
                  Peak
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prominent Reflection CTA */}
      <div className="pt-2">
        <button
          id="btn-reflect-on-usage"
          onClick={onStartReflection}
          disabled={isLoadingReflection}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-75"
        >
          {isLoadingReflection ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-[#FFFFFF] border-t-transparent animate-spin" />
              <span className="text-[14px] font-bold">Synthesizing calm reflection...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#FDB022]" />
              <span className="text-[14px] font-bold">Reflect on my day</span>
              <ChevronRight className="w-4 h-4 text-[#98A2B3]" />
            </>
          )}
        </button>
        <p className="text-[11px] font-medium text-center text-[#98A2B3] mt-2">
          Uses Gemini to create a non-judgmental reflection and daily challenge.
        </p>
      </div>
    </div>
  );
};
