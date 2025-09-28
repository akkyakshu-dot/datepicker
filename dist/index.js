'use strict';

/**
 * Utility functions for date manipulation and formatting
 */
function formatDate(date, format = 'YYYY-MM-DD') {
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
function parseDate(dateString) {
    if (!dateString)
        return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
}
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}
function isSameMonth(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth();
}
function isDateInRange(date, minDate, maxDate) {
    if (minDate && date < minDate)
        return false;
    if (maxDate && date > maxDate)
        return false;
    return true;
}
function getMonthDays(year, month) {
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
        days.push(new Date(year, month, day));
    }
    return days;
}
function getCalendarGrid(year, month) {
    const startDate = new Date(year, month, 1);
    // Adjust to start from Sunday (0) or Monday (1) based on locale
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const grid = [];
    const current = new Date(startDate);
    // Fill 6 weeks (42 days) to ensure consistent grid
    for (let i = 0; i < 42; i++) {
        if (current.getMonth() === month) {
            grid.push(new Date(current));
        }
        else {
            grid.push(null);
        }
        current.setDate(current.getDate() + 1);
    }
    return grid;
}
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
function getMonthNames(locale = 'en-US') {
    const names = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(2023, i, 1);
        names.push(date.toLocaleDateString(locale, { month: 'long' }));
    }
    return names;
}
function getDayNames(locale = 'en-US') {
    const names = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(2023, 0, i + 1); // January 1, 2023 was a Sunday
        names.push(date.toLocaleDateString(locale, { weekday: 'short' }));
    }
    return names;
}

