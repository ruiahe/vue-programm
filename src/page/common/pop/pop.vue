<template>
    <!-- 阴影加弹框 （举报&删除&排序） -->
    <div id="pop" @touchmove.prevent @click.prevent='close_pop()'>
        <div class="pop-content list-tip list-tip-complaint" @click='complaint_item()' :class='{"unshow": clickKind != "list-tip-complaint"}'>
            <div class="center-vh">
                <span><img src="../../../assets/complaint.png" alt=""></span>举报
            </div>
        </div>
        <div class="pop-content list-tip list-tip-del" v-on:click='delete_item()' :class='{"unshow": clickKind != "list-tip-del"}'>
            <div class="center-vh">
                <span><img src="../../../assets/delete.png" alt=""></span>删除
            </div>
        </div>
        <ul class="pop-content list-sort" :class='{"unshow": clickKind != "list-sort"}'>
            <li class='center-vh' v-for='(i,index) in sortList' :key = 'index' :class="{'chosen': i.chosen}" v-on:click='chose_sort(i)'>{{i.title}}</li>
        </ul>
        <div class="pop-reason">
            <div class="reason-title space-between">
                <div class="reason-close"></div>
                <div class="reason-titile-title">举报原因</div>
                <div class="reason-place"></div>
            </div>
            <ul class="reason-list">
                <li class="space-between" @click.prevent='chose_reason(1)'><span>违规信息</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(2)'><span>违规信息</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(3)'><span>违规信息</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(4)'><span>违规信息</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(5)'><span>违规信息</span><i></i></li>
            </ul>
            <div class="reason-btn">确定</div>
        </div>
        <div class="pop-box"></div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
    import { common } from '@/common/js/common';
    export default {
        name: 'strongTip',
        props:{
            clickKind: '',
            chosenItem: null,
            compaintUrl: '',
            deleteUrl: '',
        },
        data(){
            return {
                sortList:[
                    {title: '最热发言', id: 1, chosen: true},
                    {title: '最新发言', id: 2, chosen: false},
                    {title: '最近回复', id: 3, chosen: false}
                ]
            }
        },
        methods: {
            // 选中举报
            complaint_item(){
                alert(1)
                $('.pop-reason').slideUp(200);
                // this.commit_data(this.compaintUrl, (data)=>{
                //     common.show_weakTip('举报成功');
                // });
            },
            // 选中删除
            delete_item(){
                this.commit_data(this.deleteUrl, (data)=>{
                    this.$emit('delete_current');
                    common.show_weakTip('删除成功');
                });
            },
            // 定位黑色遮罩中的白框的位置
            pop_position(x, y, cName, bol){
                $('#pop').fadeIn(200);
                var yBody = window.screen.availHeight;
                y = (bol && (y + 57)) > yBody ? y - 81 : y; 
                document.querySelector(cName).style.top = y+'px';
                document.querySelector(cName).style.left = x+'px';
                $(cName).slideDown(200);
            },
            // 关闭弹框
            close_pop(){
                $('#pop .pop-content').slideUp(200);
                $('#pop').fadeOut(200);
            },
            // 提交信息
            commit_data(url, calSuc){
                var _this = this;
                new Request(url, {
                    "titleId":_this.chosenItem.id,
                }, 'post' ,false,false, (data) => {
                    calSuc(data);
                    _this.close_pop();
                }, function(err){
                    common.show_weakTip('服务器正忙，请稍后再试');
                });
            },
            // 选中排序方式
            chose_sort(i){
                this.sortList.forEach(s => {
                    s.chosen = s.id == i.id ? true : false;
                })
                this.$emit('change_sort', i);
                $('#pop .pop-content').slideUp(200);
                $('#pop').fadeOut(200);
            },
            chose_reason(i){

            }
        }
    }
</script>
<style lang="less" scoped>
  @import './pop.less';
</style>
