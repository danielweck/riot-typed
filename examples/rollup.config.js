import buble from 'rollup-plugin-buble'
import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import path from 'path'

export default {
    entry: path.resolve(__dirname, './app.ts'),
    external:['riot', 'riot-typed'],
    plugins: [
        typescript({
            typescript: require('typescript'),
            rootDir: path.resolve(__dirname, '../')
        }),
        nodeResolve({esnext:true, main:true}),
        commonjs(),
        buble()
    ],
    format: 'amd',
    dest: path.resolve(__dirname ,'./bundle.js')
}