<template>
    <div id="statement">
        <wHead :titleJson='titleJson'></wHead>
        <div class="statement-tip" @touchmove.prevent>{{subTitle}}</div>
        <div class="statement" @touchmove.prevent>
            <div class="container space-between">
                <span class='statement-num'>共{{totalNum}}条发言</span>
                <span class='statement-sort' @click="show_sort($event)">{{sortChosenItem.title}}</span>
            </div>
        </div>
        <!-- 滚动区域 -->
        <div ref='mescroll' class="mescroll" id='mescrollList'>
            <div>
                <div class="list-box" id="list-box">
                    <div class="state" v-on:click='statement_details(i.id)' v-for='(i, index) in list' :key="index">
                        <div class="state-top container space-between">
                            <div class="state-tx" :imgurl="i.uimg" style="background-image: url('../../assets/load.jpg');"></div>
                            <div class="state-inf center-v">
                                <span class="state-name">{{i.nickName}}</span>
                                <img class='state-img' src="../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{i.deviceOsVersion}} </span>
                                <span class='state-version'>{{i.appVersion}}</span>
                            </div>
                            <div class="state-ellipsis" @click.stop='complaint($event, i.id, i)'>
                                <img src="../../assets/statement/ellipsis.png" alt="">
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt container">
                                {{i.replyContent}}
                            </div>
                            <div class="middle-img-list" v-if='i.replyImg'>
                                <div class="middle-img" v-for="(img, ind) in i.replyImg" :key="ind"  :imgurl="img.img" style="background-image: url('../../assets/load.jpg');"></div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v">
                                <img src="../../assets/statement/discuss.png" alt="" @click.stop='show_input(i, index)'>
                                {{i.replyCount}}
                                <span class='center-v' @click.stop='give_a_like(i, index)'>
                                    <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='!i.isUp'>
                                    <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='i.isUp'>
                                    <span :class='{"like": i.isUp}'>{{i.upCount}}</span>    
                                </span>    
                            </div>
                            <div class="state-time">
                                {{i.replyDatetime}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-box" @touchmove.prevent>
            <div class="input container space-between" @click="link_to_app()">
                <img src="../../assets/statement/phone.png" alt="">
                <span>我要发言...</span>
            </div>
        </div>
        <div class="input-placehold"></div>
        <!-- 阴影加弹框 （举报&删除&排序） -->
        <pop :sortChosenItem='sortChosenItem' :clickKind='clickKind' :chosenItem = 'choseItem' :deleteUrl='deleteUrl' :compaintUrl='compaintUrl' @delete_current='delete_current' @change_sort='change_sort'></pop>
        <!-- 阴影加弹框  （评论弹框） -->
        <popCommit :operaId='operaId' :commitUrl='commitUrl' @refresh='commit_current'></popCommit>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
    </div>
</template>
<script>
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import wHead from '../windowHead/windowHead'
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
    import {common} from '@/common/js/common.js'
    import pop from '@/page/common/pop/pop'
    import popCommit from '@/page/common/popComment/popComment'
    export default {
        name: 'statement',
        components:{
            wHead,
            pop,
            popCommit
        },
        data() {
            return {
                titleJson:{
                    title: '',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false
                },                                                      //标题栏数据
                choseItem: {},                                          //当前选中对象
                clickKind: '',                                          //当前操作的发言类型：list-tip-del(删除)、list-tip-complaint(举报)
                list:[],                                                //列表数据
                mescroll: null,                                         //滚动区域
                mescrollObj: null,                                      //滚动对象
                totalNum: 0,                                            //列表数据总数                                    
                sortChosenItem: {id: 1, title: '最热发言'},              //当前选中的排序
                orderBy: 1,                                             //排序
                discussId: 0,                                           //当前发言id
                deleteUrl: 'app/forum/deleteForumReplyInfo',            //删除链接 
                compaintUrl: 'app/forum/reportForumReplyInfo',          //举报链接
                commitUrl: 'app/forum/userReplyForumInfo',              // 
                operaId: 0,
                index: 0,                                                    //当前是第n条数据
                subTitle: ''
            }
        },
        methods:{
            // 打开举报遮罩（有可能是举报有可能是删除）
            complaint(e,id,i){
                var x = e.target.getBoundingClientRect().left - 79;
                var y = e.target.getBoundingClientRect().top + 24;
                if (i.isSelf) {
                    this.clickKind = 'list-tip-del';
                    pop.methods.pop_position(x, y, '#pop .list-tip-del',true);
                } else {
                    this.clickKind = 'list-tip-complaint';
                    pop.methods.pop_position(x, y, '#pop .list-tip-complaint',true);
                }
                this.choseItem = i;
            },
            // 打开排序遮罩
            show_sort(e){
                this.clickKind = 'list-sort';
                var ele = e.target.className == 'statement-sort'? e.target : e.target.querySelector('.statement-sort');
                var x = ele.getBoundingClientRect().left - 79;
                var y = ele.getBoundingClientRect().top + 24;
                pop.methods.pop_position(x, y, '#pop .list-sort',false);
            },
            // 跳转至详情页
            statement_details(id){
                this.$router.push({
                    path: '/detail', 
                    query:{id: id}
                });
            },
            // 跳转到app的评论页
            link_to_app(){
                common.link_to_app({
                    "titleId": this.discussId,
                    "sortNum": this.orderBy,
                    "methodName": "speak"
                })
            },
            //上拉回调
            upCallback(page) {
                var pageNum = page.num; 
                var pageSize = page.size;
                var _this = this;
                this.getData(pageNum, pageSize, (data)=>{
                    var curPageData = data['data']['dataList'];
                    _this.totalNum = data['data']['totalNum'];
                    _this.list = _this.list.concat(curPageData);
                    _this.mescrollObj.endBySize(curPageData.length, _this.totalNum);
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
                    _this.totalNum = data['data']['totalNum'];
                    _this.list = curPageData;
                    _this.$nextTick(() => {
                        _this.mescrollObj.endSuccess();// 结束下拉刷新,无参
                    })
                });
            },
            // 获取数据
            getData(pageNum, pageSize, callbackSuc, callbackErr, obj){
                var _this = this;
                new Request('app/forum/queryForumReplyList',{
                    "titleId": _this.discussId,
                    "pageSize":pageSize,
                    "pageNum":pageNum,
                    "orderBy": _this.orderBy
                } , 'post' ,false,false, callbackSuc, function(err){
                    common.show_weakTip('服务器正忙，请稍后再试');
                });
            },
            // 打开发言框
            show_input(item, index){
                this.operaId = item.id;
                this.index = index;
                popCommit.methods.show_input();
            },
            // 点赞
            give_a_like(item,index){
                var _this = this;
                new Request('app/forum/upReply',{
                    "titleId": item.id,
                    "isUp": !item.isUp,
                } , 'post' ,false ,false, (data) => {
                    _this.$nextTick(()=>{
                        _this.list[index]['isUp'] = !item.isUp;
                        _this.list[index]['upCount'] = data['data']['upCount'];
                    })
                }, (err) => {
                    common.show_weakTip('服务器正忙，请稍后再试');
                });
            },
            // 删除数据后
            delete_current(){
                this.list = [];
                this.mescrollObj.resetUpScroll(true);
            },
            // 评论后
            commit_current(data){
                var _this = this;
                this.$nextTick(()=>{
                    _this.list[this.index]['replyCount'] = data['data']['replyCount'];
                });
            },
            // 排序后
            change_sort(i){
                this.sortChosenItem = i;
                this.orderBy = this.sortChosenItem.id;
                this.list = [];
                this.mescrollObj.triggerDownScroll();
            }
        },
        mounted () {
            var _this = this;
            this.titleJson['title'] = this.$route.query.title;
            this.subTitle = this.$route.query.subtitle;
            this.discussId = this.$route.query.id;
            this.orderBy = this.$route.query.sort ? this.$route.query.sort : 1;
            //创建MeScroll对象
            this.mescrollObj = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down:{
                    auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
                    callback: _this.downCallback
                },
                up: {
                    callback: _this.upCallback,
                    htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
                    noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    empty: {
                        //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                        warpId: "list-box", //父布局的id (1.3.5版本支持传入dom元素)
                        tip: "暂无数据~" //提示
                    },
                    lazyLoad: {
                        use: true, // 是否开启懒加载,默认false
                    }
                },
            })
        },
        beforeCreate(){
            document.querySelector('body').style='background:#F7F7F7;';
        }
    }
</script>
<style lang="less" scoped>
    @import '../../common/style/stateList.less';
    @import './list.less';
</style>
