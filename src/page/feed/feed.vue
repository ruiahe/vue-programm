<template>
    <div id="feedback" v-cloak>
        <wHead :titleJson='titleJson'></wHead>
        <div class="box">
            <div class="mescroll" ref='mescroll' id='mescroll'>
                <div>
                    <div class="list" v-for='(item,index) in list' :key="index" v-on:click='link_to("/list", item.id, item.title)'>
                        <div class="list-box">
                            <div class='space-between'>
                                <div class='list-title'>{{item.title}}</div>
                                <div class='list-participants'>{{item.replyCount}}人参与</div>
                            </div>
                            <div class='list-statement'>{{item.replyPersonCount}} 条发言</div>
                            <div class='list-content space-between' v-if='item.replyContent != "" && item.replyContent != null'>
                                <div class="content-img">
                                    <img :src="item.uimg" alt=""></div>
                                <div class="content-txt">{{item.replyContent}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Request} from '@/common/js/api.js'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import wHead from '../windowHead/windowHead'
    export default {
        name: 'Feed',
        data () {
            return {
                list: [],                       //数据列表
                titleJson:{
                    title: '反馈讨论',           //标题栏标题文案
                    url: '/myMessage',          //标题栏右侧工具跳转链接
                    toolBol: true,              //标题栏右侧是否有功能
                    toolTitle: '消息',          //标题栏右侧工具文案
                    hasRed: false,              //消息小红点
                },                              //头部标题栏信息配置
                mescroll: null,                 //滚动区域
                mescrollObj: null,              //上拉加载对象
            }
        },
        components:{
            wHead
        },
        methods:{
            link_to(url, id, title){
                this.$router.push({
                    path: url, 
                    query:{id: id, title: title}
                });
            },
            // 上拉加载
            upCallback(page){
                var pageNum = page.num; 
                var pageSize = page.size;
                var _this = this;
                this.getData(pageNum, pageSize, (data)=>{
                    var curPageData = data['data']['dataList'];
                    var totalSize = data['data']['totalNum'];
                    _this.list = _this.list.concat(curPageData);
                    _this.mescrollObj.endBySize(curPageData.length, totalSize);
                    this.$nextTick(() => {
                        this.mescrollObj.endSuccess(curPageData.length)
                    })
                });
            },
            // 下拉刷新
            downCallback() {
                var _this = this;
                this.getData(1, 10, (data)=>{
                    var curPageData = data['data']['dataList'];
                    var totalSize = data['data']['totalNum'];
                    _this.list = curPageData;
                    _this.$nextTick(() => {
                        _this.mescrollObj.endSuccess()// 结束下拉刷新,无参
                    })
                });
            },
            // 获取数据
            getData(pageNum, pageSize, callbackSuc, callbackErr){
                var _this = this;
                new Request('app/forum/queryForumFeedbackModulesList',{
                    "pageSize":pageSize,
                    "pageNum":pageNum
                }, 'post' ,false,false, callbackSuc, function(err){
                    console.log('这里是错误回调');
                    console.log(err);
                });
            }
        },
        beforeCreate(){
            // 设置body整体背景色
            document.querySelector('body').style = 'background:#F7F7F7';
        },
        mounted() {
            var _this = this;
            // 实例化上拉刷新对象
            this.mescrollObj = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id (1.3.5版本支持传入dom对象)
                down: {
                    auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
                    callback: _this.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
                },
                up: {
					callback: _this.upCallback, //上拉加载的回调
					//以下是一些常用的配置,当然不写也可以的.
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 10 //每页数据条数,默认10
					},
					htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
					noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
				}
            });
            // 获取消息小红点相关
            new Request('app/forum/statisticsReplyInfo',{}, 'post' ,false,false, function(data){
                if(data['data']['replyCount'] + data['data']['upCount'] > 0) _this.titleJson['hasRed'] = true;
            }, function(err){
                console.log('这里是错误回调');
                console.log(err);
            });
        }
    }
</script>
<style lang="less" scoped>
  @import './feed.less';
</style>
