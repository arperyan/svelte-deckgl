import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import replace from "rollup-plugin-replace"
import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;


export default {
	input: !production ? 'src/main.js' : 'src/components/components.module.js',
	output: !production ? {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js',
		globals: {
				'@deck.gl/core': 'core',
				'@deck.gl/layers': 'layers'
			}
	} : [{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
			name: pkg.name,
			globals: {
				'@deck.gl/core': 'core',
				'@deck.gl/layers': 'layers'
			}
		},
		{
			file: pkg.main,
			format: 'umd',
			sourcemap: true,
			name: pkg.name,
			globals: {
				'@deck.gl/core': 'core',
				'@deck.gl/layers': 'layers'
		
			}
		}
		
	],
	external: ["@deck.gl/core"],
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			css: (css) => {
				css.write('public/bundle.css');
			},
		}),
		css({
			output: 'bundle.css'
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		peerDepsExternal(),
		// we'll extract any component CSS out into
		// a separate file - better for performance


		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	external: ["@deck.gl/core"],
	watch: {
		clearScreen: false
	}
};


function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}