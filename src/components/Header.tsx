import React from 'react';
import { Scale, BookOpen, ShieldAlert, LogOut, CheckCircle2 } from 'lucide-react';
import { InspectorProfile } from '../types';

interface HeaderProps {
  inspector: InspectorProfile;
  onOpenRules: () => void;
  onLogout: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  inspector,
  onOpenRules,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Emblem & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-50">MetraCheck AI</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                PCR 2011
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-tight truncate max-w-[200px] sm:max-w-none">
              Legal Metrology Compliance Auditor • India
            </p>
          </div>
        </div>

        {/* Right: Quick actions & Officer Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition-colors"
            title="Legal Metrology Rules, 2011 Reference"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Rules Reference</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-700/80">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-right text-[11px]">
              <div className="font-semibold text-slate-200">{inspector.badge}</div>
              <div className="text-slate-400 truncate max-w-[130px]">{inspector.name}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded transition-colors"
            title="Sign Out / Exit Demo"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
