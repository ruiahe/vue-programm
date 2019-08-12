<template>
    <!-- 阴影加弹框  （评论弹框） -->
    <div id="pop-comment" @touchmove.prevent>
        <div class="comment">
            <div class="comment-top">
                <div class="container space-between">
                    <span class='comment-close' @click="close_comment()">X</span>
                    <span class="comment-title">评论</span>
                    <span class="comment-btn center-vh" @click.stop="send_comment()">发送</span>
                </div>
            </div>
            <div class="comment-txt container">
                <textarea name="" id="" v-model="commentText" @input="change_num($event)"></textarea>
            </div>
            <div class="comment-emoji container">
                <span class='emoji-txt'>{{commentLen}}/200</span>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
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
                $('#pop-comment').fadeIn(200);
            },
            // 关闭评论弹框
            close_comment(){
                $('#pop-comment').fadeOut(200);
            },
            // 发送回复
            send_comment(){
                var _this = this;
                new Request(_this.commitUrl,{
                    "titleId": _this.operaId,
                    "replyContent":_this.commentText,
                    "isOne":false,
                } , 'post' ,'ios' ,'2.0.0', (data) => {
                    _this.close_comment();
                    _this.commentText = '';
                    _this.$emit('refresh');
                }, (err) => {
                    console.log('这里是错误回调');
                    console.log(err);
                });
            },
            // 计算输入的字数
            change_num(e){
                var num = this.commentText;
                if(num < 200) {
                    this.commentLen = num++;
                } else {
                    this.commentText = this.commentText.substr(0,200);
                    this.commentLen = this.commentText.length;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './popComment.less';
</style>
