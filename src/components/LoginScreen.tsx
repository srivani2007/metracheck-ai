import React, { useState } from 'react';
import { Scale, ShieldCheck, Zap, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { InspectorProfile } from '../types';

interface LoginScreenProps {
  onLogin: (inspector?: Partial<InspectorProfile>) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('r.sharma@lmd.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your department email ID.');
      return;
    }
    onLogin({
      email,
      name: 'Insp. Rajesh Sharma',
      badge: 'LMD-DL-4091',
      designation: 'Senior Legal Metrology Officer'
    });
  };

  const handleDemoMode = () => {
    onLogin({
      email: 'jury.demo@sih.gov.in',
      name: 'Inspector (Demo Mode - SIH Jury)',
      badge: 'LMD-SIH-2026',
      designation: 'Legal Metrology Enforcement Officer (Evaluation)',
      jurisdiction: 'National Capital Region, Zone 4'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Emblem & Department Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-900/40 mb-3.5 border border-emerald-400/30">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            MetraCheck AI
          </h1>
          <p className="text-sm font-medium text-emerald-400 mt-1">
            Legal Metrology Compliance Auditor
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2.5 text-[11px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
          </div>
        </div>

        {/* Demo Mode Fast Pass Highlight for SIH Jury */}
        <div className="mb-6 p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-start gap-3">
          <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <span className="font-bold text-emerald-200 block text-[13px]">
              Hackathon / SIH Jury Fast Access
            </span>
            <span className="text-slate-300 leading-relaxed">
              Skip authentication to explore pre-loaded inspections, run camera/image scans, and generate reports immediately.
            </span>
            <button
              type="button"
              onClick={handleDemoMode}
              className="mt-2.5 w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md shadow-emerald-950"
            >
              <span>Launch Demo Mode</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900 px-3 text-slate-500 font-medium uppercase tracking-wider text-[10px]">
              Or Enforcement Official Sign-In
            </span>
          </div>
        </div>

        {error ? (
          <div className="mb-4 p-3 bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        {/* Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Department Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@lmd.gov.in"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Login</span>
          </button>
        </form>

        {/* Footer badges */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
          <p>Ministry of Consumer Affairs, Food & Public Distribution</p>
          <p className="text-slate-500 text-[10px] mt-0.5">
            Directorate of Legal Metrology • Enforcement Wing
          </p>
        </div>
      </div>
    </div>
  );
};
