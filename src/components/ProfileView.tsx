import React from 'react';
import {
  User,
  Shield,
  Building,
  MapPin,
  Mail,
  Phone,
  LogOut,
  Smartphone,
  Cpu,
  RotateCcw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { InspectorProfile } from '../types';

interface ProfileViewProps {
  inspector: InspectorProfile;
  onLogout: () => void;
  onResetDemo: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  inspector,
  onLogout,
  onResetDemo
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Title Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl shrink-0">
          <User className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white">
              {inspector.name}
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded">
              Active Official
            </span>
          </div>
          <p className="text-xs text-emerald-400 font-medium">
            {inspector.designation}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Badge ID: <span className="font-mono text-slate-200 font-semibold">{inspector.badge}</span>
          </p>
        </div>
      </div>

      {/* Official Credentials Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Statutory Enforcement Authority Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
              Enforcement Wing / Ministry
            </span>
            <div className="font-medium text-slate-200 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{inspector.department}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
              Field Jurisdiction
            </span>
            <div className="font-medium text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{inspector.jurisdiction}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
              Official Email
            </span>
            <div className="font-medium text-slate-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{inspector.email}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
              Authorized Device / Terminal
            </span>
            <div className="font-medium text-slate-200 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Mobile Field Unit #08 (Encrypted)</span>
            </div>
          </div>
        </div>
      </div>

      {/* System & Hackathon Prototype Architecture Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>System & Legal Framework Integration</span>
        </h3>

        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Rulebook: </strong>
            Legal Metrology (Packaged Commodities) Rules, 2011, framed under the Legal Metrology Act, 2009.
          </p>
          <p>
            <strong className="text-white">Auditing Engine: </strong>
            Two-stage multimodal architecture. Stage 1 conducts multimodal visual text and bounding-box extraction; Stage 2 applies a deterministic rule engine verifying mandatory parameters (MRP inclusive clauses, net quantity unit formats, manufacturer address validity).
          </p>
          <p className="text-[11px] text-slate-400">
            Designed to empower field inspectors during spot inspections across retail, wholesale, and e-commerce distribution fulfillment hubs.
          </p>
        </div>
      </div>

      {/* Management Actions */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onResetDemo}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Reset Sample Inspections to Default</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full py-3 px-4 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 font-semibold text-xs rounded-xl border border-rose-800/60 flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Exit Demo Mode</span>
        </button>
      </div>
    </div>
  );
};
