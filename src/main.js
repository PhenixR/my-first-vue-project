// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('times', {
  template: '<button v-on:click="counter += 1" class="times">do {{ counter }} times</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  
})
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
