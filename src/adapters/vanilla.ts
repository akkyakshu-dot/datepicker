import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
import { Datepicker } from '../core/datepicker';

/**
 * Vanilla JavaScript adapter for the universal datepicker
 */
export class VanillaDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
  create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance {
    return new Datepicker(element, options);
  }
}

/**
 * Global factory function for vanilla JavaScript usage
 */
export function createDatepicker(element: HTMLElement | string, options: DatepickerOptions = {}): DatepickerInstance {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!targetElement) {
    throw new Error('Datepicker target element not found');
  }

  return new Datepicker(targetElement, options);
}

/**
 * jQuery plugin (if jQuery is available)
 */
export function initializeJQueryPlugin() {
  const $ = (window as any).$;
  if ($) {
    $.fn.universalDatepicker = function(options?: DatepickerOptions) {
      return this.each(function() {
        const $this = $(this);
        let instance = $this.data('universalDatepicker');
        
        if (!instance) {
          instance = new Datepicker(this, options);
          $this.data('universalDatepicker', instance);
        } else if (options) {
          instance.updateOptions(options);
        }
      });
    };
  }
}

/**
 * Auto-initialization for data attributes
 */
export function autoInitialize() {
  const elements = document.querySelectorAll('[data-datepicker]');
  
  elements.forEach(element => {
    const htmlElement = element as HTMLElement;
    const options: DatepickerOptions = {};
    
    // Parse data attributes
    if (htmlElement.dataset.format) options.format = htmlElement.dataset.format;
    if (htmlElement.dataset.locale) options.locale = htmlElement.dataset.locale;
    if (htmlElement.dataset.theme) options.theme = htmlElement.dataset.theme as 'light' | 'dark' | 'auto';
    if (htmlElement.dataset.minDate) options.minDate = new Date(htmlElement.dataset.minDate);
    if (htmlElement.dataset.maxDate) options.maxDate = new Date(htmlElement.dataset.maxDate);
    if (htmlElement.dataset.showWeekNumbers) options.showWeekNumbers = htmlElement.dataset.showWeekNumbers === 'true';
    if (htmlElement.dataset.highlightToday) options.highlightToday = htmlElement.dataset.highlightToday === 'true';
    if (htmlElement.dataset.disabled) options.disabled = htmlElement.dataset.disabled === 'true';
    
    // Create datepicker instance
    const instance = new Datepicker(htmlElement, options);
    
    // Store instance on element for later access
    (htmlElement as any)._datepicker = instance;
  });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitialize);
  } else {
    autoInitialize();
  }
  
  // Initialize jQuery plugin if available
  initializeJQueryPlugin();
}

// Default export for easier imports
export default VanillaDatepickerAdapter;