<template>
    <div id="todayInHistoryList">
        <div class="top">
            <wHead :titleJson='titleJson' @emitClick='changeTime'></wHead>
            <div class="subtitle center-vh">
                <span class='center-vh' @click='get_diff_date(-1)'>
                    <img src="../../../assets/gray-arrow.png" alt="">
                    <span>前一天</span>
                </span>
                <div class='test center-vh'>
                    <strong>{{change_to_date(currentDate)['month']+'月'+change_to_date(currentDate)['day']+'日'}}</strong>
                </div>
                <span class='center-vh reverse' @click='get_diff_date(1)'>
                    <span>后一天</span>
                    <img src="../../../assets/gray-arrow.png" alt="">
                </span>
            </div>
        </div>
        <div class="place-holder"></div>
        <div class="content">
            <ul>
                <li :class="{'liLeft': index%2==0, 'liRight': index%2!=0}" v-for="(i,index) in historyList" :key="index" class='space-between' @click.prevent='link_to("/todayInHistory/detail",i.eventId)'>
                    <div class="liLeft liContent" v-if="index%2==0">
                        <div class="time">
                            <div class="time-content space-between">
                                <div class="time-img">
                                    <div class="time-img-bg" :class="{'special-background': i.pic == null}" :style="{ 'background-image': 'url('+ i.pic +')'}"></div>
                                </div>
                                <div class="time-year">{{i.year > 0 ? i.year : '公元前' + (-i.year)}}年</div>
                            </div>
                        </div>
                        <div class="text-and-img-box">
                            <div class="text-text"> {{i.title}} </div>
                        </div>
                    </div>
                    <div class="liRight liContent" v-if="index%2==0"></div>
                    <div class="liLeft liContent" v-if="index%2!=0"></div>
                    <div class="liRight liContent" v-if="index%2!=0">
                        <div class="time center-vr">
                            <div class="time-content space-between">
                                <div class="time-year">{{i.year > 0 ? i.year : '公元前' + (-i.year)}}年</div>
                                <div class="time-img">
                                    <div class="time-img-bg" :class="{'special-background': i.pic == null}" :style="{ 'background-image': 'url('+ i.pic +')'}"></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-and-img-box center-vr">
                            <div class="text-text"> {{i.title}} </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <scrollDate ref='scrollDate' @date='get_date'></scrollDate>
    </div>
</template>
<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import $ from 'jquery'
    import scrollDate from '@/page/common/scrollDate/scrollDate'
    import {listHistoryEvents, time} from '../../../common/js/myApi'
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
                    toolBol: true,
                    toolTitle: 'calendar',
                    hasRed: false,
                },
                historyList: [], // 列表数据
                currentDate: '', // 当前展示的日期
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            // 初始化页面
            init() {
                const _this = this;
                time((res)=>{
                    _this.currentDate = res['data']['BJTime'];
                    _this.get_data(common.change_to_date(_this.currentDate)['month'], common.change_to_date(_this.currentDate)['day']);
                });
            },
            // 获取列表数据集
            get_data(month, day){
                const _this = this;
                listHistoryEvents({ month: month, day: day },  (res) => {
                    _this.historyList = res['data']['dataList'];
                })
            },
            // 传入日期 - 获取数据
            get_date(time){
                const obj = common.change_to_date(time['result']);
                this.currentDate = new Date(obj['year']+'/'+obj['month']+'/'+obj['day'] + ' '+ '00:00:00').getTime();
                this.get_data(obj['month'], obj['day']);
            },
            // 获取前一天（type = -1）和后一天（type = 1）的列表数据
            get_diff_date(type){
                switch (type) {
                    case -1:
                        var yestoday = common.change_to_date(this.currentDate - 24 * 60 * 60 * 1000);
                        this.currentDate = this.currentDate - 24 * 60 * 60 * 1000;
                        this.get_data(yestoday['month'], yestoday['day']);
                        break;
                    default:
                        var tomorrow = common.change_to_date(this.currentDate + 24 * 60 * 60 * 1000);
                        this.currentDate = this.currentDate + 24 * 60 * 60 * 1000;
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
            },
            // 打开日期选择器
            changeTime(){
                this.$refs['scrollDate'].open(this.currentDate,'currentTime');
            }
        },
        activated(){
            $('body').addClass('origin').removeClass('f7').removeClass('gray247').removeClass('fbfafa').removeClass('rgba0')
            if(!this.$route.meta.isUseCache) {
                this.init()
            }
        },
        beforeRouteLeave(to, from, next){
            if(to.path.indexOf('/todayInHistory/detail')>-1){
                from.meta.isUseCache = true;
            } else {
                from.meta.isUseCache = false;
                window.localStorage.setItem('listScroll', false);
            }
            next();
        }
    }
</script>
<style lang="less" scoped>
    @import './list.less';
</style>
