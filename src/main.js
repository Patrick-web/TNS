import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import axios from "axios";
import firebase from "firebase/app"
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.prototype.$axios = axios;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDrjEQJ5IdusukcRVtepKQzEHjwmollC0",
  authDomain: "re-minder-app.firebaseapp.com",
  databaseURL: "https://re-minder-app.firebaseio.com",
  projectId: "re-minder-app",
  storageBucket: "re-minder-app.appspot.com",
  messagingSenderId: "170172601304",
  appId: "1:170172601304:web:0f0c2b79f2c421398c98ad",
  measurementId: "G-GG6RJKG7WL"
};

firebase.initializeApp(firebaseConfig)

Vue.use(Datetime)
Vue.use(Vuesax)
Vue.component('datetime', Datetime)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
