import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
/**
 * Vue adapter for the universal datepicker
 */
export declare class VueDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * Vue 3 Composition API composable
 */
export declare function useDatepicker(options?: DatepickerOptions): {
    containerRef: any;
    datepicker: any;
};
/**
 * Vue 3 Component
 */
export declare const VueDatepicker: {
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
export declare const VueDatepickerMixin: {
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
export default VueDatepickerAdapter;
//# sourceMappingURL=vue.d.ts.map