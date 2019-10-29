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
    // set_headers();
    window['getJson'] = (json) => {
      _this.getAppInfo(json);
      set_headers();
    }
    window['getback'] = () => {
      const path = this.$route.path;
      const bol = path.indexOf('feed') > -1 || 
        path.indexOf('mortgageCaculate/caculate') > -1 || 
        path.indexOf('personalIncomeTax/input') > -1 ||
        path.indexOf('todayInHistory/list') > -1;
      common.back(bol)
    }
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