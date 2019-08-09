<template>
    <div id="detail" v-cloak>
        <wHead :titleJson='titleJson'></wHead>
        <div class="detail">
            <div class="detail-top space-between container">
                <div class="detail-img">
                    <img :src="makeStatement.uimg" alt="">
                </div>
                <div class="detail-inf" @click='interactive()'>
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
                <div class="bottom-img center-vh" v-for="(img, ind) in makeStatement['replyImg']" :key='ind'> <img :src="img.img" alt=""> </div>
            </div>
        </div>
        <div class="gray-box"></div>
        <div class="list container">
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
                        <div class="item-info-right  center-vh">
                            <img class='' src="../../assets/statement/discuss.png" alt="" @click.stop="show_input(item, false)">
                            {{item.replyCount}}
                            <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='false'>
                            <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='true'>
                            <span :class='{"like": true}'>{{item.upCount}}</span>
                        </div>
                    </div>
                    <div class="item-content">
                        {{item.replyContent}}
                    </div>
                    <div class="item-gray" v-if="item.replyModelDataList.length > 0">
                        <div class="gray-list" v-for="(it, ind) in item.replyModelDataList" :key='ind'><span>{{it.responser}}</span>回复<span>{{it.replyer}}</span>：{{it.content}}</div>
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
                    <span class='bottom-up'>
                        <img src="../../assets/statement/upGray.png" alt="">
                        <span class="bottom-up-txt">65</span>
                    </span>
                </div>
            </div>
            <div class="placeholder"></div>
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
        <!-- 强提示弹框 -->
        <div class="strong-tip">
            <div class="strong-box center-vh">
                <div class="strong-con">
                    <div class="strong-top center-vh">
                        <span>是否删除您的回复</span>
                    </div>
                    <div class="strong-btn space-between">
                        <span>取消</span>
                        <span>确认</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
    import wHead from '../windowHead/windowHead'
    import { common } from '../../common/js/common';
    export default {
        name: 'detail',
        components:{
            wHead
        },
        data() {
            return {
                detailId: 0,
                titleJson:{
                    title: '发言详情',
                    toolBol: true,
                    toolTitle: '· · ·',
                    hasRed: false,
                },
                makeStatement: {},
                comment: '',                                        //评论内容
                commentLen: 0,
                operaId: {}
            }
        },
        mounted () {
            this.detailId = this.$route.query.id;
            this.getDate();
        },
        methods:{
            interactive(){
                alert('要跳转拉');
                var json = {
                    "methodName": "back"
                }
                window.webkit.messageHandlers.linkTo.postMessage(json);
            },
            change_type(jsonStr){
                return common.change_type(jsonStr);
            },
            // 关闭评论弹框
            close_comment(){
                $('.pop-comment').fadeOut(200);
            },
            // 发送回复
            send_comment(){
                var _this = this;
                new Request('app/forum/userReplyForumInfo',{
                    "titleId": this.operaId,
                    "replyContent":this.comment,
                    "isOne":false,
                } , 'post' ,'ios' ,'2.0.0', (data) => {
                    _this.close_comment();
                    _this.comment = '';
                    _this.getDate();
                }, (err) => {
                    console.log('这里是错误回调');
                    console.log(err);
                });
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
            // 打开发言框
            show_input(item, bol){
                this.operaId = bol ? item : item.id;
                $('.pop-comment').fadeIn(200);
            },
            // 获取数据
            getDate(){
                new Request('app/forum/queryForumReplyInfo',{
                    "titleId":this.detailId,
                }, 'post' ,false,false, (data) => {
                    console.log(data);
                    this.makeStatement = data['data'];
                    // console.log(this.makeStatement)
                }, function(err){
                    console.log('这里是错误回调');
                    console.log(err);
                });
            }
        },
        beforeCreate(){
            document.querySelector('body').style='background:#fff;';
        },
    }
</script>
<style lang="less" scoped>
  @import './detail.less';
</style>
