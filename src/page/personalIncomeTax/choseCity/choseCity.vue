<template>
    <div id="choseCity">
        <wHead :titleJson='titleJson'></wHead>
        <div class="search container">
            <input type="text" placeholder="输入所在城市" @input="change_city_list()" v-model="inputName">
            <i></i>
        </div>
        <div class="history">
            <div class="history-title container">历史选择城市</div>
            <div class="list-con">
                <ul class="list">
                    <li class="center-vh" v-for = '(i, index) in historyList' :key = 'index' @click="link_to('/personalIncomeTax/input', i.cityId)">
                        {{i.cityName}}
                    </li>
                </ul>
            </div>
        </div>
        <ul class="city-list" v-if='cityList.length > 0'>
            <li class="space-between" v-for = '(i, index) in cityList' :key = 'index' @click="link_to('/personalIncomeTax/input', i.cityId)">
                <span>{{i.cityName}}</span>
                <i></i>
            </li>
        </ul>
        <div class="noCity" v-if='cityList.length == 0'>暂无该城市数据</div>
    </div>
</template>
<script> 
    import wHead from '@/page/windowHead/windowHead'
    import { queryCityList, queryRateHistoryCityList } from '@/common/js/myApi'
    import $ from 'jquery'
    export default {
        name: 'choseCity',
        components:{
            wHead,
        },
        data(){
            return {
                titleJson:{
                    title: '选择城市',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                }, 
                type: 0,  // 个税计算是月度（0）还是年度（1）
                inputName: '',
                cityList: [],
                historyList: [],
                defaultCityList: []
            }
        },
        mounted(){
            this.type = this.$route.query['id'];
            queryRateHistoryCityList((res) => {
                this.historyList = res['data']['dataList'];
            })
            queryCityList((res) => {
                this.cityList = res['data']['dataList'];
                this.defaultCityList = res['data']['dataList'];
            })
            document.querySelector('body').style='background: rgba(255,255,255,1);';
        },
        methods:{
            // 跳转至其他页面
            link_to(path, id){
                const _this = this;
                _this.$router.push({
                    path: path, 
                    query:{cityId: id, type: _this.type}
                });
            },
            // 根据输入的文字匹配城市列表
            change_city_list(){
                const _this = this;
                _this.cityList = _this.defaultCityList.filter((res) => res.cityName.indexOf(_this.inputName) > -1 );
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './choseCity.less';
</style>
