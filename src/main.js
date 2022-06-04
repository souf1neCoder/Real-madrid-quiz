import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/style.css'
import VueCookies from 'vue3-cookies'
import { globalCookiesConfig } from "vue3-cookies";
let now = new Date();
now.setMonth(now.getMonth() + 1);
globalCookiesConfig({
    expireTimes: now.toUTCString(),
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
  });
createApp(App).use(store).use(router).use(VueCookies).mount('#app')
