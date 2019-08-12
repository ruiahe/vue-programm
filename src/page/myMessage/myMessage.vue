<template>
    <div id="message">
        <wHead :titleJson='titleJson'></wHead>
        <div class="tab-box">
            <ul class="tab">
                <li class='center-vh' v-for="(item, index) in tabList" :key='index' :class="{'chosen': item.chosen}" v-on:click='chosen_li(item)'>
                    <span class="li-txt">
                        {{item['title']}}
                        <span class='center-vh square' v-if="item.num > 0 && item.num < 100">{{item.num}}</span>
                        <span class='center-vh jx' v-if="item.num > 99">99+</span>
                    </span>
                </li>
            </ul>
        </div>
        <!-- 滚动区域 -->
        <div ref='mescroll' class="mescroll" id='mescrollList'>
            <div>
                <div class="release" v-if='chosen_tab.id == 0'>
                    <div class="state" v-for='(relItem, relInd) in releaseList' :key='relInd'>
                        <div class="state-top container space-between">
                            <div class="state-tx">
                                <img :src="relItem['uimg']" alt="">
                            </div>
                            <div class="state-inf center-v">
                                <span class="state-name">{{relItem['nickname']}}</span>
                                <img class='state-img' src="../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{relItem['deviceOsVersion']}}</span>
                                <span class='state-version'>{{relItem['appVersion']}}</span>
                            </div>
                            <div class="state-ellipsis" v-on:click='complaint($event,relItem["id"], relItem)'>
                                <img src="../../assets/statement/ellipsis.png" alt="">
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt container">
                                {{relItem['replyContent']}}
                            </div>
                            <div class="middle-img-list" v-if='relItem["replyImg"]'>
                                <div class="middle-img" v-for='(imgItem, imgInd) in relItem["replyImg"]' :key='imgInd'> 
                                    <img :src="imgItem.img" alt=""> 
                                </div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v" @click.stop='give_a_like(relItem, relInd)'>
                                <img src="../../assets/statement/discuss.png" alt="" @click.stop='show_input(relItem)'>
                                {{relItem['replyCount']}}
                                <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='!relItem["isUp"]'>
                                <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='relItem["isUp"]'>
                                <span :class='{"like": relItem["isUp"]}'>{{relItem['upCount']}}</span>
                            </div>
                            <div class="state-time">
                                {{relItem['replyDatetime']}}
                            </div>
                        </div>
                        <div class="state-gray"></div>
                    </div>
                </div>
                <div class="replyme" v-if='chosen_tab.id == 1'>
                    <div class="state" v-for="(repItem, repInd) in replymeList" :key="repInd">
                        <div class="state-top container space-between">
                            <div class="state-tx">
                                <img :src="repItem['uimg']" alt="">
                            </div>
                            <div class="state-inf center-v">
                                <span class="state-name">{{repItem['nickname']}}</span>
                                <img class='state-img' src="../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{repItem['deviceOsVersion']}}</span>
                                <span class='state-version'>{{repItem['appVersion']}}</span>
                            </div>
                            <div class="state-ellipsis" v-on:click='complaint($event,repItem["id"],repItem)'>
                                <img src="../../assets/statement/ellipsis.png" alt="">
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt container" @click.stop='show_input(repItem)'>
                                回复<span>{{repItem['reply']['nickname']}}</span>：{{repItem['commentContent']}}
                            </div>
                            <div class="middle-reply container">
                                <div class="reply-img center-v">
                                    <img :src="repItem['reply']['uimg']" alt="">
                                    <span>{{repItem['reply']['nickname']}}</span>
                                </div>
                                <div class="reply-con">
                                    {{repItem['reply']['replyContent']}}
                                </div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v">
                                <span class="state-reply">回复</span>
                                <span class="center-v" @click.stop='give_a_like(repItem, repInd)'>
                                    <img class='up' src="../../assets/statement/upGray.png" alt="" v-if="!repItem['isUp']">
                                    <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if="repItem['isUp']">
                                    <span :class='{"like": repItem["isUp"]}'>{{repItem['upCount']}}</span>
                                </span>
                            </div>
                            <div class="state-time">
                                {{repItem['replyDatetime']}}
                            </div>
                        </div>
                        <div class="state-gray"></div>
                    </div>
                </div>
                <div class="getUp" v-if='chosen_tab.id == 2'>
                    <div class="state" v-for="(upItem, upInd) in getUpList" :key="upInd">
                        <div class="state-top container space-between">
                            <div class="state-tx">
                                <img :src="upItem.uimg" alt="">
                            </div>
                            <div class="state-inf center-v">
                                <span class="state-name">{{upItem['nickname']}}</span>
                                <img class='state-img' src="../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{upItem['deviceOsVersion']}}</span>
                                <span class='state-version'>{{upItem['appVersion']}}</span>
                            </div>
                            <div class="state-time">
                                {{upItem['replyDatetime']}}
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt container" v-if="upItem['commentContent'] && upItem['commentContent'].length >0">
                                赞了我的回复//<span>我</span> 回复 <span>{{upItem['commentWho']}}</span>：{{upItem['commentContent']}}
                            </div>
                            <div class="middle-txt container" v-if="!upItem['commentContent'] || upItem['commentContent'].length ==0">
                                赞了我的评论
                            </div>
                            <div class="middle-reply container">
                                <div class="reply-img center-v">
                                    <img :src="upItem['reply']['uimg']" alt="">
                                    <span>{{upItem['reply']['nickname']}}</span>
                                </div>
                                <div class="reply-con">
                                    {{upItem['reply']['replyContent']}}
                                </div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                        </div>
                        <div class="state-gray"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 阴影加弹框 （举报&删除&排序） -->
        <pop :clickKind='clickKind' :chosenItem = 'choseItem' :deleteUrl='deleteUrl' @delete_current='delete_current'></pop>
        <!-- 阴影加弹框  （评论弹框） -->
        <popCommit :operaId='operaId' :commitUrl='commitUrl' @refresh='delete_current'></popCommit>
    </div>
