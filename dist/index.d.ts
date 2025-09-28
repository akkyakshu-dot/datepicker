interface DatepickerOptions {
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
interface DatepickerInstance {
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
interface DatepickerAdapter<T = any> {
    /** Create a datepicker instance for the specific framework */
    create(element: T, options?: DatepickerOptions): DatepickerInstance;
}

declare class Datepicker implements DatepickerInstance {
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

/**
 * Utility functions for date manipulation and formatting
 */
declare function formatDate(date: Date, format?: string): string;
declare function parseDate(dateString: string): Date | null;
declare function isSameDay(date1: Date, date2: Date): boolean;
declare function isSameMonth(date1: Date, date2: Date): boolean;
declare function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean;
declare function getMonthDays(year: number, month: number): Date[];
declare function getCalendarGrid(year: number, month: number): (Date | null)[];
declare function getWeekNumber(date: Date): number;
declare function getMonthNames(locale?: string): string[];
declare function getDayNames(locale?: string): string[];

/**
 * Vanilla JavaScript adapter for the universal datepicker
 */
declare class VanillaDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Global factory function for vanilla JavaScript usage
 */
declare function createDatepicker(element: HTMLElement | string, options?: DatepickerOptions): DatepickerInstance;
/**
 * jQuery plugin (if jQuery is available)
 */
declare function initializeJQueryPlugin(): void;
/**
 * Auto-initialization for data attributes
 */
declare function autoInitialize(): void;

/**
 * React adapter for the universal datepicker
 */
declare class ReactDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * React Hook for using the datepicker
 */
declare function useDatepicker$1(options?: DatepickerOptions): {
    containerRef: any;
    datepicker: any;
};
/**
 * Higher-Order Component for React
 */
declare function withDatepicker<P extends object>(WrappedComponent: React.ComponentType<P>): (props: P & {
    datepickerOptions?: DatepickerOptions;
}) => any;

/**
 * Vue adapter for the universal datepicker
 */
declare class VueDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Vue 3 Composition API composable
 */
declare function useDatepicker(options?: DatepickerOptions): {
    containerRef: any;
    datepicker: any;
};
/**
 * Vue 3 Component
 */
declare const VueDatepicker: {
    name: string;
    props: {
        options: {
            type: () => DatepickerOptions;
            default: () => {};
        };
    };
    emits: string[];
    setup(props: {
        options: DatepickerOptions;
    }, { emit }: any): {
        containerRef: any;
        datepicker: any;
    };
    template: string;
};
/**
 * Vue 2 Mixin
 */
declare const VueDatepickerMixin: {
    data(): {
        datepicker: DatepickerInstance | null;
    };
    props: {
        datepickerOptions: {
            type: () => DatepickerOptions;
            default: () => {};
        };
    };
    mounted(): void;
    beforeDestroy(): void;
    watch: {
        datepickerOptions: {
            handler(newOptions: DatepickerOptions): void;
            deep: boolean;
        };
    };
};

/**
 * Angular adapter for the universal datepicker
 */
declare class AngularDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Angular Directive factory
 * Usage: Add this to your Angular module and use as <div datepicker [options]="datepickerOptions"></div>
 */
declare function createAngularDatepickerDirective(): () => {
    restrict: string;
    scope: {
        options: string;
        onDateSelect: string;
        onMonthChange: string;
        onYearChange: string;
    };
    link: (scope: any, element: any) => void;
};
/**
 * Angular Service
 */
declare function createAngularDatepickerService(): () => {
    create: (element: HTMLElement, options?: DatepickerOptions) => DatepickerInstance;
};
/**
 * Modern Angular Component (for Angular 2+)
 */
declare const AngularDatepickerComponent = "\nimport { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';\nimport { DatepickerOptions, DatepickerInstance } from '@akkyakshu/universal-datepicker';\nimport { Datepicker } from '@akkyakshu/universal-datepicker';\n\n@Component({\n  selector: 'universal-datepicker',\n  template: '<div #container></div>',\n  styleUrls: []\n})\nexport class UniversalDatepickerComponent implements OnInit, OnDestroy, OnChanges {\n  @Input() options: DatepickerOptions = {};\n  @Output() dateSelect = new EventEmitter<Date>();\n  @Output() monthChange = new EventEmitter<Date>();\n  @Output() yearChange = new EventEmitter<Date>();\n\n  private datepicker: DatepickerInstance | null = null;\n\n  constructor(private elementRef: ElementRef) {}\n\n  ngOnInit() {\n    this.initDatepicker();\n  }\n\n  ngOnDestroy() {\n    if (this.datepicker) {\n      this.datepicker.destroy();\n    }\n  }\n\n  ngOnChanges(changes: SimpleChanges) {\n    if (changes['options'] && this.datepicker) {\n      this.datepicker.updateOptions(this.options);\n    }\n  }\n\n  private initDatepicker() {\n    const container = this.elementRef.nativeElement.querySelector('div');\n    if (container) {\n      this.datepicker = new Datepicker(container, {\n        ...this.options,\n        onDateSelect: (date: Date) => {\n          this.dateSelect.emit(date);\n          this.options.onDateSelect?.(date);\n        },\n        onMonthChange: (date: Date) => {\n          this.monthChange.emit(date);\n          this.options.onMonthChange?.(date);\n        },\n        onYearChange: (date: Date) => {\n          this.yearChange.emit(date);\n          this.options.onYearChange?.(date);\n        },\n      });\n    }\n  }\n\n  getDatepicker(): DatepickerInstance | null {\n    return this.datepicker;\n  }\n}\n";

/**
 * Svelte adapter for the universal datepicker
 */
declare class SvelteDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Svelte Action for use with use:datepicker
 */
declare function datepicker(node: HTMLElement, options?: DatepickerOptions): {
    update: (newOptions: DatepickerOptions) => void;
    destroy: () => void;
};
/**
 * Svelte Store for reactive datepicker state
 */
declare function createDatepickerStore(options?: DatepickerOptions): {
    selectedDate: any;
    currentMonth: any;
    isVisible: any;
    formattedDate: any;
};
/**
 * Svelte Component Template (as string for reference)
 */
declare const SvelteDatepickerComponent = "\n<script>\n  import { datepicker } from '@akkyakshu/universal-datepicker/svelte';\n  import { createEventDispatcher } from 'svelte';\n\n  export let options = {};\n  \n  const dispatch = createEventDispatcher();\n  \n  let container;\n  \n  $: datepickerOptions = {\n    ...options,\n    onDateSelect: (date) => {\n      dispatch('dateSelect', date);\n      options.onDateSelect?.(date);\n    },\n    onMonthChange: (date) => {\n      dispatch('monthChange', date);\n      options.onMonthChange?.(date);\n    },\n    onYearChange: (date) => {\n      dispatch('yearChange', date);\n      options.onYearChange?.(date);\n    },\n  };\n</script>\n\n<div bind:this={container} use:datepicker={datepickerOptions}></div>\n";

export { AngularDatepickerAdapter, AngularDatepickerComponent, Datepicker, ReactDatepickerAdapter, SvelteDatepickerAdapter, SvelteDatepickerComponent, VanillaDatepickerAdapter, VueDatepicker, VueDatepickerAdapter, VueDatepickerMixin, autoInitialize, createAngularDatepickerDirective, createAngularDatepickerService, createDatepicker, createDatepickerStore, formatDate, getCalendarGrid, getDayNames, getMonthDays, getMonthNames, getWeekNumber, initializeJQueryPlugin, isDateInRange, isSameDay, isSameMonth, parseDate, datepicker as svelteAction, useDatepicker$1 as useReactDatepicker, useDatepicker as useVueDatepicker, withDatepicker };
export type { DatepickerAdapter, DatepickerInstance, DatepickerOptions };
