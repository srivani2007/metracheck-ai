/**
 * Demo seed data and pre-calibrated sample packages for SIH jury demonstration
 */

import { InspectionRecord, LegalRuleReference } from '../types';

// Crisp synthetic SVG labels for reliable offline/fallback demo scans
export const DEMO_IMAGE_COMPLIANT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" style="background:#ffffff; font-family:sans-serif;">
  <rect width="600" height="750" fill="#fcfcfc" stroke="#e2e8f0" stroke-width="4"/>
  <rect x="25" y="25" width="550" height="110" rx="8" fill="#1e3a8a"/>
  <text x="300" y="65" fill="#f8fafc" font-size="24" font-weight="bold" text-anchor="middle">ANANDA HERBAL TEA INFUSION</text>
  <text x="300" y="95" fill="#93c5fd" font-size="14" text-anchor="middle">100% Pure Organic CTC Leaf & Herbal Blend</text>
  
  <rect x="30" y="155" width="540" height="42" fill="#eff6ff" rx="6" stroke="#bfdbfe"/>
  <text x="45" y="182" fill="#1e40af" font-size="15" font-weight="bold">GENERIC NAME: PRE-PACKED ORGANIC TEA LEAF</text>
  
  <g transform="translate(30, 215)">
    <rect width="540" height="85" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">MANUFACTURED & PACKED BY:</text>
    <text x="15" y="48" fill="#0f172a" font-size="14" font-weight="600">Ananda Agro Foods Pvt. Ltd.</text>
    <text x="15" y="68" fill="#334155" font-size="13">Plot 42, Industrial Area, Okhla Phase-III, New Delhi - 110020, India</text>
  </g>

  <g transform="translate(30, 315)">
    <rect width="260" height="90" fill="#f8fafc" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">NET QUANTITY:</text>
    <text x="15" y="58" fill="#0f172a" font-size="22" font-weight="bold">500 g</text>
    <text x="15" y="78" fill="#64748b" font-size="11">Standard Unit as per Rule 12</text>
  </g>

  <g transform="translate(310, 315)">
    <rect width="260" height="90" fill="#f8fafc" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">MAX. RETAIL PRICE (MRP):</text>
    <text x="15" y="58" fill="#0f172a" font-size="22" font-weight="bold">₹ 240.00</text>
    <text x="15" y="78" fill="#166534" font-size="12" font-weight="600">(Inclusive of all taxes)</text>
  </g>

  <g transform="translate(30, 420)">
    <rect width="260" height="85" fill="#f8fafc" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">MONTH & YEAR OF PACKING:</text>
    <text x="15" y="54" fill="#0f172a" font-size="18" font-weight="bold">08 / 2026</text>
    <text x="15" y="72" fill="#64748b" font-size="11">Batch No: AN-8941</text>
  </g>

  <g transform="translate(310, 420)">
    <rect width="260" height="85" fill="#f8fafc" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">COUNTRY OF ORIGIN:</text>
    <text x="15" y="54" fill="#0f172a" font-size="18" font-weight="bold">INDIA</text>
    <text x="15" y="72" fill="#64748b" font-size="11">Made in India</text>
  </g>

  <g transform="translate(30, 520)">
    <rect width="540" height="85" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="26" fill="#475569" font-size="12" font-weight="bold">CONSUMER CARE & GRIEVANCE CELL:</text>
    <text x="15" y="48" fill="#0f172a" font-size="13" font-weight="600">Toll Free: 1800-202-9988 | Email: customercare@anandaagro.in</text>
    <text x="15" y="68" fill="#64748b" font-size="12">Consumer Grievance Officer, Ananda Agro Foods, Plot 42 Okhla, New Delhi</text>
  </g>

  <rect x="30" y="620" width="540" height="50" fill="#f1f5f9" rx="6"/>
  <text x="300" y="650" fill="#64748b" font-size="12" text-anchor="middle">Complies with Legal Metrology (Packaged Commodities) Rules, 2011</text>
</svg>
`)}`;

