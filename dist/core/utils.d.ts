/**
 * Utility functions for date manipulation and formatting
 */
export declare function formatDate(date: Date, format?: string): string;
export declare function parseDate(dateString: string): Date | null;
export declare function isSameDay(date1: Date, date2: Date): boolean;
export declare function isSameMonth(date1: Date, date2: Date): boolean;
export declare function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean;
export declare function getMonthDays(year: number, month: number): Date[];
export declare function getCalendarGrid(year: number, month: number): (Date | null)[];
export declare function getWeekNumber(date: Date): number;
export declare function getMonthNames(locale?: string): string[];
export declare function getDayNames(locale?: string): string[];
//# sourceMappingURL=utils.d.ts.map