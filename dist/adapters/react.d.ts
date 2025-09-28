import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
export interface ReactDatepickerProps extends DatepickerOptions {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
/**
 * React adapter for the universal datepicker
 */
export declare class ReactDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
    create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance;
}
/**
 * React Hook for using the datepicker
 */
export declare function useDatepicker(options?: DatepickerOptions): {
    containerRef: any;
    datepicker: any;
};
/**
 * Higher-Order Component for React
 */
export declare function withDatepicker<P extends object>(WrappedComponent: React.ComponentType<P>): (props: P & {
    datepickerOptions?: DatepickerOptions;
}) => any;
export default ReactDatepickerAdapter;
//# sourceMappingURL=react.d.ts.map