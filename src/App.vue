<template>
    <div id="app">
      <keep-alive> 
        <router-view v-if="$route.meta.keepAlive"></router-view> 
      </keep-alive> 
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import {common} from './common/js/common.js'
export default {
  name: 'App',
  components:{
  },
  methods:{
  },
  beforeCreate(){
    common.getInfo();
    window['getJson'] = (json) => {
      window.localStorage.setItem('token', JSON.stringify(json));
    }
  }
}
</script>
<style>
  @import "./common/style/base.css";
  @import "./common/style/common.less";
</style>