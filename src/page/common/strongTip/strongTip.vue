<template>
    <!-- 强提示弹框 -->
    <div id="strong-tip" @touchmove.prevent>
        <div class="strong-con">
            <div class="strong-top center-vh">
                <span>是否删除您的回复</span>
            </div>
            <div class="strong-btn space-between">
                <span class='center-vh' @click.stop='cancel()'>取消</span>
                <span class='center-vh confirm' @click.stop='confirm_delete()'>确认</span>
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
            deleteUrl:'',                        //删除接口
            chosenItem: null                     //需要删除的对象
        },
        data(){
            return {
            }
        },
        methods: {
            // 展示删除强提示框
            show_opera(){
                $('#strong-tip').fadeIn(200);
                $('#strong-tip .strong-con').addClass('show');
            },
            // 取消删除强提示
            cancel(){
                $('#strong-tip').fadeOut(200);
                $('#strong-tip .strong-con').removeClass('show');
            },
            // 删除回复
            confirm_delete(){
                var _this = this;
                new Request(_this.deleteUrl,{
                    "titleId":_this.chosenItem.id,
                }, 'post' ,false,false, (data) => {
                    _this.$emit('delete_suc','这里瞎写');
                    _this.cancel();
                }, function(err){
                    console.log('这里是错误回调');
                    console.log(err);
                });
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './strongTip.less';
</style>
