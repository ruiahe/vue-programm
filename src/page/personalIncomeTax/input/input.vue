<template>
    <div id="taxInput">
        <div class="top-title">
            <wHead :titleJson='titleJson'></wHead>
            <div class="hidden-scroll">
                <div class="can-scroll">
                    <!-- <div class="chose">
                        <span v-for="(i, index) in titleTab" :key="index">{{i.name}}</span>
                    </div> -->
                    <ul class="chose">
                        <li class='center-vh' :class="{'active': chosen['chosenTab'].id == i.id}" v-for="(i, index) in titleTab" :key="index" @click="chose_tab(i,$event)">{{i.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="top-placeholder"></div>
        <div class="sub-tab" :class="{right: chosen['chosenSubTab'] == 1}">
            <ul v-if='chosen["chosenTab"]["type"] == 0' class='space-between'>
                <li class='center-vh' :class="{'active': chosen['chosenSubTab'] == 0}" @click="chosen_sub_tab(0)">月度</li>
                <li class='center-vh' :class="{'active': chosen['chosenSubTab'] == 1}" @click="chosen_sub_tab(1)">年度</li>
            </ul>
            <ul v-if='chosen["chosenTab"]["type"] != 0' class='space-between'>
                <li class='center-vh' :class="{'active': chosen['chosenSubTab'] == 0}" @click="chosen_sub_tab(0)">正算税后</li>
                <li class='center-vh' :class="{'active': chosen['chosenSubTab'] == 1}" @click="chosen_sub_tab(1)">反推税前</li>
            </ul>
        </div>
        <div class="content">
            <div class="salary" v-if='chosen["chosenTab"]["type"] == 0 && chosen["chosenSubTab"] == 0'>
                <ul class='section'>
                    <li class="li space-between input">
                        <i class='i1'></i>
                        <section class="space-between">
                            <span>本月工资收入（元）</span>
                            <input class='please-input input-placeholder font15' type="number" placeholder="请输入" v-model="chosen['chosen00']['income']">
                        </section>
                    </li>
                    <li class="li space-between input" @click="link_to('/personalIncomeTax/choseCity?id=0')">
                        <i class='i2'></i>
                        <section class="space-between">
                            <span>所在城市</span>
                            <span class='val'>{{chosen['chosen00']['city']}}</span>
                        </section>
                    </li>
                </ul>
                <ul class='section'>
                    <li class="li space-between choseArrow" @click='show_more($event)'>
                        <i class='i3'></i>
                        <section class="space-between">
                            <span>个人社保</span>
                            <strong></strong>
                        </section>
                    </li>
                    <li class='has-show-more'>
                        <ul class="show-more">
                            <li class="space-between">
                                <span class='has-desc'>社保个人缴纳金额（月）</span>
                                <input type="number" class='please-input input-placeholder' placeholder="请输入" v-model="chosen['chosen00']['social']">
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>当地最低缴纳金额：{{chosen['chosen00']['socialDefault']}}元</span>
                                <span type="button" class='please-input input-placeholder' @click="use_val('chosen00', 'social', chosen['chosen00']['socialDefault'],100)">使用</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class='section'>
                    <li class="li space-between choseArrow" @click='show_more($event)'>
                        <i class='i4'></i>
                        <section class="space-between">
                            <span>公积金</span>
                            <strong></strong>
                        </section>
                    </li>
                    <li class='has-show-more'>
                        <ul class="show-more">
                            <li class="space-between">
                                <span class='has-desc'>公积金个人缴纳金额（月）</span>
                                <input type="number" class='please-input' placeholder="请输入" v-model="chosen['chosen00']['fundInput']">
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>缴纳基数</span>
                                <input type="number" class='please-input input-placeholder' placeholder="请输入" v-model="chosen['chosen00']['fund']" @input="change_fund('chosen00')">
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>缴纳比例</span>
                                <div class="customize space-between">
                                    <input type="number" class='please-input2 input-placeholder' placeholder="自定义" v-model="chosen['chosen00']['fundRate']" @input="change_fund('chosen00')">
                                    <span>%</span>
                                </div>
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>当地最低缴纳基数：{{chosen['chosen00']['fundDefault']}}元</span>
                                <span class='please-input' @click="use_val('chosen00', 'fundRate', chosen['chosen00']['fundDefaultRate'],100),use_val('chosen00', 'fund', chosen['chosen00']['fundDefault'], 100),use_val('chosen00', 'fundInput', chosen['chosen00']['fundDefault'],chosen['chosen00']['fundDefaultRate'])">使用</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class='section'>
                    <li class="li space-between choseArrow" @click="link_to('/personalIncomeTax/specialAdditional')">
                        <i class='i5'></i>
                        <section class="space-between">
                            <span>专项附加扣除</span>
                            <strong></strong>
                        </section>
                    </li>
                </ul>
                <button class="caculate" @click="caculate">计算</button>
            </div>
            <div class="salary" v-if='chosen["chosenTab"]["type"] == 0 && chosen["chosenSubTab"] == 1'>
                <ul class='section'>
                    <li class="li space-between input">
                        <i class='i1'></i>
                        <section class="space-between">
                            <span>税前月平均工资（元）</span>
                            <input class='please-input input-placeholder font15' type="number" placeholder="请输入" v-model="chosen['chosen01']['income']">
                        </section>
                    </li>
                    <li class="li space-between input" @click="link_to('/personalIncomeTax/choseCity?id=1')">
                        <i class='i2'></i>
                        <section class="space-between">
                            <span>所在城市</span>
                            <span class='val'>{{chosen['chosen01']['city']}}</span>
                        </section>
                    </li>
                </ul>
                <ul class='section'>
                    <li class="li space-between choseArrow" @click='show_more($event)'>
                        <i class='i3'></i>
                        <section class="space-between">
                            <span>个人社保</span>
                            <strong></strong>
                        </section>
                    </li>
                    <li class='has-show-more'>
                        <ul class="show-more">
                            <li class="space-between">
                                <span class='has-desc'>社保个人缴纳金额（月）</span>
                                <input type="number" class='please-input input-placeholder' placeholder="请输入" v-model="chosen['chosen01']['social']">
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>当地最低缴纳金额：{{chosen['chosen01']['socialDefault']}}元</span>
                                <span class='please-input' @click="use_val('chosen01', 'social', chosen['chosen01']['socialDefault'],100)">使用</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class='section'>
                    <li class="li space-between choseArrow" @click='show_more($event)'>
                        <i class='i4'></i>
                        <section class="space-between">
                            <span>公积金</span>
                            <strong></strong>
                        </section>
                    </li>
                    <li class='has-show-more'>
                        <ul class="show-more">
                            <li class="space-between">
                                <span class='has-desc'>公积金个人缴纳金额（月）</span>
                                <input type="number" class='please-input input-placeholder' placeholder="请输入" v-model="chosen['chosen01']['fundInput']">
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>缴纳基数</span>
                                <input type="number" class='please-input input-placeholder' placeholder="请输入" v-model="chosen['chosen01']['fund']" @input="change_fund('chosen01')">
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>缴纳比例</span>
                                <div class="customize space-between">
                                    <input type="number" class='please-input2 input-placeholder' placeholder="自定义" v-model="chosen['chosen01']['fundRate']" @input="change_fund('chosen01')">
                                    <span>%</span>
                                </div>
                            </li>
                            <li class="space-between">
                                <span class='has-desc'>当地最低缴纳基数：{{chosen['chosen01']['fundDefault']}}元</span>
                                <span class='please-input' @click="use_val('chosen01', 'fundRate', chosen['chosen01']['fundDefaultRate'],100),use_val('chosen01', 'fund', chosen['chosen01']['fundDefault'], 100),use_val('chosen01', 'fundInput', chosen['chosen01']['fundDefault'],chosen['chosen01']['fundDefaultRate'])">使用</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class='section'>
                    <li class="li space-between choseArrow" @click="link_to('/personalIncomeTax/specialAdditional')">
                        <i class='i5'></i>
                        <section class="space-between">
                            <span>专项附加扣除</span>
                            <strong></strong>
                        </section>
                    </li>
                </ul>
                <button class="caculate" @click="caculate">计算</button>
            </div>
            <div class="input-one" v-if='chosen["chosenTab"]["type"] == 1' :class="{'min-margin': chosenType2['arr'].length == 1}">
                <ul>
                    <li v-for="(i, index) in chosenType2['arr']" :key='index'>
                        <div class="title">{{i['title']}}</div>
                        <input class="input-one-input input-placeholder font14" type="number" :placeholder="i['placeholder']" v-model="i['input']">
                    </li>
                </ul>
                <div class="tip" v-if="chosenType2['tip']">{{chosenType2['tip']}}</div>
                <button class="caculate" @click="caculate">计算</button>
            </div>
            <div class="input-button" v-if='chosen["chosenTab"]["type"] == 2'>
                <div class="input-button-title">
                    <div class="title">{{chosenType3['title']}}</div>
                </div>
                <input class="input-one-input input-placeholder font14" type="number" :placeholder="chosenType3['placeholder']" v-model="chosenType3['input']">
                <div class="input-button-title">
                    <div class="sub-title">计算方式</div>
                </div>
                <ul class="button space-between">
                    <li class='center-vh' :class="{'active': chosenType3['type'] == 0}" @click="chosen_button(0,$event)">居民预扣预缴</li>
                    <li class='center-vh' :class="{'active': chosenType3['type'] == 1}" @click="chosen_button(1,$event)">非居民扣缴</li>
                </ul>
                <button class="caculate" @click="caculate">计算</button>
                <div class="content">
                   <div> * 居民和非居民的定义？</div>
                   <div>在中国境内有住所，或者无住所而一个纳税年度内，在中国境内居住满一百八十三天的个人，为居民个人。居民个人从中国境内和境外取得的所得，依照本法规定缴纳个人所得税。在中国境内无住所又不居住，或者无住所而一个纳税，年度内在中国境内居住累计不满一百八十三天的个人为非居民个人。非居民个人从中国境内取得的所得，依照本法规定缴纳个人所得税。</div>
                </div>
            </div>
        </div>
        <div id="map-container"></div>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
    </div>
</template>
<script> 
    import {common} from '@/common/js/common.js'
    import wHead from '@/page/common/windowHead/windowHead'
    import { location } from '@/common/js/position.js'
    import $ from 'jquery'
    import { mapActions } from 'vuex'
    import { getRateValueByCityName, getRateValueByCityId } from '@/common/js/myApi'
    export default {
        name: 'taxInput',
        components:{
            wHead
        },
        data(){
            return {
                tabLeft: 0,
                titleTab:[
                    {id: 0, name: '工资薪金', type: 0},
                    {id: 1, name: '年终奖', type: 1},
                    {id: 2, name: '劳务报酬', type: 2},
                    {id: 3, name: '偶然收入', type: 1},
                    {id: 4, name: '稿酬收入', type: 2},
                    {id: 5, name: '利息股息分红', type: 1},
                    {id: 6, name: '财产租赁', type: 1},
                    {id: 7, name: '特许使用费', type: 2},
                    {id: 8, name: '财产转让所得', type: 1},
                    {id: 9, name: '经营所得', type: 1},
                ],
                titleJson:{
                    title: '个人所得税',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false
                }, 
                chosen:{
                    chosenTab: {id: 0, name: '工资薪金', type: 0},           // 选中的大tab标签
                    chosenSubTab: 0,                                        // 选中的副tab标签
                    chosen00:{                                              // 工资薪金 - 月度 - type1
                        income: '',                                         // 本月工资收入
                        city: '',                                           // 所在城市
                        social: '',                                         // 社保缴纳金额
                        socialDefault: '',                                  // 最低社保缴纳金
                        fundInput: '',                                      // 公积金个人缴纳金额
                        fundDefault: '',                                    // 最低公积金缴纳金
                        fundRate: '',                                       // 公积金缴纳比例
                        fundDefaultRate: '',                                // 公积金默认缴纳比例
                        fund: '',                                           // 公积金缴纳基数
                        special: 0                                          //  专项附加扣除
                    },
                    chosen01:{                                              // 工资薪金 - 年度 - type1
                        income: '',                                         // 本月工资收入
                        city: '',                                           // 所在城市
                        social: '',                                         // 社保缴纳金额
                        socialDefault: '',                                  // 最低社保缴纳金
                        fundInput: '',                                      // 公积金个人缴纳金额
                        fundDefault: '',                                    // 最低公积金缴纳金
                        fundRate: '',                                       // 公积金缴纳比例
                        fundDefaultRate: '',                                // 公积金默认缴纳比例
                        fund: '',                                           // 公积金缴纳基数
                        special: 0                                          //  专项附加扣除
                    },
                    chosen10:{                                              // 年终奖 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                            {title: '应发年终奖（元）',placeholder: '请输入应发年终奖', input: ''}
                        ]
                    },
                    chosen11:{                                              // 年终奖 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                            {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                        ]                                           // 年终奖 - 反向 - type2
                    },
                    chosen20:{                                              // 劳务报酬 - 正算 - type3
                        title: '劳务报酬（元）',                            // 标题
                        placeholder: '请输入劳务报酬',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                             // 计算方式
                    },
                    chosen21:{                                              // 劳务报酬 - 反向 - type3
                        title: '税后所得（元）',                            // 标题
                        placeholder: '请输入税后所得',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                             // 计算方式
                    },
                    chosen30:{                                              // 偶然所得 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '偶然收入所得（元）',placeholder: '请输入偶然收入所得', input: ''}
                            ]
                    },
                    chosen31:{                                              // 偶然所得 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                            ]
                    },
                    chosen40:{                                              // 稿酬收入 - 正算 - type3
                        title: '稿酬收入所得（元）',                            // 标题
                        placeholder: '请输入稿酬所得',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                            // 计算方式
                    },
                    chosen41:{                                              // 稿酬收入 - 反向 - type3
                        title: '税后所得（元）',                            // 标题
                        placeholder: '请输入税后所得',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                             // 计算方式
                    },
                    chosen50:{                                              // 利息股息分红 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '利息、股息红利所得（元）',placeholder: '请输入利息、股息红利所得', input: ''}
                            ]
                    },
                    chosen51:{                                              // 利息股息分红 - 反 - type2
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                            ]
                    },
                    chosen60:{                                              // 财产租赁 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '财产租赁所得（元）',placeholder: '请输入财产租赁所得', input: ''}
                            ]
                    },
                    chosen61:{                                              // 财产租赁 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                            ]
                    },
                    chosen70:{                                              // 特许使用费 - 正算 - type3
                        title: '特许使用费所得（元）',                       // 标题
                        placeholder: '请输入稿酬所得',                      // 提示
                        input: '',                                        // 输入值
                        type: 0                                           // 计算方式
                    },
                    chosen71:{                                              // 特许使用费 - 反向 - type3
                        title: '税后所得（元）',                       // 标题
                        placeholder: '请输入税后所得',                      // 提示
                        input: '',                                        // 输入值
                        type: 0                                            // 计算方式
                    },
                    chosen80:{                                              // 财产转让所得 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '转让收入金额（元）',placeholder: '请输入转让收入金额', input: ''},
                                {title: '财产原值（元）',placeholder: '请输入财产原值', input: ''},
                                {title: '合理费用（元）',placeholder: '请输入合理费用', input: ''},
                            ]
                    },
                    chosen81:{                                              // 财产转让所得 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''},
                                {title: '财产原值（元）',placeholder: '请输入财产原值', input: ''},
                                {title: '合理费用（元）',placeholder: '请输入合理费用', input: ''},
                            ]
                    },
                    chosen90:{                                              // 经营所得 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '经营收入（元）',placeholder: '请输入经营收入', input: ''},
                                {title: '成本、费用及损失（元）',placeholder: '请输入成本、费用及损失', input: ''},
                            ],
                        tip: '按每一纳税年度计算纳税'
                    },
                    chosen91:{                                              // 经营所得 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''},
                                {title: '成本、费用及损失（元）',placeholder: '请输入成本、费用及损失', input: ''},
                            ],
                        tip: '按每一纳税年度计算纳税'
                    },
                },
                contentType2:{},
                contentType3:{},
                transfer:{
                    type:1,
                    txt: {
                        txt1: '',
                        txt2: '',
                    },
                    middle: [],
                    title: '',
                    formulaArr: [],
                    tableArr: [],
                    tip: ''
                },
                table1:[
                    {grade: 1, taxTxt: '未超过3000的部分', rate: 3, speed: 0},
                    {grade: 2, taxTxt: '超过3000至12000的部分', rate: 10, speed: 210 },
                    {grade: 3, taxTxt: '超过12000至25000的部分', rate: 20, speed: 1410 },
                    {grade: 4, taxTxt: '超过25000至35000的部分', rate: 25, speed: 2660 },
                    {grade: 5, taxTxt: '超过35000至55000的部分', rate: 30, speed: 4410},
                    {grade: 6, taxTxt: '超过55000至80000的部分', rate: 35, speed: 7160},
                    {grade: 7, taxTxt: '超过80000的部分', rate: 45, speed: 15160},
                ],
                table3:[
                    {grade: 1, taxTxt: '未超过20000的部分', rate: 20, speed: 0},
                    {grade: 2, taxTxt: '超过20000至50000的部分', rate: 30, speed: 2000 },
                    {grade: 3, taxTxt: '超过50000元', rate: 40, speed: 7000 },
                ],
                table4:[
                    {grade: 1, taxTxt: '未超过30000的部分', rate: 5, speed: 0},
                    {grade: 2, taxTxt: '超过30000至90000的部分', rate: 10, speed: 1500 },
                    {grade: 3, taxTxt: '超过90000至300000的部分', rate: 20, speed: 10500 },
                    {grade: 4, taxTxt: '超过300000至500000的部分', rate: 30, speed: 40500 },
                    {grade: 5, taxTxt: '超过500000', rate: 35, speed: 65500 },
                ],
                table5:[
                    {grade: 1, taxTxt: '未超过36000的部分', rate: 3, speed: 0},
                    {grade: 2, taxTxt: '超过36000至144000的部分', rate: 10, speed: 2520 },
                    {grade: 3, taxTxt: '超过144000至300000的部分', rate: 20, speed: 16920 },
                    {grade: 4, taxTxt: '超过300000至420000的部分', rate: 25, speed: 31920 },
                    {grade: 5, taxTxt: '超过420000至660000的部分', rate: 30, speed: 52920 },
                    {grade: 5, taxTxt: '超过660000至960000的部分', rate: 35, speed: 85920 },
                    {grade: 5, taxTxt: '超过960000的部分', rate: 45, speed: 181920 },
                ],
                special: 0
            }
        },
        methods:{
            ...mapActions('caculateTax',[ 
                'getResult'
            ]),
            init(){
                this.chosen = {
                    chosenTab: {id: 0, name: '工资薪金', type: 0},           // 选中的大tab标签
                    chosenSubTab: 0,                                        // 选中的副tab标签
                    chosen00:{                                              // 工资薪金 - 月度 - type1
                        income: '',                                         // 本月工资收入
                        city: '',                                           // 所在城市
                        social: '',                                         // 社保缴纳金额
                        socialDefault: '',                                  // 最低社保缴纳金
                        fundInput: '',                                      // 公积金个人缴纳金额
                        fundDefault: '',                                    // 最低公积金缴纳金
                        fundRate: '',                                       // 公积金缴纳比例
                        fundDefaultRate: '',                                // 公积金默认缴纳比例
                        fund: '',                                           // 公积金缴纳基数
                        special: 0                                          //  专项附加扣除
                    },
                    chosen01:{                                              // 工资薪金 - 年度 - type1
                        income: '',                                         // 本月工资收入
                        city: '',                                           // 所在城市
                        social: '',                                         // 社保缴纳金额
                        socialDefault: '',                                  // 最低社保缴纳金
                        fundInput: '',                                      // 公积金个人缴纳金额
                        fundDefault: '',                                    // 最低公积金缴纳金
                        fundRate: '',                                       // 公积金缴纳比例
                        fundDefaultRate: '',                                // 公积金默认缴纳比例
                        fund: '',                                           // 公积金缴纳基数
                        special: 0                                          //  专项附加扣除
                    },
                    chosen10:{                                              // 年终奖 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                            {title: '应发年终奖（元）',placeholder: '请输入应发年终奖', input: ''}
                        ]
                    },
                    chosen11:{                                              // 年终奖 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                            {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                        ]                                           // 年终奖 - 反向 - type2
                    },
                    chosen20:{                                              // 劳务报酬 - 正算 - type3
                        title: '劳务报酬（元）',                            // 标题
                        placeholder: '请输入劳务报酬',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                             // 计算方式
                    },
                    chosen21:{                                              // 劳务报酬 - 反向 - type3
                        title: '税后所得（元）',                            // 标题
                        placeholder: '请输入税后所得',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                             // 计算方式
                    },
                    chosen30:{                                              // 偶然所得 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '偶然收入所得（元）',placeholder: '请输入偶然收入所得', input: ''}
                            ]
                    },
                    chosen31:{                                              // 偶然所得 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                            ]
                    },
                    chosen40:{                                              // 稿酬收入 - 正算 - type3
                        title: '稿酬收入所得（元）',                            // 标题
                        placeholder: '请输入稿酬所得',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                            // 计算方式
                    },
                    chosen41:{                                              // 稿酬收入 - 反向 - type3
                        title: '税后所得（元）',                            // 标题
                        placeholder: '请输入税后所得',                      // 提示
                        input: '',                                         // 输入值
                        type: 0                                             // 计算方式
                    },
                    chosen50:{                                              // 利息股息分红 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '利息、股息红利所得（元）',placeholder: '请输入利息、股息红利所得', input: ''}
                            ]
                    },
                    chosen51:{                                              // 利息股息分红 - 反 - type2
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                            ]
                    },
                    chosen60:{                                              // 财产租赁 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '财产租赁所得（元）',placeholder: '请输入财产租赁所得', input: ''}
                            ]
                    },
                    chosen61:{                                              // 财产租赁 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''}
                            ]
                    },
                    chosen70:{                                              // 特许使用费 - 正算 - type3
                        title: '特许使用费所得（元）',                       // 标题
                        placeholder: '请输入稿酬所得',                      // 提示
                        input: '',                                        // 输入值
                        type: 0                                           // 计算方式
                    },
                    chosen71:{                                              // 特许使用费 - 反向 - type3
                        title: '税后所得（元）',                       // 标题
                        placeholder: '请输入税后所得',                      // 提示
                        input: '',                                        // 输入值
                        type: 0                                            // 计算方式
                    },
                    chosen80:{                                              // 财产转让所得 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '转让收入金额（元）',placeholder: '请输入转让收入金额', input: ''},
                                {title: '财产原值（元）',placeholder: '请输入财产原值', input: ''},
                                {title: '合理费用（元）',placeholder: '请输入合理费用', input: ''},
                            ]
                    },
                    chosen81:{                                              // 财产转让所得 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''},
                                {title: '财产原值（元）',placeholder: '请输入财产原值', input: ''},
                                {title: '合理费用（元）',placeholder: '请输入合理费用', input: ''},
                            ]
                    },
                    chosen90:{                                              // 经营所得 - 正算 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '经营收入（元）',placeholder: '请输入经营收入', input: ''},
                                {title: '成本、费用及损失（元）',placeholder: '请输入成本、费用及损失', input: ''},
                            ],
                        tip: '按每一纳税年度计算纳税'
                    },
                    chosen91:{                                              // 经营所得 - 反向 - type2 (标题 & 提示 & 值)
                        arr: [
                                {title: '税后所得（元）',placeholder: '请输入税后所得', input: ''},
                                {title: '成本、费用及损失（元）',placeholder: '请输入成本、费用及损失', input: ''},
                            ],
                        tip: '按每一纳税年度计算纳税'
                    },
                }
            },
            /**获取地图定位*/
            getLocation(type) {
                let _this = this;
                switch (type) {
                    case 'all':
                        let geolocation = location("map-container", (r)=>{
                            _this.chosen['chosen00']['city'] = r['address']['city'];
                            _this.chosen['chosen01']['city'] = r['address']['city'];
                            getRateValueByCityName({ 'cityName': r['address']['city'] }, (res) => {
                                if(res.data == null) {
                                    _this.chosen['chosen00']['socialDefault'] = 0;
                                    _this.chosen['chosen01']['socialDefault'] = 0;
                                    _this.chosen['chosen00']['fundDefault'] = 0;
                                    _this.chosen['chosen01']['fundDefault'] = 0;
                                    _this.chosen['chosen00']['fundDefaultRate'] = 0;
                                    _this.chosen['chosen01']['fundDefaultRate'] = 0;
                                } else {
                                    const num = res['data']['publicFunds'] * 100;
                                    _this.chosen['chosen00']['socialDefault'] = res['data']['socialSecurity'];
                                    _this.chosen['chosen01']['socialDefault'] = res['data']['socialSecurity'];
                                    _this.chosen['chosen00']['fundDefault'] = res['data']['minPublicFunds'];
                                    _this.chosen['chosen01']['fundDefault'] = res['data']['minPublicFunds'];
                                    _this.chosen['chosen00']['fundDefaultRate'] = common.format_number(num);
                                    _this.chosen['chosen01']['fundDefaultRate'] = common.format_number(num);
                                }
                                
                            });
                        }); //定位
                        break;
                    default:
                        getRateValueByCityName({ 'cityName': _this.chosen['chosen00']['city'] }, (res) => {
                            if(res.data == null) {
                                _this.chosen['chosen0'+type]['socialDefault'] = 0;
                                _this.chosen['chosen0'+type]['fundDefault'] = 0;
                                _this.chosen['chosen0'+type]['fundDefaultRate'] = 0;
                            }else{
                                _this.chosen['chosen0'+type]['socialDefault'] = res['data']['socialSecurity'];
                            _this.chosen['chosen0'+type]['fundDefault'] = res['data']['minPublicFunds'];
                            _this.chosen['chosen0'+type]['fundDefaultRate'] = common.format_number(res['data']['publicFunds'] * 100);
                            }
                        });
                        break;
                }
            },
            // 计算最后值 & 组装结果页
            caculate(){
                const _this = this;
                const id = _this.chosen['chosenTab']['id'];
                const subId = _this.chosen['chosenSubTab'];
                const name = 'chosen' + id + subId;
                let obj = null, canLink = true;
                switch (id) {
                    case 0:
                        // 工资薪金
                        const val00 = Number(_this.chosen[name]['income']);   // 薪资
                        const val01 = Number(_this.chosen[name]['fundInput']) + Number(_this.chosen[name]['social']);  // 公积金缴纳金 + 社保缴纳金
                        const val02 = _this.chosen[name]['special'];  // 专项缴纳金额
                        let val04 = 0;  // 应纳税所得额
                        let val05 = 0;  // 应纳税额
                        let val06 = 0;  // 税后
                        let obj0 = null;  // 税率和速算扣除数
                        if(subId == 0 && val00 > 0){
                            val04 = val00 - val01 - val02 -5000 > 0 ? val00 - val01 - val02 -5000 : 0;
                            obj0 = _this.caculate8(val04);
                            val05 = val04 * obj0['tax'] - obj0['speed'] > 0 ? val04 * obj0['tax'] - obj0['speed'] : 0;
                            val06 = val00 - val01 - val05;
                            _this.transfer['txt'] = { txt1: '本月税后工资（元）', txt2: common.format_number(val06) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(val05), bottom: '本月个税'},
                                {top: common.format_number(val00), bottom: '本月税前'},
                                {top: common.format_number(5000 + val01 + val02), bottom: '本月扣除总额'}
                            ];
                            _this.transfer['middleMore'] = [
                                {left: '起征点（元）', right: 5000},
                                {left: '五险一金（个人缴纳部分） ', right: common.format_number(val01)},
                            ];
                        } else if ( val00 > 0){
                            val04 = (val00 - val01 - val02 -5000) * 12 > 0 ? (val00 - val01 - val02 -5000) * 12 : 0;
                            obj0 = _this.caculate8(val04);
                            val05 = val04 * obj0['tax'] - obj0['speed'] > 0 ? val04 * obj0['tax'] - obj0['speed'] : 0;
                            val06 = (val00 - val01)*12 - val05;
                            _this.transfer['txt'] = { txt1: '本年税后工资', txt2: common.format_number(val06) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(val05), bottom: '年度个税'},
                                {top: common.format_number(val00*12), bottom: '年度税前 '},
                                {top: common.format_number(5000*12 + val01*12 + val02*12), bottom: '年度扣除总额'}
                            ];
                            _this.transfer['middleMore'] = [
                                {left: '起征点（元）', right: 60000},
                                {left: '五险一金（个人缴纳部分） ', right: common.format_number(val01*12)},
                            ];
                            _this.transfer['detail'] = [];
                            for(let i = 0; i < 12; i++){
                                let obj = {
                                    fiveTax: common.format_number(val01),
                                    before: common.format_number(val00),
                                    tax: common.format_number(_this.caculate_detail(i, val00, val01, val02))
                                }
                                _this.transfer['detail'].push(obj); // 累计税额，累计期数-1，税前工资，五险一金，专项附加扣除
                            }
                            _this.special = 0;
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        _this.transfer['type'] = subId + 1;
                        _this.transfer['title'] = subId == 0 ? '工资个税预扣预缴计算公式：' : '个人所得税表：';
                        _this.transfer['formulaArr'] = subId == 0 ? [
                            {left: '应纳税所得额  ', right: '= 累计税前工资收入-累计五险一金（个人缴纳部分）- 累计专项附加扣除 - 累计减除费用'},
                            {left: '应纳税额', right: '= 应纳税所得额 * 预扣税率 - 速算扣除数'},
                            {left: '当月应纳税额', right: '= 应纳税额 - 累计已缴纳税额'}
                        ] : [
                            {left: '应纳税所得额  ', right: '= 年度税前工资收入 - 年度五险一金（个人缴纳部分） - 年度专项附加扣除 - 年度检出费用'},
                            {left: '应纳税额', right: '= 应纳税所得额 * 预扣税率 - 速算扣除数'}
                        ];
                        _this.transfer['tableArr'] = [
                            {title: '年度个人所得税率表： ', table: _this.table5}
                        ];
                        _this.transfer['tip'] = '';
                        break;
                    case 1:
                        // 年终奖 
                        const val10 = _this.chosen[name]['arr'][0]['input'];
                        let tax1 = 0, obj1 = null, val11 = 0;
                        if(val10 > 0) {
                            if(subId == 0){
                                tax1 = Number(val10) * Number(_this.caculate1(val10)['tax']) - Number(_this.caculate1(val10)['speed']);
                                val11 = val10 - tax1;
                                _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val11) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax1), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val10), bottom: '税前收入（元）'}
                                ];
                            } else {
                                obj1 = _this.caculate2(val10);
                                val11 = (val10 - obj1['speed'])/(1 - obj1['tax']);
                                tax1 = val11 - val10;
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val11) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax1), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val10), bottom: '税后收入（元）'}
                                ];
                            }
                            _this.transfer['type'] = 0;
                            _this.transfer['title'] = '年终奖个人所得税计算公式：';
                            _this.transfer['formulaArr'] = [
                                {left: '应纳税额 ', right: '= 税前年终奖金额 * 适用税率 - 速算扣除数（年终奖/12获得税率和速算数）'},
                            ];
                            _this.transfer['tableArr'] = [
                                {title: '劳务报酬税率表： ', table: _this.table1}
                            ]
                            _this.transfer['tip'] = '年终奖所得，将年终奖金额除以12个月，以每月平均收入金额来确定税率和速算扣除数';
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        break;
                    case 2:
                        // 劳务报酬 （已检验）
                        const val20 = _this.chosen[name]['input'];
                        const type2 = _this.chosen[name]['type'];
                        let obj2 = null, val21 = 0, tax2 = 0;
                        if(subId == 0 && val20 > 0){
                            if(type2 == 0){
                                obj2 = _this.caculate3(val21);
                                if (val20 < 800 || val20 ==  800) {
                                    val21 = val20;
                                } else if ((val20 > 800 || val20 == 800) && val20 < 4000){
                                    val21 = (val20 - (val20 - 800) * obj2['tax'] + obj2['speed']);
                                } else {
                                    val21 = (val20 - val20 * 0.8 * obj2['tax'] + obj2['speed']);
                                }
                            } else if (val20 > 0) {
                                obj2 = _this.caculate1(val20 * 0.8 * 12);
                                val21 = val20 - val20 * 0.8 * obj2['tax'] + obj2['speed'];
                            }
                            tax2 = val20 - val21;;
                            _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val21) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(tax2), bottom: '应纳个税（元）'},
                                {top: common.format_number(val20), bottom: '税前收入（元）'}
                            ];
                            _this.transfer['formulaArr'] = type2 == 0 ? [
                                {left: '应纳税所得额 ', right: '= 劳务报酬所得（不超过4000元） - 800元'},
                                {left: '应纳税所得额 ', right: '= 劳务报酬所得（超过4000元） x (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额x适用税率 - 速算扣除数'}
                            ] : [
                                {left: '应纳税所得额 ', right: '= 劳务报酬所得 x (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 适用税率 - 速算扣除数'}
                            ];
                            _this.transfer['tableArr']= type2 == 0 ? [
                                {title: '劳务报酬税率表： ', table: _this.table3}
                            ] : [
                                {title: '劳务报酬税率表： ', table: _this.table1}
                            ];
                        } else if(val20 > 0){
                            if(type2 == 0){
                                if(val20 > 0 && val20 < 800){
                                    val21 = val20;
                                } else if ((val20 > 800 || val20 == 800) && val20 < 3360){
                                    val21 = (val20 - 160)/0.8;
                                } else if ((val20 > 3360 || val20 == 3360) && val20 < 21000){
                                    val21 = val20/0.84;
                                } else if ((val20 > 21000 || val20 == 21000) && val20 < 49500){
                                    val21 = (val20 - 2000)/0.76;
                                } else{
                                    val21 = (val20 - 7000)/0.68;
                                }
                            } else {
                                obj2 = _this.caculate4(val20);
                                val21 = (val20 - obj2['speed'])/(1 - 0.8 * obj2['tax']);
                            }
                            tax2 = val21 - val20;
                            _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val21) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(tax2), bottom: '应纳个税（元）'},
                                {top: common.format_number(val20), bottom: '税后收入（元）'}
                            ];
                            _this.transfer['formulaArr'] = type2 == 0 ? [
                                {left: '应纳税所得额 ', right: '= 劳务报酬所得（不超过4000元） - 800元'},
                                {left: '应纳税所得额 ', right: '= 劳务报酬所得（超过4000元） x (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 适用税率 - 速算扣除数'}
                            ] : [
                                {left: '应纳税所得额 ', right: '= 劳务报酬所得 x (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 适用税率 - 速算扣除数'}
                            ];
                            _this.transfer['tableArr'] = type2 == 0 ? [{title: '劳务报酬税率表： ', table: _this.table3}] : [{title: '劳务报酬税率表： ', table: _this.table1}];
                            _this.transfer['tip'] = '';
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        _this.transfer['type'] = 0;
                        _this.transfer['title'] = '劳务报酬计算公式：';
                        _this.transfer['tip'] = '含税级适用于纳税人负担税款的劳务报酬所得；';
                        break;
                    case 3:
                        // 偶然收入  （已检验）
                        const val30 = _this.chosen[name]['arr'][0]['input'];
                        let tax3 = 0, val31 = 0;
                        if(subId == 0 && val30 > 0){
                            tax3 = val30 * 0.2;
                            val31 = val30 - tax3;
                            _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val31) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(tax3), bottom: '应纳个税（元）'},
                                {top: common.format_number(val30), bottom: '税前收入（元）'}
                            ];
                        } else if(val30 > 0) {
                            tax3 = val30 * 0.25;
                            val31 = val30 / 0.8;
                            _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val31) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(tax3), bottom: '应纳个税（元）'},
                                {top: common.format_number(val30), bottom: '税后收入（元）'}
                            ];
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        _this.transfer['type'] = 0;
                        _this.transfer['title'] = '偶然收入所得税率计算公式：';
                        _this.transfer['formulaArr'] = [
                            {left: '应纳税额', right: '=税前收入 x 20%'}
                        ];
                        _this.transfer['tableArr'] = [];
                        _this.transfer['tip'] = '';
                        break;
                    case 4:
                        // 稿酬收入 （已检验）
                        const val40 = _this.chosen[name]['input'];
                        const type4 = _this.chosen[name]['type'];
                        let obj4 = null, tax4 = 0, val41 = 0;
                        if(subId == 0 && val40 > 0){
                            if(type4 == 0){
                                if ( val40 < 800 || val40 == 800){
                                    val41 = val40;
                                } else if ( 800 < val40 && val40 < 4000 ){
                                    val41 = val40 - (val40 - 800) * 0.14;
                                } else {
                                    val41 = val40 - val40 * 0.8 * 0.14;
                                }
                            } else {
                                obj4 = _this.caculate1(val40 * 12 * 0.8 * 0.7);
                                val41 = val40 - val40 * 0.8 * 0.7 * obj4['tax'] + obj4['speed'];
                            }
                            tax4 = val40 - val41;
                            _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val41) + '元' };
                            _this.transfer['middle'] = [
                                {top: common.format_number(tax4), bottom: '应纳个税（元）'},
                                {top: common.format_number(val40), bottom: '税前收入（元）'}
                            ];
                        } else if(val40 > 0){
                            if(type4 == 0){
                                if(val40 > 0 && (val40 < 800 || val40 == 800)){
                                    val41 = val40;
                                } else if (val40 > 800 && val40 < 3552) {
                                    val41 = (val40 - 112) / 0.86;
                                } else if (val40 > 3552 || val40 == 3552) {
                                    val41 = val40 / 0.888;
                                }
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val41) + '元' };
                            } else {
                                obj4 = _this.caculate5(val40);
                                val41 = (val40 - obj4['speed']) / (1 - 0.56 * obj4['tax']);
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val41) + '元' };
                            }
                            tax4 = val41 - val40;
                            _this.transfer['middle'] = [
                                {top: common.format_number(tax4), bottom: '应纳个税（元）'},
                                {top: common.format_number(val40), bottom: '税后收入（元）'}
                            ];
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        _this.transfer['type'] = 0;
                        _this.transfer['title'] = '稿酬所得税率计算公式：';
                        _this.transfer['formulaArr'] = type4 == 0 ? [
                            {left: '应纳税所得额', right: '= 稿酬所得（不超过4000元） - 800元'},
                            {left: '应纳税所得额', right: '= 稿酬所得（超过4000元） x (1- 20%)'},
                            {left: '应纳税额', right: '= 税前收入 x 14%'}
                        ] : [
                            {left: '应纳税所得额', right: '= 税前每次稿酬收入金额 x (1-20%) x (1-30%)'},
                            {left: '应纳税额', right: '= 应纳税所得额 x 税率 - 速算扣除数'}
                        ];
                        _this.transfer['tableArr'] = type4 == 0 ? [] : [
                            {title: '特许使用费所得税率表： ', table: _this.table1}
                        ];
                        break;
                    case 5:
                        // 利息股息分红 （已检验）
                        const val50 = _this.chosen[name]['arr'][0]['input'];
                        let tax5 = 0, val51 = 0;
                        if( val50 > 0 ) {
                            if(subId == 0){
                                tax5 = val50 * 0.2;
                                val51 = val50 - tax5;
                                _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val51) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax5), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val50), bottom: '税前收入（元）'}
                                ];
                            } else {
                                val51 = val50 / 0.8;
                                tax5 = val51 - val50;
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val51) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax5), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val50), bottom: '税后收入（元）'}
                                ];
                            }
                            _this.transfer['type'] = 0;
                            _this.transfer['title'] = '利息、股息红利所得税率计算公式：';
                            _this.transfer['formulaArr'] = [
                                {left: '应纳税额 ', right: '= 税前收入 x 20%'},
                            ];
                            _this.transfer['tableArr'] = [];
                            _this.transfer['tip'] = '';
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        break;
                    case 6:
                        // 财产租赁 （已检验）
                        const val60 = _this.chosen[name]['arr'][0]['input'];
                        let val61 = 0, tax6 = 0;
                        if(val60 > 0) {
                            if(subId == 0) {
                                if ( val60 < 800 || val60 == 800) {
                                    val61 = val60;
                                } else if ( val60 < 4000 ) {
                                    val61 = val60 - (val60 - 800) * 0.2;
                                } else {
                                    val61 = val60 - val60 * 0.8 * 0.2;
                                }
                                tax6 = val60 - val61;
                                _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val61) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax6), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val60), bottom: '税前收入（元）'}
                                ];
                            } else {
                                if ( val60 < 800 || val60 == 800 ) {
                                    val61 = val60;
                                } else if(val60 < 3360){
                                    val61 = (val60 - 160) / 0.8;
                                } else {
                                    val61 = val60 / 0.84;
                                }
                                tax6 = val61 - val60;
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val61) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax6), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val60), bottom: '税后收入（元）'}
                                ];
                            }
                            _this.transfer['type'] = 0;
                            _this.transfer['title'] = '财产租赁个税计算公式：';
                            _this.transfer['tip'] = '';
                            _this.transfer['formulaArr'] = [
                                {left: '应纳税所得额 ', right: '= 财产租赁（不超过4000元） - 800元'},
                                {left: '应纳税所得额 ', right: '= 财产租赁（超过4000元） x (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 20%'}
                            ];
                            _this.transfer['tableArr'] = [];
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        break;
                    case 7:
                        // 特许使用费 （已检验）
                        const val70 = _this.chosen[name]['input'];
                        const type70 = _this.chosen[name]['type'];
                        let tax7 = 0, val71 = 0, obj7 = null;
                        if( val70 > 0 ) {
                            if(subId == 0){
                                if ( type70 == 0 ){
                                    if ( val70 < 800 || val70 == 800 ){
                                        val71 = val70;
                                    } else if ( val70 < 4000 ){
                                        val71 = val70 - (val70 - 800) * 0.2;
                                    } else {
                                        val71 = val70 - val70 * 0.8 * 0.2;
                                    }
                                } else {
                                    obj7 = _this.caculate1(val70 * 12 * 0.8);
                                    val71 = val70 - val70 * 0.8 * obj7['tax'] + obj7['speed'];
                                }
                                tax7 = val70 - val71;
                                _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val71) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax7), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val70), bottom: '税前收入（元）'}
                                ];
                            } else {
                                if ( type70 == 0 ){
                                    if ( val70 < 800 || val70 == 800 ){
                                        val71 = val70;
                                        tax7 = 0;
                                    } else{
                                        val71 = val70 < 3360 ? ((val70 - 160) / 0.8) : (val70 / 0.84);
                                        tax7 = val71 - val70;
                                    }
                                } else {
                                    obj7 = _this.caculate4(val70);
                                    val71 = (val70 - obj7['speed'])/(1 - 0.8 * obj7['tax']);
                                    tax7 = val71 * 0.8 * obj7['tax'] - obj7['speed'];
                                }
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val71) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax7), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val70), bottom: '税后收入（元）'}
                                ];
                            }
                            _this.transfer['tableArr'] = type70 == 0 ? [] : [ {title: '特许使用费所得税率表： ', table: _this.table1} ];
                            _this.transfer['formulaArr'] = type70 == 0 ? [
                                {left: '应纳税所得额 ', right: '= 特许使用费（不超过4000元） - 800元'},
                                {left: '应纳税所得额 ', right: '= 特许使用费（超过4000元） x (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 20%'}
                            ] : [
                                {left: '应纳税所得额 ', right: '= 税前每次特许使用费用收入金额 * (1-20%)'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 税率 - 速算扣除数'}
                            ];
                            _this.transfer['type'] = 0;
                            _this.transfer['title'] = '特许使用费个税计算公式：';
                            _this.transfer['tip'] = '';
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        break;
                    case 8:
                        // 财产转让所得 (已检验)
                        let val80 = 0, tax8 = 0;
                        const val81 = Number(_this.chosen[name]['arr'][0]['input']);
                        const val82 = Number(_this.chosen[name]['arr'][1]['input']);
                        const val83 = Number(_this.chosen[name]['arr'][2]['input']);
                        if ( val81 > 0 ){
                            if( subId == 0 ) {
                                if ( val81 - val82 - val83 > 0 ){
                                    val80 = val81 - (val81 - val82 - val83) * 0.2;
                                } else {
                                    val80 = val81;
                                }
                                tax8 = val81 - val80;
                                _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val80) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax8), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val81), bottom: '税前收入（元）'}
                                ];
                            } else {
                                if ( val81 - 0.2 * val82 - 0.2 * val83 > 0 ){
                                    val80 = (val81 - 0.2 * val82 - 0.2 * val83) / 0.8;
                                    tax8 = val80 - val81;
                                } else {
                                    val80 = val81;
                                    tax8 = 0;
                                }
                                _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val80) + '元' };
                                _this.transfer['middle'] = [
                                    {top: common.format_number(tax8), bottom: '应纳个税（元）'},
                                    {top: common.format_number(val81), bottom: '税后收入（元）'}
                                ];
                            }
                            _this.transfer['type'] = 0;
                            _this.transfer['title'] = '财产转让所得税税计算公式：';
                            _this.transfer['tableArr'] = [];
                            _this.transfer['formulaArr'] = [
                                {left: '应纳税所得额 ', right: '= 财产转让收入金额 - 财产原值 - 合理费用'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 税率（20%）'}
                            ];
                            _this.transfer['tip'] = '';
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        break;
                    case 9:
                        // 经营所得 (完成检验)
                        let val90 = 0, tax9 = 0, obj9 = null;
                        const val91 = _this.chosen[name]['arr'][0]['input']; 
                        const val92 = _this.chosen[name]['arr'][1]['input'];
                        if( val91 > 0 || val91 == 0 ) {
                            if( subId == 0) {
                                if(val91 > val92 || val91 == val92){
                                    obj9 = _this.caculate6(val91 - val92);  // 税率和速算值
                                    val90 = val91 - (val91 - val92) * obj9['tax'] + obj9['speed'];  // 税后
                                    tax9 = val91 - val90;  // 个税
                                    _this.transfer['txt'] = { txt1: '税后收入（元）', txt2: common.format_number(val90) + '元' };
                                    _this.transfer['middle'] = [
                                        {top: common.format_number(tax9), bottom: '应纳个税（元）'},
                                        {top: common.format_number(val91), bottom: '税前收入（元）'}
                                    ];
                                } else {
                                    canLink = false;
                                    common.show_weakTip('经营所得必须大于等于成本费用及损失哦~');
                                }
                            } else {
                                obj9 = _this.caculate7(val91 - val90);  // 税率和速算值
                                val90 = (val91 - obj9['speed'] - val92 * obj9['tax']) / ( 1 - obj9['tax'] );  //  税前
                                tax9 = val90 - val91;   //  个税
                                if( val90 > val92 || val90 == val92 ){
                                    _this.transfer['txt'] = { txt1: '税前收入（元）', txt2: common.format_number(val90) + '元' };
                                    _this.transfer['middle'] = [
                                        {top: common.format_number(tax9), bottom: '应纳个税（元）'},
                                        {top: common.format_number(val91), bottom: '税后收入（元）'}
                                    ];
                                } else {
                                    canLink = false;
                                    common.show_weakTip('经营所得必须大于等于成本费用及损失哦~');
                                }
                            }
                            _this.transfer['type'] = 0;
                            _this.transfer['title'] = '经营所得个税计算公式：';
                            _this.transfer['tableArr']= [
                                {title: '经营所得对应税率表： ', table: _this.table4}
                            ];
                            _this.transfer['formulaArr'] = [
                                {left: '应纳税所得额 ', right: '= 年度收入总额 - 成本、费用及损失'},
                                {left: '应纳税额 ', right: '= 应纳税所得额 x 适用税率 - 速算扣除数'}
                            ];
                            _this.transfer['tip'] = '';
                        } else {
                            canLink = false;
                            common.show_weakTip('请输入完整信息');
                        }
                        break;
                }
                if(canLink){
                    _this.getResult(_this.transfer);
                    this.link_to('/personalIncomeTax/result');
                }
            },
            // 计算每个月的薪资（累计税额，累计期数-1，税前工资，五险一金，专项附加扣除）
            caculate_detail( i, salary, five, special){
                let should1 = salary * (i+1) - five * (i+1) - special * (i+1) - 5000*(i+1);  // 
                let obj = this.caculate8(should1);
                let should2 = should1 * obj['tax'] - obj['speed'] - this.special;
                this.special = this.special + should2;
                should2 = common.format_number(should2);
                return should2;
            },
            // 选择tab标签 & 选择时的动效
            chose_tab(item, el){
                // const liWidth = $($('.can-scroll li')[0]).width();
                // const middleWidth = $('.can-scroll').width()/2 - liWidth/2;
                // const elLeft = liWidth*item.id;
                // this.tabLeft = elLeft - middleWidth;
                // $('.can-scroll li').removeClass('active');
                // $(el.target).addClass('active');
                // $('.can-scroll').animate({scrollLeft: this.tabLeft}, 200);
                this.chosen["chosenTab"] = item;
                this.chosen['chosenSubTab'] = 0;
                this.chosenType2 = this.chosen['chosen'+item['id']+this.chosen['chosenSubTab']];
                this.chosenType3 = this.chosen['chosen'+item['id']+this.chosen['chosenSubTab']];
            },
            // 选择副tab标签
            chosen_sub_tab(i){
                this.chosen['chosenSubTab'] = i;
                switch (this.chosen['chosenTab']['type']) {
                    case 1:
                        this.chosenType2 = this.chosen['chosen'+this.chosen['chosenTab']['id']+i];
                        break;
                    case 2:
                        this.chosenType3 = this.chosen['chosen'+this.chosen['chosenTab']['id']+i];
                        break;
                    default:
                        break;
                }
            },
            // 跳转至其他页面
            link_to(path){
                this.$router.push({
                    path: path, 
                });
            },
            // 工资薪金 - 展开更多输入框 & 动效
            show_more(el){
                const ele = el.target.nodeName == 'LI' ? $(el.target) : $(el.target).parents('li');
                if($(ele).hasClass('showMore')) {
                    $(ele).removeClass('showMore');
                    $(ele).parents('ul').find('.has-show-more').slideUp(200);
                } else {
                    $(ele).addClass('showMore');
                    $(ele).parents('ul').find('.has-show-more').slideDown(200);
                }
            },
            // 使用最低值
            use_val(type1, type2, val, rate){
                this.chosen[type1][type2] = common.format_number(val * rate / 100);
            },
            // 根据  缴纳基数 & 缴纳比例 改变 个人缴纳金额
            change_fund(name){
                this.chosen[name]['fundInput'] = this.chosen[name]['fund'] * this.chosen[name]['fundRate'] / 100;
            },
            // 第二种 计算方式选择
            chosen_button(i,el){
                const ele = el.target.nodeName == 'LI' ? $(el.target) : $(el.target).parents('li');
                this.chosen['chosen'+this.chosen['chosenTab']['id']+this.chosen['chosenSubTab']]['type'] = i;
                this.chosenType3 = this.chosen['chosen'+this.chosen['chosenTab']['id']+this.chosen['chosenSubTab']];
            },
            // 根据税率得出值1
            caculate1(val){
                const obj = {};
                val = val /12;
                if(val < 3000 || val == 3000){
                    obj['tax'] = 0.03;
                    obj['speed'] = 0;
                } else if((val > 3000) && (val < 12000 || val == 12000)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 210;
                } else if((val > 12000) && (val < 25000 || val == 25000)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 1410;
                } else if((val > 25000) && (val < 35000 || val == 35000)){
                    obj['tax'] = 0.25;
                    obj['speed'] = 2660;
                } else if((val > 35000) && (val < 55000 || val == 55000)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 4410;
                } else if((val > 55000) && (val < 80000 || val == 80000)){
                    obj['tax'] = 0.35;
                    obj['speed'] = 7160;
                } else if(val > 80000){
                    obj['tax'] = 0.45;
                    obj['speed'] = 15160;
                }
                return obj;
            },
            // 根据税率得出值2
            caculate2(val){
                const obj = {};
                val = val /12;
                if(val < 2910  || val == 2910){
                    obj['tax'] = 0.03;
                    obj['speed'] = 0;
                } else if(val > 2910 && (val < 11640 || val == 11640)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 210;
                } else if((val > 11640) && (val < 24250 || val == 24250)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 1410;
                } else if((val > 24250) && (val < 33950 || val == 33950)){
                    obj['tax'] = 0.25;
                    obj['speed'] = 2660;
                } else if((val > 33950) && (val < 49710 || val == 49710)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 4410;
                } else if((val > 49710) && (val < 72210 || val == 72210)){
                    obj['tax'] = 0.35;
                    obj['speed'] = 7160;
                } else if(val > 72210){
                    obj['tax'] = 0.45;
                    obj['speed'] = 15160;
                }
                return obj;
            },
            // 根据税率得出值3
            caculate3(val){
                const obj = {};
                if(val < 20000){
                    obj['tax'] = 0.2;
                    obj['speed'] = 0;
                } else if((val > 20000 || val == 20000) && (val < 500000)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 2000;
                } else if(val > 500000){
                    obj['tax'] = 0.4;
                    obj['speed'] = 7000;
                }
                return obj;
            },
            // 根据税率得出值4
            caculate4(val){
                const obj = {};
                if(val < 3660){
                    obj['tax'] = 0.03;
                    obj['speed'] = 0;
                } else if((val > 3660 || val == 3660) && (val < 14010)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 210;
                } else if((val > 14010 || val == 14010) && (val < 27660)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 1410;
                } else if((val > 27660 || val == 27660) && (val < 37660)){
                    obj['tax'] = 0.25;
                    obj['speed'] = 2660;
                } else if((val > 37660 || val == 37660) && (val < 56660)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 4410;
                } else if((val > 56660 || val == 56660) && (val < 79160 || val == 79160)){
                    obj['tax'] = 0.35;
                    obj['speed'] = 7160;
                } else if(val > 79160){
                    obj['tax'] = 0.45;
                    obj['speed'] = 15160;
                }
                return obj;
            },
            // 根据税率得出值5
            caculate5(val){
                const obj = {};
                if(val < 5267.14286 || val == 5267.14286){
                    obj['tax'] = 0.03;
                    obj['speed'] = 0;
                } else if((val > 5267.14286) && (val < 20438.5714 || val == 20438.5714)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 210;
                } else if((val > 20438.5714) && (val < 41052.8571 || val == 41052.8571)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 1410;
                } else if((val > 41052.8571) && (val < 56410 || val == 56410)){
                    obj['tax'] = 0.25;
                    obj['speed'] = 2660;
                } else if((val > 56410) && (val < 86124.2857 || val == 86124.2857)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 4410;
                } else if((val > 86124.2857) && (val < 122017.143 || val == 122017.143)){
                    obj['tax'] = 0.35;
                    obj['speed'] = 7160;
                } else if(val > 122017.143){
                    obj['tax'] = 0.45;
                    obj['speed'] = 15160;
                }
                return obj;
            },
            // 根据税率得出值6
            caculate6(val){
                const obj = {};
                if(val < 30000){
                    obj['tax'] = 0.05;
                    obj['speed'] = 0;
                } else if((val > 30000 || val == 30000) && (val < 90000)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 1500;
                } else if((val > 90000 || val == 90000) && (val < 300000)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 10500;
                } else if((val > 300000 || val == 300000) && (val < 500000)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 40500;
                } else if(val > 500000){
                    obj['tax'] = 0.35;
                    obj['speed'] = 65500;
                }
                return obj;
            },
            // 根据税率得出值7
            caculate7(val){
                const obj = {};
                if(val < 28500 || val == 28500){
                    obj['tax'] = 0.05;
                    obj['speed'] = 0;
                } else if((val > 28500) && (val < 82500 || val == 82500)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 1500;
                } else if((val > 82500) && (val < 250500 || val == 250500)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 10500;
                } else if((val > 250500) && (val < 390500 || val == 390500)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 40500;
                } else if(val > 390500){
                    obj['tax'] = 0.35;
                    obj['speed'] = 65500;
                }
                return obj;
            },
            // 根据税率得出值8
            caculate8(val){
                const obj = {};
                if(val < 36000 || val == 36000){
                    obj['tax'] = 0.03;
                    obj['speed'] = 0;
                } else if((val > 36000) && (val < 144000 || val == 144000)){
                    obj['tax'] = 0.1;
                    obj['speed'] = 2520;
                } else if((val > 144000) && (val < 300000 || val == 300000)){
                    obj['tax'] = 0.2;
                    obj['speed'] = 16920;
                } else if((val > 300000) && (val < 420000 || val == 420000)){
                    obj['tax'] = 0.25;
                    obj['speed'] = 31920;
                } else if((val > 420000) && (val < 660000 || val == 660000)){
                    obj['tax'] = 0.3;
                    obj['speed'] = 52920;
                } else if((val > 660000) && (val < 960000 || val == 960000)){
                    obj['tax'] = 0.35;
                    obj['speed'] = 85920;
                } else if(val > 960000){
                    obj['tax'] = 0.45;
                    obj['speed'] = 181920;
                }
                return obj;
            },
        },
        activated(){
            $("body,html").animate({"scrollTop":0});
            $('body,html').addClass('gray247').removeClass('origin').removeClass('f7');
            const _this = this;
            const id = _this.chosen['chosenTab']['id'];
            const subId = _this.chosen['chosenSubTab'];
            let name = 'chosen' + id;
            $('.can-scroll').animate({scrollLeft: _this.tabLeft}, 200);
            if(_this.$route.query && _this.$route.query.cityId && _this.$route.meta.isUseCache){
                let type = _this.$route.query.type;
                _this.getLocation(type);
                name = name + type;
                _this.chosen[name]['special'] = _this.$store.state.caculateTax['special'];
                getRateValueByCityId({ cityId: _this.$route.query.cityId }, (res) => {
                    _this.chosen[name]['city'] = res['data']['cityName'];
                    _this.chosen[name]['socialDefault'] = res['data']['socialSecurity'];
                    _this.chosen[name]['fundDefault'] = res['data']['minPublicFunds'];
                    _this.chosen[name]['fundDefaultRate'] = res['data']['publicFunds'] * 100;
                })
            } else if(_this.$route.meta.isUseCache){
                name = name + subId;
                _this.chosen[name]['special'] = _this.$store.state.caculateTax['special'];
                _this.getLocation('all'); // 调用获取地理位置
            } else {
                _this.init();
                _this.getLocation('all'); // 调用获取地理位置
            }
        },
        beforeRouteLeave(to, from, next){
            if(to.path.indexOf('/personalIncomeTax/choseCity')>-1 || to.path.indexOf('/personalIncomeTax/specialAdditional')>-1 || to.path.indexOf('/personalIncomeTax/result')>-1 ){
                from.meta.isUseCache = true;
            } else {
                from.meta.isUseCache = false;
                window.localStorage.setItem('listScroll', false);
            }
            next();
        }
    }
</script>
<style lang="less" scoped>
    @import './input.less';
</style>
