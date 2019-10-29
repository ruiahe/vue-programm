<template>
    <div id="message">
        <div class="message-head">
            <wHead :titleJson='titleJson'></wHead>
        </div>
        <div class="tab-box" @touchmove.prevent>
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
            <div class='mescroll-box'>
                <div class="release" v-if='chosen_tab.id == 0'>
                    <div class="state" v-for='(relItem, relInd) in releaseList' :key='relInd'>
                        <div class="state-top container space-between">
                            <div class="state-tx" :imgurl="relItem['uimg']" style="background-image: url('../../../assets/load.jpg');">
                            </div>
                            <div class="state-inf center-v">
                                <span class="state-name">{{relItem['nickname']}}</span>
                                <img class='state-img' src="../../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{relItem['deviceOsVersion']}}</span>
                                <span class='state-version'>{{relItem['appVersion']}}</span>
                            </div>
                            <div class="state-ellipsis" v-on:click='complaint($event,relItem["id"], relItem)'>
                                <img src="../../../assets/statement/ellipsis.png" alt="">
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt2 container">
                                {{relItem['replyContent']}}
                            </div>
                            <div class="middle-img-list" v-if='relItem["replyImg"]'>
                                <div class="middle-img" v-for='(imgItem, imgInd) in relItem["replyImg"]' :key='imgInd' :imgurl="imgItem.img" style="background-image: url('../../../assets/load.jpg');" @click.stop='show_big_img(relItem["replyImg"], imgInd)'> 
                                    <!-- <img :src="imgItem.img" alt="">  -->
                                </div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v" @click.stop='give_a_like(relItem, relInd)' :class="{'animate': relItem['animate']}">
                                <img src="../../../assets/statement/discuss.png" alt="" @click.stop='show_input(relItem,relInd)'>
                                {{relItem['replyCount']>0?relItem['replyCount']:''}}
                                <span class="center-v">
                                    <i :class="{'isUp': relItem['isUp']}"></i>
                                    <span :class='{"like": relItem["isUp"]}'>{{relItem['upCount']>0?relItem['upCount']:''}}</span>
                                </span>
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
                                <img class='state-img' src="../../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{repItem['deviceOsVersion']}}</span>
                                <span class='state-version'>{{repItem['appVersion']}}</span>
                            </div>
                            <div class="state-ellipsis" v-on:click='complaint($event,repItem["id"],repItem)'>
                                <img src="../../../assets/statement/ellipsis.png" alt="">
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt2 container" @click.stop='show_input(repItem,repInd)'>
                                回复<span>我</span>：{{repItem['replyContent']}}//<span>我</span> 回复 <span>{{repItem['commentWho']}}</span>
                            </div>
                            <div class="middle-reply container">
                                <div class="reply-img center-v" v-if="repItem['reply']">
                                    <img :src="repItem['reply']['uimg']" alt="">
                                    <span>{{repItem['reply']['nickname']}}</span>
                                </div>
                                <div class="reply-con" v-if="repItem['reply']">
                                    {{repItem['reply']['replyContent']}}
                                </div>
                                <div class="repl" v-if='!repItem["reply"]'>
                                    该评论已删除
                                </div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v" :class="{'animate': repItem['animate'], 'isUp': repItem['isUp']}">
                                <span class="state-reply" @click.stop='show_input(repItem,repInd)'>回复</span>
                                <span class="center-v" @click.stop='give_a_like(repItem, repInd)' :class="{'animate': repItem['animate']}">
                                    <i :class="{'isUp': repItem['isUp']}"></i>
                                    <span :class='{"like": repItem["isUp"]}'>{{repItem['upCount']>0?repItem['upCount']:''}}</span>
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
                                <img class='state-img' src="../../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{upItem['deviceOsVersion']}}</span>
                                <span class='state-version'>{{upItem['appVersion']}}</span>
                            </div>
                            <div class="state-time">
                                {{upItem['replyDatetime']}}
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt2 container" v-if="upItem['commentContent'] && upItem['commentContent'].length >0">
                                赞了我的回复//<span>我</span> 回复 <span>{{upItem['commentWho']}}</span>：{{upItem['commentContent']}}
                            </div>
                            <div class="middle-txt2 container" v-if="!upItem['commentContent'] || upItem['commentContent'].length ==0">
                                赞了我的评论
                            </div>
                            <div class="middle-reply container">
                                <div class="reply-img center-v" v-if='upItem["reply"]'>
                                    <img :imgurl="upItem['reply']['uimg']" src='../../../assets/load.jpg' alt="">
                                    <span>{{upItem['reply']['nickname']}}</span>
                                </div>
                                <div class="reply-con" v-if='upItem["reply"]'>
                                    {{upItem['reply']['replyContent']}}
                                </div>
                                <div class="reply-con" v-if='!upItem["reply"]'>该评论已删除</div>
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
        <pop :clickKind='clickKind' :chosenItem = 'choseItem'  @delete_current='delete_current'></pop>
        <!-- 阴影加弹框  （评论弹框） -->
        <popCommit ref='popCommit' :operaId='operaId' @refresh='commit_current'></popCommit>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
        <!-- 图片轮播 -->
        <swiper :imgsList = 'imgsList' ref='swiperImgs'></swiper>
    </div>
