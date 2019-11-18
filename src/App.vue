<template>
    <div id="app">
      <keep-alive> 
        <router-view v-if="$route.meta.keepAlive"></router-view> 
      </keep-alive> 
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import { common } from './common/js/common.js'
import { mapActions } from 'vuex'
import { set_headers } from './common/js/axios'
export default {
  name: 'App',
  methods:{
    ...mapActions('appInfo',[ 
        'getAppInfo'
    ])
  },
  beforeCreate(){
    const _this = this;
    // 本地调试时手动调用设置token的方法
    // set_headers();
    
    // app交互 -- ios传输app token等信息调用的方法
    window['getJson'] = (json) => {
      _this.getAppInfo(json);
      set_headers();
    }
    // app交互 -- 安卓调用返回上一页方法
    window['getback'] = () => {
      const path = this.$route.path;
      const bol = path.indexOf('feed') > -1 || path.indexOf('mortgageCaculate/caculate') > -1 || path.indexOf('personalIncomeTax/input') > -1 || path.indexOf('todayInHistory/list') > -1 || path.indexOf('timeSelector/index') > -1;
      common.back(bol)
    }
    // app交互 -- 分别根据安卓 & ios调用app方法
    if(common.isAndroid()){
      let info = window.Android.getInfo();
      setTimeout(()=>{
        _this.getAppInfo(JSON.parse(info));
      })
      set_headers();
    } else if(common.isIos()){
      window.webkit.messageHandlers.linkTo.postMessage({'methodName': 'getInfo'});
    }
  }
}
</script>
<style>
  @import "./common/style/base.css";
  @import "./common/style/common.less";
</style>