# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-09-28

### Added
- 🎉 Initial release of Universal Datepicker
- 🚀 **Universal Support**: Works with React, Vue, Angular, Svelte, and vanilla JavaScript
- 📱 **Responsive Design**: Mobile-friendly with touch support
- 🎨 **Multiple Themes**: Light, dark, and auto themes
- 🌍 **Internationalization**: Support for multiple locales and date formats
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 📅 **Feature Rich**: 
  - Date ranges with min/max date support
  - Week numbers display
  - Custom date formatting
  - Callback functions for date selection, month/year changes
  - Customizable CSS classes and styling
- 🔧 **Framework Adapters**:
  - React: Hook-based API with `useDatepicker`
  - Vue: Composition API support with `useDatepicker` and component
  - Angular: Directive and component support
  - Svelte: Action-based API with `use:datepicker`
  - Vanilla: Simple `createDatepicker` function and auto-initialization
- 📦 **Multiple Distribution Formats**:
  - CommonJS (`dist/index.js`)
  - ES Modules (`dist/index.esm.js`)
  - UMD for CDN usage (`dist/index.umd.js`)
  - TypeScript definitions (`dist/index.d.ts`)
  - Separate CSS file (`dist/datepicker.css`)
- 🧪 **Testing**: Comprehensive test suite with Jest
- 📚 **Documentation**: Complete README with examples for all frameworks
- 🔍 **Code Quality**: ESLint configuration and TypeScript support

### Technical Details
- Built with TypeScript for type safety
- Rollup-based build system for optimized bundles
- No runtime dependencies (peer dependencies only)
- ~15KB gzipped size
- ES2015+ target for modern browser support
- CSS custom properties for easy theming