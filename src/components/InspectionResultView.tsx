import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  FileText,
  RotateCcw,
  Eye,
  Sliders,
  Sparkles,
  Info,
  Layers,
  FileCheck2,
  Calendar,
  UserCheck,
  Building,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { InspectionRecord, OverallComplianceStatus, ComplianceStatus } from '../types';

interface InspectionResultViewProps {
  record: InspectionRecord;
  onGenerateReport: (record: InspectionRecord) => void;
  onScanAnother: () => void;
  onUpdateRecord?: (record: InspectionRecord) => void;
}

export const InspectionResultView: React.FC<InspectionResultViewProps> = ({
  record,
  onGenerateReport,
  onScanAnother,
  onUpdateRecord
}) => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [officerNotes, setOfficerNotes] = useState<string>(record.officerNotes || '');
  const [officerDecision, setOfficerDecision] = useState<InspectionRecord['officerDecision']>(
    record.officerDecision || (record.overallStatus === 'COMPLIANT' ? 'VERIFIED_COMPLIANT' : 'PENDING')
  );
  const [activeTab, setActiveTab] = useState<'declarations' | 'violations' | 'readability' | 'evidence'>('declarations');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const passedCount = record.declarations.filter(d => d.status === 'PASS').length;
  const violationCount = record.issues ? record.issues.filter(i => i.status === 'POTENTIAL_VIOLATION').length : 0;
  const reviewCount = (record.issues ? record.issues.filter(i => i.status === 'REVIEW').length : 0) +
    record.declarations.filter(d => d.status === 'REVIEW').length;

  const handleSaveOfficerReview = () => {
    const updated: InspectionRecord = {
      ...record,
      officerNotes,
      officerDecision
    };
    if (onUpdateRecord) {
      onUpdateRecord(updated);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const renderStatusBanner = () => {
    switch (record.overallStatus) {
      case 'COMPLIANT':
        return (
          <div className="p-4 sm:p-5 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/20">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Overall Compliance Result
                  </span>
                  <span className="text-[11px] px-2 py-0.2 bg-emerald-900/60 text-emerald-300 rounded font-semibold">
                    Rule 6 Verified
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  🟢 COMPLIANT
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
                  All checked applicable statutory declarations were detected and passed configured Legal Metrology Rules, 2011 checks.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-emerald-900/60 pt-2 sm:pt-0 shrink-0 text-right">
              <span className="text-xs text-slate-400">Verification ID:</span>
              <span className="font-mono text-sm font-bold text-emerald-300">{record.id}</span>
            </div>
          </div>
        );

      case 'POTENTIAL_NON_COMPLIANCE':
        return (
          <div className="p-4 sm:p-5 bg-rose-950/60 border border-rose-500/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Overall Compliance Result
                  </span>
                  <span className="text-[11px] px-2 py-0.2 bg-rose-900/60 text-rose-300 rounded font-semibold">
                    Flagged for Verification
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  🔴 POTENTIAL NON-COMPLIANCE
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
                  One or more mandatory declarations are missing or formatted in potential violation of Legal Metrology (Packaged Commodities) Rules, 2011.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-rose-900/60 pt-2 sm:pt-0 shrink-0 text-right">
              <span className="text-xs text-slate-400">Verification ID:</span>
              <span className="font-mono text-sm font-bold text-rose-300">{record.id}</span>
            </div>
          </div>
        );

      case 'REVIEW':
      default:
        return (
          <div className="p-4 sm:p-5 bg-amber-950/60 border border-amber-500/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-950/20">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Overall Compliance Result
                  </span>
                  <span className="text-[11px] px-2 py-0.2 bg-amber-900/60 text-amber-300 rounded font-semibold">
                    Manual Verification Needed
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  🟡 REQUIRES MANUAL VERIFICATION
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
                  Image quality, container curvature, or declaration ambiguity requires physical inspection before determining legal standing.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-amber-900/60 pt-2 sm:pt-0 shrink-0 text-right">
              <span className="text-xs text-slate-400">Verification ID:</span>
              <span className="font-mono text-sm font-bold text-amber-300">{record.id}</span>
            </div>
          </div>
        );
    }
  };

  const getDeclarationStatusPill = (status: ComplianceStatus, detected: boolean) => {
    if (!detected || status === 'POTENTIAL_VIOLATION') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 rounded-md">
          <X className="w-3 h-3 stroke-[3]" />
          <span>Missing / Non-Compliant</span>
        </span>
      );
    }
    if (status === 'REVIEW') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 rounded-md">
          <AlertTriangle className="w-3 h-3" />
          <span>Manual Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-md">
        <Check className="w-3 h-3 stroke-[3]" />
        <span>✓ Detected</span>
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* 1. Overall Status Banner */}
      {renderStatusBanner()}

      {/* 2. Compliance Summary Counters & Product Compliance Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Compliance Summary
          </h3>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="text-center p-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-xl font-extrabold text-emerald-400 block">{passedCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Passed</span>
            </div>
            <div className="text-center p-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-xl font-extrabold text-rose-400 block">{violationCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Issues</span>
            </div>
            <div className="text-center p-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-xl font-extrabold text-amber-400 block">{reviewCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Review</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 leading-snug">
            <span className="text-slate-300 font-medium">Inspected Item: </span>
            {record.productName} ({record.brand})
          </div>
        </div>

        {/* AI-Assisted Score Gauge */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Compliance Checks Passed
              </h3>
              <span className="text-[10px] font-medium text-emerald-400 block">
                AI-assisted compliance indicator (Not a statutory score)
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {record.scores.overallPercentage}%
            </span>
          </div>

          {/* Sub-bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Declarations</span>
                <span className="font-mono text-slate-200">{record.scores.declarationPresence}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${record.scores.declarationPresence}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Data Validity</span>
                <span className="font-mono text-slate-200">{record.scores.dataValidity}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${record.scores.dataValidity}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Readability</span>
                <span className="font-mono text-slate-200">{record.scores.readability}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${record.scores.readability}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Formatting</span>
                <span className="font-mono text-slate-200">{record.scores.formatting}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${record.scores.formatting}%` }} />
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 italic">
            Evaluated by deterministic rule engine per Legal Metrology (Packaged Commodities) Rules, 2011.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('declarations')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'declarations'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Mandatory Declarations ({record.declarations.length})
        </button>

        <button
          onClick={() => setActiveTab('violations')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'violations'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>Flagged Issues</span>
          {record.issues && record.issues.length > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] bg-slate-900 text-white rounded-full font-bold">
              {record.issues.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('readability')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'readability'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Readability Analysis
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'evidence'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Image Evidence & Bounding Boxes</span>
        </button>
      </div>

      {/* Tab 1: Structured Mandatory Declarations Table/Cards */}
      {activeTab === 'declarations' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                Extracted Statutory Declarations
              </h3>
              <p className="text-[11px] text-slate-400">
                Extracted via Multimodal OCR & verified against Rule 6(1)
              </p>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block">
              Confidence indicates OCR visual fidelity, not legal certainty
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {record.declarations.map((decl) => (
              <div
                key={decl.id}
                className="p-3.5 sm:p-4 hover:bg-slate-850/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 sm:max-w-[45%]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      {decl.name}
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 text-slate-300 rounded border border-slate-700">
                      {decl.ruleRef}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono break-words bg-slate-950/80 p-2 rounded border border-slate-800">
                    {decl.extractedValue}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      AI/OCR Confidence
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200">
                      {decl.confidence}%
                    </div>
                  </div>

                  <div>
                    {getDeclarationStatusPill(decl.status, decl.detected)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Flagged Violation / Review Details */}
      {activeTab === 'violations' && (
        <div className="space-y-3">
          {(!record.issues || record.issues.length === 0) ? (
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">No Statutory Violations Detected</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                The product passed all configured validation checks under Legal Metrology Rules, 2011.
              </p>
            </div>
          ) : (
            record.issues.map((issue) => (
              <div
                key={issue.id}
                className="p-4 sm:p-5 bg-slate-900 border border-rose-900/60 rounded-2xl space-y-3 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-bold bg-rose-950 border border-rose-500/40 text-rose-300 rounded">
                      {issue.ruleRef}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {issue.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 text-[11px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                    Review Required by Officer
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {issue.description}
                </p>

                {issue.detectedSnippet && (
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400 text-[11px] font-semibold block mb-0.5">
                      Detected Snippet / Evidence Reference:
                    </span>
                    <span className="font-mono text-rose-300">{issue.detectedSnippet}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-400">Enforcement Action Note: </span>
                    {issue.recommendation}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Readability / Font Analysis (Section 11) */}
      {activeTab === 'readability' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">
              Readability & Visual Legibility Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated image contrast and estimated minimum character height check per Rule 9
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Image Clarity</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block">
                {record.readability.overallClarity}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Estimated Resolution</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block truncate">
                {record.readability.dpiEstimation}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Contrast Score</span>
              <span className="text-sm font-bold text-emerald-400 mt-1 block">
                {record.readability.contrastScore}/100
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Smallest Detected Height</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block truncate">
                {record.readability.estimatedTextHeightMm}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
            <span className="font-semibold text-slate-200 block">Assessment:</span>
            <p className="leading-relaxed">{record.readability.readabilityAssessment}</p>
          </div>

          {/* Mandatory Statutory Disclaimer from prompt Section 11 */}
          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <p className="leading-relaxed">
              <span className="font-bold">Statutory Note: </span>
              {record.readability.disclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Image Evidence with Highlighted Regions (Section 10) */}
      {activeTab === 'evidence' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                Original Image Evidence & Detected Regions
              </h3>
              <p className="text-[11px] text-slate-400">
                Preserved original packaging capture with audit timestamps
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showBoundingBoxes ? 'Hide Overlays' : 'Show Overlays'}</span>
            </button>
          </div>

          {/* Image viewer with overlay bounding boxes */}
          <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center p-2">
            <img
              src={record.imageDataUrl}
              alt="Evidence capture"
              className="max-w-full max-h-full object-contain rounded"
              referrerPolicy="no-referrer"
            />

            {/* Bounding box simulation overlays */}
            {showBoundingBoxes && record.declarations.map((decl) => {
              if (!decl.bbox) return null;
              const isViolating = decl.status === 'POTENTIAL_VIOLATION';
              const isReview = decl.status === 'REVIEW';
              const borderCol = isViolating
                ? 'border-rose-500 bg-rose-500/10'
                : isReview
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-emerald-400 bg-emerald-500/10';

              return (
                <div
                  key={decl.id}
                  style={{
                    left: `${decl.bbox.x}%`,
                    top: `${decl.bbox.y}%`,
                    width: `${decl.bbox.width}%`,
                    height: `${decl.bbox.height}%`
                  }}
                  className={`absolute border-2 rounded ${borderCol} pointer-events-none transition-all`}
                >
                  <span className="absolute -top-4 left-1 px-1 py-0.2 text-[8px] font-bold uppercase bg-slate-950 text-white rounded border border-slate-700">
                    {decl.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}

            {/* Watermark badge */}
            <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono border border-slate-800">
              AUDIT HASH: {record.id} • {new Date(record.timestamp).toLocaleTimeString()}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400 pt-1">
            <div className="p-2 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-slate-300 block">Inspection Date:</span>
              <span>{new Date(record.timestamp).toLocaleString('en-IN')}</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-slate-300 block">Auditing Officer:</span>
              <span>{record.inspectorName} ({record.inspectorBadge})</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-slate-300 block">GPS / Field Location:</span>
              <span>{record.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Human-in-the-Loop & Officer Decision (Section 19) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Human-in-the-Loop: Enforcement Officer Verification
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              AI assists the inspector; it does not replace legal authority under the Legal Metrology Act, 2009.
            </p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-800 text-slate-300 rounded border border-slate-700 shrink-0">
            Official Audit
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Official Enforcement Disposition
            </label>
            <select
              value={officerDecision}
              onChange={(e) => setOfficerDecision(e.target.value as any)}
              className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="VERIFIED_COMPLIANT">Verified Compliant (Clean Clearance)</option>
              <option value="NOTICE_ISSUED">Issue Statutory Notice (Rule 32 / Sec 36)</option>
              <option value="SEIZURE_RECOMMENDED">Seizure Recommended (Sec 15)</option>
              <option value="RE_INSPECT">Order Physical Re-inspection / Magnification</option>
              <option value="PENDING">Pending Supervisory Sign-off</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Officer Audit Remarks & Case Notes
            </label>
            <input
              type="text"
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="e.g. Physical seal inspected; batch printed on top fold."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleSaveOfficerReview}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>{isSaved ? '✓ Review Saved' : 'Save Officer Review'}</span>
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onScanAnother}
          className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Scan Another Product</span>
        </button>

        <button
          type="button"
          onClick={() => onGenerateReport(record)}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-transform active:scale-[0.98] flex items-center justify-center gap-2 min-h-[46px]"
        >
          <FileText className="w-4 h-4 stroke-[2.5]" />
          <span>Generate Digital Compliance Report</span>
        </button>
      </div>
    </div>
  );
};