</template>
<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import $ from 'jquery'
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import popCommit from '@/page/common/popComment/popComment'
    import pop from '@/page/common/pop/pop'
    import { common } from '@/common/js/common'
    import swiper from '@/page/common/swiper/swiper'
    import { varibal, upReply, statisticsReplyInfo } from '@/common/js/myApi'
    export default {
    name: 'message',
    components:{
        wHead,
        pop,
        popCommit,
        swiper
    },
    data() {
        return {
            tabList:[
                {title: '我发布的', chosen: true, num: 0, id: 0, url:'/app/forum/queryMyIssuedList'},
                {title: '回复我的', chosen: false, num: 0, id: 1, url:'/app/forum/replyMyList'},
                {title: '收到的赞', chosen: false, num: 0, id: 2, url:'/app/forum/upMyList'}
            ],
            titleJson:{
                title: '消息',
                toolBol: false,
                toolTitle: '',
                hasRed: false
            },
            chosen_tab : {id: 0, url: '/app/forum/queryMyIssuedList'},
            mescrollObj: null,
            releaseList: [],
            replymeList: [],
            getUpList: [],
            operaId: 0,
            compaintUrl: '/app/forum/reportForumReplyInfo',
            choseItem: null,
            clickKind: 'list-tip-del',
            index: 0,
            imgsList:[]
        }
    },
    mounted () {
        var _this = this;
        this.get_message_num();
        //创建MeScroll对象
        this.mescrollObj = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
            down:{
                auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
                callback: _this.downCallback
            },
            up: {
                callback: _this.upCallback,
                htmlNodata: '<p class="upwarp-nodata">-- 我也是有底线的 --</p>',
                noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescrollList", //父布局的id (1.3.5版本支持传入dom元素)
                    tip: "暂无数据~" //提示
                },
                lazyLoad: {
                    use: true, // 是否开启懒加载,默认false
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
            varibal({ 'pageSize': size, 'pageNum': num }, url, sucCal);
        },
        // 下拉刷新
        downCallback() {
            switch(this.chosen_tab.id){
                case 0:
                    this.releaseList = [];
                    break;
                case 1:
                    _his.replymeList = [];
                    break;
                case 2:
                    this.getUpList = [];
                    break;
            }
            this.mescrollObj.resetUpScroll();
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
                        _this.releaseList.length>0 && $('.mescroll-empty') ? $('.mescroll-empty').remove() : '';
                        break;
                    case 1:
                        _this.replymeList = _this.replymeList.concat(curPageData);
                        _this.replymeList.length>0 && $('.mescroll-empty') ? $('.mescroll-empty').remove() : '';
                        break;
                    case 2:
                        _this.getUpList = _this.getUpList.concat(curPageData);
                        _this.getUpList.length>0 && $('.mescroll-empty') ? $('.mescroll-empty').remove() : '';
                        break;
                }
                _this.$nextTick(() => {
                    _this.mescrollObj.endSuccess(curPageData.length);
                    _this.get_message_num();
                })
            });
        },
        // 打开评论
        show_input(item,index){
            this.operaId = item.id;
            this.index = index;
            this.$refs['popCommit'].show_input(item.nickname?item.nickname:false);
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
            upReply({ "titleId": item.id, "isUp": !item.isUp }, (data) => {
                switch(_this.chosen_tab.id) {
                    case 0:
                        _this.$nextTick(()=>{
                            _this.releaseList[index]['upCount'] = data['data']['upCount'];
                            if(!item.isUp) {
                                _this.releaseList[index]['animate'] = true;
                                setTimeout(function(){
                                    _this.releaseList[index]['isUp'] = !item.isUp;
                                    _this.releaseList[index]['animate'] = false;
                                },1000)
                            }else{
                                _this.releaseList[index]['isUp'] = !item.isUp;
                            }
                        });
                        break;
                    case 1: 
                        _this.$nextTick(()=>{
                            _this.replymeList[index]['upCount'] = data['data']['upCount'];
                            if(!item.isUp){
                                _this.replymeList[index]['animate'] = true;
                                setTimeout(function(){
                                    _this.replymeList[index]['isUp'] = !item.isUp;
                                    _this.replymeList[index]['animate'] = false;
                                },1000)
                            } else {
                                _this.replymeList[index]['isUp'] = !item.isUp;
                            }
                        });
                        break;
                }
            })
        },
        // 打开举报遮罩（有可能是举报有可能是删除）
        complaint(e,id,i){
            var x = e.target.getBoundingClientRect().left - 79;
            var y = e.target.getBoundingClientRect().top + 24;
            pop.methods.pop_position(x, y, '#pop .list-tip-del',true);
            this.choseItem = i;
        },
        // 获取消息的数量
        get_message_num(){
            var _this = this;
            statisticsReplyInfo((data) => {
                _this.$nextTick(()=> {
                    _this.tabList[1]['num'] = data['data']['replyCount'];
                    _this.tabList[2]['num'] = data['data']['upCount'];
                })
            })
        },
        commit_current(data){
            var _this = this;
            this.$nextTick(()=>{
                if(_this.chosen_tab.id == 0){
                    _this.releaseList[_this.index]['replyCount'] = data['data']['replyCount'];
                }
            });
        },
        // 点击展示大图
        show_big_img(imgs, index){
            this.imgsList = imgs;
            this.$refs['swiperImgs'].show(index);
        }
    },
    beforeCreate(){
        $('body').addClass('origin').removeClass('f7');
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../common/style/stateList.less';
  @import './myMessage.less';
</style>
