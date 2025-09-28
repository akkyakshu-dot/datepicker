import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
/**
 * Vanilla JavaScript adapter for the universal datepicker
 */
export declare class VanillaDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Global factory function for vanilla JavaScript usage
 */
export declare function createDatepicker(element: HTMLElement | string, options?: DatepickerOptions): DatepickerInstance;
/**
 * jQuery plugin (if jQuery is available)
 */
export declare function initializeJQueryPlugin(): void;
/**
 * Auto-initialization for data attributes
 */
export declare function autoInitialize(): void;
export default VanillaDatepickerAdapter;
//# sourceMappingURL=vanilla.d.ts.map