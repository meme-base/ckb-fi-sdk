import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist',
      // 包含所有需要的源文件
      include: [
        'src/ckb-fi-bonding.ts',
        'src/module/bonding.ts',
        'src/types/index.ts'
      ],
      // 确保类型内联
      rollupTypes: true,
      // 将所有类型合并到一个文件
      bundledPackages: ['./src/module/bonding'],
      // 确保类型被正确复制
      copyDtsFiles: true,
      // 插入类型引用
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/ckb-fi-bonding.ts'),
      name: 'CKBFiBonding',
      formats: ['es', 'umd', 'cjs'],
      fileName: format => {
        const extensions = {
          es: '.mjs',
          cjs: '.cjs',
          umd: '.umd.js'
        }
        // @ts-ignore
        return `ckb-fi-bonding${extensions[format] || '.js'}`
      }
    },
    outDir: 'dist',
    minify: true,
    sourcemap: false,
    emptyOutDir: true
  },
  esbuild: {
    target: 'es2020'
  }
})