class Datepicker {
    constructor(container, options = {}) {
        this.selectedDate = null;
        this.isVisible = false;
        this.element = null;
        this.container = container;
        this.options = this.getDefaultOptions(options);
        this.currentDate = options.initialDate || new Date();
        this.selectedDate = options.initialDate || null;
        this.init();
    }
    getDefaultOptions(options) {
        return {
            initialDate: options.initialDate || null,
            minDate: options.minDate || null,
            maxDate: options.maxDate || null,
            format: options.format || 'YYYY-MM-DD',
            locale: options.locale || 'en-US',
            showWeekNumbers: options.showWeekNumbers || false,
            highlightToday: options.highlightToday || true,
            classPrefix: options.classPrefix || 'dp',
            theme: options.theme || 'light',
            disabled: options.disabled || false,
            onDateSelect: options.onDateSelect || (() => { }),
            onMonthChange: options.onMonthChange || (() => { }),
            onYearChange: options.onYearChange || (() => { }),
        };
    }
    init() {
        this.render();
        this.attachEventListeners();
    }
    render() {
        const { classPrefix, theme } = this.options;
        this.element = document.createElement('div');
        this.element.className = `${classPrefix}-container ${classPrefix}-theme-${theme}`;
        this.element.innerHTML = this.generateHTML();
        this.container.appendChild(this.element);
        if (!this.isVisible) {
            this.element.style.display = 'none';
        }
    }
    generateHTML() {
        const { classPrefix, locale, showWeekNumbers } = this.options;
        const monthNames = getMonthNames(locale);
        const dayNames = getDayNames(locale);
        const calendarGrid = getCalendarGrid(this.currentDate.getFullYear(), this.currentDate.getMonth());
        const html = `
      <div class="${classPrefix}-header">
        <button class="${classPrefix}-nav-btn ${classPrefix}-prev-year" type="button">&laquo;</button>
        <button class="${classPrefix}-nav-btn ${classPrefix}-prev-month" type="button">&lsaquo;</button>
        <div class="${classPrefix}-title">
          <select class="${classPrefix}-month-select">
            ${monthNames.map((name, index) => `
              <option value="${index}" ${index === this.currentDate.getMonth() ? 'selected' : ''}>${name}</option>
            `).join('')}
          </select>
          <select class="${classPrefix}-year-select">
            ${this.generateYearOptions()}
          </select>
        </div>
        <button class="${classPrefix}-nav-btn ${classPrefix}-next-month" type="button">&rsaquo;</button>
        <button class="${classPrefix}-nav-btn ${classPrefix}-next-year" type="button">&raquo;</button>
      </div>
      <div class="${classPrefix}-calendar">
        <div class="${classPrefix}-weekdays">
          ${showWeekNumbers ? `<div class="${classPrefix}-weekday ${classPrefix}-week-number">Wk</div>` : ''}
          ${dayNames.map(day => `<div class="${classPrefix}-weekday">${day}</div>`).join('')}
        </div>
        <div class="${classPrefix}-days">
          ${this.generateDaysHTML(calendarGrid)}
        </div>
      </div>
    `;
        return html;
    }
    generateYearOptions() {
        const currentYear = this.currentDate.getFullYear();
        const startYear = currentYear - 50;
        const endYear = currentYear + 50;
        let options = '';
        for (let year = startYear; year <= endYear; year++) {
            options += `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`;
        }
        return options;
    }
    generateDaysHTML(calendarGrid) {
        const { classPrefix, showWeekNumbers, highlightToday } = this.options;
        const today = new Date();
        let html = '';
        for (let i = 0; i < calendarGrid.length; i += 7) {
            const week = calendarGrid.slice(i, i + 7);
            html += '<div class="' + classPrefix + '-week">';
            if (showWeekNumbers && week[0]) {
                html += `<div class="${classPrefix}-week-number">${getWeekNumber(week[0])}</div>`;
            }
            week.forEach(date => {
                if (!date) {
                    html += `<div class="${classPrefix}-day ${classPrefix}-day-empty"></div>`;
                    return;
                }
                const isToday = highlightToday && isSameDay(date, today);
                const isSelected = this.selectedDate && isSameDay(date, this.selectedDate);
                const isDisabled = !isDateInRange(date, this.options.minDate, this.options.maxDate);
                const isOtherMonth = date.getMonth() !== this.currentDate.getMonth();
                const classes = [
                    `${classPrefix}-day`,
                    isToday ? `${classPrefix}-day-today` : '',
                    isSelected ? `${classPrefix}-day-selected` : '',
                    isDisabled ? `${classPrefix}-day-disabled` : '',
                    isOtherMonth ? `${classPrefix}-day-other-month` : '',
                ].filter(Boolean).join(' ');
                html += `<div class="${classes}" data-date="${date.toISOString()}">${date.getDate()}</div>`;
            });
            html += '</div>';
        }
        return html;
    }
    attachEventListeners() {
        if (!this.element)
            return;
        const { classPrefix } = this.options;
        // Navigation buttons
        this.element.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains(`${classPrefix}-prev-month`)) {
                this.navigateMonth(-1);
            }
            else if (target.classList.contains(`${classPrefix}-next-month`)) {
                this.navigateMonth(1);
            }
            else if (target.classList.contains(`${classPrefix}-prev-year`)) {
                this.navigateYear(-1);
            }
            else if (target.classList.contains(`${classPrefix}-next-year`)) {
                this.navigateYear(1);
            }
            else if (target.classList.contains(`${classPrefix}-day`) && !target.classList.contains(`${classPrefix}-day-disabled`)) {
                const dateStr = target.getAttribute('data-date');
                if (dateStr) {
                    this.selectDate(new Date(dateStr));
                }
            }
        });
        // Month/Year select changes
        const monthSelect = this.element.querySelector(`.${classPrefix}-month-select`);
        const yearSelect = this.element.querySelector(`.${classPrefix}-year-select`);
        if (monthSelect) {
            monthSelect.addEventListener('change', () => {
                this.currentDate.setMonth(parseInt(monthSelect.value));
                this.update();
                this.options.onMonthChange(new Date(this.currentDate));
            });
        }
        if (yearSelect) {
            yearSelect.addEventListener('change', () => {
                this.currentDate.setFullYear(parseInt(yearSelect.value));
                this.update();
                this.options.onYearChange(new Date(this.currentDate));
            });
        }
    }
    navigateMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.update();
        this.options.onMonthChange(new Date(this.currentDate));
    }
    navigateYear(direction) {
        this.currentDate.setFullYear(this.currentDate.getFullYear() + direction);
        this.update();
        this.options.onYearChange(new Date(this.currentDate));
    }
    selectDate(date) {
        this.selectedDate = date;
        this.update();
        this.options.onDateSelect(new Date(date));
    }
    update() {
        if (!this.element)
            return;
        const calendarContainer = this.element.querySelector(`.${this.options.classPrefix}-days`);
        if (calendarContainer) {
            const calendarGrid = getCalendarGrid(this.currentDate.getFullYear(), this.currentDate.getMonth());
            calendarContainer.innerHTML = this.generateDaysHTML(calendarGrid);
        }
        // Update month/year selects
        const monthSelect = this.element.querySelector(`.${this.options.classPrefix}-month-select`);
        const yearSelect = this.element.querySelector(`.${this.options.classPrefix}-year-select`);
        if (monthSelect)
            monthSelect.value = this.currentDate.getMonth().toString();
        if (yearSelect)
            yearSelect.value = this.currentDate.getFullYear().toString();
    }
    // Public API methods
    getSelectedDate() {
        return this.selectedDate ? new Date(this.selectedDate) : null;
    }
    setSelectedDate(date) {
        this.selectedDate = date;
        if (date) {
            this.currentDate = new Date(date);
            this.options.onDateSelect(date);
        }
        this.update();
    }
    getOptions() {
        return Object.assign({}, this.options);
    }
    updateOptions(options) {
        this.options = Object.assign(Object.assign({}, this.options), options);
        this.update();
    }
    show() {
        this.isVisible = true;
        if (this.element) {
            this.element.style.display = 'block';
        }
    }
    hide() {
        this.isVisible = false;
        if (this.element) {
            this.element.style.display = 'none';
        }
    }
    navigateTo(date) {
        this.currentDate = new Date(date);
        this.update();
    }
    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

