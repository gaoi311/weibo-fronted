import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'querystring'
// 自定义设置
import settings from './settings'
// IView-ui
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './my-theme/index.less'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// markdown插件
// import mavonEdit from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

Vue.use(ViewUI);
Vue.use(ElementUI);
// Vue.use(mavonEdit);
// Vue.use(qs);

Vue.prototype.$settings = settings;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
