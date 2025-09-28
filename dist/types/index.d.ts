export interface DatepickerOptions {
    /** The initial date to display */
    initialDate?: Date | null;
    /** Minimum selectable date */
    minDate?: Date | null;
    /** Maximum selectable date */
    maxDate?: Date | null;
    /** Date format string */
    format?: string;
    /** Locale for internationalization */
    locale?: string;
    /** Whether to show week numbers */
    showWeekNumbers?: boolean;
    /** Whether to highlight today */
    highlightToday?: boolean;
    /** CSS class prefix */
    classPrefix?: string;
    /** Custom theme */
    theme?: 'light' | 'dark' | 'auto';
    /** Whether the datepicker is disabled */
    disabled?: boolean;
    /** Callback when a date is selected */
    onDateSelect?: (date: Date) => void;
    /** Callback when the month changes */
    onMonthChange?: (date: Date) => void;
    /** Callback when the year changes */
    onYearChange?: (date: Date) => void;
}
export interface DatepickerInstance {
    /** Get the currently selected date */
    getSelectedDate(): Date | null;
    /** Set the selected date */
    setSelectedDate(date: Date | null): void;
    /** Get current options */
    getOptions(): DatepickerOptions;
    /** Update options */
    updateOptions(options: Partial<DatepickerOptions>): void;
    /** Show the datepicker */
    show(): void;
    /** Hide the datepicker */
    hide(): void;
    /** Destroy the datepicker instance */
    destroy(): void;
    /** Navigate to a specific month/year */
    navigateTo(date: Date): void;
}
export interface DatepickerAdapter<T = any> {
    /** Create a datepicker instance for the specific framework */
    create(element: T, options?: DatepickerOptions): DatepickerInstance;
}
//# sourceMappingURL=index.d.ts.map