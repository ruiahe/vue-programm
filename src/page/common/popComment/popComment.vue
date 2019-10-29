<template>
    <!-- 阴影加弹框  （评论弹框） -->
    <div id="pop-comment" @touchmove.prevent>
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
                    <textarea name="" id="" v-model="commentText" @input="change_num($event)" :placeholder="placeholder" @focus="get_focus()" @blur="blur()"></textarea>
                </div>
            </div>
            <div class="comment-emoji container">
                <span class='emoji-txt'>{{commentLen}}/200</span>
            </div>
        </div>
        <div id="pop-comment-box" @click="close_comment()"></div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import { common } from '@/common/js/common';
    import { userReplyForumInfo } from '@/common/js/myApi'
    export default {
        name: 'strongTip',
        props:{
           operaId: 0,
        },
        data(){
            return {
                commentText: '',
                commentLen: 0,
                placeholder: '评论点什么...',
                clicktag: 0,
                scrollTop: 0,
                focusState: false,
                scrollTopAnd: 0,
            }
        },
        methods: {
            // 打开发言框
            show_input(txt){
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (txt) this.placeholder = '回复 '+txt;
                $('#pop-comment').fadeIn(200);
                $('#pop-comment-box').fadeIn(200);
                $('#pop-comment .comment').slideDown(200);
            },
            // 关闭评论弹框
            close_comment(){
                var _this = this ;
                $('#pop-comment').fadeOut(200);
                $('#pop-comment-box').fadeOut(200);
                $('#pop-comment .comment').slideUp(200);
                this.commentText = '';
                this.commentLen = 0;
                setTimeout(()=>{
                   $("html,body").animate({"scrollTop": _this.scrollTop},0);
                    $("html,body").scrollTop(_this.scrollTop);
                },100)
            },
            // 发送回复
            send_comment(){
                if(this.clicktag == 0){
                    var _this = this;
                    this.clicktag = 1;
                    setTimeout(function(){ _this.clicktag = 0 },3000);
                    this.commentText = this.commentText.replace(/(^\s*)|(\s*$)/g, "");
                    if(this.commentText.length > 0){
                        userReplyForumInfo({ "titleId": _this.operaId, "replyContent":_this.commentText, "isOne":false }, (data)=>{
                            _this.close_comment();
                            _this.commentText = '';
                            _this.commentLen = 0;
                            common.show_weakTip('评论成功');
                            _this.$emit('refresh',data);
                        })
                    }
                } else {
                    common.show_weakTip('请勿频繁操作');
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
                if(common.isAndroid()){//安卓键盘适配问题
                    $('body').css('height', ($('body').height()+260) + 'px');
                    $("html,body").animate({"scrollTop":10000},0);
                    $("html,body").scrollTop(10000);
                } else {//为了适配ios不同的输入法带来的键盘问题
                    setTimeout(()=>{
                        $("html,body").animate({"scrollTop":10000},0);
                        $("html,body").scrollTop(10000);
                    },200)
                }
            },
            blur(){
                if(common.isAndroid()){//安卓键盘适配问题
                    $('body').css('height', '100%');
                }
            }
        },
    }
</script>
<style lang="less" scoped>
  @import './popComment.less';
</style>
