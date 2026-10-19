import React from 'react';
import { DayScreenTime } from '../types';
import { INITIAL_PRESETS } from '../data/mockData';
import { X, Check, Smartphone } from 'lucide-react';

interface DemoPresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPresetId: string;
  onSelectPreset: (preset: DayScreenTime) => void;
}

export const DemoPresetModal: React.FC<DemoPresetModalProps> = ({
  isOpen,
  onClose,
  currentPresetId,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101828]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] rounded-3xl w-full max-w-md p-6 border border-[#EAECF0] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F2F4F7] border border-[#EAECF0] flex items-center justify-center text-[#101828]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Load Demo Data</h3>
              <p className="text-[12px] font-medium text-[#667085]">Simulate Android Screen Time inputs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F8F9FA] hover:bg-[#F2F4F7] flex items-center justify-center text-[#667085] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informational note */}
        <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-[#EAECF0] text-[12px] font-medium text-[#667085] leading-relaxed">
          In production, device metrics feed into Focus. Use these presets to test how Gemini synthesizes distinct behavioral profiles.
        </div>

        {/* Preset list */}
        <div className="space-y-2.5">
          {INITIAL_PRESETS.map((preset) => {
            const isSelected = preset.id === currentPresetId;
            const hours = Math.floor(preset.totalMinutes / 60);
            const mins = preset.totalMinutes % 60;

            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#F9FAFB] border-[#101828] shadow-2xs'
                    : 'bg-[#FFFFFF] border-[#EAECF0] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#101828]">
                      {preset.presetName}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-[#101828] text-white px-2 py-0.5 rounded-full font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-medium text-[#667085]">
                    Total: {hours}h {mins}m • Peak: {preset.peakPeriod}
                  </p>
                  <p className="text-[11px] text-[#98A2B3] line-clamp-1 italic font-medium">
                    {preset.contextNote}
                  </p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#101828] bg-[#101828] text-white' : 'border-[#D0D5DD] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] text-[13px] font-bold cursor-pointer transition-colors"
          >
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
