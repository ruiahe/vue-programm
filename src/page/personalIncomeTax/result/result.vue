<template>
    <div id="taxResult">
        <div class="top" v-if='transfer["type"] == 0'>
            <div class="top-head" @click="back_to()"></div>
            <div class="txt1">计算结果</div>
            <div class="txt2">{{transfer['txt']['txt1']}}</div>
            <div class="txt3">{{transfer['txt']['txt2']}}</div>
            <div class="top-content container">
                <ul class="content-top space-between">
                    <li v-for='(i, index) in transfer["middle"]' :key='index'>
                        <div class="content-num center-vh">{{i.top}}</div>
                        <div class="content-txt center-vh">{{i.bottom}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="top top2" v-if='transfer["type"] == 1'>
            <div class="top-head" @click="back_to()"></div>
            <div class="txt1">计算结果</div>
            <div class="txt2">本年税后工资</div>
            <div class="txt3">90853.37</div>
            <div class='txt4-box'><span class="txt4 center-vh" @click="link_to('/personalIncomeTax/incomeDetail')">每月收入明细 ></span></div>
            <div class="top-content container">
                <ul class="content-top space-between">
                    <li>
                        <div class="content-num">10853.37</div>
                        <div class="content-txt">应纳个税（元）</div>
                    </li>
                    <li>
                        <div class="content-num">10853.37</div>
                        <div class="content-txt">税后收入（元）</div>
                    </li>
                    <li @click="show_more($event)">
                        <div class="content-num">10853.37</div>
                        <div class="content-txt special">
                            <span>年度扣除总额</span>
                            <img src="../../../assets/gray-arrow-to-bottom.png" alt="">
                        </div>
                    </li>
                </ul>
                <div class="content-middle"></div>
                <ul class="content-bottom">
                    <li class="space-between">
                        <span>起征点（元）</span>
                        <span>5000</span>
                    </li>
                    <li class="space-between">
                        <span>五险一金（个人缴纳部分） </span>
                        <span>1750.00</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom container">
            <div class="container2 formula-content">
                <div class="title">{{transfer['title']}}</div>
                <div class="formula" v-for="(i,index) in transfer['formulaArr']" :key='index'>
                    <strong>{{i.left}}</strong>
                    <span>{{i.right}}</span>
                </div>
            </div>
            <div class="container2 table-content">
                <section v-for="(i, index) in transfer['tableArr']" :key='index'>
                    <div class="title">{{i.title}}</div>
                    <table>
                        <tr>
                            <td> <div class="center-vh">级数</div> </td>
                            <td> <div class="center-vh">应纳税所得税额</div> </td>
                            <td> <div class="center-vh">税率(%)</div> </td>
                            <td> <div class="center-vh">速算扣除数</div> </td>
                        </tr>
                        <tr v-for="(i2, index2) in i.table" :key="index2">
                            <td> <div class="center-vh">{{i2.grade}}</div> </td>
                            <td> <div class="center-vh">{{i2.taxTxt}}</div> </td>
                            <td> <div class="center-vh">{{i2.rate}}</div> </td>
                            <td> <div class="center-vh">{{i2.speed}}</div> </td>
                        </tr>
                    </table>
                </section>
            </div>
            <div class="container2 tip" v-if='transfer["tip"] && transfer["tip"].length > 0'>{{transfer['tip']}}</div>
        </div>
    </div>
</template>
<script> 
    import {common} from '@/common/js/common.js'
    import $ from 'jquery'
    export default {
        name: 'specialAdditional',
        components:{
        },
        data(){
            return {
                transfer: {}
            }
        },
        mounted(){
            this.transfer = this.$store.state.caculateTax['result'];
            console.log(this.transfer);
        },
        methods:{
            // 展开扣除总额部分
            show_more(e){
                const el = e.target.nodeName == 'LI' ? $(e.target) : $(e.target).parents('li');
                if($(el).hasClass('showMore')){
                    $(el).removeClass('showMore');
                    $(el).parents('.top-content').find('.content-middle').fadeOut(200);
                    $(el).parents('.top-content').find('.content-bottom').slideUp(200);
                } else {
                    $(el).addClass('showMore');
                    $(el).parents('.top-content').find('.content-middle').fadeIn(200);
                    $(el).parents('.top-content').find('.content-bottom').slideDown(200);
                }
            },
            // 跳转至其他页面
            link_to(path){
                this.$router.push({
                    path: path, 
                });
            },
            // 返回上一页
            back_to(){
                common.back();
            }
        },
        activated(){
            document.querySelector('body').style='background:rgba(249,249,249,1);';
        }
    }
</script>
<style lang="less" scoped>
    @import './result.less';
</style>
