import { DatepickerOptions, DatepickerInstance } from '../types';
export declare class Datepicker implements DatepickerInstance {
    private container;
    private options;
    private selectedDate;
    private currentDate;
    private isVisible;
    private element;
    constructor(container: HTMLElement, options?: DatepickerOptions);
    private getDefaultOptions;
    private init;
    private render;
    private generateHTML;
    private generateYearOptions;
    private generateDaysHTML;
    private attachEventListeners;
    private navigateMonth;
    private navigateYear;
    private selectDate;
    private update;
    getSelectedDate(): Date | null;
    setSelectedDate(date: Date | null): void;
    getOptions(): DatepickerOptions;
    updateOptions(options: Partial<DatepickerOptions>): void;
    show(): void;
    hide(): void;
    navigateTo(date: Date): void;
    destroy(): void;
}
//# sourceMappingURL=datepicker.d.ts.map