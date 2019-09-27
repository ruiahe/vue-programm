<template>
    <div id="cacultResult">
        <head class="space-between">
            <i @click="back_to()"></i>
            <div class="top-box space-between" :class="{'left': info['open_type'] == 0, 'right': info['open_type'] == 1}">
                <div class="top" @click="change_tab('left',$event)">等额本息</div>
                <div class="top" @click="change_tab('right',$event)">等额本金</div>
            </div>
            <span></span>
        </head>
        <div class="placeholder"></div>
        <!-- 详情类型1 && 等额本息 -->
        <div class="show1-container" v-if="info['repayment_type'] == 1 && info['open_type'] == 0">
            <ul class="show1 flex-wrap container">
                <li v-for='(i,index) in arr10' :key='index' :class="{'center-vh': (index == 1||index == 4),'center-h':(index == 0||index == 3),'center-vr':(index == 2||index == 5)}">
                    <div class="show1-box">
                        <div class="show1-top">{{i}}</div>
                        <div class="show1-bottom" v-if='index != 5'>{{arr20[index]}}万</div>
                        <div class="show1-bottom" v-if='index == 5'>{{arr20[index]}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 详情类型1 && 等额本金 -->
        <div class="show1-container" v-if="info['repayment_type'] == 1 && info['open_type'] == 1">
            <ul class="show1 flex-wrap container">
                <li v-for='(i,index) in arr10' :key='index' :class="{'center-vh': (index == 1||index == 4),'center-h':(index == 0||index == 3),'center-vr':(index == 2||index == 5)}">
                    <div class="show1-box">
                        <div class="show1-top">{{i}}</div>
                        <div class="show1-bottom" v-if='index != 5'>{{arr21[index]}}万</div>
                        <div class="show1-bottom" v-if='index == 5'>{{arr21[index]}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 详情类型2 && 等额本息 -->
        <div class="show1-container show2-container" v-if="info['repayment_type'] == 2 && info['open_type'] == 0">
            <ul class="show1 flex-wrap container">
                <li v-for='(i,index) in arr11' :key='index' :class="{'center-vh': (index == 1||index == 2),'center-h':(index == 0),'center-vr':(index == 3)}">
                    <div class="show1-box">
                        <div class="show1-top">{{i}}</div>
                        <div class="show1-bottom" v-if='index != 3'>{{arr20[index]}}万</div>
                        <div class="show1-bottom" v-if='index == 3'>{{arr20[index]}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 详情类型2 && 等额本金 -->
        <div class="show1-container show2-container" v-if="info['repayment_type'] == 2 && info['open_type'] == 1">
            <ul class="show1 flex-wrap container">
                <li v-for='(i,index) in arr11' :key='index' :class="{'center-vh': (index == 1||index == 2),'center-h':(index == 0),'center-vr':(index == 3)}">
                    <div class="show1-box">
                        <div class="show1-top">{{i}}</div>
                        <div class="show1-bottom" v-if='index != 3'>{{arr21[index]}}万</div>
                        <div class="show1-bottom" v-if='index == 3'>{{arr21[index]}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="stickyPlacehold">
            <table class='special' :class="{'sticky': sticky}">
                <tr>
                    <td><div class="center-vh">期数</div></td>
                    <td><div class="center-vh">月供</div></td>
                    <td><div class="center-vh">本金</div></td>
                    <td><div class="center-vh">利息</div></td>
                    <td><div class="center-vh">剩余本金</div></td>
                </tr>
            </table>
        </div>
        <table>
            <tr v-for="(i, index) in list" :key="index">
                <td>
                    <div class='center-vh'>
                        <div class='top'>{{index+1}}</div>
                        <div class='bottom'>{{i['date']['year']+'-'+(i['date']['month'] > 9 ? i['date']['month'] : '0'+i['date']['month'])}}</div>
                    </div>
                </td>
                <td><div class="center-vh">{{i['monthlyPayment2']}}</div></td>
                <td><div class="center-vh">{{i['principal2']}}</div></td>
                <td><div class="center-vh">{{i['moneyRates2']}}</div></td>
                <td><div class="center-vh">{{i['remainPrincipal2']}}</div></td>
            </tr>
        </table>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {common} from '@/common/js/common'
    export default {
        name: 'caculate',
        components:{
        },
        data() {
            return {
                arr10: ['房价总款', '首付', '贷款总额', '还贷总款', '利息', '还款月数' ],
                arr11: ['还贷总款', '贷款总额', '利息', '还款月数' ],
                arr20: [],
                arr21: [],
                info: {},
                list: [],
                sticky: false
            }
        },
        methods:{
            // 切换tab标签
            change_tab(txt,e){
                const _this = this;
                switch (txt) {
                    case 'left':
                        _this.info['open_type'] = 0;
                        _this.list = _this.info['list1'];
                        break;
                    default:
                        _this.info['open_type'] = 1;
                        _this.list = _this.info['list2'];
                        break;
                }
            },
            // 返回上一页
            back_to(){
                var bol = this.$route.path.indexOf('feed') > -1;
                common.back(bol);
            }
        },
        mounted(){
            const _this = this;
            this.info = this.$store.state.caculateInfo['info'];
            if(this.info['repayment_type'] == 1){
                this.arr20 = [this.info['total_house_price'], this.info['down_pament'],this.info['totle_lending'], this.info['totalPayment1'],this.info['gross_interest1'], this.info['total_mortgage1']];
                this.arr21 = [this.info['total_house_price'], this.info['down_pament'],this.info['totle_lending'], this.info['totalPayment2'],this.info['gross_interest2'], this.info['total_mortgage2']];
            } else {
                this.arr20 = [this.info['totalPayment1'], this.info['totle_lending'],this.info['gross_interest1'], this.info['total_mortgage1']];
                this.arr21 = [this.info['totalPayment2'], this.info['totle_lending'],this.info['gross_interest2'], this.info['total_mortgage2']];
            }
            if(this.info['open_type'] == 0){
                this.list = this.info['list1'];
            } else {
                this.list = this.info['list2'];
            }
            window.addEventListener('scroll',(a)=>{
                const htmlHeight = $('body').scrollTop();
                const toTop = $('.stickyPlacehold').offset().top - $('.placeholder').height();
                if(htmlHeight > toTop || htmlHeight == toTop){
                    _this.sticky = true;
                } else {
                    _this.sticky = false;
                }
            })
        },
        beforeCreate(){
            document.querySelector('body').style='background: linear-gradient(rgba(245,245,245,1) 95%, #fff 100%);';
        },
        activated(){
            document.querySelector('body').style='background: linear-gradient(rgba(245,245,245,1) 95%, #fff 100%);';
        }
    }
</script>
<style lang="less" scoped>
    @import './result.less';
</style>
