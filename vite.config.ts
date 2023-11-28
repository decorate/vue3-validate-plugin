import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVue3Resolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'
import dts from 'vite-plugin-dts'
import { terser } from 'rollup-plugin-terser'

// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild}) => {
  const env = loadEnv(mode, process.cwd())
  let base = './'
  if(mode !== 'local' && mode !== 'testing') {
    base = env.VITE_SITE_URL
  }
  return {
    base: base,
    plugins: [
      vue(),
      Components({
        resolvers: [BootstrapVue3Resolver()],
        globs: [],
      }),
			dts()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
				'~bootstrap': fileURLToPath(
					new URL('node_modules/bootstrap', import.meta.url)
				),
				'~bootstrap-vue-3': fileURLToPath(
					new URL('node_modules/bootstrap-vue-3', import.meta.url)
				),
				'~': fileURLToPath(
					new URL('./mocks', import.meta.url)
				)
			},
		},
		esbuild: {
			keepNames: true,
			minifyIdentifiers: false
		},
		build: {
			lib: {
				entry: path.resolve(__dirname, './src/index.ts'),
				name: "index",
				fileName: (format) => `index.${format}.js`
			},
			rollupOptions: {
				external: [
					'vue', 'axios'
				],
				output: {
					globals: {
					}
				},
			}
		}
  }
})
