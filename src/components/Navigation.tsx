import React from 'react';
import { Clock, BarChart2, BookOpen, User } from 'lucide-react';

export type NavTab = 'today' | 'progress' | 'insights' | 'profile';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'today' as NavTab,
      label: 'Today',
      icon: Clock,
      sublabel: 'Daily Reflection',
    },
    {
      id: 'progress' as NavTab,
      label: 'Progress',
      icon: BarChart2,
      sublabel: 'Weekly View',
    },
    {
      id: 'insights' as NavTab,
      label: 'Insights',
      icon: BookOpen,
      sublabel: 'Patterns & Ethics',
    },
    {
      id: 'profile' as NavTab,
      label: 'Profile',
      icon: User,
      sublabel: 'Preferences',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-lg border-t border-[#EAECF0]">
      <div className="max-w-md mx-auto px-3 py-1.5 grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#101828]'
                  : 'text-[#98A2B3] hover:text-[#667085]'
              }`}
            >
              <div
                className={`w-9 h-6.5 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#F2F4F7] text-[#101828]' : 'bg-transparent text-[#98A2B3]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] tracking-[-0.1px] font-semibold mt-0.5 ${isActive ? 'text-[#101828]' : 'text-[#98A2B3]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
