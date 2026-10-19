import React from 'react';
import { Sparkles, ShieldCheck, Database, Award } from 'lucide-react';

interface HeaderProps {
  dateStr: string;
  focusPoints: number;
  onOpenDemoPresets: () => void;
  onOpenResponsibleAI: () => void;
  isAiGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  dateStr,
  focusPoints,
  onOpenDemoPresets,
  onOpenResponsibleAI,
  isAiGenerating = false,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md px-4 pt-3 pb-3 border-b border-[#EAECF0]">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Brand & Date */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EEF4FF] border border-[#D1E0FF] flex items-center justify-center text-[#3538CD] shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#444CE7]"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[15px] font-bold text-[#101828] tracking-[-0.3px]">Focus</h1>
              <span className="text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]">
                Reflection
              </span>
            </div>
            <p className="text-[12px] font-medium text-[#667085] leading-none mt-0.5">{dateStr}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Focus Points Pill */}
          <div
            id="header-focus-points"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFAEB] border border-[#FEDF89] text-[#B54708] text-[12px] font-semibold shadow-2xs"
            title="Focus Points earned from offline mindful experiments"
          >
            <Award className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{focusPoints} <span className="text-[10px] text-[#B54708] font-medium hidden sm:inline">pts</span></span>
          </div>

          {/* Demo Data Selector CTA */}
          <button
            id="btn-load-demo-data"
            onClick={onOpenDemoPresets}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#344054] text-[12px] font-medium border border-[#D0D5DD] shadow-2xs transition-colors cursor-pointer"
            title="Switch Android Screen Time data presets for demo"
          >
            <Database className="w-3.5 h-3.5 text-[#667085]" />
            <span className="hidden xs:inline text-[12px] font-medium">Demo Data</span>
          </button>

          {/* Responsible AI Shield */}
          <button
            id="btn-responsible-ai-info"
            onClick={onOpenResponsibleAI}
            className="w-7 h-7 rounded-full bg-[#FFFFFF] hover:bg-[#F2F4F7] flex items-center justify-center text-[#667085] border border-[#D0D5DD] shadow-2xs transition-colors cursor-pointer"
            title="Responsible AI & Privacy Info"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#027A48]" />
          </button>
        </div>
      </div>
    </header>
  );
};