/**
 * Vanilla JavaScript adapter for the universal datepicker
 */
class VanillaDatepickerAdapter {
    create(element, options) {
        return new Datepicker(element, options);
    }
}
/**
 * Global factory function for vanilla JavaScript usage
 */
function createDatepicker(element, options = {}) {
    const targetElement = typeof element === 'string'
        ? document.querySelector(element)
        : element;
    if (!targetElement) {
        throw new Error('Datepicker target element not found');
    }
    return new Datepicker(targetElement, options);
}
/**
 * jQuery plugin (if jQuery is available)
 */
function initializeJQueryPlugin() {
    const $ = window.$;
    if ($) {
        $.fn.universalDatepicker = function (options) {
            return this.each(function () {
                const $this = $(this);
                let instance = $this.data('universalDatepicker');
                if (!instance) {
                    instance = new Datepicker(this, options);
                    $this.data('universalDatepicker', instance);
                }
                else if (options) {
                    instance.updateOptions(options);
                }
            });
        };
    }
}
/**
 * Auto-initialization for data attributes
 */
function autoInitialize() {
    const elements = document.querySelectorAll('[data-datepicker]');
    elements.forEach(element => {
        const htmlElement = element;
        const options = {};
        // Parse data attributes
        if (htmlElement.dataset.format)
            options.format = htmlElement.dataset.format;
        if (htmlElement.dataset.locale)
            options.locale = htmlElement.dataset.locale;
        if (htmlElement.dataset.theme)
            options.theme = htmlElement.dataset.theme;
        if (htmlElement.dataset.minDate)
            options.minDate = new Date(htmlElement.dataset.minDate);
        if (htmlElement.dataset.maxDate)
            options.maxDate = new Date(htmlElement.dataset.maxDate);
        if (htmlElement.dataset.showWeekNumbers)
            options.showWeekNumbers = htmlElement.dataset.showWeekNumbers === 'true';
        if (htmlElement.dataset.highlightToday)
            options.highlightToday = htmlElement.dataset.highlightToday === 'true';
        if (htmlElement.dataset.disabled)
            options.disabled = htmlElement.dataset.disabled === 'true';
        // Create datepicker instance
        const instance = new Datepicker(htmlElement, options);
        // Store instance on element for later access
        htmlElement._datepicker = instance;
    });
}
// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitialize);
    }
    else {
        autoInitialize();
    }
    // Initialize jQuery plugin if available
    initializeJQueryPlugin();
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * React adapter for the universal datepicker
 */
class ReactDatepickerAdapter {
    create(element, options) {
        return new Datepicker(element, options);
    }
}
/**
 * React Hook for using the datepicker
 */
function useDatepicker$1(options) {
    const React = window.React;
    if (!React) {
        throw new Error('React is not available. Make sure React is loaded before using the datepicker.');
    }
    const [instance, setInstance] = React.useState(null);
    const containerRef = React.useRef(null);
    React.useEffect(() => {
        if (containerRef.current && !instance) {
            const datepicker = new Datepicker(containerRef.current, options);
            setInstance(datepicker);
            return () => datepicker.destroy();
        }
    }, [options]);
    React.useEffect(() => {
        if (instance && options) {
            instance.updateOptions(options);
        }
    }, [instance, options]);
    return {
        containerRef,
        datepicker: instance,
    };
}
/**
 * Higher-Order Component for React
 */
