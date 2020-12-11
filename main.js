import Vue from 'vue'
import App from './App'
import request from './until/request.js'
Vue.config.productionTip = false
Vue.prototype.request=request
App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
