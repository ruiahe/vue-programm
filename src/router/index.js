import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 论坛 -- 反馈列表页（重定向：反馈页面）
    {
      path: '/',
      name: 'Feed',
      meta: { keepAlive: false },
      component: () => import('@/page/forum/feed/feed')
    },
    {
      path: '/feed',
      name: 'Feed',
      meta: { keepAlive: false },
      component: () => import('@/page/forum/feed/feed')
    },
    // 论坛 -- 发言列表页
    {
      path: '/list',
      name: 'List',
      meta: { keepAlive: true, isUseCache: true },
      component: () => import('@/page/forum/list/list')
    },
    // 论坛 -- 发言详情页
    {
      path: '/detail',
      name: 'Detail',
      meta: { keepAlive: false },
      component: () => import('@/page/forum/detail/detail')
    },
    // 论坛 -- 消息列表页
    {
      path: '/myMessage',
      name: 'MyMessage',
      meta: { keepAlive: false },
      component: () => import('@/page/forum/myMessage/myMessage')
    },
    // 历史上的今天 -- 列表页
    {
      path: '/todayInHistory/list',
      name: 'todayInHistoryList',
      meta: { keepAlive: true },
      component: () => import('@/page/todayInHistory/list/list')
    },
    // 历史上的今天 -- 详情
    {
      path: '/todayInHistory/detail',
      name: 'todayInHistoryDetail',
      meta: { keepAlive: false },
      component: () => import('@/page/todayInHistory/detail/detail')
    },
    // 房贷计算器 -- 计算器
    {
      path: '/mortgageCaculate/caculate',
      name: 'mortgageCaculateCaculate',
      meta: { keepAlive: true },
      component: () => import('@/page/mortgageCaculate/caculate/caculate')
    },
    // 房贷计算器 -- 利率表
    {
      path: '/mortgageCaculate/rateTable',
      name: 'mortgageCaculateRateTable',
      meta: { keepAlive: false },
      component: () => import('@/page/mortgageCaculate/rateTable/rateTable')
    },
    // 房贷计算器 -- 结果
    {
      path: '/mortgageCaculate/result',
      name: 'mortgageCaculateResult',
      meta: { keepAlive: false },
      component: () => import('@/page/mortgageCaculate/result/result')
    },
    // 个税计算器 -- 输入页
    {
      path: '/personalIncomeTax/input',
      name: 'personalIncomeTaxInput',
      meta: { keepAlive: true, isUseCache: false },
      component: () => import('@/page/personalIncomeTax/input/input')
    },
    // 个税计算器 -- 选择城市
    {
      path: '/personalIncomeTax/choseCity',
      name: 'personalIncomeTaxChoseCity',
      meta: { keepAlive: false },
      component: () => import('@/page/personalIncomeTax/choseCity/choseCity')
    },
    // 个税计算器 -- 专项附加扣除
    {
      path: '/personalIncomeTax/specialAdditional',
      name: 'personalIncomeTaxSpecialAdditional',
      meta: { keepAlive: true },
      component: () => import('@/page/personalIncomeTax/specialAdditional/specialAdditional')
    },
    // 个税计算器 -- 结算结果页
    {
      path: '/personalIncomeTax/result',
      name: 'personalIncomeTaxResult',
      meta: { keepAlive: false },
      component: () => import('@/page/personalIncomeTax/result/result')
    },
    // 个税计算器 -- 每月收入明细
    {
      path: '/personalIncomeTax/incomeDetail',
      name: 'personalIncomeTaxIncomeDetail',
      meta: { keepAlive: false },
      component: () => import('@/page/personalIncomeTax/incomeDetail/incomeDetail')
    },
    // 时间计算器 -- 首页
    {
      path: '/timeSelector/index',
      name: 'timeSelectorIndex',
      meta: { keepAlive: true },
      component: () => import('@/page/timeSelector/index/index')
    },
    // 时间计算器 -- 国家列表
    {
      path: '/timeSelector/countryList',
      name: 'timeSelectorCountryList',
      meta: { keepAlive: false },
      component: () => import('@/page/timeSelector/countryList/countryList')
    },
  ]
})