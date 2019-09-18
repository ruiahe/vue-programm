<template>
    <div id="caculate">
        <div class="top">
            <wHead :titleJson='titleJson'></wHead>
            <ul class="nav container space-between">
                <li class='active' @click='nav_to(1, $event, "commercialLoans")'>商业贷款</li>
                <li @click='nav_to(2, $event, "providentFundLoan")'>公积金贷</li>
                <li @click='nav_to(3, $event, "portfolioLoan")'>组合贷款</li>
                <li @click='nav_to(4, $event, "earlyRepayment")'>提前还贷</li>
            </ul>
        </div>
        <div class="place-holder"></div>
        <ul class="content commercialLoans" v-if="showContent == 'commercialLoans'">
            <li class="input">
                <div class="container space-between">
                    <span>房价总额：</span>
                    <input type="text">
                    <strong>万元</strong>
                </div>
            </li>
            <li class="select" @click='open_selector(1)'>
                <div class="container space-between">
                    <span>首付比例：</span>
                    <i>3成</i>
                </div>
            </li>
            <li class="input">
                <div class="container space-between">
                    <span>贷款总额：</span>
                    <input type="text">
                    <strong>万元</strong>
                </div>
            </li>
            <li class="select" @click='open_selector(3)'>
                <div class="container space-between">
                    <span>还款方式：</span>
                    <i>等额本息</i>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>按揭年数：</span>
                    <i>30年(360期)</i>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>首次还款时间：</span>
                    <i>2019-09-06</i>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>利率：</span>
                    <i>基准利率（4.09%）</i>
                </div>
            </li>
            <li class="btn">
                <div>计算</div>
            </li>
        </ul>
        <ul class="content providentFundLoan" v-if="showContent == 'providentFundLoan'">
            <li class="input">
                <div class="container space-between">
                    <span>房价总额：</span>
                    <input type="text">
                    <strong>万元</strong>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>首付比例：</span>
                    <i>3成</i>
                </div>
            </li>
            <li class="input">
                <div class="container space-between">
                    <span>贷款总额：</span>
                    <input type="text">
                    <strong>万元</strong>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>还款方式：</span>
                    <i>等额本息</i>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>按揭年数：</span>
                    <i>30年(360期)</i>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>首次还款时间：</span>
                    <i>2019-09-06</i>
                </div>
            </li>
            <li class="select">
                <div class="container space-between">
                    <span>利率：</span>
                    <i>基准利率（4.09%）</i>
                </div>
            </li>
            <li class="btn">
                <div>计算</div>
            </li>
        </ul>
        <ul class="content portfolioLoan" v-if="showContent == 'portfolioLoan'">
            商业贷款
        </ul>
        <ul class="content earlyRepayment" v-if="showContent == 'earlyRepayment'">
            4
        </ul>
        <scrollSelector @date='get_select' :contentJson = "contentJson" ref='scrollSelector'></scrollSelector>
         <!-- :arr = "arrList" :title="'处理方式'" :type="5" -->
    </div>
</template>
<script>
    import wHead from '@/page/windowHead/windowHead'
    import scrollSelector from '@/page/common/scrollSelector/scrollSelector'
    import $ from 'jquery'
    export default {
        name: 'caculate',
        components:{
            wHead,
            scrollSelector
        },
        data() {
            return {
                showContent: 'commercialLoans',
                titleJson:{
                    title: '房贷计算器',
                    toolBol: true,
                    toolTitle: '利率表',
                    hasRed: false,
                    color: '#121212',
                    url:'/mortgageCaculate/rateTable',
                },
                contentJson:{
                    arr: [],
                    title: '处理方式',
                    type: 5
                }
            }
        },
        methods:{
            // 切换tab
            nav_to(index, e, type){
                $('#caculate .nav li').removeClass('active');
                $('#caculate .nav').removeClass('left1').removeClass('left2').removeClass('left3').removeClass('left4');
                $('#caculate .nav').addClass('left'+index);
                $(e.target).addClass('active')
                this.showContent = type;
            },
            // 打开选择器，配置选择器
            open_selector(index){
                this.contentJson['arr'] = index == 1 ?  ['1成', '2成', '3成', '4成', '5成', '6成', '7成', '8成', '9成'] : [1, 2, 3, 4, 5, 6, ''];
                this.contentJson['title'] = index == 1 ? '按揭' : '瞎写的';
                this.contentJson['type'] = index == 1 ?  5 : 2;
                this.$refs['scrollSelector'].open(index, this.contentJson);
            },
            get_select(obj){
                console.log(obj);
            }
        },
        // beforeCreate(){
        //     document.querySelector('body').style='background: rgba(249,249,249,1);';
        // }
    }
</script>
<style lang="less" scoped>
    @import './caculate.less';
</style>
