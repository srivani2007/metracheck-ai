import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ChevronRight,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  RotateCcw
} from 'lucide-react';
import { InspectionRecord, OverallComplianceStatus } from '../types';

interface HistoryViewProps {
  inspections: InspectionRecord[];
  onSelectInspection: (record: InspectionRecord) => void;
  onDeleteInspection: (id: string) => void;
  onResetDemoData: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  inspections,
  onSelectInspection,
  onDeleteInspection,
  onResetDemoData
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | OverallComplianceStatus>('ALL');

  const filtered = inspections.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.overallStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OverallComplianceStatus) => {
    switch (status) {
      case 'COMPLIANT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            COMPLIANT
          </span>
        );
      case 'POTENTIAL_NON_COMPLIANCE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            VIOLATION
          </span>
        );
      case 'REVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            REVIEW
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-24">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <span>Inspection History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit logs, digital inspection records, and filed compliance evaluations
          </p>
        </div>

        <button
          onClick={onResetDemoData}
          className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          title="Reload Calibrated Test Records"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Audits</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Product Name, Brand, or Inspection ID (e.g., 'INS-2026-101')..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </span>

          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All ({inspections.length})
          </button>

          <button
            onClick={() => setStatusFilter('COMPLIANT')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'COMPLIANT'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Compliant
          </button>

          <button
            onClick={() => setStatusFilter('POTENTIAL_NON_COMPLIANCE')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'POTENTIAL_NON_COMPLIANCE'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Potential Violations
          </button>

          <button
            onClick={() => setStatusFilter('REVIEW')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'REVIEW'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Requires Review
          </button>
        </div>
      </div>

      {/* Inspections List */}
      <div className="space-y-2.5">
        {filtered.map((record) => {
          const issueCount = record.issues ? record.issues.length : 0;
          const formattedDate = new Date(record.timestamp).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

          return (
            <div
              key={record.id}
              className="p-3.5 sm:p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div
                onClick={() => onSelectInspection(record)}
                className="flex items-start gap-3 min-w-0 flex-1 cursor-pointer group"
              >
                <div className="w-12 h-14 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={record.imageDataUrl}
                    alt={record.productName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {record.id}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400 truncate">
                      {record.brand}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-100 text-sm truncate group-hover:text-emerald-400 transition-colors">
                    {record.productName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formattedDate}</span>
                    </span>
                    <span>•</span>
                    <span>
                      {issueCount === 0
                        ? 'Passed'
                        : `${issueCount} ${issueCount === 1 ? 'issue' : 'issues'} flagged`}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Score {record.scores?.overallPercentage || 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                <div>{getStatusBadge(record.overallStatus)}</div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSelectInspection(record)}
                    className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                    title="View Inspection Report"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteInspection(record.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
            No inspection records found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};
