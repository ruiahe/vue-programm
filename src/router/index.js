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
import personalIncomeTaxInput from '@/page/personalIncomeTax/input/input'
import personalIncomeTaxChoseCity from '@/page/personalIncomeTax/choseCity/choseCity'
import personalIncomeTaxSpecialAdditional from '@/page/personalIncomeTax/specialAdditional/specialAdditional'
import personalIncomeTaxResult from '@/page/personalIncomeTax/result/result'
import personalIncomeTaxIncomeDetail from '@/page/personalIncomeTax/incomeDetail/incomeDetail'

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
        keepAlive: true
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
        keepAlive: true
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
    },
    // 个税计算器 -- 输入页
    {
      path: '/personalIncomeTax/input',
      name: 'personalIncomeTaxInput',
      component: personalIncomeTaxInput,
      meta: {
        keepAlive: true
      }
    },
    // 个税计算器 -- 选择城市
    {
      path: '/personalIncomeTax/choseCity',
      name: 'personalIncomeTaxChoseCity',
      component: personalIncomeTaxChoseCity,
      meta: {
        keepAlive: true
      }
    },
    // 个税计算器 -- 专项附加扣除
    {
      path: '/personalIncomeTax/specialAdditional',
      name: 'personalIncomeTaxSpecialAdditional',
      component: personalIncomeTaxSpecialAdditional,
      meta: {
        keepAlive: true
      }
    },
    // 个税计算器 -- 结算结果页
    {
      path: '/personalIncomeTax/result',
      name: 'personalIncomeTaxResult',
      component: personalIncomeTaxResult,
      meta: {
        keepAlive: false
      }
    },
    // 个税计算器 -- 每月收入明细
    {
      path: '/personalIncomeTax/incomeDetail',
      name: 'personalIncomeTaxIncomeDetail',
      component: personalIncomeTaxIncomeDetail,
      meta: {
        keepAlive: false
      }
    }
  ]
})