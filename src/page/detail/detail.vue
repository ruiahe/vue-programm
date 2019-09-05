<template>
    <div id="detail" v-cloak>
        <wHead :titleJson='titleJson' @emitClick='complaint'></wHead>
        <div class="detail">
            <div class="detail-top space-between container">
                <div class="detail-img">
                    <img :src="makeStatement.uimg" alt="">
                </div>
                <div class="detail-inf">
                    <div class="detail-name">{{makeStatement['nickname']}}</div>
                    <div class="detail-time">{{makeStatement['replyDatetime']}}</div>
                </div>
                <div class="detail-version">
                    <div class="detail-txt center-vr">
                        <img src="../../assets/statement/phone.png" alt="">
                        <span>{{makeStatement['deviceOsVersion']}} {{makeStatement['appVersion']}}</span>
                    </div>
                    <div class="detail-blank"></div>
                </div>
            </div>
            <div class="detail-middle container">{{makeStatement['replyContent']}}</div>
            <div class="detail-bottom" v-if="makeStatement['replyImg']">
                <div class="bottom-img" v-for="(img, ind) in makeStatement['replyImg']" :key='ind'  :style="{ 'background-image': 'url('+img.img+')'}" @click.stop="show_big_img(makeStatement['replyImg'], ind)"> 
                    <!-- <img :src="img.img" alt="">  -->
                </div>
            </div>
        </div>
        <div class="gray-box"></div>
        <div class="list container" v-if="makeStatement['dataList']">
            <div class="item between" v-for="(item, index) in makeStatement['dataList']" :key='index'>
                <div class="item-tx">
                    <img :src="item.uimg" alt="">
                </div>
                <div class="item-con">
                    <div class="item-info space-between">
                        <div class="item-info-left">
                            <div class="item-name">{{item.nickname}}</div>
                            <div class="item-time">{{item.replyDatetime}}</div>
                        </div>
                        <div class="item-info-right  center-vh" :class="{'animate': item.animate}">
                            <img class='' src="../../assets/statement/discuss.png" alt="" @click.stop="show_input(item, false)">
                            {{item.replyCount}}
                            <span class='center-v' @click.stop='give_up(index,item)'>
                                <i class="img" :class="{'isUp':item.isUp}"></i>
                                <span :class='{"like": item.isUp}'>{{item.upCount}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="item-content">
                        {{item.replyContent}}
                    </div>
                    <div class="item-gray" v-if="item.replyModelDataList.length > 0">
                        <div class="gray-list" v-for="(it, ind) in item.replyModelDataList" :key='ind' @click.stop="is_self(it, false)"><span>{{it.replyer}}</span>回复<span>{{it.responser}}</span>：{{it.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-box">
                <div class="container space-between">
                    <span class="bottom-input space-between">
                        <img src="../../assets/statement/phone.png" alt="">
                        <input type="text" placeholder="评论点什么" readonly @click.stop='show_input(detailId, true)'>
                    </span>
                    <span class='bottom-up' :class="{'animate': makeStatement['animate'], 'isUp': makeStatement['isUp']}" @click.stop='give_up("bottom",makeStatement["id"], makeStatement["isUp"], true)'>
                        <i>
                            <!-- <img src="../../assets/statement/upGray.png" alt="" v-if='!makeStatement["isUp"]'>
                            <img src="../../assets/statement/upGreen.png" alt="" v-if='makeStatement["isUp"]'> -->
                        </i>
                        <span class="bottom-up-txt">{{makeStatement['upCount']}}</span>
                    </span>
                </div>
            </div>
            <!-- <div class="placeholder"></div> -->
        </div>
        <!-- 阴影加弹框  （评论弹框） -->
        <popCommit ref='popCommit' :operaId='operaId' :commitUrl='commitUrl' @refresh='getData'></popCommit>
        <!-- 强提示弹框 -->
        <strongTip :showStronTip = 'showStrongTip' :deleteUrl='deleteUrl' :chosenItem = 'chosenItem' @delete_suc='getData'></strongTip>
        <!-- 阴影加弹框 （举报&删除&排序） -->
        <pop :clickKind = 'clickKind' :chosenItem = 'chosenItem' :deleteUrl='deleteUrl' :compaintUrl='compaintUrl' @delete_current='delete_current'></pop>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
        <!-- 图片轮播 -->
        <swiper :imgsList = "imgsList" ref='swiperImgs'></swiper>
    </div>
</template>
<script>
    import $ from 'jquery';
    import {Request} from '@/common/js/api.js';
    import wHead from '../windowHead/windowHead';
    import { common } from '../../common/js/common';
    import strongTip from '@/page/common/strongTip/strongTip';
    import pop from '@/page/common/pop/pop'
    import popCommit from '@/page/common/popComment/popComment'
    import swiper from '@/page/common/swiper/swiper'
    export default {
        name: 'detail',
        components:{
            wHead,
            strongTip,
            pop,
            popCommit,
            swiper
        },
        data() {
            return {
                detailId: 0,
                titleJson:{
                    title: '发言详情',
                    toolBol: true,
                    toolTitle: '···',
                    hasRed: false,
                },
                makeStatement: {},
                commentText: '',                                        //评论内容
                commentLen: 0,
                clickKind: '',
                isSelf: false,
                operaId: {},
                chosenItem: null,
                showStrongTip: false,
                deleteUrl: 'app/forum/deleteForumReplyInfo',
                compaintUrl: 'app/forum/reportForumReplyInfo',
                commitUrl: 'app/forum/userReplyForumInfo',
                x: 0,                                                   //当前操作项div的水平位置
                y: 0,                                                   //当前操作项div的垂直位置
                imgsList: []
            }
        },
        mounted () {
            this.detailId = this.$route.query.id;
            this.getData();
        },
        methods:{
            // 打开发言框
            show_input(item, bol){
                // if(!item.isSelf){
                    this.operaId = bol ? item : item.id;
                    this.$refs['popCommit'].show_input(item.nickname?item.nickname:(item.replyer?item.replyer:false));
                // } else {
                //     common.show_weakTip('目前不支持回复自己');
                // }
            },
            // 获取数据
            getData(){
                var _this = this;
                new Request('app/forum/queryForumReplyInfo',{
                    "titleId":_this.detailId,
                }, 'post' ,false,false, (data) => {
                    _this.$nextTick(()=>{
                        _this.makeStatement = data['data'];
                        _this.isSelf = _this.makeStatement['isSelf'];
                    })
                }, function(err){
                    common.show_weakTip('服务器正忙，请稍后再试');
                });
            },
            // 判断是打开评论弹框还是删除并执行对应方法
            is_self(item,bol){
                this.chosenItem = item;
                if(!item.isSelf){
                    this.show_input(item, bol);
                } else {
                    this.show_opera();
                }
            },
            // 展示删除强提示框
            show_opera(){
                strongTip['methods'].show_opera();
            },
            // 点赞和取消点赞
            give_up(index,item, isUp, bol){
                var _this = this;
                var id = bol ? item : item.id;
                var up = bol ? isUp : item.isUp;
                new Request('app/forum/upReply',{
                    "titleId": id,
                    "isUp": !up,
                } , 'post' ,false ,false, (data) => {
                    _this.$nextTick(function(){
                        if(index != 'bottom'){
                            _this.makeStatement['dataList'][index]['upCount'] = data['data']['upCount'];
                            if(!up){
                                _this.makeStatement['dataList'][index]['animate'] = true;
                                setTimeout(function(){
                                    _this.makeStatement['dataList'][index]['isUp'] = !up;
                                    _this.makeStatement['dataList'][index]['animate'] = false;
                                },1000);
                            } else {
                                _this.makeStatement['dataList'][index]['isUp'] = !up;
                            }
                        } else {
                            _this.makeStatement['upCount'] = data['data']['upCount'];
                            if(!up){
                                _this.makeStatement['animate'] = true;
                                setTimeout(function(){
                                    _this.makeStatement['isUp'] = !up;
                                    _this.makeStatement['animate'] = false;
                                },1000);
                            } else {
                                _this.makeStatement['isUp'] = !up;
                            }
                        }
                    });
                }, (err) => {
                    common.show_weakTip('服务器正忙，请稍后再试');
                });
            },
            // 打开举报遮罩（有可能是举报有可能是删除）
            complaint(e){
                this.chosenItem = {'id': this.detailId};
                this.x = e.target.getBoundingClientRect().left - 79;
                this.y = e.target.getBoundingClientRect().top + 24;
                if (this.isSelf) {
                    this.clickKind = 'list-tip-del';
                    pop.methods.pop_position(this.x, this.y, '#pop .list-tip-del',true);
                } else {
                    this.clickKind = 'list-tip-complaint';
                    pop.methods.pop_position(this.x, this.y, '#pop .list-tip-complaint',true);
                }
            },
            // 删除当前数据
            delete_current(){
                common.back();
            },
            // 放大图片
            show_big_img(list, index){
                this.imgsList = list;
                this.$refs['swiperImgs'].show(index);
            }
        },
        beforeCreate(){
            document.querySelector('body').style='background: linear-gradient(#F7F7F7 95%, #fff 100%);';
        }
    }
</script>
<style lang="less" scoped>
  @import './detail.less';
</style>