export const DEMO_IMAGE_VIOLATION = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" style="background:#ffffff; font-family:sans-serif;">
  <rect width="600" height="750" fill="#fffdfa" stroke="#fecaca" stroke-width="4"/>
  <rect x="25" y="25" width="550" height="110" rx="8" fill="#991b1b"/>
  <text x="300" y="65" fill="#ffffff" font-size="24" font-weight="bold" text-anchor="middle">CRUNCHY BITES BUTTER COOKIES</text>
  <text x="300" y="95" fill="#fecaca" font-size="14" text-anchor="middle">Rich Bakery Fresh Quality</text>
  
  <rect x="30" y="155" width="540" height="42" fill="#fff1f2" rx="6" stroke="#fecdd3"/>
  <text x="45" y="182" fill="#9f1239" font-size="15" font-weight="bold">GENERIC: BISCUITS & BAKERY PRODUCT</text>
  
  <g transform="translate(30, 215)">
    <rect width="540" height="85" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">MANUFACTURED BY:</text>
    <text x="15" y="48" fill="#0f172a" font-size="14" font-weight="600">Royal Bakers (Regd)</text>
    <text x="15" y="68" fill="#334155" font-size="13">Sector 18, Industrial Area, Gurgaon, Haryana</text>
  </g>

  <g transform="translate(30, 315)">
    <rect width="260" height="90" fill="#fef2f2" stroke="#f87171" stroke-dasharray="4" rx="6"/>
    <text x="15" y="28" fill="#991b1b" font-size="12" font-weight="bold">NET QUANTITY (VIOLATION):</text>
    <text x="15" y="58" fill="#b91c1c" font-size="20" font-weight="bold">approx 300g</text>
    <text x="15" y="78" fill="#ef4444" font-size="11">Violation: Misleading prefix "approx"</text>
  </g>

  <g transform="translate(310, 315)">
    <rect width="260" height="90" fill="#fef2f2" stroke="#f87171" stroke-dasharray="4" rx="6"/>
    <text x="15" y="28" fill="#991b1b" font-size="12" font-weight="bold">MRP DECLARATION:</text>
    <text x="15" y="58" fill="#b91c1c" font-size="22" font-weight="bold">MRP 65/-</text>
    <text x="15" y="78" fill="#ef4444" font-size="11">Violation: Missing "incl. of all taxes"</text>
  </g>

  <g transform="translate(30, 420)">
    <rect width="540" height="70" fill="#fef2f2" stroke="#f87171" stroke-dasharray="4" rx="6"/>
    <text x="15" y="28" fill="#991b1b" font-size="13" font-weight="bold">MONTH & YEAR OF PACKING:</text>
    <text x="15" y="50" fill="#dc2626" font-size="14" font-weight="bold">[DECLARATION MISSING ON PACKAGING]</text>
  </g>

  <g transform="translate(30, 510)">
    <rect width="540" height="85" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="26" fill="#475569" font-size="12" font-weight="bold">CUSTOMER CARE:</text>
    <text x="15" y="48" fill="#0f172a" font-size="13" font-weight="600">Helpline: 0124-4221199 | care@royalbakers.in</text>
    <text x="15" y="68" fill="#64748b" font-size="12">Customer Feedback Desk, Gurgaon, Haryana</text>
  </g>

  <rect x="30" y="615" width="540" height="50" fill="#fff1f2" rx="6" stroke="#fecdd3"/>
  <text x="300" y="645" fill="#be123c" font-size="12" font-weight="bold" text-anchor="middle">Non-Compliance Flagged under Rule 6(1)(d), 6(1)(e) & Rule 11(1)</text>
</svg>
`)}`;

