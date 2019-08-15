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
          <div class="arrow center-vl" @touchstart='back_to()'>
              <img src="../../assets/header/arrow.png" alt="">
          </div>
          <div class="title">{{titleJson['title']}}</div>
          <span class="tool center-vh" :class="{'hasRed': titleJson['hasRed']}">
            <span v-if='titleJson["toolBol"] && titleJson["toolTitle"]!="···"' v-on:click='link_to(titleJson["url"])'>{{titleJson['toolTitle']}}</span>
            <span v-if='titleJson["toolBol"] && titleJson["toolTitle"]=="···"' class='center-vh' @click.stop="emit_parent($event)">
              <img src="../../assets/statement/ellipsis.png" alt="">
            </span>
          </span>
        </div>
      </div>
      <div class="header-placeholder"></div>
  </div>
</template>

<script>
    import {common} from '../../common/js/common'
    export default {
        name: 'headerTool',
        props:{
          titleJson: {
                title: '你好',
                toolBol: false,
                toolTitle: '',
                hasRed: false,
                url: '',
            }
        },
        data(){
            return {
                pageNum: null,
            }
        },
        methods: {
          link_to(url){
              this.$router.push({path: url});
          },
          back_to(){
              if(this.pageNum - 1 >= 0){
                window.sessionStorage.setItem('pageNum', this.pageNum - 2);
                common.back();
              } else {
                window.sessionStorage.setItem('pageNum', -1)
                common.back(true)
              }
          },
          emit_parent(e){
              this.$emit('emitClick',e);
          }
        },
        beforeCreate(){
            common.getInfo();
        },
        mounted(){
            var num = window.localStorage.getItem('pageNum');
            if(num > 0){
                window.localStorage.setItem('pageNum', -1);
            } else {
                num = window.sessionStorage.getItem('pageNum');
            }
            this.pageNum = num ? (Number(num)+1) : 0;
            window.sessionStorage.setItem('pageNum', this.pageNum);
        }
    }
</script>
<style lang="less" scoped>
  @import './windowHead.less';
</style>
