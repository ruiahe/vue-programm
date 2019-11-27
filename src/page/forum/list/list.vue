<template>
    <div id="statement">
        <wHead :titleJson='titleJson'></wHead>
        <!-- 滚动区域 -->
        <div ref='mescroll' class="mescroll" id='mescrollList'>
            <div class="statement-tip" @touchmove.prevent>
                <div class="container">
                    {{subTitle}}
                </div>
            </div>
            <div class="statement" @touchmove.prevent :class="{'sticky': sticky, 'sticky-ios': stickyIos}">
                <div class="container space-between">
                    <span class='statement-num'>共{{totalNum}}条发言</span>
                    <span class='statement-sort' @click="show_sort($event)">{{sortChosenItem.title}}</span>
                </div>
            </div>
            <div class="statement-placeholder" v-if="sticky"></div>
            <div id='upscrollWarp'>
                <div class="list-box" id="list-box">
                    <div class="state" v-on:click='statement_details(i.id,index)' v-for='(i, index) in list' :key="index">
                        <div class="state-top container space-between">
                            <div class="state-tx" :imgurl="i.uimg" style="background-image: url('../../assets/load.jpg');"></div>
                            <div class="state-inf center-v">
                                <span class="state-name">{{i.nickName}}</span>
                                <img class='state-img' src="../../../assets/statement/phone.png" alt="">
                                <span class='state-model'>{{i.deviceOsVersion}} </span>
                                <span class='state-version'>{{i.appVersion}}</span>
                            </div>
                            <div class="state-ellipsis" @click.stop='complaint($event, i.id, i)'>
                                <img src="../../../assets/statement/ellipsis.png" alt="">
                            </div>
                        </div>
                        <div class="state-middle">
                            <div class="middle-txt container">
                                {{i.replyContent}}
                            </div>
                            <div class="middle-img-list" v-if='i.replyImg'>
                                <div class="middle-img" v-for="(img, ind) in i.replyImg" :key="ind"  :imgurl="img.img" style="background-image: url('../../assets/load.jpg');" @click.stop='show_big_img(i.replyImg, ind)'></div>
                            </div>
                        </div>
                        <div class="state-bottom container space-between">
                            <div class="state-operate center-v" :class="{'animate': i.animate}">
                                <img src="../../../assets/statement/discuss.png" alt="" @click.stop='show_input(i, index)'>
                                <strong>{{i.replyCount>0?i.replyCount:''}}</strong>                             
                                <span class='center-v' @click.stop='give_a_like(i, index, $event)'>
                                    <i class="img" :class="{'isUp':i.isUp}"></i>
                                    <span class="giveLike" :class='{"like": i.isUp}'>{{i.upCount>0?i.upCount:''}}</span>    
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
                <img src="../../../assets/ico_fayan@3x.png" alt="">
                <span>我要发言...</span>
            </div>
        </div>
        <!-- 阴影加弹框 （举报&删除&排序） -->
        <pop :sortChosenItem='sortChosenItem' :clickKind='clickKind' :sortList='sortList' :chosenItem = 'choseItem' @delete_current='delete_current' @change_sort='change_sort'></pop>
        <!-- 阴影加弹框  （评论弹框） -->
        <popCommit ref='popCommit' :operaId='operaId' @refresh='commit_current'></popCommit>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
        <!-- 图片轮播 -->
        <swiper :imgsList = 'imgsList' ref='swiperImgs'></swiper>
    </div>
