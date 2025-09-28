import { DatepickerOptions, DatepickerInstance, DatepickerAdapter } from '../types';
import { Datepicker } from '../core/datepicker';

export interface ReactDatepickerProps extends DatepickerOptions {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * React adapter for the universal datepicker
 */
export class ReactDatepickerAdapter implements DatepickerAdapter<HTMLElement> {
  create(element: HTMLElement, options?: DatepickerOptions): DatepickerInstance {
    return new Datepicker(element, options);
  }
}

/**
 * React Hook for using the datepicker
 */
export function useDatepicker(options?: DatepickerOptions) {
  const React = (window as any).React;
  if (!React) {
    throw new Error('React is not available. Make sure React is loaded before using the datepicker.');
  }

  const [instance, setInstance] = React.useState<DatepickerInstance | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
export function withDatepicker<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function DatepickerHOC(props: P & { datepickerOptions?: DatepickerOptions }) {
    const { datepickerOptions, ...otherProps } = props;
    const { containerRef, datepicker } = useDatepicker(datepickerOptions);

    return (window as any).React.createElement(
      'div',
      { ref: containerRef },
      (window as any).React.createElement(WrappedComponent, {
        ...otherProps,
        datepicker,
      } as P)
    );
  };
}

// Default export for easier imports
export default ReactDatepickerAdapter;