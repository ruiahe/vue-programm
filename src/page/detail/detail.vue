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
                    <textarea name="" placeholder="评论点什么..." type='search' @input='change_num()' v-model='commentText'></textarea>
                    <div class="textarea" contenteditable="trrue" @focus="del()" @input="change_dev()">{{commentT}}</div>
                </div>
                <div class="comment-emoji container space-between">
                    <span class='emoji'></span>
                    <span class='emoji-txt'>{{commentLen}}/200</span>
                </div>
                <div class="emotion" >
                    <textarea class="text" rows="5" v-model="content" ></textarea>
                    <emotion @emotion="handleEmotion" :height="200" ></emotion>
                    <div class="text-place">
                    <!-- /\#[\u4E00-\u9FA5]{1,3}\;/gi 匹配出含 #XXX; 的字段 -->
                    <p v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></p>
                    </div>
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
    import Emotion from '@/page/emotion/index'
    export default {
        name: 'detail',
        components:{
            wHead,
            Emotion
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
                commentText: '',                                        //评论内容
                commentLen: 0,
                operaId: {},
                content: '',
                comment: '',
                commentT: '评论点什么...'
            }
        },
        mounted () {
            this.detailId = this.$route.query.id;
            this.getDate();
        },
        methods:{
            del(){
                if(this.commentT == '评论点什么...'){
                    this.commentT = ' ';
                }
            },
            change_dev(){
                
            },
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
                    "replyContent":_this.commentText,
                    "isOne":false,
                } , 'post' ,'ios' ,'2.0.0', (data) => {
                    _this.close_comment();
                    _this.commentText = '';
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
                    this.commentText = this.commentText.substr(0,200);
                    this.commentLen = this.commentText.length;
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
            },
            handleEmotion (i) {
                this.content += i
            },
            // 将匹配结果替换表情图片
            emotion (res) {
                let word = res.replace(/\#|\;/gi,'')
                const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
                let index = list.indexOf(word)
                return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`   
            }
        },
        beforeCreate(){
            document.querySelector('body').style='background:#fff;';
        }
    }
</script>
<style lang="less" scoped>
  @import './detail.less';
</style>