</template>
<script>
    import MeScroll from 'mescroll.js'
    import 'mescroll.js/mescroll.min.css'
    import wHead from '@/page/common/windowHead/windowHead'
    import $ from 'jquery'
    import {common} from '@/common/js/common.js'
    import pop from '@/page/common/pop/pop'
    import popCommit from '@/page/common/popComment/popComment'
    import swiper from '@/page/common/swiper/swiper'
    import {mapActions} from 'vuex'
    import { queryForumReplyList, upReply } from '@/common/js/myApi'
    export default {
        name: 'statement',
        components:{
            wHead,
            pop,
            popCommit,
            swiper
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
                operaId: 0,
                index: 0,                                               //当前是第n条数据
                subTitle: '',
                imgsList:[],
                subNavToTop: 0,
                sticky: false,
                listScroll: 0,
                headHeight:0,
                stickyIos: false,
                initChosenItem: {id: 1, title: '最热发言'},
                sortList: []
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
            statement_details(id,index){
                this.$router.push({
                    path: '/detail', 
                    query:{id: id,index: index}
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
                this.list = [];
                this.mescrollObj.resetUpScroll();
            },
            // 获取数据
            getData(pageNum, pageSize, callbackSuc, callbackErr, obj){
                queryForumReplyList({ "titleId": this.discussId, "pageSize":pageSize, "pageNum":pageNum, "orderBy": this.orderBy }, callbackSuc);
            },
            // 打开发言框
            show_input(item, index){
                this.operaId = item.id;
                this.index = index;
                this.$refs['popCommit'].show_input();
            },
            // 点赞
            give_a_like(item,index,e){
                var _this = this;
                upReply({ "titleId": item.id, "isUp": !item.isUp }, (data)=>{
                    _this.$nextTick(()=>{
                        _this.list[index]['upCount'] = data['data']['upCount'];
                        if(!item.isUp){
                            _this.list[index]['animate'] = true;
                            setTimeout(function(){
                                _this.list[index]['isUp'] = !item.isUp;
                                _this.list[index]['animate'] = false;
                            },1000)
                        }else{
                            _this.list[index]['isUp'] = !item.isUp;
                        }
                    })
                })
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
            },
            // 点击展示大图
            show_big_img(imgs, index){
                this.imgsList = imgs;
                this.$refs['swiperImgs'].show(index);
            },
            // 初始化列表数据
            init(){
                const _this = this;
                _this.$nextTick(() => {
                    _this.titleJson['title'] = _this.$route.query.title;
                    _this.subTitle = _this.$route.query.subtitle;
                    _this.discussId = _this.$route.query.id;
                    _this.orderBy = _this.$route.query.sort ? _this.$route.query.sort : 1;
                    _this.sortList = [
                        {title: '最热发言', id: 1, chosen: true},
                        {title: '最新发言', id: 2, chosen: false},
                        {title: '最近回复', id: 3, chosen: false}
                    ];
                    _this.list = [];
                    _this.sticky = false;
                    _this.change_sort(_this.initChosenItem);
                })
            }
        },
        mounted () {
            var _this = this;
            window['reload'] = (sort) => {
                this.orderBy = sort;
                this.list = [];
                this.mescrollObj.resetUpScroll(true);
            }
            // 初始化内容
            this.init();
            //创建MeScroll对象
            this.mescrollObj = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down:{
                    auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
                    callback: _this.downCallback,
                },
                up: {
                    callback: _this.upCallback,
                    htmlNodata: '<p class="upwarp-nodata">-- 我也是有底线的 --</p>',
                    noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    // warpId: 'upscrollWarp', //让上拉进度装到upscrollWarp里面
                    empty: {
                        //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                        tip: "暂无数据~" //提示
                    },
                    lazyLoad: {
                        use: true, // 是否开启懒加载,默认false
                    },
                    onScroll: function(mescroll, y, isUp){
                        _this.listScroll = y;
                        if(y >= _this.subNavToTop){
                            if(common.isIos()){
                                _this.stickyIos = true;
                            } else {
                                $('.statement.sticky').css('top', _this.headHeight+'px');
                                _this.sticky = true;
                            }
                        } else {
                            common.isIos()? _this.stickyIos = false : _this.sticky = false;
                        }
                    }
                },
            });
        },
        beforeCreate(){
            $('body').addClass('origin').removeClass('f7').removeClass('rgba0').removeClass('gray247').removeClass('fbfafa');
        },
        updated(){
            this.subNavToTop = $('.statement-tip').outerHeight(true);
            this.headHeight = $('#header').outerHeight(true);
        },
        activated(){
            $('body').addClass('origin').removeClass('f7').removeClass('rgba0').removeClass('gray247').removeClass('fbfafa');
            if(this.$route.meta.isUseCache){
                var listScroll = Number(window.localStorage.getItem('listScroll'));
                var changeItem = JSON.parse(window.localStorage.getItem('listInfo'));
                if(listScroll && listScroll > 0){
                    this.mescrollObj.scrollTo( Number(listScroll), 0 );
                }
                if(this.list && this.list.length>0 && changeItem){
                    this.$nextTick(()=>{
                        changeItem['replyCount']?this.list[changeItem['index']]['replyCount'] = changeItem['replyCount']:'';
                        changeItem['upCount']?this.list[changeItem['index']]['upCount'] = changeItem['upCount'] : '';
                        changeItem['isUp']&&changeItem['isUp'][0]?this.list[changeItem['index']]['isUp'] = changeItem['isUp'][1] : '';
                    });
                }
            } else {
                this.init();
            }
        },
        beforeRouteLeave(to, from, next){
            if(to.path.indexOf('/detail')>-1){
                from.meta.isUseCache = true;
                window.localStorage.setItem('listScroll', this.listScroll);
            } else {
                from.meta.isUseCache = false;
                window.localStorage.setItem('listScroll', false);
            }
            next();
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../common/style/stateList.less';
    @import './list.less';
</style>
