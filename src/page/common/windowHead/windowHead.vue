<template>
<!-- 
  配置信息：
    title: 配置导航文案;
    toolBol: 配置右侧是否有工具,默认为否;
    toolTitle: 配置右侧工具文案;
    hasRed: 配置右侧工具是否有红点;
    url: 配置右侧工具跳转链接;
 -->
  <div id="header" @touchmove.prevent>
      <div class="header-box">
          <div class="space-between">
              <div class="arrow center-vl" @click.stop='back_to()' :class="{'close': titleJson['close']}"></div>
              <!-- <div class="title"  v-on:click='link_to(titleJson["url"], titleJson["title"])'>{{titleJson['title']}}</div> -->
              <div class="title">{{titleJson['title']}}</div>
              <span v-if='!titleJson["toolBol"]' class="tool center-h"></span>
              <span v-if='titleJson["toolBol"] && titleJson["toolTitle"]!="···" && titleJson["toolTitle"]!="calendar"' class="tool center-h" :class="{'hasRed': titleJson['hasRed']}" :style="'color:'+titleJson['color']+'!important;'">
                  <span v-on:click='link_to(titleJson["url"])'>{{titleJson['toolTitle']}}</span>
              </span>
              <span v-if='titleJson["toolBol"] && titleJson["toolTitle"]=="···"' class="tool center-vr" :class="{'hasRed': titleJson['hasRed']}">
                  <span class='center-vr' @click.stop="emit_parent($event)">
                      <img src="../../../assets/statement/ellipsis.png" alt="">
                  </span>
              </span>
              <span v-if='titleJson["toolBol"] && titleJson["toolTitle"]=="calendar"' class="tool center-vr calendar" :class="{'hasRed': titleJson['hasRed']}">
                  <span class='center-vr' @click.stop="emit_parent($event)">
                      <img src="../../../assets/date-icon.png" alt="">
                  </span>
              </span>
          </div>
      </div>
      <div class="header-placeholder"></div>
  </div>
</template>

<script>
    import {common} from '@/common/js/common'
    export default {
        name: 'headerTool',
        props:{
          titleJson: {
                title: '你好',
                toolBol: false,
                toolTitle: '',
                hasRed: false,
                url: '',
                close: false,
                color: 'rgba(155,155,155,1)'
            }
        },
        data(){
            return {
                pageNum: null,
            }
        },
        methods: {
          link_to(url,type){
            //   if(type == '探记说吧'){
            //       this.$router.push({path: 'todayInHistory/list'});
            //   } else {
                  this.$router.push({path: url});
            //   }
          },
          back_to(){
              let path = this.$route.path;
              let bol = (this.titleJson['title'].indexOf('探记说吧') > -1) || 
                (path.indexOf('feed') > -1) || 
                path.indexOf('mortgageCaculate/caculate') > -1 || 
                path.indexOf('personalIncomeTax/input') > -1 || 
                path.indexOf('todayInHistory/list') > -1;
              common.back(bol);
          },
          emit_parent(e){
              this.$emit('emitClick',e);
          }
        }
    }
</script>
<style lang="less" scoped>
  @import './windowHead.less';
</style>
