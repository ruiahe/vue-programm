<template>
  <div id="todayInHistoryDetail">
      <div class="head">
          <wHead :titleJson='titleJson'></wHead>
      </div>
      <div class="content container" v-if="dataJson['result']&&dataJson['result'][0]">
          <div class="content-img" :style="{ 'background-image': 'url('+dataJson['result'][0]['pic']+')'}" v-if="dataJson['result'][0]['pic']&&dataJson['result'][0]['pic'].length>0"></div>
          <div class="content-title" @click="link_to('/mortgageCaculate/caculate')">{{dataJson['result'][0]['title']}}</div>
          <div class="content-subtitle">{{dataJson['result'][0]['lunar']}}</div>
          <div class="content-con">
              {{dataJson['result'][0]['content']}}
          </div>
      </div>
  </div>
</template>

<script>
    import wHead from '@/page/windowHead/windowHead'
    import {tohdet} from '../../../common/js/myApi'
    export default {
        name: 'headerTool',
        components:{
            wHead
        },
        data(){
            return {
                dataJson: {},
                detailId: 0,
                titleJson:{
                    title: '历史的今天',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false
                }
            }
        },
        methods: {
            // 获取详情页数据
            get_data(){
                tohdet({ v: '1.0', id: this.detailId }, (res)=>{
                    this.dataJson = res;
                })
            },
            link_to(path){
                this.$router.push({
                    path: path, 
                });
            }
        },
        mounted(){
            this.detailId = this.$route.query.id;
            this.get_data();
        }
    }
</script>
<style lang="less" scoped>
  @import './detail.less';
</style>
