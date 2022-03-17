import { createApp } from 'vue'
import "@/helper/icon.js"
import App from './App.vue'
import {router} from "@/router";
import {store} from "@/vueX";
createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
