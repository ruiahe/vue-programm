import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/page/test/test'
import Feed from '@/page/feed/feed'
import List from '@/page/list/list'
import Detail from '@/page/detail/detail'
import MyMessage from '@/page/myMessage/myMessage'
import WindowHead from '@/page/windowHead/windowHead'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: Test
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/myMessage',
      name: 'MyMessage',
      component: MyMessage
    },
    {
      path: '/windowHead',
      name: 'WindowHead',
      component: WindowHead
    }
  ]
})
