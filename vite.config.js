// vite.config.js
const path = require('path');

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // styles: {
      //   postcssOptions: {
      //     extract: false,
      //   },
      // },
    }),
  ],
  // 库模式自定义打包相关配置 build
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'libName',
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },

    // // css 内联，防止生成库，import 时还得额外导入 css 文件， 目测无用
    // cssCodeSplit: false,
    // css: {
    //   // postcss: { extract: false },
    //   modules: { scopeBehaviour: 'local' },
    // },
  },
});
