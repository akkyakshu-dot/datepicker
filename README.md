# Universal Datepicker

A lightweight, accessible, and framework-agnostic datepicker library that works with React, Vue, Angular, Svelte, and vanilla JavaScript.

[![npm version](https://badge.fury.io/js/%40akkyakshu%2Funiversal-datepicker.svg)](https://www.npmjs.com/package/@akkyakshu/universal-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Universal**: Works with React, Vue, Angular, Svelte, and vanilla JavaScript
- 📱 **Responsive**: Mobile-friendly with touch support
- 🎨 **Themeable**: Light, dark, and auto themes with CSS custom properties
- 🌍 **Internationalized**: Supports multiple locales and date formats
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 📦 **Lightweight**: ~15KB gzipped with no dependencies
- 🔧 **Customizable**: Extensive configuration options
- 📅 **Feature Rich**: Date ranges, disabled dates, custom formatting

## Installation

```bash
npm install @akkyakshu/universal-datepicker
```

Or via CDN:

```html
<script src="https://unpkg.com/@akkyakshu/universal-datepicker@latest/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@akkyakshu/universal-datepicker@latest/dist/datepicker.css">
```

## Quick Start

### Vanilla JavaScript

```html
<div id="datepicker"></div>

<script>
import { createDatepicker } from '@akkyakshu/universal-datepicker';

const datepicker = createDatepicker('#datepicker', {
  onDateSelect: (date) => {
    console.log('Selected date:', date);
  }
});
</script>
```

### React

```jsx
import { useDatepicker } from '@akkyakshu/universal-datepicker/react';

function MyComponent() {
  const { containerRef, datepicker } = useDatepicker({
    onDateSelect: (date) => {
      console.log('Selected date:', date);
    }
  });

  return <div ref={containerRef} />;
}
```

### Vue 3

```vue
<template>
  <div ref="containerRef" />
</template>

<script setup>
import { useDatepicker } from '@akkyakshu/universal-datepicker/vue';

const { containerRef, datepicker } = useDatepicker({
  onDateSelect: (date) => {
    console.log('Selected date:', date);
  }
});
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { DatepickerOptions } from '@akkyakshu/universal-datepicker';

@Component({
  selector: 'app-datepicker',
  template: '<universal-datepicker [options]="options"></universal-datepicker>'
})
export class DatepickerComponent {
  options: DatepickerOptions = {
    onDateSelect: (date) => {
      console.log('Selected date:', date);
    }
  };
}
```

### Svelte

```svelte
<script>
import { datepicker } from '@akkyakshu/universal-datepicker/svelte';

const options = {
  onDateSelect: (date) => {
    console.log('Selected date:', date);
  }
};
</script>

<div use:datepicker={options}></div>
```

## Configuration Options

```typescript
interface DatepickerOptions {
  initialDate?: Date;           // Initial date to display
  minDate?: Date;              // Minimum selectable date
  maxDate?: Date;              // Maximum selectable date
  format?: string;             // Date format (YYYY-MM-DD, DD/MM/YYYY, etc.)
  locale?: string;             // Locale for internationalization
  showWeekNumbers?: boolean;   // Show week numbers
  highlightToday?: boolean;    // Highlight today's date
  theme?: 'light' | 'dark' | 'auto'; // Color theme
  disabled?: boolean;          // Disable the datepicker
  onDateSelect?: (date: Date) => void;   // Date selection callback
  onMonthChange?: (date: Date) => void;  // Month change callback
  onYearChange?: (date: Date) => void;   // Year change callback
}
```

## API Reference

### DatepickerInstance

```typescript
interface DatepickerInstance {
  getSelectedDate(): Date | null;
  setSelectedDate(date: Date | null): void;
  getOptions(): DatepickerOptions;
  updateOptions(options: Partial<DatepickerOptions>): void;
  show(): void;
  hide(): void;
  destroy(): void;
  navigateTo(date: Date): void;
}
```

## Styling and Theming

The datepicker comes with three built-in themes:

- `light` (default)
- `dark`
- `auto` (respects system preference)

### Custom CSS Variables

```css
.dp-container {
  --dp-primary-color: #007bff;
  --dp-background-color: #ffffff;
  --dp-text-color: #333333;
  --dp-border-color: #dddddd;
  --dp-hover-color: #f0f8ff;
  --dp-selected-color: #007bff;
  --dp-disabled-color: #cccccc;
}
```

### Custom CSS Classes

All elements use the `dp-` prefix by default (customizable via `classPrefix` option):

- `.dp-container` - Main container
- `.dp-header` - Header with navigation
- `.dp-calendar` - Calendar grid container
- `.dp-day` - Individual day cells
- `.dp-day-selected` - Selected day
- `.dp-day-today` - Today's date
- `.dp-day-disabled` - Disabled dates

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details on releases and updates.
