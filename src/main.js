import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'

Vue.use(vuetify)
Vue.use(VueMask)

axios.defaults.baseURL = 'http://localhost:8081/pix/'

axios.interceptors.request.use(async config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (!error.response) {
      alert('NETWORK ERROR')
  } else {
      const code = error.response.status
      const response = error.response.data
      const originalRequest = error.config;
      console.log(originalRequest);
      if (code === 400 && response.error === 'invalid_grant' && !originalRequest._retry) {
          originalRequest._retry = true
          //auth.commit('logout');
          //window.location.href = "/login";
          console.log("senha ou login invalidos");
      }
      if (code === 401 && response.error === 'invalid_token' && !originalRequest._retry) {
        originalRequest._retry = true
        console.log("token invalido");
    }
      return Promise.reject(error)
  }
});

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$moment = moment

Vue.prototype.$auth = (authority) => {
  let auth = false;
  let jwtData = localStorage.getItem('token').split('.')[1];
  let token = atob(jwtData);
  if (token !== null && token.authorities.length > 0) {
      auth = token.authorities.some(a => a === authority);
  }
  return auth;
}

Vue.prototype.$authorized = () => {
  let authorized = false;
  if (localStorage.getItem('token') !== null){
    let jwtData = localStorage.getItem('token').split('.')[1];
    let token = atob(jwtData);
    if (token !== null) {
      authorized = true;
    }
  }
  return authorized;
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