export const DEMO_IMAGE_REVIEW = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" style="background:#ffffff; font-family:sans-serif; filter: blur(0.5px);">
  <rect width="600" height="750" fill="#fefce8" stroke="#fde047" stroke-width="4"/>
  <rect x="25" y="25" width="550" height="110" rx="8" fill="#854d0e"/>
  <text x="300" y="65" fill="#ffffff" font-size="24" font-weight="bold" text-anchor="middle">VEDIC PRASH HERBAL JAM</text>
  <text x="300" y="95" fill="#fef08a" font-size="14" text-anchor="middle">Traditional Ayurvedic Formulation</text>
  
  <rect x="30" y="155" width="540" height="42" fill="#fef9c3" rx="6" stroke="#fde047"/>
  <text x="45" y="182" fill="#713f12" font-size="15" font-weight="bold">GENERIC: AYURVEDIC HEALTH SUPPLEMENT</text>
  
  <g transform="translate(30, 215)">
    <rect width="540" height="85" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">MFG DETAILS:</text>
    <text x="15" y="48" fill="#0f172a" font-size="14" font-weight="600">Vedic Botanics India</text>
    <text x="15" y="68" fill="#64748b" font-size="12">[Address print slightly faded around pincode area - Review Needed]</text>
  </g>

  <g transform="translate(30, 315)">
    <rect width="260" height="90" fill="#fefce8" stroke="#eab308" stroke-dasharray="3" rx="6"/>
    <text x="15" y="28" fill="#854d0e" font-size="12" font-weight="bold">NET QUANTITY:</text>
    <text x="15" y="58" fill="#713f12" font-size="20" font-weight="bold">1 kg / 950g?</text>
    <text x="15" y="78" fill="#a16207" font-size="11">Print partially rubbed off on bottle fold</text>
  </g>

  <g transform="translate(310, 315)">
    <rect width="260" height="90" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">MRP:</text>
    <text x="15" y="58" fill="#0f172a" font-size="22" font-weight="bold">₹ 395.00</text>
    <text x="15" y="78" fill="#475569" font-size="11">Incl. of all taxes</text>
  </g>

  <g transform="translate(30, 420)">
    <rect width="260" height="85" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="15" y="28" fill="#475569" font-size="12" font-weight="bold">PKD DATE:</text>
    <text x="15" y="54" fill="#0f172a" font-size="18" font-weight="bold">07/2026</text>
    <text x="15" y="72" fill="#64748b" font-size="11">Batch VP-401</text>
  </g>

  <g transform="translate(310, 420)">
    <rect width="260" height="85" fill="#fefce8" stroke="#eab308" stroke-dasharray="3" rx="6"/>
    <text x="15" y="28" fill="#854d0e" font-size="12" font-weight="bold">CONSUMER HELPLINE:</text>
    <text x="15" y="50" fill="#713f12" font-size="13">011-289XXXXX</text>
    <text x="15" y="70" fill="#a16207" font-size="11">Last 4 digits illegible in current photo</text>
  </g>

  <rect x="30" y="525" width="540" height="60" fill="#fef9c3" rx="6" stroke="#fde047"/>
  <text x="300" y="555" fill="#854d0e" font-size="12" font-weight="bold" text-anchor="middle">Physical Verification Recommended: Net quantity imprint & Consumer line</text>
  <text x="300" y="572" fill="#a16207" font-size="11" text-anchor="middle">Low image contrast detected on curved bottle surface</text>
</svg>
`)}`;

