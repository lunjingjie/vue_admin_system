import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'mdi/css/materialdesignicons.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// import vuetify from './plugins/vuetify';

// 导入过滤器
import '@/common/filters';

// 页面级别权限控制
import './permission';

Vue.config.productionTip = false;

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
