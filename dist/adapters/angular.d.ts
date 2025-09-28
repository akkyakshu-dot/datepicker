import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
/**
 * Angular adapter for the universal datepicker
 */
export declare class AngularDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Angular Directive factory
 * Usage: Add this to your Angular module and use as <div datepicker [options]="datepickerOptions"></div>
 */
export declare function createAngularDatepickerDirective(): () => {
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
export declare function createAngularDatepickerService(): () => {
    create: (element: HTMLElement, options?: DatepickerOptions) => DatepickerInstance;
};
/**
 * Modern Angular Component (for Angular 2+)
 */
export declare const AngularDatepickerComponent = "\nimport { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';\nimport { DatepickerOptions, DatepickerInstance } from '@akkyakshu/universal-datepicker';\nimport { Datepicker } from '@akkyakshu/universal-datepicker';\n\n@Component({\n  selector: 'universal-datepicker',\n  template: '<div #container></div>',\n  styleUrls: []\n})\nexport class UniversalDatepickerComponent implements OnInit, OnDestroy, OnChanges {\n  @Input() options: DatepickerOptions = {};\n  @Output() dateSelect = new EventEmitter<Date>();\n  @Output() monthChange = new EventEmitter<Date>();\n  @Output() yearChange = new EventEmitter<Date>();\n\n  private datepicker: DatepickerInstance | null = null;\n\n  constructor(private elementRef: ElementRef) {}\n\n  ngOnInit() {\n    this.initDatepicker();\n  }\n\n  ngOnDestroy() {\n    if (this.datepicker) {\n      this.datepicker.destroy();\n    }\n  }\n\n  ngOnChanges(changes: SimpleChanges) {\n    if (changes['options'] && this.datepicker) {\n      this.datepicker.updateOptions(this.options);\n    }\n  }\n\n  private initDatepicker() {\n    const container = this.elementRef.nativeElement.querySelector('div');\n    if (container) {\n      this.datepicker = new Datepicker(container, {\n        ...this.options,\n        onDateSelect: (date: Date) => {\n          this.dateSelect.emit(date);\n          this.options.onDateSelect?.(date);\n        },\n        onMonthChange: (date: Date) => {\n          this.monthChange.emit(date);\n          this.options.onMonthChange?.(date);\n        },\n        onYearChange: (date: Date) => {\n          this.yearChange.emit(date);\n          this.options.onYearChange?.(date);\n        },\n      });\n    }\n  }\n\n  getDatepicker(): DatepickerInstance | null {\n    return this.datepicker;\n  }\n}\n";
export default AngularDatepickerAdapter;
//# sourceMappingURL=angular.d.ts.map