export const SAMPLE_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'INS-2026-001',
    timestamp: '2026-09-05T08:30:00Z',
    productName: 'Ananda Herbal Tea Infusion',
    brand: 'Ananda Agro Foods',
    category: 'Packaged Foods & Beverages',
    batchLotNo: 'AN-8941',
    labelType: 'Principal Display Panel',
    imageDataUrl: DEMO_IMAGE_COMPLIANT,
    overallStatus: 'COMPLIANT',
    inspectorName: 'Insp. Rajesh Sharma',
    inspectorBadge: 'LMD-DL-4091',
    location: 'Connaught Place Market, New Delhi',
    isDemo: true,
    officerDecision: 'VERIFIED_COMPLIANT',
    officerNotes: 'All 7 statutory declarations under Legal Metrology Rules, 2011 verified on packaging.',
    scores: {
      overallPercentage: 96,
      declarationPresence: 100,
      dataValidity: 100,
      readability: 92,
      formatting: 95
    },
    readability: {
      overallClarity: 'GOOD',
      dpiEstimation: '320 DPI (High Resolution)',
      contrastScore: 92,
      estimatedTextHeightMm: '2.4 mm (Statutory compliance met)',
      readabilityAssessment: 'All mandatory text clearly contrasts against background. Font size exceeds minimum Rule 9 threshold.',
      disclaimer: 'Estimated text size/readability from image – manual verification recommended where physical measurement is required.'
    },
    declarations: [
      {
        id: 'decl-mfg',
        name: 'Manufacturer / Packer / Importer',
        ruleRef: 'Rule 6(1)(a)',
        extractedValue: 'Ananda Agro Foods Pvt. Ltd., Plot 42, Industrial Area, Okhla Phase-III, New Delhi - 110020',
        detected: true,
        status: 'PASS',
        confidence: 96,
        notes: 'Full legal name and complete postal address detected with PIN code.',
        bbox: { x: 5, y: 28, width: 90, height: 12, label: 'Manufacturer' }
      },
      {
        id: 'decl-generic',
        name: 'Common / Generic Name of Commodity',
        ruleRef: 'Rule 6(1)(b)',
        extractedValue: 'Pre-Packed Organic Tea Leaf',
        detected: true,
        status: 'PASS',
        confidence: 94,
        notes: 'Unambiguous commodity designation present.',
        bbox: { x: 5, y: 20, width: 90, height: 6, label: 'Generic Name' }
      },
      {
        id: 'decl-netqty',
        name: 'Net Quantity (Standard Units)',
        ruleRef: 'Rule 6(1)(c)',
        extractedValue: '500 g',
        detected: true,
        status: 'PASS',
        confidence: 98,
        notes: 'Complies with standard SI units (g). No unauthorized prefixes.',
        bbox: { x: 5, y: 42, width: 43, height: 12, label: 'Net Quantity' }
      },
      {
        id: 'decl-mrp',
        name: 'Maximum Retail Price (MRP)',
        ruleRef: 'Rule 6(1)(e)',
        extractedValue: '₹ 240.00 (Inclusive of all taxes)',
        detected: true,
        status: 'PASS',
        confidence: 97,
        notes: 'Standard currency notation ₹ and "Inclusive of all taxes" explicitly stated.',
        bbox: { x: 52, y: 42, width: 43, height: 12, label: 'MRP Panel' }
      },
      {
        id: 'decl-date',
        name: 'Month & Year of Packing / Manufacture',
        ruleRef: 'Rule 6(1)(d)',
        extractedValue: '08 / 2026',
        detected: true,
        status: 'PASS',
        confidence: 95,
        notes: 'Valid MM/YYYY format identifying pre-packing month.',
        bbox: { x: 5, y: 56, width: 43, height: 11, label: 'Packing Date' }
      },
      {
        id: 'decl-cc',
        name: 'Consumer Care Helpline & Contact',
        ruleRef: 'Rule 6(1)(da)',
        extractedValue: '1800-202-9988 | customercare@anandaagro.in',
        detected: true,
        status: 'PASS',
        confidence: 92,
        notes: 'Toll-free number and registered email address provided.',
        bbox: { x: 5, y: 69, width: 90, height: 11, label: 'Customer Care' }
      },
      {
        id: 'decl-origin',
        name: 'Country of Origin',
        ruleRef: 'Rule 6(10)',
        extractedValue: 'INDIA',
        detected: true,
        status: 'PASS',
        confidence: 96,
        notes: 'Country of origin declared clearly.',
        bbox: { x: 52, y: 56, width: 43, height: 11, label: 'Origin' }
      }
    ],
    issues: []
  },
  {
    id: 'INS-2026-002',
    timestamp: '2026-09-04T14:15:00Z',
    productName: 'Crunchy Bites Butter Cookies',
    brand: 'Royal Bakers',
    category: 'Bakery & Confectionery',
    batchLotNo: 'RB-092',
    labelType: 'Principal Display Panel',
    imageDataUrl: DEMO_IMAGE_VIOLATION,
    overallStatus: 'POTENTIAL_NON_COMPLIANCE',
    inspectorName: 'Insp. Rajesh Sharma',
    inspectorBadge: 'LMD-DL-4091',
    location: 'Karol Bagh Retail Supermarket, Delhi',
    isDemo: true,
    officerDecision: 'NOTICE_ISSUED',
    officerNotes: 'Statutory Notice issued under Rule 32 of Legal Metrology (Packaged Commodities) Rules, 2011 for missing packing date and illegal "approx." prefix.',
    scores: {
      overallPercentage: 58,
      declarationPresence: 66,
      dataValidity: 50,
      readability: 75,
      formatting: 40
    },
    readability: {
      overallClarity: 'ACCEPTABLE',
      dpiEstimation: '220 DPI',
      contrastScore: 78,
      estimatedTextHeightMm: '1.6 mm',
      readabilityAssessment: 'Text is visible, but key mandatory declarations are either missing or formatted in violation of rules.',
      disclaimer: 'Estimated text size/readability from image – manual verification recommended where physical measurement is required.'
    },
    declarations: [
      {
        id: 'decl-mfg',
        name: 'Manufacturer / Packer / Importer',
        ruleRef: 'Rule 6(1)(a)',
        extractedValue: 'Royal Bakers (Regd), Sector 18, Industrial Area, Gurgaon, Haryana',
        detected: true,
        status: 'PASS',
        confidence: 91,
        notes: 'Manufacturer name and city present.',
        bbox: { x: 5, y: 28, width: 90, height: 12 }
      },
      {
        id: 'decl-generic',
        name: 'Common / Generic Name of Commodity',
        ruleRef: 'Rule 6(1)(b)',
        extractedValue: 'Biscuits & Bakery Product',
        detected: true,
        status: 'PASS',
        confidence: 90,
        bbox: { x: 5, y: 20, width: 90, height: 6 }
      },
      {
        id: 'decl-netqty',
        name: 'Net Quantity (Standard Units)',
        ruleRef: 'Rule 6(1)(c)',
        extractedValue: 'approx 300g',
        detected: true,
        status: 'POTENTIAL_VIOLATION',
        confidence: 94,
        notes: 'Violation: Prohibited qualifying expression "approx".',
        bbox: { x: 5, y: 42, width: 43, height: 12 }
      },
      {
        id: 'decl-mrp',
        name: 'Maximum Retail Price (MRP)',
        ruleRef: 'Rule 6(1)(e)',
        extractedValue: 'MRP 65/-',
        detected: true,
        status: 'POTENTIAL_VIOLATION',
        confidence: 88,
        notes: 'Missing mandatory "inclusive of all taxes" statement.',
        bbox: { x: 52, y: 42, width: 43, height: 12 }
      },
      {
        id: 'decl-date',
        name: 'Month & Year of Packing / Manufacture',
        ruleRef: 'Rule 6(1)(d)',
        extractedValue: 'Not Detected on supplied label',
        detected: false,
        status: 'POTENTIAL_VIOLATION',
        confidence: 20,
        notes: 'Mandatory packing date completely missing.',
        bbox: { x: 5, y: 56, width: 90, height: 10 }
      },
      {
        id: 'decl-cc',
        name: 'Consumer Care Helpline & Contact',
        ruleRef: 'Rule 6(1)(da)',
        extractedValue: '0124-4221199 | care@royalbakers.in',
        detected: true,
        status: 'PASS',
        confidence: 89,
        bbox: { x: 5, y: 68, width: 90, height: 11 }
      }
    ],
    issues: [
      {
        id: 'ISSUE-DATE-01',
        title: 'Packing Date Declaration Missing',
        ruleRef: 'Rule 6(1)(d)',
        severity: 'HIGH',
        status: 'POTENTIAL_VIOLATION',
        description: 'Required declaration of month and year of pre-packing could not be identified from the supplied packaging image.',
        detectedSnippet: 'None',
        recommendation: 'Statutory non-compliance. Inspect physical carton fold or crimp; if not found, lodge violation under Section 36.'
      },
      {
        id: 'ISSUE-NETQTY-02',
        title: 'Misleading "approx." Qualifier on Net Quantity',
        ruleRef: 'Rule 11(1)',
        severity: 'HIGH',
        status: 'POTENTIAL_VIOLATION',
        description: 'Word "approx" printed with net quantity. Under Rule 11, qualifying expressions like "approximate" or "when packed" are strictly prohibited.',
        detectedSnippet: 'approx 300g',
        recommendation: 'Issue notice for misleading quantity representation.'
      },
      {
        id: 'ISSUE-MRP-02',
        title: 'Missing "Inclusive of all taxes" Declaration',
        ruleRef: 'Rule 6(1)(e)',
        severity: 'MEDIUM',
        status: 'POTENTIAL_VIOLATION',
        description: 'Maximum Retail Price printed as "MRP 65/-" without the required wording "incl. of all taxes" or "inclusive of all taxes".',
        detectedSnippet: 'MRP 65/-',
        recommendation: 'Official notice to manufacturer to rectify price stamping wording.'
      }
    ]
  },
  {
    id: 'INS-2026-003',
    timestamp: '2026-09-03T11:00:00Z',
    productName: 'Vedic Prash Herbal Jam',
    brand: 'Vedic Botanics India',
    category: 'Ayurvedic & Health Supplements',
    batchLotNo: 'VP-401',
    labelType: 'Principal Display Panel',
    imageDataUrl: DEMO_IMAGE_REVIEW,
    overallStatus: 'REVIEW',
    inspectorName: 'Insp. Rajesh Sharma',
    inspectorBadge: 'LMD-DL-4091',
    location: 'Lajpat Nagar Central Market, Delhi',
    isDemo: true,
    officerDecision: 'RE_INSPECT',
    officerNotes: 'Requested physical sample inspection due to blurred printing on curved bottle container.',
    scores: {
      overallPercentage: 74,
      declarationPresence: 83,
      dataValidity: 70,
      readability: 58,
      formatting: 75
    },
    readability: {
      overallClarity: 'POOR',
      dpiEstimation: '140 DPI (Surface Glare & Blur)',
      contrastScore: 58,
      estimatedTextHeightMm: '~1.1 mm (Near statutory threshold)',
      readabilityAssessment: 'Curved glass/bottle surface has specular glare. Net quantity print and customer care phone number are partially smeared.',
      disclaimer: 'Estimated text size/readability from image – manual verification recommended where physical measurement is required.'
    },
    declarations: [
      {
        id: 'decl-mfg',
        name: 'Manufacturer / Packer / Importer',
        ruleRef: 'Rule 6(1)(a)',
        extractedValue: 'Vedic Botanics India (Address partially truncated near pincode)',
        detected: true,
        status: 'REVIEW',
        confidence: 76,
        notes: 'Name detected, but postal code unclear due to surface curve.'
      },
      {
        id: 'decl-generic',
        name: 'Common / Generic Name of Commodity',
        ruleRef: 'Rule 6(1)(b)',
        extractedValue: 'Ayurvedic Health Supplement',
        detected: true,
        status: 'PASS',
        confidence: 91
      },
      {
        id: 'decl-netqty',
        name: 'Net Quantity (Standard Units)',
        ruleRef: 'Rule 6(1)(c)',
        extractedValue: '1 kg / 950g? (Unclear print)',
        detected: true,
        status: 'REVIEW',
        confidence: 64,
        notes: 'Ink smeared on bottle curvature.'
      },
      {
        id: 'decl-mrp',
        name: 'Maximum Retail Price (MRP)',
        ruleRef: 'Rule 6(1)(e)',
        extractedValue: '₹ 395.00 Incl. of all taxes',
        detected: true,
        status: 'PASS',
        confidence: 93
      },
      {
        id: 'decl-date',
        name: 'Month & Year of Packing / Manufacture',
        ruleRef: 'Rule 6(1)(d)',
        extractedValue: '07 / 2026',
        detected: true,
        status: 'PASS',
        confidence: 88
      },
      {
        id: 'decl-cc',
        name: 'Consumer Care Helpline & Contact',
        ruleRef: 'Rule 6(1)(da)',
        extractedValue: '011-289XXXXX (Last digits obscured)',
        detected: true,
        status: 'REVIEW',
        confidence: 58,
        notes: 'Helpline telephone number incomplete in photo.'
      }
    ],
    issues: [
      {
        id: 'ISSUE-REV-01',
        title: 'Net Quantity Legibility Ambiguity',
        ruleRef: 'Rule 6(1)(c) & Rule 9',
        severity: 'MEDIUM',
        status: 'REVIEW',
        description: 'Net quantity stamping on container curvature is degraded by ink smearing. Could be either 1kg or 950g.',
        detectedSnippet: '1 kg / 950g?',
        recommendation: 'Requires Manual Verification: Officer must inspect physical jar under direct magnification to confirm declare weight.'
      },
      {
        id: 'ISSUE-REV-02',
        title: 'Consumer Helpline Digits Obscured',
        ruleRef: 'Rule 6(1)(da)',
        severity: 'LOW',
        status: 'REVIEW',
        description: 'Consumer telephone digits appear truncated or blurry in current capture.',
        detectedSnippet: '011-289XXXXX',
        recommendation: 'Requires Manual Verification: Officer to verify complete 10-digit number on actual package.'
      }
    ]
  }
];

