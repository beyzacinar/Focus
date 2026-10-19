import React from 'react';
import { X, ShieldCheck, Heart, UserCheck, Sparkles, EyeOff } from 'lucide-react';

interface ResponsibleAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponsibleAIModal: React.FC<ResponsibleAIModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101828]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] rounded-3xl w-full max-w-md p-6 border border-[#EAECF0] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] flex items-center justify-center text-[#027A48]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Responsible AI & Privacy</h3>
              <p className="text-[12px] font-medium text-[#667085]">Our ethical framework & data standards</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F8F9FA] hover:bg-[#F2F4F7] flex items-center justify-center text-[#667085] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Ethical Principles List */}
        <div className="space-y-3 text-[13px] text-[#344054] leading-relaxed">
          {/* Item 1: Sensitive Behavioral Data */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#101828]">
              <EyeOff className="w-4 h-4 text-[#027A48]" />
              <span>Behavioral Privacy by Design</span>
            </div>
            <p className="text-[12px] font-medium text-[#667085] leading-[1.45]">
              Screen-time metrics reflect intimate daily habits. Focus transmits only aggregated durations and app categories—never message contents, browsing history, or personal identifiers.
            </p>
          </div>

          {/* Item 2: Non-Diagnostic Framing */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#101828]">
              <Heart className="w-4 h-4 text-[#5925DC]" />
              <span>Non-Diagnostic & Non-Judgmental</span>
            </div>
            <p className="text-[12px] font-medium text-[#667085] leading-[1.45]">
              AI-generated interpretations are not psychological or clinical diagnoses. Hypotheses use cautious qualifiers (e.g. <em>“may be”</em>, <em>“could be worth exploring”</em>) without shaming tech use.
            </p>
          </div>

          {/* Item 3: User Sovereignty */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#101828]">
              <UserCheck className="w-4 h-4 text-[#B54708]" />
              <span>User Agency & Gentle Experiments</span>
            </div>
            <p className="text-[12px] font-medium text-[#667085] leading-[1.45]">
              Users remain the authority over their intentions. We suggest 1 single realistic experiment rather than enforcing restrictive app lockouts.
            </p>
          </div>

          {/* Item 4: Offline Gamification */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#101828]">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Calm Gamification Philosophy</span>
            </div>
            <p className="text-[12px] font-medium text-[#667085] leading-[1.45]">
              <em>“We reward intentional time away from the screen — not time spent inside the app.”</em> No streak pressure, no loot boxes, and no addictive in-app reward loops.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] text-[13px] font-bold cursor-pointer transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
