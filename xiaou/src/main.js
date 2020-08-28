// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/reset.css"
import "./assets/js/remScale"
import './assets/font/iconfont.css'
import commonComponent from "./common"
for (var i in commonComponent) {
  Vue.component(i, commonComponent[i])
}
import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)
Vue.prototype.$imgUrl = "http://localhost:3000"
import 'swiper/css/swiper.min.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
