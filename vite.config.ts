import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    })],
  resolve:{
    alias:{
      '@':'/src/',
    }
  },
  build: {
    chunkSizeWarningLimit: 8000,
    rollupOptions: {
      output: {
        // 分包
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
          }
        },
      },
    },
  },

})
