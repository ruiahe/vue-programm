<template>
    <div id="countryList">
        <div class="head-top">
            <wHead :titleJson='titleJson'></wHead>
            <div class="search">
                <input class='color245' v-model="searchText" type="text" placeholder="搜索城市或国家名称" @focus="change_focus()" @input="search_list()">
            </div>
        </div>
        <div class="head-placeholder"></div>
        <div class="local container" v-if="searchText.length < 0 || searchText.length == 0">
            <div class="title center-vl">当地时间</div>
            <ul class="local-txt">
                <li class='center-vl'>
                    {{local.cityName + ' （'+local.countyName+'）'}}
                    <img src="../../../assets/timeSelector/local.png"/>
                </li>
            </ul>
        </div>
        <div class="attention-country container" v-if="searchText.length < 0 || searchText.length == 0">
            <div class="title center-vl">关注国家</div>
            <draggable :options="{draggable:'.item', filter: '.bbb'}" v-model="attentionList" @change="change" @move='start'>
                <li v-for="(item, index) in attentionList" class="item space-between" :key="index">
                    <span class="bbb center-vl">{{item.cityName+' （'+item.countyName+'）'}}</span> <i class='i-box'><i class="aaa"></i></i>  
                </li>
          </draggable>
        </div>
        <div class="country-list container">
            <IndexBar :sticky-offset-top='stickyTop'>
                <div v-for="(i, index) in countryList" :key="index">
                    <IndexAnchor :index="i.initial" v-if="i.cityList.length>0"/>
                    <ul>
                        <li class='space-between' v-for="(item, ind) in i.cityList" :key="ind" @click="add_attention(item)">
                            <span class="center-vl">{{item.cityName + ' ('+item.countyName+')'}}</span>
                            <strong :class="{'active': item.cityIsFollowed}"></strong>
                        </li>
                    </ul>
                </div>
            </IndexBar>
        </div>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
    </div>
</template>
<script> 
    import wHead from '@/page/common/windowHead/windowHead';
    import { IndexBar, IndexAnchor, Cell } from 'vant';
    import { addUserCity, listWorldCity, listUserCities, switchCity, sortUserCity } from '@/common/js/myApi';
    import draggable from 'vuedraggable';
    import { common } from '@/common/js/common';
    import $ from 'jquery';
    export default {
        name: 'choseCity',
        components:{
            wHead,
            IndexBar,
            IndexAnchor,
            Cell,
            draggable
        },
        data(){
            return {
                titleJson:{
                    title: '国家列表',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                }, 
                searchFocus: false,
                stickyTop: 0,
                local: {},
                attentionList: [],
                defaultCountryList: [],
                countryList: [],
                isChange: false,
                searchText: ''
            }
        },
        mounted(){
            $('body,html').addClass('origin').removeClass('gray245').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
            this.stickyTop = $('#header').outerHeight(true) + $('.search').outerHeight(true);
            this.local = this.$store.state.timeSelector.getLocation;
            this.isChange = this.$route.query && this.$route.query.id ? this.$route.query.id : false;
            $('body, html').animate({scrollTop: 0}, 0);
            this.init();
        },
        methods:{
            // 初始化
            init(){
                // 获取关注列表
                listUserCities({ cityId: this.local.cityId }, (res) => {
                    this.attentionList = res['data']['dataList'];
                })
                listWorldCity((res) => {
                    this.countryList = JSON.parse(JSON.stringify(res['data']['dataList']));
                    this.defaultCountryList = JSON.parse(JSON.stringify(res['data']['dataList']));
                })
            },
            // 输入时修改样式
            change_focus(){
                this.searchFocus = !this.searchFocus;
            },
            change(evt) {
                let list = [];
                sortUserCity({cityList: this.attentionList}, res => {
                    common.show_weakTip(res.message);
                })
            },
            // 添加关注
            add_attention(i){
                const _this = this;
                if (!_this.isChange && !i.cityIsFollowed) {
                    addUserCity({ cityId: i.cityId }, (res) => {
                        common.show_weakTip(res.message);
                        _this.init();
                        common.back(false);
                    })
                } else if(_this.isChange) {
                    switchCity({ followId: _this.isChange, cityId: i.cityId }, (res) => {
                        common.show_weakTip(res.message);
                        _this.init();
                        common.back(false);
                    })
                }
            },
            // 根据搜索内容获取搜索列表
            search_list(){
                let arr = [];
                this.defaultCountryList.forEach((list, index) => {
                    arr = list['cityList'].filter(res => (res.cityName.indexOf(this.searchText) > -1 || res.countyName.indexOf(this.searchText) > -1) )
                    this.countryList[index]['cityList'] = arr;
                });
            },
            // 判断拖拽的
            start(e){
                return false;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './countryList.less';
</style>
<style lang="less">
    .van-index-anchor{
        height:55px!important;
        font-size:16px!important;
        font-family:PingFangSC-Medium,PingFang SC!important;
        font-weight:500!important;
        color:rgba(0,0,0,1)!important;
        line-height:55px!important;
        padding:0!important;
        border-bottom:1px solid rgba(225, 225, 225, 0.5)!important;
    }
    .van-index-anchor.van-index-anchor--sticky{
        width:100%!important;
        padding-left:20px!important;
    }
</style>
