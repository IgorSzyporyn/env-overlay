import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps';
import { uglify } from "rollup-plugin-uglify"
import pkg from './package.json';

const input = './compiled/index.js';
const external = [];

const buildUmd = ({
  env
}) => ({
  input,
  external,
  output: {
    name: 'envOverlay',
    format: 'umd',
    sourcemap: true,
    file: env === 'production' ?
      `./dist/env-overlay.umd.${env}.js` : `./dist/env-overlay.umd.${env}.js`,
    exports: 'named'
  },

  plugins: [
    nodeResolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      include: /node_modules/,
    }),
    sourceMaps(),
    env === 'production' && filesize(),
    env === 'production' &&
    uglify({
      output: {
        comments: false
      },
      compress: {
        keep_infinity: true,
        pure_getters: true,
      },
      warnings: true,
      toplevel: false,
    }),
  ],
});

const buildCjs = ({
  env
}) => ({
  input,
  external: external.concat(Object.keys(pkg.dependencies)),
  output: [{
    file: `./dist/${pkg.name}.cjs.${env}.js`,
    format: 'cjs',
    sourcemap: true,
  }, ],
  plugins: [
    nodeResolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    sourceMaps(),
    filesize(),
  ],
})

export default [
  buildUmd({
    env: 'production'
  }),
  buildUmd({
    env: 'development'
  }),
  buildCjs({
    env: 'production'
  }),
  buildCjs({
    env: 'development'
  }),
  {
    input,
    external: external.concat(Object.keys(pkg.dependencies)),
    output: [{
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),

      sourceMaps(),
      filesize(),
    ],
  },
];