<template>
  <div id="todayInHistoryDetail">
      <div class="head">
          <wHead :titleJson='titleJson'></wHead>
      </div>
      <div class="content container">
          <div class="content-img" :style="{ 'background-image': 'url('+dataJson['pic']+')'}" v-if="dataJson['pic']&&dataJson['pic'].length>0"></div>
          <div class="content-title">{{dataJson['title']}}</div>
          <div class="content-subtitle">
              来源于聚合数据
          </div>
          <div class="content-con">
              {{dataJson['content']}}
          </div>
      </div>
  </div>
</template>

<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import {getEventDetail} from '../../../common/js/myApi'
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
                getEventDetail({ eventId: this.detailId }, (res)=>{
                    this.dataJson = res['data'];
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
