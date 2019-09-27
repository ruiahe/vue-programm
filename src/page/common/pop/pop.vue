<template>
    <!-- 阴影加弹框 （举报&删除&排序） -->
    <!-- <div id="pop" @touchmove.prevent @click.prevent='close_pop()'> -->
    <div id="pop" @touchmove.prevent>
        <div class="pop-content list-tip list-tip-complaint" @click.passive='complaint_item()' :class='{"unshow": clickKind != "list-tip-complaint"}'>
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
                <div class="reason-close" @click="close_pop(true)"></div>
                <div class="reason-titile-title">举报原因</div>
                <div class="reason-place"></div>
            </div>
            <ul class="reason-list">
                <li class="space-between" @click.prevent='chose_reason(1,$event)'><span>广告或垃圾信息</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(2,$event)'><span>低俗或色情</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(3,$event)'><span>违反相关法律法规</span><i></i></li>
                <li class="space-between" @click.prevent='chose_reason(4,$event)'><span>其他原因</span><i></i></li>
            </ul>
            <div class="reason-btn" @click="confirm_complaint()">确定</div>
        </div>
        <div class="pop-box" @click.prevent='close_pop()'></div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { common } from '@/common/js/common';
    import { deleteForumReplyInfo, reportForumReplyInfo } from '@/common/js/myApi'
    export default {
        name: 'strongTip',
        props:{
            clickKind: '',
            chosenItem: null,
            compaintUrl: '',
        },
        data(){
            return {
                complaintReason: false,
                tipType: 'weak',
                sortList:[
                    {title: '最热发言', id: 1, chosen: true},
                    {title: '最新发言', id: 2, chosen: false},
                    {title: '最近回复', id: 3, chosen: false}
                ]
            }
        },
        methods: {
            // 选中举报&展开举报原因提供选择
            complaint_item(){
                this.tipType = 'strong';
                $('.pop-content').fadeOut(200);
                $('.pop-reason').slideDown(200);
            },
            // 选中删除
            delete_item(){
                this.commit_data(()=>{
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
            close_pop(bol){
                if(this.tipType == 'weak' || bol){
                    $('.pop-reason').slideUp(200);
                    $('#pop .pop-content').slideUp(200);
                    $('#pop').fadeOut(200);
                    this.tipType = 'weak';
                }
            },
            // 提交信息（删除）
            commit_data(calSuc){
                var _this = this;
                deleteForumReplyInfo({ "titleId":_this.chosenItem.id }, (data) => {
                    calSuc(data);
                    _this.close_pop();
                })
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
            // 选择具体的举报原因
            chose_reason(i,e){
                this.complaintReason = i;
                $('.reason-list li').removeClass('active');
                if(e.target.tagName == 'LI'){
                    $(e.target).addClass('active');
                } else {
                    $(e.target).parents('li').addClass('active');
                }

            },
            // 发送举报原因
            confirm_complaint(){
                const _this = this;
                reportForumReplyInfo({ titleId: _this.chosenItem.id, tipId: _this.complaintReason }, (res)=>{
                    _this.close_pop(true);
                    _this.complaintReason = false;
                    common.show_weakTip('举报成功');
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './pop.less';
</style>
