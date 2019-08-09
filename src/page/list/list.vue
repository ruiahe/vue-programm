<template>
    <div id="statement">
        <wHead :titleJson='titleJson'></wHead>
        <div class="statement-tip">大家有任何建议都可以发送到这儿</div>
        <div class="statement">
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
                            <div class="state-tx">
                                <img :src="i.uimg" alt="">
                            </div>
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
                                <div class="middle-img" v-for="(img, ind) in i.replyImg" :key="ind"> <img :src="img.img" alt=""> </div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v">
                                <img src="../../assets/statement/discuss.png" alt="" @click.stop='show_input(i)'>
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
        <div class="input-box">
            <div class="input container space-between" @click="link_to_app()">
                <img src="../../assets/statement/phone.png" alt="">
                <span>我要发言...</span>
            </div>
        </div>
        <div class="input-placehold"></div>
        <!-- 阴影加弹框 （举报&删除&排序） -->
        <div class="pop" @touchmove.prevent>
            <div class="pop-content list-tip list-tip-complaint" v-on:click='complaint_item()' :class='{"unshow": clickKind != "list-tip-complaint"}'>
                <div class="center-vh">
                    <span></span>举报
                </div>
            </div>
            <div class="pop-content list-tip list-tip-del" v-on:click='delete_item()' :class='{"unshow": clickKind != "list-tip-del"}'>
                <div class="center-vh">
                    <span></span>删除
                </div>
            </div>
            <ul class="pop-content list-sort" :class='{"unshow": clickKind != "list-sort"}'>
                <li class='center-vh' v-for='(i,index) in sortList' :key = 'index' :class="{'chosen': i.chosen}" v-on:click='chose_sort(i)'>{{i.title}}</li>
            </ul>
        </div>
        <!-- 阴影加弹框  （评论弹框） -->
        <div class="pop-comment" @touchmove.prevent>
            <div class="comment">
                <div class="comment-top">
                    <div class="container space-between">
                        <span class='comment-close' @click="close_comment()">X</span>
                        <span class="comment-title">评论</span>
                        <span class="comment-btn center-vh" @click.stop="send_comment()">发送</span>
                    </div>
                </div>
                <div class="comment-txt container">
                    <textarea name="" placeholder="评论点什么..." type='search' @input='change_num()' v-model='comment'></textarea>
                </div>
                <div class="comment-emoji container space-between">
                    <span class='emoji'></span>
                    <span class='emoji-txt'>{{commentLen}}/200</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import wHead from '../windowHead/windowHead'
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
    import {common} from '@/common/js/common.js'
    export default {
        name: 'statement',
        components:{
            wHead,
        },
        data() {
            return {
                titleJson:{
                    title: '',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false
                },                                                  //标题栏数据
                choseItem: {},                                      
                sortList:[
                    {title: '最热发言', id: 1, chosen: true},
                    {title: '最新发言', id: 2, chosen: false},
                    {title: '最近回复', id: 3, chosen: false}
                ],                                                  //排序数据
                clickKind: '',                                      //当前操作的发言类型：list-tip-del(删除)、list-tip-complaint(举报)
                comment: '',                                        //评论内容
                commentLen: 0,                                      //评论内容长度
                list:[],                                            //列表数据
                mescroll: null,                                     //滚动区域
                mescrollObj: null,                                  //滚动对象
                totalNum: 0,                                        //列表数据总数                                    
                sortChosenItem: {id: 1, title: '最热发言'},         //当前选中的排序
                orderBy: 1,                                        //排序
                operaItem: {},                                     //当前操作的数据
                discussId: 0                                       //当前发言id
            }
        },
        methods:{
            // 打开举报遮罩（有可能是举报有可能是删除）
            complaint(e,id,i){
                if (i.isSelf) {
                    this.clickKind = 'list-tip-del';
                    this.pop_position(e.target,'.pop .list-tip-del',true);
                } else {
                    this.clickKind = 'list-tip-complaint';
                    this.pop_position(e.target,'.pop .list-tip-complaint',true);
                }
                this.choseItem = i;
            },
            // 选中举报
            complaint_item(){
                
                $('.pop .pop-content').slideUp(200);
                $('.pop').fadeOut(200);
            },
            // 选中算出
            delete_item(){
                $('.pop .pop-content').slideUp(200);
                $('.pop').fadeOut(200);
            },
            // 选中排序方式
            chose_sort(i){
                this.sortList.forEach(s => {
                    s.chosen = s.id == i.id ? true : false;
                })
                this.sortChosenItem = i;
                this.orderBy = this.sortChosenItem.id;
                this.list = [];
                this.mescrollObj.triggerDownScroll();
                $('.pop .pop-content').slideUp(200);
                $('.pop').fadeOut(200);
            },
            // 打开排序遮罩
            show_sort(e){
                this.clickKind = 'list-sort';
                var ele = e.target.className == 'statement-sort'? e.target : e.target.querySelector('.statement-sort');
                this.pop_position(ele,'.pop .list-sort',false);
            },
            // 定位黑色遮罩中的白框的位置
            pop_position(ele,cName,bol){
                $('.pop').fadeIn(200);
                var yBody = window.screen.availHeight;
                var x = ele.getBoundingClientRect().left - 79;
                var y = ele.getBoundingClientRect().top + 24;
                y = (bol && (y + 57)) > yBody ? y - 81 : y; 
                document.querySelector(cName).style.top = y+'px';
                document.querySelector(cName).style.left = x+'px';
                $(cName).slideDown(200);
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
                    "methodName": "speak"
                })
            },
            // 关闭评论弹框
            close_comment(){
                $('.pop-comment').fadeOut(200);
            },
            // 计算输入的字数
            change_num(){
                var num = this.comment.length;
                if(num < 200) {
                    this.commentLen = num++;
                } else {
                    this.comment = this.comment.substr(0,200);
                    this.commentLen = this.comment.length;
                }
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
                        _this.mescrollObj.endSuccess()// 结束下拉刷新,无参
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
                    console.log('这里是错误回调');
                    console.log(err);
                });
            },
            // 打开发言框
            show_input(item){
                this.operaItem = item;
                $('.pop-comment').fadeIn(200);
            },
            // 发送回复
            send_comment(){
                var _this = this;
                new Request('app/forum/userReplyForumInfo',{
                    "titleId": this.operaItem.id,
                    "replyContent":this.comment,
                    "isOne":false,
                } , 'post' ,'ios' ,'2.0.0', (data) => {
                    _this.close_comment();
                    _this.mescrollObj.triggerDownScroll();
                    _this.comment = '';
                }, (err) => {
                    console.log('这里是错误回调');
                    console.log(err);
                });
            },
            // 点赞
            give_a_like(item,index){
                var _this = this;
                new Request('app/forum/upReply',{
                    "titleId": item.id,
                    "isUp": !item.isUp,
                } , 'post' ,false ,false, (data) => {
                    _this.mescrollObj.triggerDownScroll();
                }, (err) => {
                    console.log('这里是错误回调');
                    console.log(err);
                });
            }
        },
        mounted () {
            var _this = this;
            this.titleJson['title'] = this.$route.query.title;
            this.discussId = this.$route.query.id;
            //创建MeScroll对象
            this.mescrollObj = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down:{
                    auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
                    callback: _this.downCallback
                },
                up: {
                    callback: _this.upCallback,
                    htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
                    noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    empty: {
                        //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                        warpId: "list-box", //父布局的id (1.3.5版本支持传入dom元素)
                        tip: "暂无数据~" //提示
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
