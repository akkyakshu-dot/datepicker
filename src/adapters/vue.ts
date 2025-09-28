import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
import { Datepicker } from '../core/datepicker';

/**
 * Vue adapter for the universal datepicker
 */
export class VueDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
  create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance {
    return new Datepicker(element, options);
  }
}

/**
 * Vue 3 Composition API composable
 */
export function useDatepicker(options?: DatepickerOptions) {
  const Vue = (window as any).Vue;
  if (!Vue) {
    throw new Error('Vue is not available. Make sure Vue is loaded before using the datepicker.');
  }

  const containerRef = Vue.ref<HTMLElement | null>(null);
  const instance = Vue.ref<DatepickerInstance | null>(null);

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

  Vue.watch(
    () => options,
    (newOptions) => {
      if (instance.value && newOptions) {
        instance.value.updateOptions(newOptions);
      }
    },
    { deep: true }
  );

  return {
    containerRef,
    datepicker: Vue.readonly(instance),
  };
}

/**
 * Vue 3 Component
 */
export const VueDatepicker = {
  name: 'DatePicker',
  props: {
    options: {
      type: Object as () => DatepickerOptions,
      default: () => ({}),
    },
  },
  emits: ['dateSelect', 'monthChange', 'yearChange'],
  setup(props: { options: DatepickerOptions }, { emit }: any) {
    const { containerRef, datepicker } = useDatepicker({
      ...props.options,
      onDateSelect: (date: Date) => {
        emit('dateSelect', date);
        props.options.onDateSelect?.(date);
      },
      onMonthChange: (date: Date) => {
        emit('monthChange', date);
        props.options.onMonthChange?.(date);
      },
      onYearChange: (date: Date) => {
        emit('yearChange', date);
        props.options.onYearChange?.(date);
      },
    });

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
export const VueDatepickerMixin = {
  data() {
    return {
      datepicker: null as DatepickerInstance | null,
    };
  },
  props: {
    datepickerOptions: {
      type: Object as () => DatepickerOptions,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.$refs.datepickerContainer) {
      this.datepicker = new Datepicker(
        this.$refs.datepickerContainer as HTMLElement,
        this.datepickerOptions
      );
    }
  },
  beforeDestroy() {
    if (this.datepicker) {
      this.datepicker.destroy();
    }
  },
  watch: {
    datepickerOptions: {
      handler(newOptions: DatepickerOptions) {
        if (this.datepicker) {
          this.datepicker.updateOptions(newOptions);
        }
      },
      deep: true,
    },
  },
};

// Default export for easier imports
export default VueDatepickerAdapter;