</template>
<script>
    import wHead from '../windowHead/windowHead'
    import $ from 'jquery'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import {Request} from '@/common/js/api.js'
    import popCommit from '@/page/common/popComment/popComment'
    import pop from '@/page/common/pop/pop'
    export default {
    name: 'message',
    components:{
        wHead,
        pop,
        popCommit
    },
    data() {
        return {
            tabList:[
                {title: '我发布的', chosen: true, num: 0, id: 0, url:'app/forum/queryMyIssuedList'},
                {title: '回复我的', chosen: false, num: 0, id: 1, url:'app/forum/replyMyList'},
                {title: '收到的赞', chosen: false, num: 0, id: 2, url:'app/forum/upMyList'}
            ],
            titleJson:{
                title: '消息',
                toolBol: false,
                toolTitle: '',
                hasRed: false
            },
            chosen_tab : {id: 0, url: 'app/forum/queryMyIssuedList'},
            mescrollObj: null,
            releaseList: [],
            replymeList: [],
            getUpList: [],
            operaId: 0,
            deleteUrl: 'app/forum/deleteForumReplyInfo',
            compaintUrl: 'app/forum/reportForumReplyInfo',
            commitUrl: 'app/forum/userReplyForumInfo',
            choseItem: null
        }
    },
    mounted () {
        var _this = this;
        new Request('app/forum/statisticsReplyInfo',{} , 'post' ,false,false, (data) => {
            _this.$nextTick(()=> {
                _this.tabList[1]['num'] = data['data']['replyCount'];
                _this.tabList[2]['num'] = data['data']['upCount'];
            })
        }, (err) => {
            console.log('这里是错误回调');
            console.log(err);
        });
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
    methods:{
        // 切换tab
        chosen_li(i){
            var par = $('.tab');
            this.tabList.forEach(ele => {
                ele.chosen = (ele.id == i.id ? true : false); 
            })
            switch(i.id){
                case 0:
                    this.releaseList = [];
                    $(par).removeClass('second').removeClass('third');
                    break;
                case 1:
                    this.replymeList = [];
                    $(par).removeClass('third').addClass('second');
                    break;
                case 2:
                    this.getUpList = [];
                    $(par).removeClass('second').addClass('third');
                    break;
            }
            this.chosen_tab = i;
            this.mescrollObj.resetUpScroll( true );
        },
        // 获取数据
        getData(num, size, sucCal){
            var url = this.chosen_tab['url'];
            new Request(url, {
                'pageSize': size,
                'pageNum': num
            }, 'post' ,false,false, sucCal, (err) => {
                console.log('这里是错误回调');
                console.log(err);
            });
        },
        // 下拉刷新
        downCallback() {
            var _this = this;
            this.getData(1, 10, (data)=>{
                var curPageData = data['data']['dataList'];
                _this.totalNum = data['data']['totalNum'];
                _this.list = curPageData;
                _this.mescrollObj.resetUpScroll( true );
                _this.$nextTick(() => {
                    _this.mescrollObj.endSuccess();// 结束下拉刷新,无参
                })
            });
        },
        //上拉回调
        upCallback(page) {
            var pageNum = page.num; 
            var pageSize = page.size;
            var _this = this;
            this.getData(pageNum, pageSize, (data)=>{
                var curPageData = data['data']['dataList'];
                _this.totalNum = data['data']['totalNum'];
                switch(_this.chosen_tab.id){
                    case 0:
                        _this.releaseList = _this.releaseList.concat(curPageData);
                        break;
                    case 1:
                        _this.replymeList = _this.replymeList.concat(curPageData);
                        break;
                    case 2:
                        _this.getUpList = _this.getUpList.concat(curPageData);
                        break;
                }
                _this.$nextTick(() => {
                    _this.mescrollObj.endSuccess(curPageData.length)
                })
            });
        },
        // 打开评论
        show_input(item){
            this.operaId = item.id;
            popCommit.methods.show_input();
        },
        // 发送评论后刷新
        delete_current(){
            switch(this.chosen_tab.id) {
                case 0:
                    this.releaseList = [];
                    break;
                case 1: 
                    this.replymeList = [];
                    break;
                case 2:
                    this.getUpList = [];
                    break;
            }
            this.mescrollObj.resetUpScroll( true );
        },
        // 点赞
        give_a_like(item, index){
            var _this = this;
            new Request('app/forum/upReply',{
                "titleId": item.id,
                "isUp": !item.isUp,
            } , 'post' ,false ,false, (data) => {
                _this.delete_current();
            }, (err) => {
                console.log('这里是错误回调');
                console.log(err);
            });
        },
        // 打开举报遮罩（有可能是举报有可能是删除）
        complaint(e,id,i){
            var x = e.target.getBoundingClientRect().left - 79;
            var y = e.target.getBoundingClientRect().top + 24;
            this.clickKind = 'list-tip-del';
            pop.methods.pop_position(x, y, '#pop .list-tip-del',true);
            this.choseItem = i;
        },
    },
    beforeCreate(){
        document.querySelector('body').style='background:#F7F7F7;';
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/style/stateList.less';
  @import './myMessage.less';
</style>