function withDatepicker(WrappedComponent) {
    return function DatepickerHOC(props) {
        const { datepickerOptions } = props, otherProps = __rest(props, ["datepickerOptions"]);
        const { containerRef, datepicker } = useDatepicker$1(datepickerOptions);
        return window.React.createElement('div', { ref: containerRef }, window.React.createElement(WrappedComponent, Object.assign(Object.assign({}, otherProps), { datepicker })));
    };
}

/**
 * Vue adapter for the universal datepicker
 */
class VueDatepickerAdapter {
    create(element, options) {
        return new Datepicker(element, options);
    }
}
/**
 * Vue 3 Composition API composable
 */
function useDatepicker(options) {
    const Vue = window.Vue;
    if (!Vue) {
        throw new Error('Vue is not available. Make sure Vue is loaded before using the datepicker.');
    }
    const containerRef = Vue.ref(null);
    const instance = Vue.ref(null);
    Vue.onMounted(() => {
        if (containerRef.value) {
            instance.value = new Datepicker(containerRef.value, options);
        }
    });
    Vue.onUnmounted(() => {
        if (instance.value) {
            instance.value.destroy();
        }
    });
    Vue.watch(() => options, (newOptions) => {
        if (instance.value && newOptions) {
            instance.value.updateOptions(newOptions);
        }
    }, { deep: true });
    return {
        containerRef,
        datepicker: Vue.readonly(instance),
    };
}
/**
 * Vue 3 Component
 */
const VueDatepicker = {
    name: 'DatePicker',
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['dateSelect', 'monthChange', 'yearChange'],
    setup(props, { emit }) {
        const { containerRef, datepicker } = useDatepicker(Object.assign(Object.assign({}, props.options), { onDateSelect: (date) => {
                var _a, _b;
                emit('dateSelect', date);
                (_b = (_a = props.options).onDateSelect) === null || _b === void 0 ? void 0 : _b.call(_a, date);
            }, onMonthChange: (date) => {
                var _a, _b;
                emit('monthChange', date);
                (_b = (_a = props.options).onMonthChange) === null || _b === void 0 ? void 0 : _b.call(_a, date);
            }, onYearChange: (date) => {
                var _a, _b;
                emit('yearChange', date);
                (_b = (_a = props.options).onYearChange) === null || _b === void 0 ? void 0 : _b.call(_a, date);
            } }));
        return {
            containerRef,
            datepicker,
        };
    },
    template: '<div ref="containerRef"></div>',
};
/**
 * Vue 2 Mixin
 */
const VueDatepickerMixin = {
    data() {
        return {
            datepicker: null,
        };
    },
    props: {
        datepickerOptions: {
            type: Object,
            default: () => ({}),
        },
    },
    mounted() {
        if (this.$refs.datepickerContainer) {
            this.datepicker = new Datepicker(this.$refs.datepickerContainer, this.datepickerOptions);
        }
    },
    beforeDestroy() {
        if (this.datepicker) {
            this.datepicker.destroy();
        }
    },
    watch: {
        datepickerOptions: {
            handler(newOptions) {
                if (this.datepicker) {
                    this.datepicker.updateOptions(newOptions);
                }
            },
            deep: true,
        },
    },
};

/**
 * Angular adapter for the universal datepicker
 */
class AngularDatepickerAdapter {
    create(element, options) {
        return new Datepicker(element, options);
    }
}
/**
 * Angular Directive factory
 * Usage: Add this to your Angular module and use as <div datepicker [options]="datepickerOptions"></div>
 */
