import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList'
import VueTheMask from 'vue-the-mask'

Vue.use(Router)
Vue.use(VueTheMask)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo-list',
      component: TodoList
    }
  ]
})
