<template>
    <div id="taxResult">
        <div class="top" v-if='transfer["type"] == 0 || transfer["type"] == 1'>
            <div class="top-head" @click="back_to()"></div>
            <div class="txt1">计算结果</div>
            <div class="txt2">{{transfer['txt']['txt1']}}</div>
            <div class="txt3">{{transfer['txt']['txt2']}}</div>
            <div class="top-content container" v-if='transfer["type"] == 0'>
                <ul class="content-top space-between">
                    <li v-for='(i, index) in transfer["middle"]' :key='index'>
                        <div class="content-num center-vh">{{i.top}}</div>
                        <div class="content-txt center-vh">{{i.bottom}}</div>
                    </li>
                </ul>
            </div>
            <div class="top-content top-content3 container" v-if='transfer["type"] == 1'>
                <ul class="content-top space-between">
                    <li>
                        <div class="content-num">{{transfer["middle"][0]['top']}}</div>
                        <div class="content-txt">{{transfer["middle"][0]['bottom']}}</div>
                    </li>
                    <li>
                        <div class="content-num">{{transfer["middle"][1]['top']}}</div>
                        <div class="content-txt">{{transfer["middle"][1]['bottom']}}</div>
                    </li>
                    <li @click="show_more($event)">
                        <div class="content-num">{{transfer["middle"][2]['top']}}</div>
                        <div class="content-txt special">
                            <span>{{transfer["middle"][2]['bottom']}}</span>
                            <img src="../../../assets/gray-arrow-to-bottom.png" alt="">
                        </div>
                    </li>
                </ul>
                <div class="content-middle"></div>
                <ul class="content-bottom">
                    <li class="space-between" v-for='(i, index) in transfer["middleMore"]' :key='index'>
                        <span>{{i.left}}</span>
                        <span>{{i.right}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="top top2" v-if='transfer["type"] == 2'>
            <div class="top-head" @click="back_to()"></div>
            <div class="txt1">计算结果</div>
            <div class="txt2">{{transfer['txt']['txt1']}}</div>
            <div class="txt3">{{transfer['txt']['txt2']}}</div>
            <div class='txt4-box'><span class="txt4 center-vh" @click="link_to('/personalIncomeTax/incomeDetail')">每月收入明细 ></span></div>
            <div class="top-content top-content3 container">
                <ul class="content-top space-between">
                    <li>
                        <div class="content-num">{{transfer["middle"][0]['top']}}</div>
                        <div class="content-txt">{{transfer["middle"][0]['bottom']}}</div>
                    </li>
                    <li>
                        <div class="content-num">{{transfer["middle"][1]['top']}}</div>
                        <div class="content-txt">{{transfer["middle"][1]['bottom']}}</div>
                    </li>
                    <li @click="show_more($event)">
                        <div class="content-num">{{transfer["middle"][2]['top']}}</div>
                        <div class="content-txt special">
                            <span>{{transfer["middle"][2]['bottom']}}</span>
                            <img src="../../../assets/gray-arrow-to-bottom.png" alt="">
                        </div>
                    </li>
                </ul>
                <div class="content-middle"></div>
                <ul class="content-bottom">
                    <li class="space-between" v-for='(i, index) in transfer["middleMore"]' :key='index'>
                        <span>{{i.left}}</span>
                        <span>{{i.right}}</span>
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
                            <td> {{i2.grade}} </td>
                            <td> {{i2.taxTxt}} </td>
                            <td> {{i2.rate}} </td>
                            <td> {{i2.speed}} </td>
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
            $("body,html").animate({"scrollTop":0});
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
            $("body,html").animate({"scrollTop":0});
            document.querySelector('body').style='background:rgba(249,249,249,1);';
        }
    }
</script>
<style lang="less" scoped>
    @import './result.less';
</style>
