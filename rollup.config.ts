// @ts-ignore
import camelCase from 'lodash.camelcase'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

// noinspection TsLint
const pkg = require('./package.json')

const bundlePath = 'dist/bundle'
const outputName = 'hydra'
const index = 'packages/index'

export default {
    input: `./${index}.ts`,
    output: [
        {file: `${bundlePath}/${outputName}.umd.js`, name: camelCase(index), format: 'umd', sourcemap: true},
        {file: `${bundlePath}/${outputName}.es.js`, format: 'es', sourcemap: true},
        {file: `${bundlePath}/${outputName}.cjs.js`, format: 'cjs', sourcemap: true}
    ],
    // indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
        include: 'packages/**'
    },
    plugins: [
        // allow json resolution
        json(),
        // compile TypeScript files
        typescript({useTsconfigDeclarationDir: true}),
        // allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
        // resolve source maps to the original source
        sourceMaps(),
    ],
}
