<template>
  <div id="todayInHistoryDetail" @touchmove.prevent>
      <div class="head">
          <wHead :titleJson='titleJson'></wHead>
      </div>
      <div class="content container">
          <div class="content-img" style='background-img:url(../../../assets/statement/phone.png);'></div>
          <div class="content-title">习近平对国家网络安全宣传作出重要指示</div>
          <div class="content-subtitle">新华社2019-09-16 11:47:0566评</div>
          <div class="content-con">
              新华社天津9月16日电 近日，中共中央总书记、国家主席、中央军委主席习近平对国家网络安全宣传周作出重要指示强调，举办网络安全宣传周、提升全民网络安全意识和技能，是国家网络安全工作的重要内容。国家网络安全工作要坚持网络安全为人民、网络安全靠人民，保障个人信息安全，维护公民在网络空间的合法权益。要坚持网络安全教育、技术、产业融合发展，形成人才培养、技术创新、产业发展的良性生态。要坚持促进发展和依法管理相统一，既大力培育人工智能、物联网、下一代通信网络等新技术新应用，又积极利用法律法规和标准规范引导新技术应用。要坚持安全可控和开放创新并重，立足于开放环境维护网络安全，加强国际交流合作，提升广大人民群众在网络空间的获得感、幸福感、安全感。
          </div>
      </div>
  </div>
</template>

<script>
    import wHead from '@/page/windowHead/windowHead'
    export default {
        name: 'headerTool',
        components:{
            wHead
        },
        data(){
            return {
                titleJson:{
                    title: '历史的今天',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false
                }
            }
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
  @import './detail.less';
</style>
