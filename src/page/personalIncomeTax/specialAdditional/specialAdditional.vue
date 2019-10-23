<template>
    <div id="specialAdditional">
        <div class="top">
            <div class="top-head space-between">
                <div class="arrow center-vl" @click.stop='back_to()'></div>
                <span>专项附加扣除</span>
                <i></i>
            </div>
            <div class="total-price">{{format_number(totalNum)}}</div>
            <div class="total-price-desc">专项附加扣除(元)</div>
        </div>
        <div class="bottom">
            <nav>请选择符合标准的扣除专项</nav>
            <ul class="section">
                <li class='li'>
                    <div class="first box space-between" :class="{'chose': num['child'] > 0}" @click="show_more($event)">
                        <div class="box-left">
                            <i></i>
                        </div>
                        <div class="box-right space-between">
                            <div class="content-left">
                                <div class="little-title">子女教育</div>
                                <div class="sub-title">包括学前教育和学历教育</div>
                            </div>
                            <div class="content-right">{{format_number(num['child'])}}</div>
                        </div>
                    </div>
                    <ul class="more">
                        <li class='li2' v-for="(i, index) in child" :key="index" @click="chose(i.money, $event, 'child')">
                            <div class="box between">
                                <div class="box-left">
                                    <i></i>
                                </div>
                                <div class="box-right space-between">
                                    <div class="content-left">{{i.txt}}</div>
                                    <div class="content-right">{{i.money}}/月</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="section">
                <li class='li'>
                    <div class="first box space-between" :class="{'chose': num['education'] > 0}" @click="show_more($event)">
                        <div class="box-left">
                            <i></i>
                        </div>
                        <div class="box-right space-between">
                            <div class="content-left">
                                <div class="little-title">继续教育</div>
                                <div class="sub-title">包括职业资格教育和学历教育</div>
                            </div>
                            <div class="content-right">{{format_number(num['education'])}}</div>
                        </div>
                    </div>
                    <ul class="more">
                        <li class='li2' v-for="(i, index) in education" :key="index" @click="chose(i.money, $event, 'education')">
                            <div class="box between">
                                <div class="box-left">
                                    <i></i>
                                </div>
                                <div class="box-right space-between">
                                    <div class="content-left">{{i.txt}}</div>
                                    <div class="content-right">{{i.money}}/月</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="section">
                <li class='li'>
                    <div class="first box space-between" :class="{'chose': num['first'] > 0}" @click="show_more($event)">
                        <div class="box-left">
                            <i></i>
                        </div>
                        <div class="box-right space-between">
                            <div class="content-left">
                                <div class="little-title">首套房贷利息</div>
                                <div class="sub-title">本人或配偶首套房贷利息</div>
                            </div>
                            <div class="content-right">{{format_number(num['first'])}}</div>
                        </div>
                    </div>
                    <ul class="more">
                        <li class='li2' v-for="(i, index) in first" :key="index" @click="chose(i.money, $event, 'first')">
                            <div class="box between">
                                <div class="box-left">
                                    <i></i>
                                </div>
                                <div class="box-right space-between">
                                    <div class="content-left">{{i.txt}}</div>
                                    <div class="content-right">{{i.money}}/月</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="section">
                <li class='li'>
                    <div class="first box space-between" :class="{'chose': num['rent'] > 0}" @click="show_more($event)">
                        <div class="box-left">
                            <i></i>
                        </div>
                        <div class="box-right space-between">
                            <div class="content-left">
                                <div class="little-title">租房租金</div>
                                <div class="sub-title">同城，夫妻择一；不同城，分别抵扣</div>
                            </div>
                            <div class="content-right">{{format_number(num['rent'])}}</div>
                        </div>
                    </div>
                    <ul class="more">
                        <li class='li2' v-for="(i, index) in rent" :key="index" @click="chose(i.money, $event, 'rent')">
                            <div class="box between">
                                <div class="box-left">
                                    <i></i>
                                </div>
                                <div class="box-right space-between">
                                    <div class="content-left">{{i.txt}}</div>
                                    <div class="content-right">{{i.money}}/月</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="section">
                <li class='li'>
                    <div class="first box space-between" :class="{'chose': num['old'] > 0}" @click="show_more($event)">
                        <div class="box-left">
                            <i></i>
                        </div>
                        <div class="box-right space-between">
                            <div class="content-left">
                                <div class="little-title">赡养老人</div>
                                <div class="sub-title">60岁以上父母或祖辈</div>
                            </div>
                            <div class="content-right">{{format_number(num['old'])}}</div>
                        </div>
                    </div>
                    <ul class="more">
                        <li class='li2' v-for="(i, index) in old" :key="index" @click="chose(i.money, $event, 'old')">
                            <div class="box between">
                                <div class="box-left">
                                    <i></i>
                                </div>
                                <div class="box-right space-between">
                                    <div class="content-left">{{i.txt}}</div>
                                    <div class="content-right">{{i.money}}/月</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="section">
                <li class='li'>
                    <div class="first box space-between" :class="{'chose': num['ill'] > 0}" @click="show_more($event)">
                        <div class="box-left">
                            <i></i>
                        </div>
                        <div class="box-right space-between">
                            <div class="content-left">
                                <div class="little-title">大病医疗</div>
                                <div class="sub-title">大病医疗费用的支出</div>
                            </div>
                            <div class="content-right">{{format_number(num['ill'])}}</div>
                        </div>
                    </div>
                    <ul class="more">
                        <li class='li3'>
                            <div class="box space-between">
                                <div class="box-left" @click="chose(i.money, $event, 'ill')"></div>
                                <div class="box-right space-between">
                                    <div class="content-left">抵扣金额</div>
                                    <div class="content-right">
                                        <div class="input">
                                            <input type="number" v-model="num['ill']" @input="input_total()">
                                            <span>/年</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <button class="caculate center-vh" @click="return_last_page()">计算</button>
    </div>
