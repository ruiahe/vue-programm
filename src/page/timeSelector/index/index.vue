<template>
    <div id="timeSelectorIndex">
        <!-- 顶部tab -->
        <div class="top">
            <div class="top-box">
                <wHead :titleJson='titleJson'></wHead>
                <div class="top-nav-box">
                    <div class="top-nav">
                        <ul class="nav space-between">
                            <li class="center-vh" v-for="(i, index) in navList" :key='index' :class="{'active': chosenItem.id == i.id}" @click="chose_nav(i, $event)">{{i.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="top-placeholder"></div>
        </div>
        <!-- 间隔计算 -->
        <div class="interval" v-if='chosenItem.id == 0'>
            <div class="interval-top">
                <ul v-if="timeJson['type0']">
                    <li class="space-between">
                        <span>开始时间</span>
                        <i class="center-v" @click="open_selector(0, 'startTime', 'start')">{{timeJson['type0']['startTime']}}</i>
                    </li>
                    <li class="space-between">
                        <span>结束时间</span>
                        <i class="center-v" @click="open_selector(0, 'endTime', 'end')">{{timeJson['type0']['endTime']}}</i>
                    </li>
                </ul>
            </div>
            <div class="interval-middle" v-if="timeJson['type0']"></div>
            <div class="interval-bottom">
                <ul v-if="timeJson['type0'] && timeJson['type0']">
                    <li class="space-between" v-if="timeJson['type0']['list'][0].length > 0"><span>年</span><span>{{timeJson['type0']['list'][0]}}</span></li>
                    <li class="space-between" v-if="timeJson['type0']['list'][1].length > 0"><span>月</span><span>{{timeJson['type0']['list'][1]}}</span></li>
                    <li class="space-between" v-if="timeJson['type0']['list'][2].length > 0"><span>周</span><span>{{timeJson['type0']['list'][2]}}</span></li>
                    <li class="space-between" v-if="timeJson['type0']['list'][3].length > 0"><span>天</span><span>{{timeJson['type0']['list'][3]}}</span></li>
                    <li class="space-between" v-if="timeJson['type0']['list'][4].length > 0"><span>时</span><span>{{timeJson['type0']['list'][4]}}</span></li>
                    <li class="space-between" v-if="timeJson['type0']['list'][5].length > 0"><span>分</span><span>{{timeJson['type0']['list'][5]}}</span></li>
                    <li class="space-between" v-if="timeJson['type0']['list'][6].length > 0"><span>秒</span><span>{{timeJson['type0']['list'][6]}}</span></li>
                </ul>
            </div>
        </div>
        <!-- 日期推算 -->
        <div class="date" v-if='chosenItem.id == 1'>
            <ul class="date-top space-between">
                <li class='center-vh' :class="{'active': 0 == timeJson['type1']['chosenTab']}" @click="change_tab(0, 1)">向前推算</li>
                <li class='center-vh' :class="{'active': 1 == timeJson['type1']['chosenTab']}" @click="change_tab(1, 1)">向后推算</li>
                <li class='center-vh' :class="{'active': 2 == timeJson['type1']['chosenTab']}" @click="change_tab(2, 1)">相差推算</li>
            </ul>
            <div class="date-middle" v-if="0 == timeJson['type1']['chosenTab'] || 1 == timeJson['type1']['chosenTab']">
                <div class="date-middle1">
                    <input class="color198" type="text" placeholder="请输入日期时间" readonly @click="open_selector(1, 'timeTxt'+timeJson['type1']['chosenTab'], 'time'+timeJson['type1']['chosenTab'])" v-model="timeJson['type1']['timeTxt'+timeJson['type1']['chosenTab']]">
                </div>
                <div class="date-middle1 space-between">
                    <span class='center-v'>相差</span>
                    <div class="input-box">
                        <input class='date-middle-input noArrow color198' type="number" @input="caculate(1)" v-model="timeJson['type1']['difference'+timeJson['type1']['chosenTab']]" pattern="[0-9]*">
                        <strong class="placeholder">{{timeJson['type1']['difference'+timeJson['type1']['chosenTab']].length > 0 ? '' : '请输相差天数'}}</strong>
                    </div>
                </div>
            </div>
            <div class="date-middle" v-if="2 == timeJson['type1']['chosenTab']">
                <div class="date-middle1">
                    <input class="color198" type="text" placeholder="请输入日期时间" readonly @click="open_selector(1, 'timeTxt'+timeJson['type1']['chosenTab']+0, 'time'+timeJson['type1']['chosenTab']+0)" v-model="timeJson['type1']['timeTxt'+timeJson['type1']['chosenTab']+0]">
                </div>
                <div class="date-middle1">
                    <input class="color198" type="text" placeholder="请输入日期时间" readonly @click="open_selector(1, 'timeTxt'+timeJson['type1']['chosenTab']+1, 'time'+timeJson['type1']['chosenTab']+1)" v-model="timeJson['type1']['timeTxt'+timeJson['type1']['chosenTab']+1]">
                </div>
            </div>
            <div class="date-bottom space-between">
                <span>计算结果：</span>
                <strong v-if="2 != timeJson['type1']['chosenTab']">{{timeJson['type1']['result'+timeJson['type1']['chosenTab']]}}</strong>
                <strong v-if="2 == timeJson['type1']['chosenTab']">{{timeJson['type1']['result2']}}天</strong>
            </div>
        </div>
        <!-- 世界时间 -->
        <div class="earth" v-if='chosenItem.id == 2'>
            <ul class="earth-list">
                <li class='space-between' v-for="(i, index) in timeJson['type2']['list']" :key="index">
                    <SwipeCell>
                        <div class="cell space-between">
                            <div class="earth-box">
                                <div class="earth-clock center-vh">
                                    <div class="earth-clock-disk center-vh">
                                        <i></i>
                                    </div>
                                </div>
                                <div class="earth-hour square"></div>
                                <div class="earth-minute square"></div>
                                <div class="earth-second square"></div>
                            </div>
                            <div class="earth-right">
                                <div class="earth-right-top"></div>
                                <div class="earth-right-bottom space-between">
                                    <span :class="{'local': index == 0}">{{i.cityName+'('+i.countyName+')'}}</span>
                                    <strong>{{index != 0 ? ('今天'+(i.offsetMs>0?'+'+(i.offsetMs/1000/60/60):(i.offsetMs/1000/60/60))+'小时'): ''}}</strong>
                                </div>
                            </div>
                        </div>
                        <div class='delete space-between' slot="right" v-if="index != 0">
                            <div class='delete-change center-vh' @click="link_to('/timeSelector/countryList', i.followId)">
                                <img src="../../../assets/timeSelector/change.png" alt="">
                            </div>
                            <div class='delete-delete center-vh' @click="change_delete(i)">
                                <img src="../../../assets/timeSelector/delete.png" alt="">
                            </div>
                        </div>
                    </SwipeCell>
                </li>
            </ul>
            <div class="earth-add center-vh"  v-if="timeJson['type2']['list'].length < 10">
                <div class="space-between" @click="link_to('/timeSelector/countryList')">
                    <img src="../../../assets/timeSelector/plus.png" alt="">
                    <span>添加国家</span>
                </div>
            </div>
            <div class="earth-add center-vh gray"  v-if="(timeJson['type2']['list'].length > 10 || timeJson['type2']['list'].length == 10)">
                <div class="space-between">
                    <img src="../../../assets/timeSelector/plusGray.png" alt="">
                    <span>添加国家</span>
                </div>
            </div>
        </div>
        <!-- 闰年计算 -->
        <div class="leapyear" v-if='chosenItem.id == 3'>
            <ul class="leapyear-top space-between">
                <li class='center-vh' :class="{'active': 0 == timeJson['type3']['chosenTab']}" @click="change_tab(0, 3)">单年计算</li>
                <li class='center-vh' :class="{'active': 1 == timeJson['type3']['chosenTab']}" @click="change_tab(1, 3)">范围计算</li>
            </ul>
            <div class="leapyear-middle" v-if="0 == timeJson['type3']['chosenTab']">
                <div class="leapyear-middle-text">
                    <input class="color198" readonly v-model="timeJson['type3']['year0']" placeholder="请输入年份" @click="open_selector(3, 'year0', 'index0', timeJson['type3']['index0'])">
                </div>
            </div>
            <div class="leapyear-middle" v-if="1 == timeJson['type3']['chosenTab']">
                <div class="leapyear-middle-text space-between">
                    <input class="color198" readonly v-model="timeJson['type3']['year1']" placeholder="请输入开始年份" @click="open_selector(3, 'year1', 'index1', timeJson['type3']['index1'])">
                </div>
                <div class="leapyear-middle-text space-between">
                    <input class="color198" readonly v-model="timeJson['type3']['year2']" placeholder="请输入结束年份" @click="open_selector(3, 'year2', 'index2', timeJson['type3']['index2'])">
                </div>
            </div>
            <div class="leapyear-bottom">
                <ul class="leapyear-bottom-box">
                    <li>计算结果：</li>
                    <li v-for="(i, index) in timeJson['type3']['result'+timeJson['type3']['chosenTab']]" :key="index">{{i}}</li>
                    <li v-if="timeJson['type3']['result'+timeJson['type3']['chosenTab']] && timeJson['type3']['result'+timeJson['type3']['chosenTab']].length == 1"></li>
                    <li v-if="timeJson['type3']['result'+timeJson['type3']['chosenTab']] && timeJson['type3']['result'+timeJson['type3']['chosenTab']].length == 1"></li>
                    <li v-if="timeJson['type3']['result'+timeJson['type3']['chosenTab']] && timeJson['type3']['result'+timeJson['type3']['chosenTab']].length == 1"></li>
                </ul>
            </div>
        </div>
        <!-- 生肖星座 -->
        <div class="constellation" v-if='chosenItem.id == 4'>
            <div class="constellation-middle">
                <input class="color198" readonly type="text" placeholder="请输入时间" v-model="timeJson['type4']['timeTxt']" @click="open_selector(4, 'timeTxt', 'time')">
            </div>
            <div class="constellation-bottom">
                <div class="bottom-top">
                    计算结果：
                </div>
                <ul class="bottom-bottom space-between">
                    <li>星座：{{timeJson['type4']['text1']}}</li>
                    <li>生肖：{{timeJson['type4']['text2']}}</li>
                </ul>
            </div>
        </div>
        <!-- 时间选择器 -->
        <div class="pop">
            <div class="flex-bottom">
                <div class="pop-box">
                    <!-- 年&月&日 -->
                    <DatetimePicker type = "date" :title="chosenItem['time']" @cancel='cancel' :formatter="formatter" v-model="currentDate" :min-date="minDate" :max-date="maxDate" @confirm = 'confirm' v-if="chosenItem.id != 0 && chosenItem.id != 3"/>
                    <!-- 年&月&日&时&分&秒 -->
                    <DatetimePicker type = "datetime" :title="chosenItem['time']" @cancel='cancel' :formatter="formatter" v-model="currentDate" :min-date="minDate" :max-date="maxDate" @confirm = 'confirm' v-if="chosenItem.id == 0"/>
                    <!-- 年 -->
                    <Picker v-model="index" :columns="columns" show-toolbar @cancel='cancel' @confirm = 'confirm' v-if="chosenItem.id == 3" :default-index="index"></Picker>
                </div>
            </div>
        </div>
        <!-- 定位 -->
        <div id="map-container"></div>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
    </div>
</template>
<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import { DatetimePicker, SwipeCell, Picker } from 'vant';
    import { time, listWorldCity, listUserCities, removeUserCity } from '@/common/js/myApi';
    import { common } from '@/common/js/common';
    import { location } from '@/common/js/position.js'
    import { mapActions } from 'vuex'
    import $ from 'jquery'
    export default {
        name: 'timeSelectorIndex',
        components:{
            wHead,
            DatetimePicker,
            Picker,
            SwipeCell
        },
        data(){
            return {
                titleJson:{
                    title: '时间计算器',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                },                                                                      // 标题
                navList:[
                    {id:0, name:'间隔计算'},                                            
                    {id:1, name:'日期推算'},
                    {id:2, name:'世界时间'},
                    {id:3, name:'闰年计算'},
                    {id:4, name:'生肖星座'},
                ],                                                                      // 导航列表
                currentDate: new Date(),                                                // 当前选择时间器的默认事件
                minDate: new Date(1972, 0, 1),
                maxDate: new Date(2100, 11, 31),
                chosenItem: { id: 0, subId: 0, title: '开始时间', tabName: '间隔计算' }, // 当前选择id(0=>间隔计算，1=>日期推算，3=>世界时间，4=>闰年计算，5=>生肖星座)；当前要打开的选择器的类型selectortxt(默认datetime)，当前选择时间器的返回字段 
                checked: true,
                timeJson: {},                                                           // 选择器的输入值（type1:间隔计算;type2:日期推算;type3:世界时间;type4:闰年计算;type5:生肖星座;
                earthList: [
                    {time: 1579503833000, country: '北京（中国）', dValue: ''},
                    {time: 1572103813000, country: '华盛顿（美国）', dValue: '今天+1小时'},
                    {time: 1572503803000, country: '香港（中国）', dValue: '今天-8小时'},
                    {time: 1572503633000, country: '东京（日本）', dValue: '今天-6小时'}
                ],
                columns: ['1972年', '1973年', '1974年'],                                 // 年份列表
                index: 0,
                animalsList:{ 0: '鼠', 1: '牛', 2: '虎', 3: '兔', 4: '龙', 5: '蛇', 6: '马', 7: '羊', 8: '猴', 9: '鸡', 10: '狗', 11: '猪' },    // 生肖列表
                constellationList: {},
                countryList: [],
                timezone: 0,                                                            // 当前时区
                timeDiff: 0,                                                            // 网络时间和系统时间的时差(网络时间 - 系统时间)
                cityName: '',
                timeList: [],                                                           // 计数器列表
                hasMounted: false,
                netTime: 0
            }
        },
        methods:{
            ...mapActions('timeSelector',[ 
                'getAppInfo'
            ]),
            // 选择导航
            chose_nav(i, el){
                const liWidth = $($('.top-nav li')[0]).width();
                const middleWidth = $('.top-nav-box').width()/2 - liWidth/2;
                const elLeft = liWidth*(i.id) + parseFloat($('.top-nav .nav').css('padding-right'));
                [this.chosenItem['id'], this.chosenItem['tabName']] = [i.id, i.name];
                this.tabLeft = elLeft - middleWidth;
                $('.top-nav li').removeClass('active');
                $(el.target).addClass('active');
                $('.top-nav').animate({scrollLeft: this.tabLeft}, 200);
            },
            // 选择副导航
            change_tab(type, tab){
                this.timeJson['type'+tab]['chosenTab'] = type;
                this.caculate(this.chosenItem['id']);
            },
            // 初始化页面
            init(bol){
                let arr = [];
                const _this = this;
                this.netTime = Date.parse(new Date());
                if (bol) this.init_data([]);
                $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
                // 获取城市列表
                listWorldCity((res) => {
                    _this.countryList = res['data']['dataList'];
                    // 获取北京网络时间
                    time(res => {
                        _this.getLocation(res['data']['BJTime']);
                    })
                })
                for(let i = 0; i< 128; i++) {
                    arr[i] = {text: 1972 + i + '年'};
                }
                _this.$nextTick(() => {
                    _this.columns = arr;
                })
            },
            // 初始化页面数据
            init_data(list){
                // 获取当前时间
                const _this = this;
                const time = this.netTime;
                const obj = common.change_to_date(time);
                const timeStr = Date.parse(new Date(obj['year'] + '/' + obj['month'] + '/' + obj['day'] + ' 00:00:00'));
                _this.$nextTick(() => {
                    _this.timeJson = {
                        type0: {
                            startTime: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日 ' + obj['hour'] + ':' + obj['minutes'],
                            endTime: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日 ' + obj['hour'] + ':' + obj['minutes'],
                            start: time,
                            end: time,
                            list: []
                        },
                        type1: {
                            chosenTab: 0,
                            timeTxt0: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                            time0: timeStr,
                            difference0: '',
                            result0: '',
                            timeTxt1: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                            time1: timeStr,
                            difference1: '',
                            result1: '',
                            timeTxt20: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                            time20: timeStr,
                            timeTxt21: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                            time21: timeStr,
                            result2: ''
                        },
                        type2: {
                            list: list
                        },
                        type3: {
                            chosenTab: 0,
                            year0: '2019年',
                            index0: 47,
                            year1: '2019年',
                            index1: 47,
                            year2: '2019年',
                            index2: 47,
                        },
                        type4: {
                            timeTxt: obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日',
                            time: timeStr,
                            text1: '',
                            text2: ''
                        }
                    }
                    _this.caculate(0);
                    _this.caculate(1);
                    _this.caculate(1, 'init');
                    _this.caculate(3);
                    _this.caculate(4);
                    _this.reset_clock();
                });
                _this.index = obj['year'] - 1972;
            },
            // 跳转页面
            link_to(url, id){
                if(id){
                    this.$router.push({
                        path: url,
                        query:{id: id} 
                    });
                } else {
                    this.$router.push({
                        path: url,
                    });
                }
            },
            // 获取地图定位
            getLocation(time) {
                const _this = this;
                const stateGetLocation = _this.$store.state.timeSelector.getLocation;
                if (stateGetLocation){
                    _this.getLocation_val(stateGetLocation.cityName, time);
                } else {
                    let geolocation = location("map-container", (r)=>{
                        this.cityName = r.address.city;
                        _this.getLocation_val(r.address.city, time);
                    }, ()=>{
                        _this.getLocation_val('北京市', time);
                    })
                }
            },
            // 根据定位获取值
            getLocation_val(str, time){
                if (str.indexOf('市')>-1){
                    str = str.slice(0, -1);
                }
                // str = '华盛顿';
                let item = null;
                let cityId = false;
                this.countryList.forEach((list) => {
                    // 获取定位城市id
                    item = list['cityList'].filter(i => {
                        if (i.cityName == str){
                            return i;
                        }
                    });
                    if(item && item.length > 0) {
                        cityId = { cityId: item[0].cityId };
                    }
                })
                cityId = cityId ? cityId : {};
                // 获取定位城市时区 计算系统和网络时间的时间差
                listUserCities(cityId, (res) => {
                    this.getAppInfo({ name: 'getLocation', value: res['data']['dataList'][0] });
                    for(let i = 0; i < res['data']['dataList'].length; i++){
                        let it = res['data']['dataList'][i];
                        this.netTime = time + it.offsetMs;
                        res['data']['dataList'][i]['time'] = this.netTime;
                        if (i == 0) this.init_data(res['data']['dataList']);
                    }
                })
            },
            // 时间选择器  --  格式化
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
            // 时间选择器  --  打开
            open_selector(ind, name, timeName, yearIndex){
                const _this = this;
                _this.chosenItem['name'] = name;
                _this.chosenItem['timeName'] = timeName;
                if (yearIndex != 9 && yearIndex) {
                    _this.$nextTick(() => {
                        _this.index = yearIndex;
                    })
                } 
                _this.currentDate = new Date(_this.timeJson['type' + _this.chosenItem['id']][timeName]);
                $('.pop').fadeIn(200);
            },
            // 时间选择器  --  确认
            confirm(value){
                const obj = common.change_to_date(Date.parse(value));
                const type = this.chosenItem['id'];
                const name = this.chosenItem['name'];
                const timeName = this.chosenItem['timeName'];
                if( type == 0) {
                    const bol = (name == 'startTime') ? ((value < this.timeJson['type'+type]['end']) || (value == this.timeJson['type'+type]['end'])) : ((this.timeJson['type'+type]['start'] < value) || (this.timeJson['type'+type]['start'] == value));
                    if(bol){
                        this.timeJson['type'+type][name] = obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日 ' + obj['hour'] + ':' + obj['minutes'];
                        this.timeJson['type'+type][timeName] = Date.parse(value);
                        this.caculate(0);
                        this.cancel();
                    } else {
                        common.show_weakTip('结束时间须大于开始时间');
                    }
                } else if(type == 1 || type == 4) {
                    this.timeJson['type'+type][name] = obj['year'] + '年' + obj['month'] + '月' + obj['day'] + '日';
                    this.timeJson['type'+type][timeName] = Date.parse(value);
                    this.caculate(type);
                    this.cancel();
                } else if (type == 3) {
                    this.timeJson['type'+type][timeName] = parseInt(value['text']) - 1972; 
                    this.timeJson['type'+type][name] = value['text'];
                    this.caculate(3);
                    this.cancel();
                }
            },
            // 时间选择器  --  关闭弹框
            cancel(){
                $('.pop').fadeOut(200);
            },
            // 间隔计算  --  计算时间差 => 结果列表
            time_jisuan(start, end) {
                let arr = [];
                const daysType = {
                    'common': [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],     // 平年月份天数
                    'leap': [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],     // 闰年月份天数
                };
                //判断前后时间大小
                let obj_start = common.change_to_date(start);
                let obj_end = common.change_to_date(end);
                let end_time = obj_end['year'] + '/' + obj_end['month'] + '/' + obj_end['day'] + ' '+ obj_end['hour'] + ':' + obj_end['minutes'] + ':00';
                let start_time = obj_start['year'] + '/' + obj_start['month'] + '/' + obj_start['day'] + ' '+ obj_start['hour'] + ':' + obj_start['minutes'] + ':00';
                end = Date.parse(end_time);
                start = Date.parse(start_time);
                if(start > end){
                    [start_time, end_time] = [end_time, start_time];
                    [start, end] = [end, start];
                }
                //获取前四位
                var time_info_start = start_time.split(' ');
                var time_info_end = end_time.split(' ');
                //获取年月日
                var y_m_d_start = time_info_start[0].split('/');
                var y_m_d_end = time_info_end[0].split('/');
                var h_n_s_start = time_info_start[1].split(':');
                var h_n_s_end = time_info_end[1].split(':');
                const y1 = Number(y_m_d_start[0]);                                                      // 开始年份
                const y2 = Number(y_m_d_end[0]);                                                        // 结束年份
                const m1 = Number(y_m_d_start[1]);                                                      // 开始月份
                const m2 = Number(y_m_d_end[1]);                                                        // 结束月份
                const d1 = Number(y_m_d_start[2]);                                                      // 开始日期
                const d2 = Number(y_m_d_end[2]);                                                        // 结束日期
                const h1 = Number(h_n_s_start[0]);                                                      // 开始小时
                const h2 = Number(h_n_s_end[0]);                                                        // 结束小时
                const n1 = Number(h_n_s_start[1]);                                                      // 开始分钟
                const n2 = Number(h_n_s_end[1]);                                                        // 结束分钟
                const isCommon1 = y1 % 4 == 0 ? daysType['leap'] : daysType['common'];                  // 开始年份 的 月份数组
                const isCommon2 = y2 % 4 == 0 ? daysType['leap'] : daysType['common'];                  // 结束年份 的 月份数组
                let yV = 0, mV= 0, dV = 0, hV = 0, nV = 0;                                      // 差值 - 年； 差值 - 月； 差值 - 日；
                /*          月          */
                yV = (m1 < m2 || m1 == m2) ? (y2 -y1) : (y2 - y1 -1);
                mV = (m1 < m2 || m1 == m2) && (d1 < d2 || d1 == d2) ? (m2 - m1) : ((m1 < m2 || m1 == m2) ? (m2 - m1 -1) : (11 - m1 + m2));
                dV = (d1 < d2 || d1 == d2) && (h1 < h2 || h1 == h2) ? (d2 - d1) : ((d1 < d2 || d1 == d2) ? (d2 - d1 -1) : (isCommon1[m1 - 1] - d1 + d2 - 1));
                hV = (h1 < h2 || h1 == h2) && (n1 < h2 || n1 == n2) ? (h2 - h1) : ((h1 < h2 || h1 == h2) ? (h2 - h1 -1) : (23 - h1 + h2));
                nV = (n1 < n2 || n1 == n2) ? (n2 - n1) : (60 - n1 + n2);
                arr[0] = yV > 0 ? (yV + '年' + mV + '个月' + dV + '天' + hV + '小时' + nV + '分钟') : '';       // 年
                /*          月结束          */
                arr[1] = (12 * yV + mV) > 0 ? (12 * yV + mV + '个月' + dV + '天' + hV + '小时' + nV + '分钟') : '';     
                arr[2] = ((12 * yV + mV) * 4 + dV / 7) > 0 ? (parseInt((12 * yV + mV) * 4 + dV / 7) + '周' + (dV % 7 + '天') + hV + '小时' + nV + '分钟') : '';         // 周
                arr[3] = (end - start) > 0 ? (parseInt((end - start) / 1000 / 60 / 60 / 24) + '天' + hV + '小时' + nV + '分钟') : '';  // 天
                arr[4] = (end - start) > 0 ? (parseInt((end - start) / 1000 / 60 / 60) + '小时') : '';     // 小时 
                arr[5] = (end - start) > 0 ? (parseInt((end - start) / 1000 / 60) + '分钟') : '';          // 分钟
                arr[6] = (end - start) > 0 ? ((end - start) / 1000 + '秒') : '';                 // 秒
                return arr;
            },
            // 世界时间  -- 倒计时
            countDown(timeDiff, index){
                const _this = this;
                this.timeList[index] = setInterval(() => {
                    let obj = {};
                    let time = Date.parse(new Date()) + timeDiff;
                    obj = common.change_to_date(time);
                    const txt = obj['year']+'年'+obj['month']+'月'+obj['day']+'日 星期'+obj['week']+'&nbsp; '+obj['hour']+':'+obj['minutes']+':'+obj['seconds'];
                    $($('.earth .earth-box')[index]).find('.earth-hour').css({'transform': 'rotate('+((obj['hour']%12)*30)+'deg)'});
                    $($('.earth .earth-box')[index]).find('.earth-minute').css({'transform': 'rotate('+(obj['minutes']*6)+'deg)'});
                    $($('.earth .earth-box')[index]).find('.earth-second').css({'transform': 'rotate('+(obj['seconds']*6)+'deg)'});
                    $($('.earth .earth-right')[index]).find('.earth-right-top').html(txt)
                    _this.timeJson['type2']['list'][index]['txt'] = txt;
                    _this.timeJson['type2']['list'][index]['time'] = time;
                }, 1000)
            },
            // 世界时间  -- 重置钟表时间
            reset_clock(){
                this.timeList.forEach(t => {
                    clearInterval(t);
                })
                this.timeJson['type2']['list'].forEach((e, index) => {
                    this.countDown(e.offsetMs, index);
                })
            },
            // 世界时间  --  删除item
            change_delete(i){
                removeUserCity({ cityId: i.cityId }, res => {
                    common.show_weakTip(res.message);
                    this.timeList.map(t=>{
                        clearInterval(t);
                    })
                    this.init();
                })
            },
            // // 日期推算
            change_text_type(){
                let text = this.timeJson['type1']['difference'+this.timeJson['type1']['chosenTab']];
                let reg=/^[0-9]+.?[0-9]*$/;
                if(!reg.test(text)){
                    this.timeJson['type1']['difference'+this.timeJson['type1']['chosenTab']] = '';
                }
            },
            // 计算结果(0=>间隔计算，1=>日期推算，2=>世界时间，3=>闰年计算，4=>生肖星座)
            caculate(type, initTxt){
                const _this = this;
                switch (type) {
                    case 0:
                        let arr = _this.time_jisuan(_this.timeJson['type0']['start'], _this.timeJson['type0']['end']);
                        _this.timeJson['type0']['list'] = arr;
                        break;
                    case 1:
                        const subId = this.timeJson.type1.chosenTab;
                        if(subId == 0 || subId == 1){
                            const diff = this.timeJson.type1['difference'+subId] == '' ? 0 : (this.timeJson.type1['difference'+subId] * 86400000);
                            const obj = (subId == 0) ? common.change_to_date(this.timeJson.type1['time'+subId] - diff) : common.change_to_date(this.timeJson.type1['time'+subId] + diff);
                            this.timeJson['type1']['result'+subId] = obj['year']+'-'+obj['month']+'-'+obj['day'];
                            (initTxt && initTxt == 'init') ? this.timeJson['type1']['result1'] = obj['year']+'-'+obj['month']+'-'+obj['day'] : '';
                        } else {
                            const diffTime = Math.abs((this.timeJson.type1['time20'] - this.timeJson.type1['time21']));
                            this.timeJson['type1']['result'+subId] = diffTime / 1000 / 60 / 60 / 24;
                        }
                        break;
                    case 3:
                        const subId3 = this.timeJson.type3.chosenTab;
                        let arr3 = [];
                        if (subId3 == 0){
                            const text0 = parseInt(this.timeJson.type3.year0) % 4 == 0 ? '闰年' : '平年';
                            arr3.push(text0);
                        } else {
                            let time30 = this.timeJson.type3.index1;
                            let time31 = this.timeJson.type3.index2;
                            if ( time30 > time31){
                                [time30, time31] = [time31, time30];
                            }
                            for(let i = time30; i < time31 + 1; i++) {
                                const year3 = 1972 + i;
                                year3 % 4 == 0 ? arr3.push(1972 + i + '年'):'';
                            }
                        }
                        this.timeJson['type3']['result'+subId3] = arr3;
                        break;
                    case 4:
                        const obj4 = common.change_to_date(this.timeJson.type4.time);
                        if ((obj4['month'] == 3 && obj4['day'] > 20) || (obj4['month'] == 4 && obj4['day'] < 20)){
                            this.timeJson['type4']['text1'] = '白羊座';
                        } else if ((obj4['month'] == 4 && obj4['day'] > 19) || (obj4['month'] == 5 && obj4['day'] < 21)){
                            this.timeJson['type4']['text1'] = '金牛座';
                        } else if ((obj4['month'] == 5 && obj4['day'] > 20) || (obj4['month'] == 6 && obj4['day'] < 22)){
                            this.timeJson['type4']['text1'] = '双子座';
                        } else if ((obj4['month'] == 6 && obj4['day'] > 21) || (obj4['month'] == 7 && obj4['day'] < 23)){
                            this.timeJson['type4']['text1'] = '巨蟹座';
                        } else if ((obj4['month'] == 7 && obj4['day'] > 22) || (obj4['month'] == 8 && obj4['day'] < 23)){
                            this.timeJson['type4']['text1'] = '狮子座';
                        } else if ((obj4['month'] == 8 && obj4['day'] > 22) || (obj4['month'] == 9 && obj4['day'] < 23)){
                            this.timeJson['type4']['text1'] = '处女座';
                        } else if ((obj4['month'] == 9 && obj4['day'] > 22) || (obj4['month'] == 10 && obj4['day'] < 24)){
                            this.timeJson['type4']['text1'] = '天秤座';
                        } else if ((obj4['month'] == 10 && obj4['day'] > 23) || (obj4['month'] == 11 && obj4['day'] < 23)){
                            this.timeJson['type4']['text1'] = '天蝎座';
                        } else if ((obj4['month'] == 11 && obj4['day'] > 22) || (obj4['month'] == 12 && obj4['day'] < 22)){
                            this.timeJson['type4']['text1'] = '射手座';
                        } else if ((obj4['month'] == 12 && obj4['day'] > 21) || (obj4['month'] == 1 && obj4['day'] < 20)){
                            this.timeJson['type4']['text1'] = '摩羯座';
                        } else if ((obj4['month'] == 1 && obj4['day'] > 19) || (obj4['month'] == 2 && obj4['day'] < 19)){
                            this.timeJson['type4']['text1'] = '水瓶座';
                        } else if ((obj4['month'] == 2 && obj4['day'] > 18) || (obj4['month'] == 3 && obj4['day'] < 21)){
                            this.timeJson['type4']['text1'] = '双鱼座';
                        }
                        this.timeJson['type4']['text2'] = this.animalsList[((obj4['year'] - 1972) % 12)];
                        break;
                    default:
                        break;
                }
            },
        },
        mounted(){
            this.hasMounted = true;
            this.init(true);
        },
        activated(){
            if(!this.$route.meta.isUseCache) {
                this.chosenItem = { id: 0, subId: 0, title: '开始时间', tabName: '间隔计算' };
            }
            if(!this.hasMounted) this.init();
        },
        beforeRouteLeave(to, from, next){
            if(to.path.indexOf('/timeSelector/countryList')>-1){
                from.meta.isUseCache = true;
                this.hasMounted = false;
            } else {
                from.meta.isUseCache = false;
                window.localStorage.setItem('listScroll', false);
            }
            next();
        },
        destroyed(){
            this.timeList.map(t => {
                clearInterval(t);
            })
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
        padding: 0 25px!important;
        font-size:14px!important;
        font-family:PingFangSC-Regular,PingFang SC!important;
        font-weight:400!important;
    }
    .van-picker__cancel{
        color:rgba(183,194,201,1)!important;
    }
    .van-picker__confirm{
        color:rgba(104,196,161,1)!important;
    }
</style>