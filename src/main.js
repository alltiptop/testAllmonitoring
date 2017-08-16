// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import { mapActions } from 'vuex'

import httpPlugin from './api'

sync(store, router)

Vue.use(httpPlugin, { store, router })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  },
  methods: {
    ...mapActions(['getTasks'])
  },
  mounted () {
    this.getTasks()
  }
})
