// Core exports
export { Datepicker } from './core/datepicker';
export * from './core/utils';
export * from './types';

// Vanilla JavaScript exports
export { 
  VanillaDatepickerAdapter, 
  createDatepicker, 
  autoInitialize,
  initializeJQueryPlugin 
} from './adapters/vanilla';

// Framework adapters
export { 
  ReactDatepickerAdapter, 
  useDatepicker as useReactDatepicker, 
  withDatepicker 
} from './adapters/react';

export { 
  VueDatepickerAdapter, 
  useDatepicker as useVueDatepicker, 
  VueDatepicker, 
  VueDatepickerMixin 
} from './adapters/vue';

export { 
  AngularDatepickerAdapter, 
  createAngularDatepickerDirective, 
  createAngularDatepickerService,
  AngularDatepickerComponent 
} from './adapters/angular';

export { 
  SvelteDatepickerAdapter, 
  datepicker as svelteAction, 
  createDatepickerStore, 
  SvelteDatepickerComponent 
} from './adapters/svelte';