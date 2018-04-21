import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store/store';

// Use vue-router package
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

// Custom directives
Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1200px';
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = '560px';
    }
    if (binding.arg == 'column') {
      el.style.background = '#ddd';
      el.style.padding = '20px';
    }
  }
});

// Filters
Vue.filter('snippet', function(value) {
  return value.slice(0, 100) + '...';
});

new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
  router: router
})