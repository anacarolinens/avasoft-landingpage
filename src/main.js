import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/config'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


const app = createApp(App);


app.use(router);
app.use(Toast, {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true
});
app.mount('#app');