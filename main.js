import Vue from 'vue'
import App from './App'
import request from './until/request.js'
import store from './store/index.js'
Vue.config.productionTip = false
Vue.prototype.request=request
App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);

// 注册一个全局头部组件
import Detail from "./components/base/base-detail.vue"

Vue.component('Detail', Detail)


const app = new Vue({
    ...App,
	store
})
app.$mount()
