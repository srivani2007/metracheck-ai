import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { DashboardView } from './components/DashboardView';
import { ScanView } from './components/ScanView';
import { InspectionResultView } from './components/InspectionResultView';
import { ReportView } from './components/ReportView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { RulesReferenceModal } from './components/RulesReferenceModal';
import { InspectionRecord, InspectorProfile } from './types';
import {
  getStoredInspections,
  saveInspection,
  deleteInspection,
  resetToDemoData,
  getActiveUser
} from './utils/storage';
import { Info, ShieldAlert } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Default to true so preview renders app immediately, user can also log out
  const [inspector, setInspector] = useState<InspectorProfile>(getActiveUser());
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const [activeInspection, setActiveInspection] = useState<InspectionRecord | null>(null);
  const [viewingReport, setViewingReport] = useState<boolean>(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
  const [presetToLoad, setPresetToLoad] = useState<'compliant' | 'violation' | 'review' | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const loaded = getStoredInspections();
    setInspections(loaded);
  }, []);

  const handleLogin = (customProfile?: Partial<InspectorProfile>) => {
    if (customProfile) {
      setInspector((prev) => ({ ...prev, ...customProfile }));
    }
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveInspection(null);
    setViewingReport(false);
  };

  const handleScanNew = () => {
    setActiveInspection(null);
    setViewingReport(false);
    setPresetToLoad(null);
    setCurrentTab('scan');
  };

  const handleLaunchDemoPreset = (preset: 'compliant' | 'violation' | 'review') => {
    setActiveInspection(null);
    setViewingReport(false);
    setPresetToLoad(preset);
    setCurrentTab('scan');
  };

  const handleAnalysisComplete = (record: InspectionRecord) => {
    saveInspection(record);
    setInspections(getStoredInspections());
    setActiveInspection(record);
    setViewingReport(false);
  };

  const handleSelectInspection = (record: InspectionRecord) => {
    setActiveInspection(record);
    setViewingReport(false);
  };

  const handleGenerateReport = (record: InspectionRecord) => {
    setActiveInspection(record);
    setViewingReport(true);
  };

  const handleUpdateRecord = (record: InspectionRecord) => {
    saveInspection(record);
    setInspections(getStoredInspections());
    setActiveInspection(record);
  };

  const handleDeleteInspection = (id: string) => {
    deleteInspection(id);
    const updated = getStoredInspections();
    setInspections(updated);
    if (activeInspection && activeInspection.id === id) {
      setActiveInspection(null);
      setViewingReport(false);
    }
  };

  const handleResetDemo = () => {
    resetToDemoData();
    const updated = getStoredInspections();
    setInspections(updated);
    setActiveInspection(null);
    setViewingReport(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Official Government Top App Bar */}
      <Header
        inspector={inspector}
        onOpenRules={() => setIsRulesModalOpen(true)}
        onLogout={handleLogout}
        activeTab={currentTab}
      />

      {/* Human-in-the-Loop Statutory Notice Ribbon (Prompt Section 19) */}
      <div className="bg-emerald-950/40 border-b border-emerald-500/20 px-4 py-1.5 text-center text-[11px] text-emerald-300 font-medium flex items-center justify-center gap-2 print:hidden">
        <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>
          Enforcement Assistant: AI assists the inspector; it does not replace legal authority under the Legal Metrology Act, 2009.
        </span>
      </div>

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 pb-24">
        {/* If viewing formal digital report */}
        {viewingReport && activeInspection ? (
          <ReportView
            record={activeInspection}
            onBack={() => setViewingReport(false)}
          />
        ) : activeInspection ? (
          /* If viewing full inspection result */
          <InspectionResultView
            record={activeInspection}
            onGenerateReport={handleGenerateReport}
            onScanAnother={handleScanNew}
            onUpdateRecord={handleUpdateRecord}
          />
        ) : (
          /* Tab navigation views */
          <>
            {currentTab === 'dashboard' && (
              <DashboardView
                inspections={inspections}
                onScanNew={handleScanNew}
                onSelectInspection={handleSelectInspection}
                onLaunchDemoPreset={handleLaunchDemoPreset}
              />
            )}

            {currentTab === 'scan' && (
              <ScanView
                onAnalysisComplete={handleAnalysisComplete}
                presetToLoad={presetToLoad}
                onClearPreset={() => setPresetToLoad(null)}
              />
            )}

            {currentTab === 'history' && (
              <HistoryView
                inspections={inspections}
                onSelectInspection={handleSelectInspection}
                onDeleteInspection={handleDeleteInspection}
                onResetDemoData={handleResetDemo}
              />
            )}

            {currentTab === 'reports' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Inspection Reports Library
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Select an inspected commodity to view, print, or export its formal digital compliance certificate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {inspections.map((record) => (
                    <div
                      key={record.id}
                      onClick={() => handleGenerateReport(record)}
                      className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          {record.id}
                        </div>
                        <h3 className="font-semibold text-slate-100 text-sm truncate group-hover:text-emerald-400">
                          {record.productName}
                        </h3>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Status: {record.overallStatus} • {new Date(record.timestamp).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      <span className="px-3 py-1.5 text-xs font-semibold bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-300 rounded-lg transition-colors shrink-0">
                        View Report
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'profile' && (
              <ProfileView
                inspector={inspector}
                onLogout={handleLogout}
                onResetDemo={handleResetDemo}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile-First Sticky Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={(tab) => {
          setActiveInspection(null);
          setViewingReport(false);
          setCurrentTab(tab);
        }}
        historyCount={inspections.length}
      />

      {/* Statutory Rules Reference Modal */}
      <RulesReferenceModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </div>
  );
}
