/**
 * Utility functions for date manipulation and formatting
 */

export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('M', month.toString())
    .replace('D', day.toString());
}

export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

export function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth();
}

export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;
  return true;
}

export function getMonthDays(year: number, month: number): Date[] {
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];
  
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
}

export function getCalendarGrid(year: number, month: number): (Date | null)[] {
  const startDate = new Date(year, month, 1);
  
  // Adjust to start from Sunday (0) or Monday (1) based on locale
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const grid: (Date | null)[] = [];
  const current = new Date(startDate);
  
  // Fill 6 weeks (42 days) to ensure consistent grid
  for (let i = 0; i < 42; i++) {
    if (current.getMonth() === month) {
      grid.push(new Date(current));
    } else {
      grid.push(null);
    }
    current.setDate(current.getDate() + 1);
  }
  
  return grid;
}

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getMonthNames(locale: string = 'en-US'): string[] {
  const names: string[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2023, i, 1);
    names.push(date.toLocaleDateString(locale, { month: 'long' }));
  }
  return names;
}

export function getDayNames(locale: string = 'en-US'): string[] {
  const names: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(2023, 0, i + 1); // January 1, 2023 was a Sunday
    names.push(date.toLocaleDateString(locale, { weekday: 'short' }));
  }
  return names;
}