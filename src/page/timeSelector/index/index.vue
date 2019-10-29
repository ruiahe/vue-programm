<template>
    <div id="timeSelectorIndex">
        <div class="top">
            <wHead :titleJson='titleJson'></wHead>
            <div class="top-nav-box">
                <div class="top-nav">
                    <ul class="nav space-between">
                        <li class="center-vh" v-for="(i, index) in navList" :key='index' :class="{'active': chosenNav.id == i.id}" @click="chose_nav(i, $event)">{{i.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="interval" v-if='chosenNav.id == 0'>
            <div class="interval-top">
                <ul>
                    <li class="space-between">
                        <span>开始时间</span>
                        <i class="center-v">2019年11月15日  11:24</i>
                    </li>
                    <li class="space-between">
                        <span>结束时间</span>
                        <i class="center-v">2020年1月1日  1:00</i>
                    </li>
                    <li class="space-between">
                        <span>包括结束时间</span>
                        <strong></strong>
                    </li>
                </ul>
            </div>
            <div class="interval-middle"></div>
            <div class="interval-bottom">
                <ul>
                    <li class="space-between"><span>年</span><span>0年156天9小时57分钟34秒</span></li>
                    <li class="space-between"><span>月</span><span>331天9小时57分钟</span></li>
                    <li class="space-between"><span>周</span><span>15周2天9小时57分钟</span></li>
                    <li class="space-between"><span>天</span><span>156天9小时57分钟</span></li>
                    <li class="space-between"><span>时</span><span>643小时23分钟</span></li>
                    <li class="space-between"><span>分</span><span>50,456分钟</span></li>
                    <li class="space-between"><span>秒</span><span>50,12,229,987秒</span></li>
                </ul>
            </div>
        </div>
        <div class="date" v-if='chosenNav.id == 1'>日期推算</div>
        <div class="earth" v-if='chosenNav.id == 2'>世界时间</div>
        <div class="leapyear" v-if='chosenNav.id == 3'>闰年计算</div>
        <div class="constellation" v-if='chosenNav.id == 4'>生肖星座</div>
        <div class="pop flex-bottom">
            <div class="pop-box">
                <div class="pop-box-title space-between">
                    <span class='center-vh'>取消</span>
                    <strong class='center-vh'>开始时间</strong>
                    <i class='center-vh'>确定</i>
                </div>
                <DatetimePicker :formatter="formatter" v-model="currentDate" :min-date="minDate" :max-date="maxDate" :confirm = 'confirm'></DatetimePicker>
            </div>
        </div>
    </div>
</template>
<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import { DatetimePicker } from 'vant';
    import $ from 'jquery'
    export default {
        name: 'timeSelectorIndex',
        components:{
            wHead,
            DatetimePicker
        },
        data(){
            return {
                titleJson:{
                    title: '时间计算器',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                },
                navList:[
                    {id:0, name:'间隔计算'},
                    {id:1, name:'日期推算'},
                    {id:2, name:'世界时间'},
                    {id:3, name:'闰年计算'},
                    {id:4, name:'生肖星座'},
                ],
                chosenNav: { id: 0 },               // 当前选择的导航item
                currentDate: new Date(),
                minDate: new Date(1900, 1, 1),
                maxDate: new Date(2099, 12, 30),
            }
        },
        methods:{
            // 选择导航
            chose_nav(i, el){
                const liWidth = $($('.top-nav li')[0]).width();
                const middleWidth = $('.top-nav-box').width()/2 - liWidth/2;
                const elLeft = liWidth*(i.id) + parseFloat($('.top-nav .nav').css('padding-right'));
                this.chosenNav = i;
                this.tabLeft = elLeft - middleWidth;
                $('.top-nav li').removeClass('active');
                $(el.target).addClass('active');
                $('.top-nav').animate({scrollLeft: this.tabLeft}, 200);
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day'){
                    return `${value}日`
                } else if (type === 'hour'){
                    return `${value}时`
                } else if (type === 'minute'){
                    return `${value}分`
                }
                return value;
            },
            confirm(value){
                console.log('0000000000000')
                console.log(value);
            }
        },
        activated(){
            $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
        },
        mounted(){
            $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
        }
    }
</script>
<style lang="less" scoped>
    @import './index.less';
</style>
<style>
    @import './reset_vue.less';
</style>
