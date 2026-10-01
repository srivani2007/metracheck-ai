import React, { useState } from 'react';
import {
  Printer,
  Download,
  Share2,
  ArrowLeft,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { InspectionRecord } from '../types';

interface ReportViewProps {
  record: InspectionRecord;
  onBack: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ record, onBack }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Inspection_Report_${record.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopySummary = () => {
    const summaryText = `LEGAL METROLOGY INSPECTION SUMMARY
Report Ref: ${record.id}
Product: ${record.productName} (${record.brand})
Inspection Date: ${new Date(record.timestamp).toLocaleString('en-IN')}
Status: ${record.overallStatus}
Inspector: ${record.inspectorName} (${record.inspectorBadge})
Violations Flagged: ${record.issues ? record.issues.length : 0}
Officer Decision: ${record.officerDecision || 'Verified by Inspector'}
`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top action toolbar (Hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm print:hidden">
        <button
          onClick={onBack}
          className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Result</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Copy Text Summary"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Download JSON Report"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg shadow flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Government Inspection Document */}
      <div className="bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6 print:shadow-none print:border-none print:p-0 print:rounded-none">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-800 pb-5 space-y-1 relative">
          <div className="flex items-center justify-center gap-2 text-slate-800 mb-1">
            <Scale className="w-7 h-7" />
          </div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
            Government of India • Ministry of Consumer Affairs, Food & Public Distribution
          </p>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Directorate of Legal Metrology
          </h1>
          <p className="text-xs font-semibold text-slate-700">
            Inspection & Compliance Audit Report under Legal Metrology (Packaged Commodities) Rules, 2011
          </p>
          <div className="inline-block mt-1 px-3 py-0.5 bg-slate-100 border border-slate-300 rounded text-[11px] font-mono font-bold text-slate-800">
            REF NO: {record.id}
          </div>
        </div>

        {/* Inspection Meta Information Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Inspection Date</span>
            <span className="font-semibold text-slate-900">
              {new Date(record.timestamp).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Audit Time</span>
            <span className="font-semibold text-slate-900">
              {new Date(record.timestamp).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Inspecting Officer</span>
            <span className="font-semibold text-slate-900">{record.inspectorName}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Officer Badge / ID</span>
            <span className="font-semibold font-mono text-slate-900">{record.inspectorBadge}</span>
          </div>

          <div className="col-span-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Inspection Location / Venue</span>
            <span className="font-semibold text-slate-900">{record.location}</span>
          </div>

          <div className="col-span-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Jurisdiction Zone</span>
            <span className="font-semibold text-slate-900">Zone 4 (Central NCR Enforcement Unit)</span>
          </div>
        </div>

        {/* Product Identity & Evidence Capture */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
          <div className="sm:col-span-2 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              Packaged Commodity Identification
            </h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold text-slate-500 w-36">Product / Article:</td>
                  <td className="py-1.5 font-bold text-slate-900">{record.productName}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold text-slate-500">Brand / Trade Name:</td>
                  <td className="py-1.5 font-medium text-slate-900">{record.brand}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold text-slate-500">Commodity Category:</td>
                  <td className="py-1.5 font-medium text-slate-900">{record.category}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold text-slate-500">Package Batch / Lot:</td>
                  <td className="py-1.5 font-mono text-slate-900">{record.batchLotNo || 'Not visible on front label'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-semibold text-slate-500">Inspected Panel:</td>
                  <td className="py-1.5 font-medium text-slate-900">{record.labelType}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Evidence Thumbnail */}
          <div className="space-y-1 text-center">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Photographic Evidence
            </h4>
            <div className="w-36 h-44 bg-slate-100 border border-slate-300 rounded-lg overflow-hidden mx-auto p-1">
              <img
                src={record.imageDataUrl}
                alt="Evidence"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[9px] font-mono text-slate-500 block">
              EVIDENCE HASH #{record.id.slice(-4)}
            </span>
          </div>
        </div>

        {/* Mandatory Declarations Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            Statutory Declarations Verification Matrix (Rule 6(1))
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2 w-16">Rule</th>
                  <th className="p-2 w-44">Declaration Parameter</th>
                  <th className="p-2">Extracted Value / Printed Text</th>
                  <th className="p-2 w-24 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {record.declarations.map((decl) => (
                  <tr key={decl.id} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-semibold text-slate-600">{decl.ruleRef}</td>
                    <td className="p-2 font-medium">{decl.name}</td>
                    <td className="p-2 font-mono text-[11px] text-slate-700 break-words">{decl.extractedValue}</td>
                    <td className="p-2 text-center font-bold text-[11px]">
                      {decl.status === 'PASS' ? (
                        <span className="text-emerald-700">✓ PASS</span>
                      ) : decl.status === 'POTENTIAL_VIOLATION' ? (
                        <span className="text-rose-700">✗ VIOLATION</span>
                      ) : (
                        <span className="text-amber-700">? REVIEW</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Potential Violations Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            Potential Statutory Non-Compliance & Findings
          </h3>
          {(!record.issues || record.issues.length === 0) ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 font-medium">
              No statutory violations detected. Product packaging conforms to configured Legal Metrology (Packaged Commodities) Rules, 2011 declarations.
            </div>
          ) : (
            <div className="space-y-2">
              {record.issues.map((issue, idx) => (
                <div key={idx} className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-slate-900 space-y-1">
                  <div className="flex items-center justify-between font-bold text-rose-800">
                    <span>{issue.title}</span>
                    <span className="font-mono text-[11px]">{issue.ruleRef}</span>
                  </div>
                  <p className="text-slate-700">{issue.description}</p>
                  {issue.recommendation && (
                    <p className="text-[11px] text-rose-900 font-medium">
                      Enforcement Guidance: {issue.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Readability & Technical Verification Note */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
          <div className="font-bold text-slate-800">Readability & Font Evaluation (Rule 9):</div>
          <p className="text-slate-600 text-[11px]">
            {record.readability.readabilityAssessment} Estimated minimum character height: {record.readability.estimatedTextHeightMm}.
          </p>
          <p className="text-[10px] text-slate-500 italic">
            {record.readability.disclaimer}
          </p>
        </div>

        {/* Officer Notes & Signature / Attestation */}
        <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-2 gap-6 items-end text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Officer Inspection Notes & Remarks
            </span>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 min-h-[50px]">
              {record.officerNotes || 'Packaging audited in field. Declarations checked against standards.'}
            </div>
            <div className="mt-2 font-medium text-slate-700">
              Official Disposition:{' '}
              <span className="font-bold text-slate-900">
                {record.officerDecision?.replace('_', ' ') || 'VERIFIED BY INSPECTOR'}
              </span>
            </div>
          </div>

          <div className="text-right space-y-4">
            <div className="inline-block border-b-2 border-slate-900 w-48 pb-1">
              <span className="font-serif italic text-sm text-slate-800 block">
                {record.inspectorName}
              </span>
            </div>
            <div>
              <div className="font-bold text-slate-900 uppercase text-xs">
                Inspecting Authority Signature
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                BADGE: {record.inspectorBadge} • DATE: {new Date(record.timestamp).toLocaleDateString()}
              </div>
              <div className="text-[9px] text-slate-400 mt-1 uppercase">
                MetraCheck AI • Digital Compliance Certification
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
