/**
 * Types for MetraCheck AI - Legal Metrology Compliance Auditor
 * Based on Legal Metrology (Packaged Commodities) Rules, 2011 (India)
 */

export type ComplianceStatus = 'PASS' | 'POTENTIAL_VIOLATION' | 'REVIEW';
export type OverallComplianceStatus = 'COMPLIANT' | 'POTENTIAL_NON_COMPLIANCE' | 'REVIEW';

export interface BoundingBox {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  width: number; // percentage 0 - 100
  height: number; // percentage 0 - 100
  label?: string;
  status?: ComplianceStatus;
}

export interface DeclarationField {
  id: string;
  name: string;
  ruleRef: string;
  extractedValue: string;
  detected: boolean;
  status: ComplianceStatus;
  confidence: number; // 0 - 100
  notes?: string;
  bbox?: BoundingBox;
}

export interface ComplianceIssue {
  id: string;
  title: string;
  ruleRef: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'POTENTIAL_VIOLATION' | 'REVIEW';
  description: string;
  detectedSnippet?: string;
  recommendation: string;
}

export interface ReadabilityAnalysis {
  overallClarity: 'GOOD' | 'ACCEPTABLE' | 'POOR';
  dpiEstimation: string;
  contrastScore: number; // 0 - 100
  estimatedTextHeightMm: string;
  readabilityAssessment: string;
  disclaimer: string;
}

export interface ScoreBreakdown {
  overallPercentage: number;
  declarationPresence: number;
  dataValidity: number;
  readability: number;
  formatting: number;
}

export interface InspectionRecord {
  id: string;
  timestamp: string;
  productName: string;
  brand: string;
  category: string;
  batchLotNo?: string;
  labelType: 'Front' | 'Back' | 'Side' | 'Principal Display Panel' | 'Multi-view';
  imageDataUrl: string;
  additionalImages?: string[];
  declarations: DeclarationField[];
  issues: ComplianceIssue[];
  readability: ReadabilityAnalysis;
  scores: ScoreBreakdown;
  overallStatus: OverallComplianceStatus;
  officerNotes?: string;
  officerDecision?: 'PENDING' | 'VERIFIED_COMPLIANT' | 'NOTICE_ISSUED' | 'SEIZURE_RECOMMENDED' | 'RE_INSPECT';
  inspectorName: string;
  inspectorBadge: string;
  location: string;
  isDemo?: boolean;
}

export interface LegalRuleReference {
  id: string;
  title: string;
  ruleSection: string;
  category: string;
  summary: string;
  mandatoryFields: string[];
  penaltyProvision: string;
}

export interface InspectorProfile {
  name: string;
  badge: string;
  designation: string;
  department: string;
  jurisdiction: string;
  email: string;
  phone: string;
}
