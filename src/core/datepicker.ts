import { DatepickerOptions, DatepickerInstance } from '../types';
import { 
  isSameDay, 
  isDateInRange, 
  getCalendarGrid, 
  getMonthNames, 
  getDayNames,
  getWeekNumber 
} from './utils';

export class Datepicker implements DatepickerInstance {
  private container: HTMLElement;
  private options: DatepickerOptions & { 
    format: string; 
    locale: string; 
    showWeekNumbers: boolean;
    highlightToday: boolean;
    classPrefix: string;
    theme: 'light' | 'dark' | 'auto';
    disabled: boolean;
    onDateSelect: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onYearChange: (date: Date) => void;
  };
  private selectedDate: Date | null = null;
  private currentDate: Date;
  private isVisible: boolean = false;
  private element: HTMLElement | null = null;

  constructor(container: HTMLElement, options: DatepickerOptions = {}) {
    this.container = container;
    this.options = this.getDefaultOptions(options);
    this.currentDate = options.initialDate || new Date();
    this.selectedDate = options.initialDate || null;
    
    this.init();
  }

  private getDefaultOptions(options: DatepickerOptions): DatepickerOptions & { 
    format: string; 
    locale: string; 
    showWeekNumbers: boolean;
    highlightToday: boolean;
    classPrefix: string;
    theme: 'light' | 'dark' | 'auto';
    disabled: boolean;
    onDateSelect: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onYearChange: (date: Date) => void;
  } {
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
      onDateSelect: options.onDateSelect || (() => {}),
      onMonthChange: options.onMonthChange || (() => {}),
      onYearChange: options.onYearChange || (() => {}),
    };
  }

  private init(): void {
    this.render();
    this.attachEventListeners();
  }

  private render(): void {
    const { classPrefix, theme } = this.options;
    
    this.element = document.createElement('div');
    this.element.className = `${classPrefix}-container ${classPrefix}-theme-${theme}`;
    this.element.innerHTML = this.generateHTML();
    
    this.container.appendChild(this.element);
    
    if (!this.isVisible) {
      this.element.style.display = 'none';
    }
  }

  private generateHTML(): string {
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

  private generateYearOptions(): string {
    const currentYear = this.currentDate.getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;
    let options = '';
    
    for (let year = startYear; year <= endYear; year++) {
      options += `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`;
    }
    
    return options;
  }

  private generateDaysHTML(calendarGrid: (Date | null)[]): string {
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

  private attachEventListeners(): void {
    if (!this.element) return;
    
    const { classPrefix } = this.options;
    
    // Navigation buttons
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains(`${classPrefix}-prev-month`)) {
        this.navigateMonth(-1);
      } else if (target.classList.contains(`${classPrefix}-next-month`)) {
        this.navigateMonth(1);
      } else if (target.classList.contains(`${classPrefix}-prev-year`)) {
        this.navigateYear(-1);
      } else if (target.classList.contains(`${classPrefix}-next-year`)) {
        this.navigateYear(1);
      } else if (target.classList.contains(`${classPrefix}-day`) && !target.classList.contains(`${classPrefix}-day-disabled`)) {
        const dateStr = target.getAttribute('data-date');
        if (dateStr) {
          this.selectDate(new Date(dateStr));
        }
      }
    });
    
    // Month/Year select changes
    const monthSelect = this.element.querySelector(`.${classPrefix}-month-select`) as HTMLSelectElement;
    const yearSelect = this.element.querySelector(`.${classPrefix}-year-select`) as HTMLSelectElement;
    
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

  private navigateMonth(direction: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.update();
    this.options.onMonthChange(new Date(this.currentDate));
  }

  private navigateYear(direction: number): void {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + direction);
    this.update();
    this.options.onYearChange(new Date(this.currentDate));
  }

  private selectDate(date: Date): void {
    this.selectedDate = date;
    this.update();
    this.options.onDateSelect(new Date(date));
  }

  private update(): void {
    if (!this.element) return;
    
    const calendarContainer = this.element.querySelector(`.${this.options.classPrefix}-days`);
    if (calendarContainer) {
      const calendarGrid = getCalendarGrid(this.currentDate.getFullYear(), this.currentDate.getMonth());
      calendarContainer.innerHTML = this.generateDaysHTML(calendarGrid);
    }
    
    // Update month/year selects
    const monthSelect = this.element.querySelector(`.${this.options.classPrefix}-month-select`) as HTMLSelectElement;
    const yearSelect = this.element.querySelector(`.${this.options.classPrefix}-year-select`) as HTMLSelectElement;
    
    if (monthSelect) monthSelect.value = this.currentDate.getMonth().toString();
    if (yearSelect) yearSelect.value = this.currentDate.getFullYear().toString();
  }

  // Public API methods
  getSelectedDate(): Date | null {
    return this.selectedDate ? new Date(this.selectedDate) : null;
  }

  setSelectedDate(date: Date | null): void {
    this.selectedDate = date;
    if (date) {
      this.currentDate = new Date(date);
      this.options.onDateSelect(date);
    }
    this.update();
  }

  getOptions(): DatepickerOptions {
    return { ...this.options };
  }

  updateOptions(options: Partial<DatepickerOptions>): void {
    this.options = { ...this.options, ...options };
    this.update();
  }

  show(): void {
    this.isVisible = true;
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  hide(): void {
    this.isVisible = false;
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  navigateTo(date: Date): void {
    this.currentDate = new Date(date);
    this.update();
  }

  destroy(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}