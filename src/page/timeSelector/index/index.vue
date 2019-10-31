<template>
    <div id="timeSelectorIndex">
        <!-- 顶部tab -->
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
        <!-- 间隔计算 -->
        <div class="interval" v-if='chosenNav.id == 0'>
            <div class="interval-top">
                <ul v-if="timeJson['type0']">
                    <li class="space-between">
                        <span>开始时间</span>
                        <i class="center-v" @click="open_selector(0, 'start')">{{timeJson['type0']['startTime']}}</i>
                    </li>
                    <li class="space-between">
                        <span>结束时间</span>
                        <i class="center-v" @click="open_selector(0, 'endTime')">{{timeJson['type0']['endTime']}}</i>
                    </li>
                    <li class="space-between">
                        <span>包括结束时间</span>
                        <strong>
                            <SwitchVant v-model="timeJson['type0']['isInclude']" active-color="#3DBD7D" @change="switch_change"></SwitchVant>
                        </strong>
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
        <!-- 日期推算 -->
        <div class="date" v-if='chosenNav.id == 1'>
            <ul class="date-top space-between">
                <li class='center-vh' :class="{'active': 0 == timeJson['type1']['chosenTab']}" @click="change_tab(0, 1)">向前推算</li>
                <li class='center-vh' :class="{'active': 1 == timeJson['type1']['chosenTab']}" @click="change_tab(1, 1)">向后推算</li>
                <li class='center-vh' :class="{'active': 2 == timeJson['type1']['chosenTab']}" @click="change_tab(2, 1)">相差推算</li>
            </ul>
            <div class="date-middle" v-if="0 == timeJson['type1']['chosenTab'] || 1 == timeJson['type1']['chosenTab']">
                <div class="date-middle1">
                    <input type="text" placeholder="请输入日期时间">
                </div>
                <div class="date-middle1 space-between">
                    <span class='center-v'>相差</span>
                    <input type="text" class='date-middle-input' placeholder="请输相差天数">
                </div>
            </div>
            <div class="date-middle" v-if="2 == timeJson['type1']['chosenTab']">
                <div class="date-middle1">
                    <input type="text" placeholder="请输入日期时间">
                </div>
                <div class="date-middle1">
                    <input type="text" placeholder="请输入日期时间">
                </div>
            </div>
            <div class="date-bottom space-between">
                <span>计算结果：</span>
                <strong>2000-02-05</strong>
            </div>
        </div>
        <!-- 世界时间 -->
        <div class="earth" v-if='chosenNav.id == 2'>世界时间</div>
        <!-- 闰年计算 -->
        <div class="leapyear" v-if='chosenNav.id == 3'>
            <ul class="leapyear-top space-between">
                <li class='center-vh' :class="{'active': 0 == timeJson['type3']['chosenTab']}" @click="change_tab(0, 3)">单年计算</li>
                <li class='center-vh' :class="{'active': 1 == timeJson['type3']['chosenTab']}" @click="change_tab(1, 3)">范围计算</li>
            </ul>
            <div class="leapyear-middle" v-if="0 == timeJson['type3']['chosenTab']">
                <div class="leapyear-middle-text">
                    <input v-model="timeJson['type3']['year0']" placeholder="请输入年份" disabled>
                </div>
            </div>
            <div class="leapyear-middle" v-if="1 == timeJson['type3']['chosenTab']">
                <div class="leapyear-middle-text space-between">
                    <input v-model="timeJson['type3']['year1']" placeholder="请输入开始年份">
                </div>
                <div class="leapyear-middle-text space-between">
                    <input v-model="timeJson['type3']['year2']" placeholder="请输入结束年份">
                </div>
            </div>
            <div class="leapyear-bottom">
                <ul class="leapyear-bottom-box flex-wrap">
                    <li>计算结果：</li>
                    <li>1994年</li>
                    <li>1998年</li>
                    <li>2004年</li>
                    <li>2008年</li>
                    <li>2012年</li>
                    <li>2016年</li>
                    <li>2020年</li>
                </ul>
            </div>
        </div>
        <!-- 生肖星座 -->
        <div class="constellation" v-if='chosenNav.id == 4'>
            <div class="constellation-middle">
                <input type="text" placeholder="请输入时间" v-model="timeJson['type4']['year']">
            </div>
            <div class="constellation-bottom">
                <div class="bottom-top">
                    计算结果：
                </div>
                <ul class="bottom-bottom space-between">
                    <li>星座：天蝎座</li>
                    <li>生肖：虎</li>
                </ul>
            </div>
        </div>
        <!-- 时间选择器 -->
        <div class="pop">
            <div class="flex-bottom">
                <div class="pop-box">
                    <DatetimePicker :title="popTitle" @cancel='cancel' :type = "'datetime'" :formatter="formatter" v-model="currentDate" :min-date="minDate" :max-date="maxDate" @confirm = 'confirm'></DatetimePicker>
                    <!-- <DatetimePicker :title="popTitle" type = "year-month" :formatter="formatter" v-model="currentDate" :min-date="minDate" @confirm = 'confirm'></DatetimePicker> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import { DatetimePicker, Switch } from 'vant';
    import { time } from '@/common/js/myApi'
    import { common } from '@/common/js/common'
    import $ from 'jquery'
    export default {
        name: 'timeSelectorIndex',
        components:{
            wHead,
            DatetimePicker,
            SwitchVant: Switch
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
                chosenNav: { id: 0, selectortxt: 'datetime', name: '' },               // 当前选择id(0=>间隔计算，1=>日期推算，3=>世界时间，4=>闰年计算，5=>生肖星座)；当前要打开的选择器的类型selectortxt(默认datetime)，当前选择时间器的返回字段
                currentDate: new Date(),
                minDate: new Date(1900, 1, 1),
                maxDate: new Date(2099, 12, 30),
                chosenItem: {},
                popTitle: '开始时间',
                checked: true,
                timeJson: {},                                                           // 选择器的输入值（type1:间隔计算;type2:日期推算;type3:世界时间;type4:闰年计算;type5:生肖星座;
            }
        },
        methods:{
            change_tab(type, tab){
                this.timeJson['type' + tab]['chosenTab'] = type;
            },
            // 初始化 输入数据
            init(){
                // 获取当前时间
                const _this = this;
                time( res => {
                    const obj = common.change_to_date(res['data']['BJTime']);
                    _this.$nextTick(() => {
                        _this.timeJson = {
                            type0: {
                                startTime: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                                endTime: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                                isInclude: true,
                                list: []
                            },
                            type1: {
                                chosenTab: 0
                            },
                            type2: {},
                            type3: {
                                chosenTab: 0,
                                year0: '2020年',
                                year1: '1994年',
                                year2: '2012年'
                            },
                            type4: {
                                year: '1999-12-25'
                            }
                        }
                        _this.caculate(0);
                    });
                });
            },
            // 切换时间格式
            change_to_date(time, num){
                const obj = common.change_to_date(time);
                let str = '';
                if(num == 5){
                    str = obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日';
                } else {
                    str = obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日 '+ obj['hour'] + ':' + obj['minutes'];
                }
                return str;
            },
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
            // 格式化时间选择器
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
            // 确认
            confirm(value){
                const _this = this;
                console.log(value);
                console.log(this.chosenNav);
                // _this.timeJson['type'+_this.chosenNav['id']][_this.chosenNav['name']] = 
                console.log(Date.parse(value))
            },
            // 关闭弹框
            cancel(){
                $('.pop').fadeOut(200);
            },
            // 切换开关
            switch_change(val){
                console.log(val);
            },
            // 打开时间选择器
            open_selector(ind, name){
                console.log(ind);
                console.log(name);
                $('.pop').fadeIn(200);
            },
            // 计算结果(0=>间隔计算，1=>日期推算，2=>世界时间，3=>闰年计算，4=>生肖星座)
            caculate(type){
                const _this = this;
                switch (type) {
                    case 0:
                        let arr = _this.time_jisuan(_this.timeJson['type0']['endTime'], _this.timeJson['type0']['startTime']);
                        _this.timeJson['type0']['list'] = _this.returnArr(arr);
                        break;
                    default:
                        break;
                }
            },
            // 计算时间差
            time_jisuan(start_time, end_time) {
                start_time = start_time.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, '$1-$2-$3') + ' 00:00:00';
                end_time = end_time.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, '$1-$2-$3') + ' 00:00:00';
                var common_year = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                var leap_year = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                //判断前后时间大小
                var isNegative = false;
                var timestamp_start_time = Date.parse(new Date(start_time));
                var timestamp_end_time = Date.parse(new Date(end_time));
                if(timestamp_start_time > timestamp_end_time){
                    isNegative = true;
                    [start_time, end_time] = [end_time, start_time];
                    [timestamp_start_time, timestamp_end_time] = [timestamp_end_time, timestamp_start_time];
                }
                //获取前四位
                var time_info_start = start_time.split(' ');
                var time_info_end = end_time.split(' ');
                //获取年月日
                var year_month_day_start = time_info_start[0].split('-');
                var year_month_day_end = time_info_end[0].split('-');
                //获取时间
                var hour_minute_second_start = time_info_start[1].split(':');
                var hour_minute_second_end = time_info_end[1].split(':');
                var beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]);
                //进行判断时间
                var time_info_1 = parseInt(hour_minute_second_start[2]) + parseInt(hour_minute_second_start[1]) * 60 + parseInt(hour_minute_second_start[0]) * 3600;
                var time_info_2 = parseInt(hour_minute_second_end[2]) + parseInt(hour_minute_second_end[1]) * 60 + parseInt(hour_minute_second_end[0]) * 3600;
                var hour = 0;
                var minute = 0;
                var second = 0;
                var beapart_time = time_info_2 - time_info_1;
                var beapart_day_last = 0;
                if (timestamp_end_time / 1000 - timestamp_start_time / 1000 <= 86400) {
                    var tim = timestamp_end_time / 1000 - timestamp_start_time / 1000;
                    hour = parseInt(tim / 3600);
                    minute = parseInt((tim - hour * 60 * 60) / 60);
                    second = tim - hour * 60 * 60 - minute * 60;
                    return [0, 0, 0, hour, minute, second, isNegative];
                }
                if (beapart_time < 0) {
                    beapart_day = beapart_day - 1;
                    beapart_time = time_info_2 + 86400 - time_info_1;
                    hour = parseInt(beapart_time / 3600);
                    minute = parseInt((beapart_time - hour * 60 * 60) / 60);
                    second = beapart_time - hour * 60 * 60 - minute * 60;
                    beapart_day_last = 1;
                } else {
                    hour = parseInt(beapart_time / 3600);
                    minute = parseInt((beapart_time - hour * 60 * 60) / 60);
                    second = beapart_time - hour * 60 * 60 - minute * 60;
                }
                //同一年
                if (beapart_year === 0) {
                    var beapart_day = parseInt(year_month_day_end[2]) - parseInt(year_month_day_start[2]);
                    var beapart_month = parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);
                    if (beapart_day > 0) {
                        return [0, beapart_month, beapart_day - beapart_day_last, hour, minute, second, isNegative];
                    } else {
                        if (parseInt(year_month_day_end[0]) % 4 === 0) {
                            beapart_day = leap_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
                        } else {
                            beapart_day = common_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
                        }
                        if (time_info_2 - time_info_1 < 0) {
                            beapart_day -= 1;
                        }
                        return [0, beapart_month - 1, beapart_day - beapart_day_last, hour, minute, second, isNegative];
                    }
                    //非同一年
                } else {
                    //判断如果相差一年
                    var beapart_day = parseInt(year_month_day_end[2]) - parseInt(year_month_day_start[2]);
                    var beapart_month = parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);
                    var beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]);
                    if (beapart_day < 0){
                        beapart_month = beapart_month -1;
                    }
                    if (beapart_day == 0){
                        beapart_day = 1;
                    }
                    if (beapart_month < 0) {
                        beapart_year = beapart_year - 1;
                        beapart_month = 12 - parseInt(year_month_day_end[1]) + parseInt(year_month_day_start[1]);
                    }
                    if (beapart_day > 0) {
                        return [beapart_year, beapart_month, beapart_day - beapart_day_last, hour, minute, second, isNegative];
                    } else {
                        if (parseInt(year_month_day_end[0]) % 4 === 0) {
                            beapart_day = leap_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
                        } else {
                            beapart_day = common_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
                        }
                        return [beapart_year, beapart_month >0 ?beapart_month - 1:beapart_month, beapart_day - beapart_day_last, hour, minute, second, isNegative];
                    }
                }
            },
            // 返回列表
            returnArr(arr){

            }
        },
        activated(){
            $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
        },
        mounted(){
            $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
            this.init();
        }
    }
</script>
<style lang="less" scoped>
    @import './index.less';
</style>
<style>
    .pop-box{
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        overflow:hidden;
        box-sizing: border-box;
    }
    .van-picker__toolbar{
        height:56px;
        border-bottom:1px solid rgba(215, 213, 213, 0.6);
    }
    .van-picker__title{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(18,18,18,1);
    }
    .van-picker__cancel,
    .van-picker__confirm{
        padding: 0 25px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
    }
    .van-picker__cancel{
        color:rgba(183,194,201,1);
    }
    .van-picker__confirm{
        color:rgba(104,196,161,1);
    }
</style>