</template>
<script> 
    import $ from 'jquery'
    import {common} from '@/common/js/common.js'
    import { mapActions } from 'vuex'
    export default {
        name: 'specialAdditional',
        components:{
        },
        data(){
            return {
                totalNum: 0,
                num: {
                    child: 0,
                    education: 0,
                    first: 0,
                    rent: 0,
                    old: 0,
                    ill: 0.00
                },
                child:[
                    {txt: '1个子女', money: '1000'},
                    {txt: '2个子女', money: '2000'},
                    {txt: '3个子女', money: '3000'},
                    {txt: '4个子女', money: '4000'},
                    {txt: '5个子女', money: '5000'},
                ],
                education:[
                    {txt: '本人在学历教育期间', money: '400'},
                    {txt: '本人取得职业资格继续教育证书', money: '600'},
                ],
                first:[
                    {txt: '本人或配偶首套房贷款，且全部有我扣除', money: '1000'},
                    {txt: '本人或配偶首套房贷款，且夫妻平分扣除', money: '500'}
                ],
                rent:[
                    {txt: '直辖市、省会城市、计划单列市及国务院确定的其他城市', money: '1500'},
                    {txt: '市辖区户籍人口超过100万', money: '1100'},
                    {txt: '市辖区户籍人口不超过100万', money: '800'}
                ],
                old:[
                    {txt: '独生子女', money: '2000'},
                    {txt: '非独生，2个兄弟姐妹', money: '1000'},
                    {txt: '非独生，3个兄弟姐妹', money: '667'},
                    {txt: '非独生，4个兄弟姐妹', money: '667'},
                    {txt: '非独生，5个兄弟姐妹', money: '667'},
                ],
            }
        },
        mounted(){
            document.querySelector('body').style='background:rgba(249,249,249,1);';
        },
        methods:{
            ...mapActions('caculateTax',[ 
                'getCaculateInfo'
            ]),
            // 选中效果
            chose(money, e, name){
                if($(e.target).parents('.box').hasClass('chose')){
                    $(e.target).parents('.box').removeClass('chose');
                    this.num[name] = 0;
                } else {
                    $(e.target).parents('.more').find('.li2 .box').removeClass('chose');
                    $(e.target).parents('.box').addClass('chose');
                    this.num[name] = money;
                }
                this.input_total();
            },
            // 保留两位小数
            format_number(num){
                return common.format_number(num);
            },
            // 展示更多
            show_more(e){
                const ele = e.target.nodeName == 'DIV' ? $(e.target).parents('.section') : $(e.target).parents('.section');
                if($(ele).hasClass('showMore')){
                    $(ele).removeClass('showMore');
                    $(ele).find('.more').slideUp(200);
                } else {
                    $(ele).addClass('showMore');
                    $(ele).find('.more').slideDown(200);
                }
            },
            // 计算总额
            input_total(){
                this.totalNum = Number(this.num['child']) + Number(this.num['education']) + Number(this.num['first']) + Number(this.num['rent']) + Number(this.num['old']) + Number(this.num['ill']);
            },
            // 返回上一页
            back_to(){
                common.back();
            },
            // 返回上一页，并传入总值
            return_last_page(){
                const _this = this;
                _this.back_to();
                _this.getCaculateInfo(_this.totalNum);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './specialAdditional.less';
</style>
