/**
 * Local storage manager for inspection records and officer preferences
 */

import { InspectionRecord } from '../types';
import { SAMPLE_INSPECTIONS } from '../data/demoData';

const STORAGE_KEY = 'metracheck_inspections_v1';
const USER_KEY = 'metracheck_active_user_v1';

export function getStoredInspections(): InspectionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with realistic demo records
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_INSPECTIONS));
      return SAMPLE_INSPECTIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read inspections from storage:', err);
    return SAMPLE_INSPECTIONS;
  }
}

export function saveInspection(record: InspectionRecord): void {
  try {
    const existing = getStoredInspections();
    const index = existing.findIndex(r => r.id === record.id);
    let updated: InspectionRecord[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = record;
    } else {
      updated = [record, ...existing];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save inspection:', err);
  }
}

export function deleteInspection(id: string): void {
  try {
    const existing = getStoredInspections();
    const updated = existing.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete inspection:', err);
  }
}

export function resetToDemoData(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_INSPECTIONS));
  } catch (err) {
    console.error('Failed to reset inspections:', err);
  }
}

export function getActiveUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {}
  return {
    name: 'Insp. Rajesh Sharma',
    badge: 'LMD-DL-4091',
    designation: 'Senior Legal Metrology Officer',
    department: 'Department of Consumer Affairs, Legal Metrology Wing',
    jurisdiction: 'Zone 4, New Delhi Central',
    email: 'r.sharma@lmd.gov.in',
    phone: '+91 98110 44921'
  };
}
