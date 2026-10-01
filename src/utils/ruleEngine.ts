/**
 * Legal Metrology (Packaged Commodities) Rules, 2011 Rule-Based Compliance Engine
 * Evaluates extracted declarations independently without hallucinating legal mandates.
 */

import {
  DeclarationField,
  ComplianceIssue,
  ReadabilityAnalysis,
  ScoreBreakdown,
  OverallComplianceStatus
} from '../types';

export interface RawExtractedData {
  productName?: string;
  brand?: string;
  category?: string;
  manufacturer?: string;
  netQuantity?: string;
  mrp?: string;
  packingDate?: string;
  consumerCare?: string;
  genericName?: string;
  countryOfOrigin?: string;
  expiryDate?: string;
  rawOcrText?: string;
  imageQualityScore?: number; // 0 - 100
  estimatedSmallestFontMm?: number;
}

export function evaluateCompliance(raw: RawExtractedData): {
  declarations: DeclarationField[];
  issues: ComplianceIssue[];
  readability: ReadabilityAnalysis;
  scores: ScoreBreakdown;
  overallStatus: OverallComplianceStatus;
} {
  const declarations: DeclarationField[] = [];
  const issues: ComplianceIssue[] = [];

  // 1. Manufacturer / Packer / Importer (Rule 6(1)(a))
  const mfgValue = (raw.manufacturer || '').trim();
  const mfgDetected = mfgValue.length > 4 && !/not detected|missing|none/i.test(mfgValue);
  let mfgStatus: 'PASS' | 'POTENTIAL_VIOLATION' | 'REVIEW' = 'PASS';
  let mfgConfidence = mfgDetected ? 94 : 20;

  if (!mfgDetected) {
    mfgStatus = 'POTENTIAL_VIOLATION';
    issues.push({
      id: 'ISSUE-MFG-01',
      title: 'Manufacturer / Packer Declaration Missing',
      ruleRef: 'Rule 6(1)(a)',
      severity: 'HIGH',
      status: 'POTENTIAL_VIOLATION',
      description: 'Name and complete address of the manufacturer, packer, or importer was not identified on the package label.',
      detectedSnippet: mfgValue || 'None',
      recommendation: 'Review physical packaging for manufacturer/packer details. If absent, initiate action under Rule 32.'
    });
  } else if (!/(pvt|ltd|limited|llp|mfg|manufactured|packed|road|nagar|street|delhi|mumbai|bangalore|pincode|\b\d{6}\b|india)/i.test(mfgValue)) {
    mfgStatus = 'REVIEW';
    mfgConfidence = 75;
    issues.push({
      id: 'ISSUE-MFG-02',
      title: 'Incomplete Address / Ambiguous Manufacturer Details',
      ruleRef: 'Rule 6(1)(a)',
      severity: 'MEDIUM',
      status: 'REVIEW',
      description: 'Manufacturer name is detected but complete postal address/PIN code could not be definitively parsed from label.',
      detectedSnippet: mfgValue,
      recommendation: 'Requires Manual Verification: Physically verify if complete postal address including city and PIN is embossed or printed.'
    });
  }

  declarations.push({
    id: 'decl-mfg',
    name: 'Manufacturer / Packer / Importer',
    ruleRef: 'Rule 6(1)(a)',
    extractedValue: mfgDetected ? mfgValue : 'Not Detected on supplied label',
    detected: mfgDetected,
    status: mfgStatus,
    confidence: mfgConfidence,
    notes: 'Mandatory on all retail pre-packed commodities.',
    bbox: { x: 12, y: 15, width: 75, height: 12, label: 'Manufacturer Details' }
  });

  // 2. Generic Name of Commodity (Rule 6(1)(b))
  const genericValue = (raw.genericName || raw.productName || '').trim();
  const genericDetected = genericValue.length > 2 && !/not detected|missing/i.test(genericValue);
  declarations.push({
    id: 'decl-generic',
    name: 'Common / Generic Name of Commodity',
    ruleRef: 'Rule 6(1)(b)',
    extractedValue: genericDetected ? genericValue : 'Not Detected',
    detected: genericDetected,
    status: genericDetected ? 'PASS' : 'REVIEW',
    confidence: genericDetected ? 92 : 30,
    notes: 'Must identify the nature of commodity unambiguously.',
    bbox: { x: 10, y: 30, width: 80, height: 10, label: 'Generic Name' }
  });

  // 3. Net Quantity (Rule 6(1)(c) & Rule 12)
  const netQtyValue = (raw.netQuantity || '').trim();
  const netQtyDetected = netQtyValue.length > 0 && !/not detected|missing/i.test(netQtyValue);
  let netQtyStatus: 'PASS' | 'POTENTIAL_VIOLATION' | 'REVIEW' = 'PASS';
  let netQtyConfidence = netQtyDetected ? 96 : 15;

  if (!netQtyDetected) {
    netQtyStatus = 'POTENTIAL_VIOLATION';
    issues.push({
      id: 'ISSUE-NETQTY-01',
      title: 'Net Quantity Declaration Missing',
      ruleRef: 'Rule 6(1)(c)',
      severity: 'HIGH',
      status: 'POTENTIAL_VIOLATION',
      description: 'Net quantity in standard unit of weight, volume or count could not be identified on the label.',
      detectedSnippet: netQtyValue || 'None',
      recommendation: 'Check Principal Display Panel for net weight/volume statement.'
    });
  } else {
    // Check for prohibited misleading words like "approx", "when packed", "approximate"
    if (/approx|approximate|when packed|around|about/i.test(netQtyValue)) {
      netQtyStatus = 'POTENTIAL_VIOLATION';
      issues.push({
        id: 'ISSUE-NETQTY-02',
        title: 'Misleading Qualifier on Net Quantity',
        ruleRef: 'Rule 11(1)',
        severity: 'HIGH',
        status: 'POTENTIAL_VIOLATION',
        description: 'Qualifying expressions such as "approx." or "when packed" are strictly prohibited under Legal Metrology Rules.',
        detectedSnippet: netQtyValue,
        recommendation: 'Notice recommended under Section 36 of Legal Metrology Act, 2009 for misleading quantity declaration.'
      });
    } else if (!/(\d+(\.\d+)?)\s*(g|kg|gm|gms|ml|l|ltr|litres?|n|pcs?|units?|tablets?|capsules?)\b/i.test(netQtyValue)) {
      netQtyStatus = 'REVIEW';
      netQtyConfidence = 70;
      issues.push({
        id: 'ISSUE-NETQTY-03',
        title: 'Non-Standard Net Quantity Unit',
        ruleRef: 'Rule 12',
        severity: 'MEDIUM',
        status: 'REVIEW',
        description: 'Quantity detected does not strictly match standard SI units (g, kg, ml, l, or count). Requires manual confirmation.',
        detectedSnippet: netQtyValue,
        recommendation: 'Requires Manual Verification: Confirm whether standard symbols are used on the physical container.'
      });
    }
  }

  declarations.push({
    id: 'decl-netqty',
    name: 'Net Quantity (Standard Units)',
    ruleRef: 'Rule 6(1)(c)',
    extractedValue: netQtyDetected ? netQtyValue : 'Not Detected',
    detected: netQtyDetected,
    status: netQtyStatus,
    confidence: netQtyConfidence,
    notes: 'Must be in standard SI units (g, kg, ml, l, or count) without non-standard prefixes.',
    bbox: { x: 12, y: 44, width: 45, height: 8, label: 'Net Quantity' }
  });

  // 4. Maximum Retail Price (MRP) (Rule 6(1)(e))
  const mrpValue = (raw.mrp || '').trim();
  const mrpDetected = mrpValue.length > 0 && !/not detected|missing/i.test(mrpValue);
  let mrpStatus: 'PASS' | 'POTENTIAL_VIOLATION' | 'REVIEW' = 'PASS';
  let mrpConfidence = mrpDetected ? 95 : 15;

  if (!mrpDetected) {
    mrpStatus = 'POTENTIAL_VIOLATION';
    issues.push({
      id: 'ISSUE-MRP-01',
      title: 'Maximum Retail Price (MRP) Missing',
      ruleRef: 'Rule 6(1)(e)',
      severity: 'HIGH',
      status: 'POTENTIAL_VIOLATION',
      description: 'Maximum Retail Price could not be detected on the package or label.',
      detectedSnippet: mrpValue || 'None',
      recommendation: 'Check price panel or barcode area for MRP stamping.'
    });
  } else {
    const hasTaxStatement = /incl|tax|all taxes/i.test(mrpValue) || /incl\.?\s*of\s*all\s*taxes/i.test(raw.rawOcrText || '');
    const hasCurrencySymbol = /(₹|rs\.?|inr)/i.test(mrpValue);

    if (!hasTaxStatement && mrpDetected) {
      mrpStatus = 'POTENTIAL_VIOLATION';
      issues.push({
        id: 'ISSUE-MRP-02',
        title: 'Missing "Inclusive of all taxes" Declaration',
        ruleRef: 'Rule 6(1)(e)',
        severity: 'MEDIUM',
        status: 'POTENTIAL_VIOLATION',
        description: 'MRP must be stated explicitly as "Maximum or Max. Retail Price ... inclusive of all taxes" or "incl. of all taxes".',
        detectedSnippet: mrpValue,
        recommendation: 'Verify if "incl. of all taxes" is printed near the MRP or on an adjacent panel.'
      });
    } else if (!hasCurrencySymbol) {
      mrpStatus = 'REVIEW';
      mrpConfidence = 72;
      issues.push({
        id: 'ISSUE-MRP-03',
        title: 'Currency Symbol Unverified',
        ruleRef: 'Rule 6(1)(e)',
        severity: 'LOW',
        status: 'REVIEW',
        description: 'Detected price does not explicitly show the standard Indian Rupee symbol (₹) or Rs. prefix.',
        detectedSnippet: mrpValue,
        recommendation: 'Requires Manual Verification: Inspect physical sticker/carton for valid currency notation.'
      });
    }
  }

  declarations.push({
    id: 'decl-mrp',
    name: 'Maximum Retail Price (MRP)',
    ruleRef: 'Rule 6(1)(e)',
    extractedValue: mrpDetected ? mrpValue : 'Not Detected',
    detected: mrpDetected,
    status: mrpStatus,
    confidence: mrpConfidence,
    notes: 'Must clearly state ₹ / Rs. and include "inclusive of all taxes".',
    bbox: { x: 55, y: 44, width: 35, height: 8, label: 'MRP Section' }
  });

  // 5. Month & Year of Manufacture / Packing / Import (Rule 6(1)(d))
  const dateValue = (raw.packingDate || '').trim();
  const dateDetected = dateValue.length > 2 && !/not detected|missing/i.test(dateValue);
  let dateStatus: 'PASS' | 'POTENTIAL_VIOLATION' | 'REVIEW' = 'PASS';
  let dateConfidence = dateDetected ? 91 : 20;

  if (!dateDetected) {
    dateStatus = 'POTENTIAL_VIOLATION';
    issues.push({
      id: 'ISSUE-DATE-01',
      title: 'Packing / Manufacturing Date Missing',
      ruleRef: 'Rule 6(1)(d)',
      severity: 'HIGH',
      status: 'POTENTIAL_VIOLATION',
      description: 'Required month and year of manufacture or pre-packing could not be identified from the supplied image.',
      detectedSnippet: dateValue || 'Not Detected',
      recommendation: 'Review packaging rim, crimp, bottom fold, or batch stamp. If absent, product is non-compliant.'
    });
  } else if (!/(\d{1,2}[\/\-\.]\d{2,4}|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s\.\,\/\-]*\d{2,4})/i.test(dateValue)) {
    dateStatus = 'REVIEW';
    dateConfidence = 68;
    issues.push({
      id: 'ISSUE-DATE-02',
      title: 'Ambiguous Date Format',
      ruleRef: 'Rule 6(1)(d)',
      severity: 'LOW',
      status: 'REVIEW',
      description: 'Extracted date does not clearly correspond to standard MM/YYYY or Month YYYY format.',
      detectedSnippet: dateValue,
      recommendation: 'Requires Manual Verification: Confirm stamped batch date readability.'
    });
  }

  declarations.push({
    id: 'decl-date',
    name: 'Month & Year of Packing / Manufacture',
    ruleRef: 'Rule 6(1)(d)',
    extractedValue: dateDetected ? dateValue : 'Not Detected',
    detected: dateDetected,
    status: dateStatus,
    confidence: dateConfidence,
    notes: 'Mandatory declaration indicating month and year of pre-packing or manufacture.',
    bbox: { x: 12, y: 55, width: 45, height: 8, label: 'Date of Packing' }
  });

  // 6. Consumer Care Details (Rule 6(1)(da))
  const ccValue = (raw.consumerCare || '').trim();
  const ccDetected = ccValue.length > 4 && !/not detected|missing/i.test(ccValue);
  let ccStatus: 'PASS' | 'POTENTIAL_VIOLATION' | 'REVIEW' = 'PASS';
  let ccConfidence = ccDetected ? 89 : 25;

  if (!ccDetected) {
    ccStatus = 'POTENTIAL_VIOLATION';
    issues.push({
      id: 'ISSUE-CC-01',
      title: 'Consumer Care Contact Details Missing',
      ruleRef: 'Rule 6(1)(da)',
      severity: 'HIGH',
      status: 'POTENTIAL_VIOLATION',
      description: 'Consumer care contact details (telephone number, email, or physical postal address) were not identified.',
      detectedSnippet: ccValue || 'None',
      recommendation: 'Check back label or side panel for customer grievance officer / helpline.'
    });
  } else {
    const hasPhoneOrEmail = /(\d{3,5}[-\s]?\d{6,8}|1800[-\s]?\d{3}[-\s]?\d{3,4}|@|email|toll\s*free)/i.test(ccValue);
    if (!hasPhoneOrEmail) {
      ccStatus = 'REVIEW';
      ccConfidence = 74;
      issues.push({
        id: 'ISSUE-CC-02',
        title: 'Consumer Care Helpline Incomplete',
        ruleRef: 'Rule 6(1)(da)',
        severity: 'MEDIUM',
        status: 'REVIEW',
        description: 'Customer care mention found, but phone helpline or email ID could not be fully resolved.',
        detectedSnippet: ccValue,
        recommendation: 'Requires Manual Verification: Confirm if official consumer contact details are legible.'
      });
    }
  }

  declarations.push({
    id: 'decl-cc',
    name: 'Consumer Care Helpline & Contact',
    ruleRef: 'Rule 6(1)(da)',
    extractedValue: ccDetected ? ccValue : 'Not Detected',
    detected: ccDetected,
    status: ccStatus,
    confidence: ccConfidence,
    notes: 'Name, address, telephone number, and email of person or office to contact for consumer complaints.',
    bbox: { x: 12, y: 65, width: 75, height: 10, label: 'Consumer Care' }
  });

  // 7. Country of Origin (for imported commodities / general compliance)
  const originValue = (raw.countryOfOrigin || '').trim();
  const originDetected = originValue.length > 2 && !/not detected|missing/i.test(originValue);
  declarations.push({
    id: 'decl-origin',
    name: 'Country of Origin',
    ruleRef: 'Rule 6(10) / Advisory',
    extractedValue: originDetected ? originValue : 'India (or Not explicitly declared)',
    detected: originDetected || true, // often inferred or domestic
    status: originDetected ? 'PASS' : 'REVIEW',
    confidence: originDetected ? 90 : 65,
    notes: 'Mandatory for imported goods; highly recommended for domestic goods.',
    bbox: { x: 12, y: 78, width: 40, height: 6, label: 'Country of Origin' }
  });

  // Readability Analysis
  const qualityScore = raw.imageQualityScore !== undefined ? raw.imageQualityScore : 82;
  const smallestFontMm = raw.estimatedSmallestFontMm || (qualityScore > 75 ? 1.8 : 0.9);
  const overallClarity: 'GOOD' | 'ACCEPTABLE' | 'POOR' =
    qualityScore >= 80 ? 'GOOD' : qualityScore >= 60 ? 'ACCEPTABLE' : 'POOR';

  let readabilityAssessment = 'Primary declarations appear sufficiently clear and distinguishable against background contrast.';
  if (overallClarity === 'POOR') {
    readabilityAssessment = 'Image resolution or illumination appears degraded. Certain fine-print declarations may require physical re-examination.';
    issues.push({
      id: 'ISSUE-READ-01',
      title: 'Estimated Low Readability / Fine Print Warning',
      ruleRef: 'Rule 9',
      severity: 'LOW',
      status: 'REVIEW',
      description: 'Estimated text height appears close to or below minimum statutory thresholds (Rule 9 Table), or image contrast is low.',
      recommendation: 'Estimated text size/readability from image – manual verification recommended where physical measurement is required.'
    });
  }

  const readability: ReadabilityAnalysis = {
    overallClarity,
    dpiEstimation: qualityScore >= 80 ? 'Approx. 300+ DPI (High)' : 'Approx. 150-200 DPI (Moderate)',
    contrastScore: qualityScore,
    estimatedTextHeightMm: `~${smallestFontMm.toFixed(1)} mm (estimated)`,
    readabilityAssessment,
    disclaimer: 'Estimated text size/readability from image – manual verification recommended where physical measurement is required.'
  };

  // Score Calculation
  const passedCount = declarations.filter(d => d.status === 'PASS').length;
  const violationCount = declarations.filter(d => d.status === 'POTENTIAL_VIOLATION').length;
  const reviewCount = declarations.filter(d => d.status === 'REVIEW').length;

  const totalMandatory = 6; // core items
  const presentMandatory = declarations.slice(0, 6).filter(d => d.detected).length;
  const declarationPresence = Math.round((presentMandatory / totalMandatory) * 100);

  const validItems = declarations.filter(d => d.status === 'PASS').length;
  const dataValidity = Math.round((validItems / declarations.length) * 100);

  const readabilityScore = qualityScore;
  const formattingScore = Math.max(20, Math.round(100 - (violationCount * 25) - (reviewCount * 10)));

  const overallPercentage = Math.round(
    (declarationPresence * 0.45) +
    (dataValidity * 0.25) +
    (readabilityScore * 0.15) +
    (formattingScore * 0.15)
  );

  const scores: ScoreBreakdown = {
    overallPercentage: Math.min(100, Math.max(10, overallPercentage)),
    declarationPresence,
    dataValidity,
    readability: readabilityScore,
    formatting: formattingScore
  };

  // Determine Overall Status
  let overallStatus: OverallComplianceStatus = 'COMPLIANT';
  if (violationCount > 0 || issues.some(i => i.status === 'POTENTIAL_VIOLATION')) {
    overallStatus = 'POTENTIAL_NON_COMPLIANCE';
  } else if (reviewCount > 0 || issues.some(i => i.status === 'REVIEW') || overallClarity === 'POOR') {
    overallStatus = 'REVIEW';
  }

  return {
    declarations,
    issues,
    readability,
    scores,
    overallStatus
  };
}
