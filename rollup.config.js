import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

const config = [
  // Main build
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'UniversalDatepicker',
        sourcemap: true,
        exports: 'named',
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
    ],
    external: ['react', 'vue'],
  },
  // CSS build
  {
    input: 'src/styles/datepicker.css',
    output: {
      file: 'dist/datepicker.css',
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
    external: ['react', 'vue'],
  },
];

export default config;