function createAngularDatepickerDirective() {
    return function DatepickerDirective() {
        return {
            restrict: 'A',
            scope: {
                options: '=?',
                onDateSelect: '&?',
                onMonthChange: '&?',
                onYearChange: '&?',
            },
            link: function (scope, element) {
                let datepicker = null;
                function initDatepicker() {
                    if (datepicker) {
                        datepicker.destroy();
                    }
                    const options = Object.assign(Object.assign({}, scope.options), { onDateSelect: (date) => {
                            if (scope.onDateSelect) {
                                scope.$apply(() => scope.onDateSelect({ date }));
                            }
                        }, onMonthChange: (date) => {
                            if (scope.onMonthChange) {
                                scope.$apply(() => scope.onMonthChange({ date }));
                            }
                        }, onYearChange: (date) => {
                            if (scope.onYearChange) {
                                scope.$apply(() => scope.onYearChange({ date }));
                            }
                        } });
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
function createAngularDatepickerService() {
    return function DatepickerService() {
        return {
            create: (element, options) => {
                return new Datepicker(element, options);
            },
        };
    };
}
/**
 * Modern Angular Component (for Angular 2+)
 */
const AngularDatepickerComponent = `
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

/**
 * Svelte adapter for the universal datepicker
 */
class SvelteDatepickerAdapter {
    create(element, options) {
        return new Datepicker(element, options);
    }
}
/**
 * Svelte Action for use with use:datepicker
 */
function datepicker(node, options = {}) {
    let instance;
    function createInstance() {
        instance = new Datepicker(node, options);
    }
    function updateInstance(newOptions) {
        if (instance) {
            instance.updateOptions(newOptions);
        }
    }
    function destroyInstance() {
        if (instance) {
            instance.destroy();
        }
    }
    // Create initial instance
    createInstance();
    return {
        update: updateInstance,
        destroy: destroyInstance,
    };
}
/**
 * Svelte Store for reactive datepicker state
 */
function createDatepickerStore(options = {}) {
    const { writable, derived } = window.Svelte || {};
    if (!writable || !derived) {
        throw new Error('Svelte stores are not available. Make sure Svelte is loaded.');
    }
    const selectedDate = writable(options.initialDate || null);
    const currentMonth = writable(options.initialDate || new Date());
    const isVisible = writable(false);
    return {
        selectedDate,
        currentMonth,
        isVisible,
        // Derived stores
        formattedDate: derived(selectedDate, ($selectedDate) => {
            return $selectedDate ? $selectedDate.toLocaleDateString(options.locale) : '';
        }),
    };
}
/**
 * Svelte Component Template (as string for reference)
 */
const SvelteDatepickerComponent = `
<script>
  import { datepicker } from '@akkyakshu/universal-datepicker/svelte';
  import { createEventDispatcher } from 'svelte';

  export let options = {};
  
  const dispatch = createEventDispatcher();
  
  let container;
  
  $: datepickerOptions = {
    ...options,
    onDateSelect: (date) => {
      dispatch('dateSelect', date);
      options.onDateSelect?.(date);
    },
    onMonthChange: (date) => {
      dispatch('monthChange', date);
      options.onMonthChange?.(date);
    },
    onYearChange: (date) => {
      dispatch('yearChange', date);
      options.onYearChange?.(date);
    },
  };
</script>

<div bind:this={container} use:datepicker={datepickerOptions}></div>
`;

exports.AngularDatepickerAdapter = AngularDatepickerAdapter;
exports.AngularDatepickerComponent = AngularDatepickerComponent;
exports.Datepicker = Datepicker;
exports.ReactDatepickerAdapter = ReactDatepickerAdapter;
exports.SvelteDatepickerAdapter = SvelteDatepickerAdapter;
exports.SvelteDatepickerComponent = SvelteDatepickerComponent;
exports.VanillaDatepickerAdapter = VanillaDatepickerAdapter;
exports.VueDatepicker = VueDatepicker;
exports.VueDatepickerAdapter = VueDatepickerAdapter;
exports.VueDatepickerMixin = VueDatepickerMixin;
exports.autoInitialize = autoInitialize;
exports.createAngularDatepickerDirective = createAngularDatepickerDirective;
exports.createAngularDatepickerService = createAngularDatepickerService;
exports.createDatepicker = createDatepicker;
exports.createDatepickerStore = createDatepickerStore;
exports.formatDate = formatDate;
exports.getCalendarGrid = getCalendarGrid;
exports.getDayNames = getDayNames;
exports.getMonthDays = getMonthDays;
exports.getMonthNames = getMonthNames;
exports.getWeekNumber = getWeekNumber;
exports.initializeJQueryPlugin = initializeJQueryPlugin;
exports.isDateInRange = isDateInRange;
exports.isSameDay = isSameDay;
exports.isSameMonth = isSameMonth;
exports.parseDate = parseDate;
exports.svelteAction = datepicker;
exports.useReactDatepicker = useDatepicker$1;
exports.useVueDatepicker = useDatepicker;
exports.withDatepicker = withDatepicker;
//# sourceMappingURL=index.js.map
