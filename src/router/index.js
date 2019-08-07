import Vue from 'vue'
import Router from 'vue-router'
import FeedbackToDiscuss from '@/page/feedbackToDiscuss/FeedbackToDiscuss'
import StatementList from '@/page/statementList/statementList'
import StatementDetail from '@/page/statementDetail/statementDetail'
import Message from '@/page/message/message'
import Test from '@/page/test/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: Test
    },
    {
      path: '/feedbackToDiscuss',
      name: 'FeedbackToDiscuss',
      component: FeedbackToDiscuss
    },
    {
      path: '/statementList',
      name: 'StatementList',
      component: StatementList
    },
    {
      path: '/statementDetail',
      name: 'StatementDetail',
      component: StatementDetail
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    }
  ]
})
