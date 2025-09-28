import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
import { Datepicker } from '../core/datepicker';

/**
 * Svelte adapter for the universal datepicker
 */
export class SvelteDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
  create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance {
    return new Datepicker(element, options);
  }
}

/**
 * Svelte Action for use with use:datepicker
 */
export function datepicker(node: HTMLElement, options: DatepickerOptions = {}) {
  let instance: DatepickerInstance;

  function createInstance() {
    instance = new Datepicker(node, options);
  }

  function updateInstance(newOptions: DatepickerOptions) {
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
export function createDatepickerStore(options: DatepickerOptions = {}) {
  const { writable, derived } = (window as any).Svelte || {};
  
  if (!writable || !derived) {
    throw new Error('Svelte stores are not available. Make sure Svelte is loaded.');
  }

  const selectedDate = writable<Date | null>(options.initialDate || null);
  const currentMonth = writable<Date>(options.initialDate || new Date());
  const isVisible = writable<boolean>(false);

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
export const SvelteDatepickerComponent = `
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

/**
 * Svelte Component as JavaScript object (for programmatic use)
 */
export function createSvelteComponent() {
  return {
    component: function(options: any) {
      return {
        target: options.target,
        props: options.props || {},
        // Component definition would go here
      };
    },
  };
}

// Default export for easier imports
export default SvelteDatepickerAdapter;