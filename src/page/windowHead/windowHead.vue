<template>
<!-- 
  配置信息：
    title: 配置导航文案;
    toolBol: 配置右侧是否有工具,默认为否;
    toolTitle: 配置右侧工具文案;
    hasRed: 配置右侧工具是否有红点;
    url: 配置右侧工具跳转链接;
 -->
  <div id="header">
      <div class="header-box">
        <div class="space-between">
          <div class="arrow center-vl" @click='back_to()'>
              <img src="../../assets/header/arrow.png" alt="">
          </div>
          <div class="title">{{titleJson['title']}}</div>
          <span class="tool" :class="{'hasRed': titleJson['hasRed'], 'newFont': titleJson['toolTitle']=='···'}">
            <span v-if='titleJson["toolBol"]' v-on:click='link_to(titleJson["url"])'>{{titleJson['toolTitle']}}</span>
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
                url: ''
            }
        },
        methods: {
          link_to(url){
              this.$router.push({path: url});
          },
          back_to(){
              this.$router.go(-1)
          }
        },
        beforeRouteEnter(to, from, next) {
          console.log('------------------------')
          console.log(to)
          next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
          console.log('---------------');
              console.log(to)
              console.log(from)
          })
        }
    }
</script>
<style lang="less" scoped>
  @import './windowHead.less';
</style>
