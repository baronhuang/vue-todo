import 'weui';
import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'
import Home from './containers/Home.vue'
import Detail from './containers/Detail.vue'
import './utils/filters'

Vue.use(Router);
Vue.use(vueResource);

let router = new Router();
router.map({
    '/index': {
      component:Home
    },
  '/detail/:id': {
    component:Detail
  }
  });

router.redirect({
    '*': '/index'
  });

router.start(App, 'app');

export default App;

