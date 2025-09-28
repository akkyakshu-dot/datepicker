import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
import { Datepicker } from '../core/datepicker';

/**
 * Angular adapter for the universal datepicker
 */
export class AngularDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
  create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance {
    return new Datepicker(element, options);
  }
}

/**
 * Angular Directive factory
 * Usage: Add this to your Angular module and use as <div datepicker [options]="datepickerOptions"></div>
 */
export function createAngularDatepickerDirective() {
  return function DatepickerDirective() {
    return {
      restrict: 'A',
      scope: {
        options: '=?',
        onDateSelect: '&?',
        onMonthChange: '&?',
        onYearChange: '&?',
      },
      link: function (scope: any, element: any) {
        let datepicker: DatepickerInstance | null = null;

        function initDatepicker() {
          if (datepicker) {
            datepicker.destroy();
          }

          const options: DatepickerOptions = {
            ...scope.options,
            onDateSelect: (date: Date) => {
              if (scope.onDateSelect) {
                scope.$apply(() => scope.onDateSelect({ date }));
              }
            },
            onMonthChange: (date: Date) => {
              if (scope.onMonthChange) {
                scope.$apply(() => scope.onMonthChange({ date }));
              }
            },
            onYearChange: (date: Date) => {
              if (scope.onYearChange) {
                scope.$apply(() => scope.onYearChange({ date }));
              }
            },
          };

          datepicker = new Datepicker(element[0], options);
        }

        // Watch for options changes
        scope.$watch('options', initDatepicker, true);

        // Destroy on scope destroy
        scope.$on('$destroy', () => {
          if (datepicker) {
            datepicker.destroy();
          }
        });

        // Initial setup
        initDatepicker();

        // Expose datepicker instance to scope
        scope.datepicker = datepicker;
      },
    };
  };
}

/**
 * Angular Service
 */
export function createAngularDatepickerService() {
  return function DatepickerService() {
    return {
      create: (element: HTMLElement, options?: DatepickerOptions): DatepickerInstance => {
        return new Datepicker(element, options);
      },
    };
  };
}

/**
 * Modern Angular Component (for Angular 2+)
 */
export const AngularDatepickerComponent = `
import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { DatepickerOptions, DatepickerInstance } from '@akkyakshu/universal-datepicker';
import { Datepicker } from '@akkyakshu/universal-datepicker';

@Component({
  selector: 'universal-datepicker',
  template: '<div #container></div>',
  styleUrls: []
})
export class UniversalDatepickerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() options: DatepickerOptions = {};
  @Output() dateSelect = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<Date>();
  @Output() yearChange = new EventEmitter<Date>();

  private datepicker: DatepickerInstance | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initDatepicker();
  }

  ngOnDestroy() {
    if (this.datepicker) {
      this.datepicker.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.datepicker) {
      this.datepicker.updateOptions(this.options);
    }
  }

  private initDatepicker() {
    const container = this.elementRef.nativeElement.querySelector('div');
    if (container) {
      this.datepicker = new Datepicker(container, {
        ...this.options,
        onDateSelect: (date: Date) => {
          this.dateSelect.emit(date);
          this.options.onDateSelect?.(date);
        },
        onMonthChange: (date: Date) => {
          this.monthChange.emit(date);
          this.options.onMonthChange?.(date);
        },
        onYearChange: (date: Date) => {
          this.yearChange.emit(date);
          this.options.onYearChange?.(date);
        },
      });
    }
  }

  getDatepicker(): DatepickerInstance | null {
    return this.datepicker;
  }
}
`;

// Default export for easier imports
export default AngularDatepickerAdapter;