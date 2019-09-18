import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/page/feed/feed'
import List from '@/page/list/list'
import Detail from '@/page/detail/detail'
import MyMessage from '@/page/myMessage/myMessage'
import todayInHistoryList from '@/page/todayInHistory/list/list'
import todayInHistoryDetail from '@/page/todayInHistory/detail/detail'
import mortgageCaculateCaculate from '@/page/mortgageCaculate/caculate/caculate'
import mortgageCaculateRateTable from '@/page/mortgageCaculate/rateTable/rateTable'
import mortgageCaculateResult from '@/page/mortgageCaculate/result/result'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页（重定向：反馈页面）
    {
      path: '/',
      redirect: {
        name: 'Feed',
        component: Feed,
        meta: { keepAlive: false }
      },
    },
    // 反馈页面
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      meta: {
        keepAlive: false
      }
    },
    // 论坛列表页
    {
      path: '/list',
      name: 'List',
      component: List,
      meta: {
        keepAlive: true,
        isUseCache: true
      }
    },
    // 论坛详情页
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: false
      }
    },
    // 论坛消息页
    {
      path: '/myMessage',
      name: 'MyMessage',
      component: MyMessage,
      meta: {
        keepAlive: false
      }
    },
    // 历史上的今天 -- 列表页
    {
      path: '/todayInHistory/list',
      name: 'todayInHistoryList',
      component: todayInHistoryList,
      meta: {
        keepAlive: false
      }
    },
    // 历史上的今天 -- 详情
    {
      path: '/todayInHistory/detail',
      name: 'todayInHistoryDetail',
      component: todayInHistoryDetail,
      meta: {
        keepAlive: false
      }
    },
    // 房贷计算器 -- 计算器
    {
      path: '/mortgageCaculate/caculate',
      name: 'mortgageCaculateCaculate',
      component: mortgageCaculateCaculate,
      meta: {
        keepAlive: false
      }
    },
    // 房贷计算器 -- 利率表
    {
      path: '/mortgageCaculate/rateTable',
      name: 'mortgageCaculateRateTable',
      component: mortgageCaculateRateTable,
      meta: {
        keepAlive: false
      }
    },
    // 房贷计算器 -- 结果
    {
      path: '/mortgageCaculate/result',
      name: 'mortgageCaculateResult',
      component: mortgageCaculateResult,
      meta: {
        keepAlive: false
      }
    }
  ]
})