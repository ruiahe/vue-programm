<template>
    <!-- 阴影加弹框  （评论弹框） -->
    <div id="pop-comment">
        <div class="comment">
            <div class="comment-top">
                <div class="container space-between">
                    <span class='comment-close center-vl' @click="close_comment()">
                        <img src="../../../assets/close.png" alt="">
                    </span>
                    <span class="comment-title">评论</span>
                    <span class="comment-btn center-vh" @click.stop="send_comment()">发送</span>
                </div>
            </div>
            <div class="comment-txt container">
                <div class="textarea-box">
                    <textarea name="" id="" v-model="commentText" @input="change_num($event)" placeholder="评论点什么..." @focus="get_focus()" @blur='blur()'></textarea>
                </div>
            </div>
            <div class="comment-emoji container">
                <span class='emoji-txt'>{{commentLen}}/200</span>
            </div>
        </div>
        <div id="pop-comment-box" @touchmove.prevent></div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
    import { common } from '@/common/js/common';
    export default {
        name: 'strongTip',
        props:{
           operaId: 0,
           commitUrl: '',
        },
        data(){
            return {
                commentText: '',
                commentLen: 0
            }
        },
        methods: {
            // 打开发言框
            show_input(){
                $('#pop-comment-box').fadeIn(200);
                $('#pop-comment .comment').slideDown(200);
            },
            // 关闭评论弹框
            close_comment(){
                $('#pop-comment-box').fadeOut(200);
                $('#pop-comment .comment').slideUp(200);
            },
            // 发送回复
            send_comment(){
                var _this = this;
                this.commentText = this.commentText.replace(/(^\s*)|(\s*$)/g, "");
                if(this.commentText.length > 0){
                    new Request(_this.commitUrl,{
                        "titleId": _this.operaId,
                        "replyContent":_this.commentText,
                        "isOne":false,
                    } , 'post' ,'ios' ,'2.0.0', (data) => {
                        _this.close_comment();
                        _this.commentText = '';
                        _this.$emit('refresh',data);
                    }, (err) => {
                        common.show_weakTip('服务器正忙，请稍后再试');
                    });
                }
            },
            // 计算输入的字数
            change_num(e){
                var txt = this.commentText;
                txt = txt.replace(/(^\s*)|(\s*$)/g, "");
                var num = txt.length;
                if(num < 200) {
                    this.commentLen = num++;
                } else {
                    this.commentText = this.commentText.substr(0,200);
                    this.commentLen = this.commentText.length;
                }
            },
            // 获取焦点后
            get_focus(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if(isAndroid){
                    $('body').height( $('body').height()+200)
                    $('body').scrollTop(200)
                }
            },
            // 失去焦点后
            blur(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if(isAndroid){
                    $('body').height( $('body').height()-200)
                    $('body').scrollTop(0)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './popComment.less';
</style>
