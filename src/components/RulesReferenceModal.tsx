import React, { useState } from 'react';
import { X, BookOpen, Scale, Search, ShieldCheck, AlertTriangle } from 'lucide-react';
import { LEGAL_RULES_REFERENCE } from '../data/demoData';

interface RulesReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesReferenceModal: React.FC<RulesReferenceModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredRules = LEGAL_RULES_REFERENCE.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.ruleSection.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                Legal Metrology (Packaged Commodities) Rules, 2011
              </h2>
              <p className="text-xs text-slate-400">
                Statutory reference rulebook for packaged commodity enforcement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900/40 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by rule, e.g. 'MRP', 'Net Quantity', 'Rule 6(1)(d)'..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Rules Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-sm">
          <div className="p-3 bg-emerald-950/40 border border-emerald-600/30 rounded-lg text-xs text-emerald-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>
              MetraCheck AI validates against these 8 official rule categories using a transparent, deterministic rule verification layer independent of raw OCR.
            </span>
          </div>

          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-400 rounded">
                  {rule.ruleSection}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Category: {rule.category}
                </span>
              </div>
              <h3 className="font-semibold text-slate-100 text-sm">
                {rule.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {rule.summary}
              </p>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">
                  Mandatory Requirements:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
                  {rule.mandatoryFields.map((field, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Statutory Reference: {rule.penaltyProvision}</span>
              </div>
            </div>
          ))}

          {filteredRules.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              No matching Legal Metrology rules found for "{searchTerm}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
