<template>
    <div id="todayInHistoryList">
        <div class="top">
            <wHead :titleJson='titleJson'></wHead>
            <div class="subtitle center-vh">
                <span @click='get_diff_date(-1)'>前一天</span>
                <div class='test center-vh' @click='changeTime()'>
                    <strong>{{change_to_date(currentDate)['month']+'月'+change_to_date(currentDate)['day']+'日'}}</strong>
                    <img src="../../../assets/statement/phone.png" alt="" class='hasNoImg'>
                </div>
                <span @click='get_diff_date(1)'>后一天</span>
            </div>
        </div>
        <div class="place-holder"></div>
        <div class="content">
            <ul>
                <li class="between" v-for="(i,index) in historyList" :key="index">
                    <div class="time">
                        <div class="time-year">{{i.year}}</div>
                        <div class="time-txt">年</div>
                    </div>
                    <div class="text-and-img">
                        <div class="text-and-img-box space-between" @click.prevent='link_to("/todayInHistory/detail",i._id)'>
                            <div class="text-img" :style="{ 'background-image': 'url('+i.pic+')'}" v-if="i.pic&&i.pic.length>0"></div>
                            <div class="text-text"> {{i.des}} </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <scrollDate ref='scrollDate' @date='get_date'></scrollDate>
    </div>
</template>
<script>
    import wHead from '@/page/windowHead/windowHead'
    import $ from 'jquery'
    import scrollDate from '@/page/common/scrollDate/scrollDate'
    import {toh, time} from '../../../common/js/myApi'
    import {common} from '@/common/js/common.js'
    export default {
        name: 'todayInHistoryList',
        components:{
            wHead,
            scrollDate,
        },
        data() {
            return {
                titleJson:{
                    title: '历史的今天',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                },
                historyList: [], // 列表数据
                currentDate: '', // 当前展示的日期
            }
        },
        mounted(){
            this.currentDate = 1572592666000;
            this.get_data(common.change_to_date(this.currentDate)['month'], common.change_to_date(this.currentDate)['day']);
        },
        methods:{
            // 获取列表数据集
            get_data(month, day){
                const _this = this;
                toh({ v: '1.0', month: month, day: day },  (res) => {
                    _this.historyList = res['result'];
                })
            },
            // 打开日期选择器
            changeTime(){
                this.$refs['scrollDate'].open(6,5,4);
            },
            // 传入日期 - 获取数据
            get_date(obj){
                this.currentDate = new Date(obj['year']+'/'+obj['month']+'/'+obj['day'] + ' '+ '00:00:00').getTime();
                this.get_data(obj['month'], obj['day']);
            },
            // 获取前一天（type = -1）和后一天（type = 1）的列表数据
            get_diff_date(type){
                switch (type) {
                    case -1:
                        var yestoday = common.change_to_date(this.currentDate - 24 * 60 * 60 * 1000);
                        this.get_data(yestoday['month'], yestoday['day']);
                        break;
                    default:
                        var tomorrow = common.change_to_date(this.currentDate + 24 * 60 * 60 * 1000);
                        this.get_data(tomorrow['month'], tomorrow['day']);
                        break;
                }
            },
            // 跳转至其他页面（path：链接；id：参数）
            link_to(path,id){
                this.$router.push({
                    path: path, 
                    query:{id: id}
                });
            },
            // 获取日期
            change_to_date(t){
                return common.change_to_date(t);
            } 
        },
        beforeCreate(){
            document.querySelector('body').style='background: rgba(249,249,249,1);';
        }
    }
</script>
<style lang="less" scoped>
    @import './list.less';
</style>
