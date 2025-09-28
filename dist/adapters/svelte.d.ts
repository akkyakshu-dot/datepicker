import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
/**
 * Svelte adapter for the universal datepicker
 */
export declare class SvelteDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Svelte Action for use with use:datepicker
 */
export declare function datepicker(node: HTMLElement, options?: DatepickerOptions): {
    update: (newOptions: DatepickerOptions) => void;
    destroy: () => void;
};
/**
 * Svelte Store for reactive datepicker state
 */
export declare function createDatepickerStore(options?: DatepickerOptions): {
    selectedDate: any;
    currentMonth: any;
    isVisible: any;
    formattedDate: any;
};
/**
 * Svelte Component Template (as string for reference)
 */
export declare const SvelteDatepickerComponent = "\n<script>\n  import { datepicker } from '@akkyakshu/universal-datepicker/svelte';\n  import { createEventDispatcher } from 'svelte';\n\n  export let options = {};\n  \n  const dispatch = createEventDispatcher();\n  \n  let container;\n  \n  $: datepickerOptions = {\n    ...options,\n    onDateSelect: (date) => {\n      dispatch('dateSelect', date);\n      options.onDateSelect?.(date);\n    },\n    onMonthChange: (date) => {\n      dispatch('monthChange', date);\n      options.onMonthChange?.(date);\n    },\n    onYearChange: (date) => {\n      dispatch('yearChange', date);\n      options.onYearChange?.(date);\n    },\n  };\n</script>\n\n<div bind:this={container} use:datepicker={datepickerOptions}></div>\n";
/**
 * Svelte Component as JavaScript object (for programmatic use)
 */
export declare function createSvelteComponent(): {
    component: (options: any) => {
        target: any;
        props: any;
    };
};
export default SvelteDatepickerAdapter;
//# sourceMappingURL=svelte.d.ts.map