export const LEGAL_RULES_REFERENCE: LegalRuleReference[] = [
  {
    id: 'rule-6-1-a',
    title: 'Manufacturer / Packer / Importer Details',
    ruleSection: 'Rule 6(1)(a)',
    category: 'Mandatory Declaration Presence',
    summary: 'Every package shall bear the name and complete address of the manufacturer, or where manufacturer is not packer, name and address of manufacturer and packer, or for imported goods, name and address of importer.',
    mandatoryFields: ['Name of enterprise', 'Complete postal address', 'City, State, PIN code'],
    penaltyProvision: 'Section 36(1) of Legal Metrology Act, 2009 (Fine up to ₹25,000 for first offence, ₹50,000 for second)'
  },
  {
    id: 'rule-6-1-b',
    title: 'Generic or Common Name of Commodity',
    ruleSection: 'Rule 6(1)(b)',
    category: 'Product Identification',
    summary: 'The common or generic names of the commodity contained in the package and in case of packages with more than one product, the name and quantity of each product shall be mentioned.',
    mandatoryFields: ['Common or generic designation', 'Multi-item itemized list if combo pack'],
    penaltyProvision: 'Rule 32 / Section 36(1)'
  },
  {
    id: 'rule-6-1-c',
    title: 'Net Quantity in Standard Units',
    ruleSection: 'Rule 6(1)(c) & Rule 12',
    category: 'Metrological Quantities',
    summary: 'Net quantity in terms of standard unit of weight or measure of the commodity (or number of commodities if sold by number). Prohibits words such as "approximate", "approx.", "when packed", or symbols not recognized in the First Schedule.',
    mandatoryFields: ['Standard SI unit (g, kg, ml, l, pcs)', 'Strict numeric value without misleading prefixes'],
    penaltyProvision: 'Section 36(2) for short weight / deceptive packaging (Imprisonment up to 1 year or fine)'
  },
  {
    id: 'rule-6-1-d',
    title: 'Month and Year of Manufacture / Packing',
    ruleSection: 'Rule 6(1)(d)',
    category: 'Temporal Declarations',
    summary: 'The month and year in which the commodity is manufactured or pre-packed or imported shall be declared, except for packages containing commodities with no shelf life or where exempted by specific notification.',
    mandatoryFields: ['Month (words or digits 01-12)', 'Year (e.g. 2026 or 26)'],
    penaltyProvision: 'Rule 32 / Section 36'
  },
  {
    id: 'rule-6-1-e',
    title: 'Maximum Retail Price (MRP)',
    ruleSection: 'Rule 6(1)(e)',
    category: 'Pricing & Consumer Protection',
    summary: 'The retail sale price of the package shall be declared in the form of "Maximum or Max. Retail Price ... inclusive of all taxes" or "MRP ₹ ... incl. of all taxes". Smudging, overwriting, or dual-pricing is punishable under law.',
    mandatoryFields: ['₹ symbol or Rs.', 'Price figure', 'Explicit "inclusive of all taxes" text'],
    penaltyProvision: 'Section 36(1) & (2); selling above MRP carries prosecution under Section 36'
  },
  {
    id: 'rule-6-1-da',
    title: 'Consumer Care & Grievance Contact',
    ruleSection: 'Rule 6(1)(da)',
    category: 'Consumer Redressal',
    summary: 'Name, address, telephone number, and e-mail address of the person or the office who can be contacted in case of consumer complaints shall be clearly declared.',
    mandatoryFields: ['Designation or name', 'Address or contact location', 'Phone / Helpline number', 'Email ID'],
    penaltyProvision: 'Rule 32'
  },
  {
    id: 'rule-9',
    title: 'Manner & Prominence of Declarations',
    ruleSection: 'Rule 9',
    category: 'Readability & Minimum Font Height',
    summary: 'All declarations shall be conspicuous, legible and in definite contrast to the background. Prescribes minimum height of letters based on the Principal Display Panel (PDP) area (e.g., 1.0mm for ≤50cm², 1.5mm for 50-100cm², 2.0mm for 100-500cm², 4.0mm for 500-2500cm²).',
    mandatoryFields: ['Minimum font height adherence', 'High contrast against background', 'Unobstructed placement'],
    penaltyProvision: 'Rule 32'
  }
];
