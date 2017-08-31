import buble from 'rollup-plugin-buble'
import typescript from 'rollup-plugin-typescript'

const pkg = require( './package.json' );

export default {
    entry: 'src/index.ts',
    external:['riot'],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        buble()
    ],
    targets: [
		{
			format: 'cjs',
			dest: pkg.main
        },
        {
            format: 'umd',
            moduleName:'riot-typed',
			dest: 'dist/riot-typed.js'
		},
		{
			format: 'es',
			dest: pkg.module
		}
	]
}