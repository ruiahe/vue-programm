<template>
    <!-- 阴影加弹框 （举报&删除&排序） -->
    <div id="pop" @touchmove.prevent>
        <div class="pop-content list-tip list-tip-complaint" v-on:click='complaint_item()' :class='{"unshow": clickKind != "list-tip-complaint"}'>
            <div class="center-vh">
                <span></span>举报
            </div>
        </div>
        <div class="pop-content list-tip list-tip-del" v-on:click='delete_item()' :class='{"unshow": clickKind != "list-tip-del"}'>
            <div class="center-vh">
                <span></span>删除
            </div>
        </div>
        <ul class="pop-content list-sort" :class='{"unshow": clickKind != "list-sort"}'>
            <li class='center-vh' v-for='(i,index) in sortList' :key = 'index' :class="{'chosen': i.chosen}" v-on:click='chose_sort(i)'>{{i.title}}</li>
        </ul>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {Request} from '@/common/js/api.js'
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
                this.commit_data(this.compaintUrl, (data)=>{
                    alert('这里是成功举报拉');
                });
            },
            // 选中删除
            delete_item(){
                this.commit_data(this.deleteUrl, (data)=>{
                    this.$emit('delete_current');
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
                    console.log('这里是错误回调');
                    console.log(err);
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
        }
    }
</script>
<style lang="less" scoped>
  @import './pop.less';
</style>
