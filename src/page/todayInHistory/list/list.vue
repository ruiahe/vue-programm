<template>
    <div id="todayInHistoryList">
        <div class="top">
            <wHead :titleJson='titleJson'></wHead>
            <div class="subtitle center-vh">
                <span @click='getData()'>前一天</span>
                <div class='test center-vh' @click='changeTime()'>
                    <strong>3月30日</strong>
                    <img src="../../../assets/statement/phone.png" alt="" class='hasNoImg'>
                </div>
                <span @click='getData()'>后一天</span>
            </div>
        </div>
        <div class="place-holder"></div>
        <div class="content">
            <ul>
                <li class="between">
                    <div class="time">
                        <div class="time-year">2019</div>
                        <div class="time-txt">年</div>
                    </div>
                    <div class="text-and-img">
                        <div class="text-and-img-box space-between">
                            <div class="text-img" style='background-image:url(../../../assets/statement/phone.png)'></div>
                            <div class="text-text"> 中秋假期超1亿人次出游 旅游收入472.8亿元同比增涨8.9% </div>
                        </div>
                    </div>
                </li>
                <li class="between">
                    <div class="time">
                        <div class="time-year">2019</div>
                        <div class="time-txt">年</div>
                    </div>
                    <div class="text-and-img space-between">
                        <div class="text-and-img-box">
                            <div class="text-text"> 2019篮球世界杯结束，西班牙战胜阿根廷，时隔13年再次夺取世界杯冠军卢比奥获得赛事 </div>
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
    import scrollDate from '@/page/common/scrollDate/scrollDate'
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
                arrList: [ '7.5折3.68%', '7.5折3.68%', '7.5折3.68%', '8折(3.68%)', '7.5折3.68%', '7.5折3.68%', '7.5折3.68%', '8折(3.68%)' ]
            }
        },
        methods:{
            changeTime(){
                this.$refs['scrollDate'].open(6,5,4);
            },
            get_date(obj){
                console.log(obj);
            },
            get_select(txt){
                console.log(txt);
            },
            getData(){
                this.$refs['scrollSelector'].open(3);
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
