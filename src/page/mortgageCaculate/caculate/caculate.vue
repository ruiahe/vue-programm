<template>
    <div id="caculate">
        <div class="top">
            <wHead :titleJson='titleJson'></wHead>
            <ul class="nav space-between">
                <li class='active' @click='nav_to(1, $event, "commercialLoans")'>商业贷款{{titleJson|test}}</li>
                <li @click='nav_to(4, $event, "earlyRepayment")'>提前还贷</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        name: 'caculate',
        data(){
            return {
                titleJson:{
                    title: '房贷计算器',
                    toolBol: true,
                    toolTitle: '利率表',
                    hasRed: false,
                }
            }
        },
        filters:{
          test(num){
            return 'hiahiahia~'
          }
        },
        methods:{
            ...mapActions('caculateInfo',[ 
                'getCaculateInfo'
            ]),
            init(){
                const _this = this;
                const time = new Date().getTime();
                this.$nextTick(()=>{
                    // 商业贷输入选中信息
                    _this.chosenObj = {
                        commercial_loan: 2,
                        total_house_price: '',
                        repayment_method: 0,
                        yearsOf_mortgage: 19,
                        base_interest_rate: 6,
                        first_repayment_time: time,
                        first_repayment_time_text: ''
                    };
                    // 公积金贷输入选中信息
                    _this.chosenObj2 = {
                        commercial_loan: 2,
                        total_house_price: '',
                        repayment_method: 0,
                        yearsOf_mortgage: 19,
                        base_interest_rate0: 6,
                        first_repayment_time: time,
                        first_repayment_time_text: ''
                    },
                    // 组合贷输入选中信息
                    _this.chosenObj3 = {
                        commercial_loan: 2,
                        total_house_price0: '',
                        total_house_price1: '',
                        repayment_method: 0,
                        yearsOf_mortgage: 19,
                        base_interest_rate: 6,
                        base_interest_rate0: 6,
                        first_repayment_time: time,
                        first_repayment_time_text: '',
                    },
                    // 提前还款输入选中信息
                    _this.chosenObj4 = {
                        total_house_price: '',
                        type_of_loan: 0,
                        yearsOf_mortgage: 19,
                        first_repayment_time: time,
                        first_repayment_time_text: '',
                        repayment_method: 0,
                        early_repayment_time: time,
                        early_repayment_time_text: '',
                        early_repayment_method: 0,
                        early_repayment: '',
                        disposition: 0,
                        base_interest_rate: 6,
                        base_interest_rate0: 6
                    },
                    // 当前选中的贷款类型
                    _this.showContent = 'commercialLoans';
                    _this.baseRnterestRate = this.baseRnterestRateArr3;
                    _this.baseRnterestRate0 = this.baseRnterestRateArr5;
                    _this.change_time_to_text(time,'all');
                })
            },
            // 切换tab
            nav_to(index, e, type){
                $('#caculate .nav li').removeClass('active');
                $('#caculate .nav').removeClass('left1').removeClass('left2').removeClass('left3').removeClass('left4');
                $('#caculate .nav').addClass('left'+index);
                $(e.target).addClass('active')
                this.showContent = type;
            },
            // 打开选择器，配置选择器
            open_selector(index, arr, title, name, start){
                this.contentJson['arr'] = arr;
                this.contentJson['title'] = title;
                this.contentJson['type'] = index == 1 ?  5 : 2;
                this.contentJson['name'] = name;
                this.$refs['scrollSelector'].open(start, this.contentJson);
            },
            // 选择器返回数据
            get_select(obj){
                // 设置利率选择器列表数据
                if(obj['name'] == 'yearsOf_mortgage'){
                    if(obj['index'] == 0){
                        this.baseRnterestRate = this.baseRnterestRateArr1;
                    } else if(obj['index'] > 0 && obj['index'] < 6){
                        this.baseRnterestRate = this.baseRnterestRateArr2;
                    } else {
                        this.baseRnterestRate = this.baseRnterestRateArr3;
                    }
                }
                // 重置利率选择器
                if(obj['name'] == 'yearsOf_mortgage'){
                    if(obj['index'] == 0 || (obj['index'] > 0 && obj['index'] < 6)){
                        this.baseRnterestRate0 = this.baseRnterestRateArr4;
                    } else {
                        this.baseRnterestRate0 = this.baseRnterestRateArr5;
                    }
                }
                switch (this.showContent) {
                    case 'commercialLoans':
                        // 设置商业贷选中值
                        if (obj['name'] == 'first_repayment_time'){
                            this.chosenObj[obj['name']] = obj['result'];
                            this.change_time_to_text(obj['result'],'1');
                        } else {
                            this.chosenObj[obj['name']] = obj['index'];
                        }
                        break;
                    case 'providentFundLoan':
                        // 设置公积金贷选中值
                        if (obj['name'] == 'first_repayment_time'){
                            this.chosenObj2[obj['name']] = obj['result'];
                            this.change_time_to_text(obj['result'],'2');
                        } else {
                            this.chosenObj2[obj['name']] = obj['index'];
                        }
                        break;
                    case 'portfolioLoan':
                        // 设置商业贷选中值
                        if (obj['name'] == 'first_repayment_time'){
                            this.chosenObj3[obj['name']] = obj['result'];
                            this.change_time_to_text(obj['result'],'3');
                        } else {
                            this.chosenObj3[obj['name']] = obj['index'];
                        }
                        break;
                    default:
                        // 设置商业贷选中值
                        if (obj['name'] == 'first_repayment_time'){
                            this.chosenObj4[obj['name']] = obj['result'];
                            this.change_time_to_text(obj['result'],'4');
                        } else if(obj['name'] == 'early_repayment_time'){
                            this.chosenObj4[obj['name']] = obj['result'];
                            this.change_time_to_text(obj['result'], '5');
                        } else {
                            this.chosenObj4[obj['name']] = obj['index'];
                        }
                        break;
                }
            },
            // 打开时间选择器
            open_date_selector(bol){
                switch (this.showContent) {
                    case 'commercialLoans':
                        this.$refs['scrollDate'].open(this.chosenObj['first_repayment_time'],'first_repayment_time');
                        break;
                    case 'providentFundLoan':
                        this.$refs['scrollDate'].open(this.chosenObj2['first_repayment_time'],'first_repayment_time');
                        break;
                    case 'portfolioLoan':
                        this.$refs['scrollDate'].open(this.chosenObj3['first_repayment_time'],'first_repayment_time');
                        break;
                    default:
                        bol ? this.$refs['scrollDate'].open(this.chosenObj4['early_repayment_time'],'early_repayment_time') : this.$refs['scrollDate'].open(this.chosenObj4['first_repayment_time'],'first_repayment_time');
                        break;
                }
            },
            change_time_to_text(time, txt){
                const obj = common.change_to_date(time);
                const str = obj['year']+'-'+obj['month'];
                switch (txt) {
                    case 'all':
                        this.chosenObj['first_repayment_time_text'] = str;
                        this.chosenObj2['first_repayment_time_text'] = str;
                        this.chosenObj3['first_repayment_time_text'] = str;
                        this.chosenObj4['first_repayment_time_text'] = str;
                        this.chosenObj4['early_repayment_time_text'] = str;
                        break;
                    case '1':
                        this.chosenObj['first_repayment_time_text'] = str;
                        break;
                    case '2':
                        this.chosenObj2['first_repayment_time_text'] = str;
                    case '3':
                        this.chosenObj3['first_repayment_time_text'] = str;
                        break;
                    case '4':
                        this.chosenObj4['first_repayment_time_text'] = str;
                        break;
                    case '5':
                        this.chosenObj4['early_repayment_time_text'] = str;
                        break;
                    default:
                        break;
                }
            },
            // 返回第n个月的时间文案
            get_n_month(time, n){
                let month = 0;
                const obj = common.change_to_date(time);
                const firstMonth = Number(obj['month']);
                let year = Number(obj['year']) + (Math.floor(n/12));
                let new_obj = {};
                if((firstMonth + (n%12))>12){
                    year++;
                    month = (firstMonth + (n%12))%12;
                } else {
                    month = firstMonth + (n%12);
                }
                new_obj['year'] = year;
                new_obj['month'] = month;
                return new_obj;
            },
            // 根据时间戳计算差n个月
            get_month_num(mon1, mon2){
                const obj1 = common.change_to_date(mon1);
                const obj2 = common.change_to_date(mon2);
                const year_num_to_mon = (obj2['year'] - obj1['year'] - 1)*12;
                const month_num = Number(obj2['month']) + (12 - Number(obj1['month'])) + 1;
                return month_num + year_num_to_mon;
            },
            // 一次性还清（最后一条数据重置）
            reset_one_time_repament(list, count){
                list[count-1]['remainPrincipal'] = '0.00';
                list[count-1]['principal'] = list[count-2]['remainPrincipal'];
                list[count-1]['principal2'] = common.format_number(list[count-2]['remainPrincipal']);
                list[count-1]['monthlyPayment'] = Number(list[count-1]['principal']) + Number(list[count-1]['moneyRates']);
                list[count-1]['monthlyPayment2'] = common.format_number(list[count-1]['monthlyPayment']);
                return list;
            },
            // 部分提前还清 -- 还款时间不变 -- 等额本息 （前半部分最后一条数据重置）
            reset_partial_repament1(earlyRepament,list, count){
                list[count-1]['monthlyPayment'] = Number(list[count-1]['monthlyPayment']) + earlyRepament*10000;
                list[count-1]['monthlyPayment2'] = common.format_number(list[count-1]['monthlyPayment']);
                list[count-1]['principal'] = list[count-1]['monthlyPayment'] - list[count-1]['moneyRates'];
                list[count-1]['principal2'] = common.format_number(list[count-1]['principal']);
                list[count-1]['remainPrincipal'] = list[count-1]['remainPrincipal'] - earlyRepament*10000;
                list[count-1]['remainPrincipal2'] = common.format_number(list[count-1]['remainPrincipal']);
                return list;
            },
            // 部分提前还清 -- 还款时间不变 -- 等额本金 （前半部分最后一条数据重置）
            reset_partial_repament2(earlyRepament,list, count){
                list[count-1]['monthlyPayment'] = Number(list[count-1]['monthlyPayment']) + earlyRepament*10000;
                list[count-1]['monthlyPayment2'] = common.format_number(list[count-1]['monthlyPayment']);
                list[count-1]['remainPrincipal'] = list[count-1]['remainPrincipal'] - earlyRepament*10000;
                list[count-1]['remainPrincipal2'] = common.format_number(list[count-1]['remainPrincipal']);
                return list;
            },
            // 重置部分提前还清 后半部分数据的首次还款时间
            reset_first_time(obj){
                let time = new Date(obj['year']+'/'+obj['month']+'/1 00:00:00').getTime();
                obj = this.get_n_month(time,1);
                return new Date(obj['year']+'/'+obj['month']+'/1 00:00:00').getTime();
            },
            // 部分提前还清 -- 月供不变 -- 等额本息（所有数据&&传入：前半部数据list，月供n1，贷款总额：n2，月利n3，首次还款时间time）
            reset_partial_monthly1(list,n1, n2, n3, time){
                let n4 = Math.log(n1/(n1-n2*n3))/Math.log(1+n3); // 求出按揭总数
                let new_obj = this.result_commercialLoans0(n4, n2, 0, n3, 0, time);
                return {
                    totalMortgage: n4,
                    ...new_obj
                };
            },
            // 部分提前还清 -- 月供不变 -- 等额本金（所有数据&&传入：前半部数据list，月供n1，贷款总额：n2，月利n3，首次还款时间time）
            reset_partial_monthly2(list,n1, n2, n3, time){
                let n4 = n2/list[0]['principal']; // 求出按揭总数
                let new_obj = this.result_commercialLoans1(n2, 0, n3, 0, n4, time);
                return {
                    totalMortgage: n4,
                    ...new_obj
                };
            },
            // 转换成2位小数
            format_number(num){
                return common.format_number(num);
            },
            // 生成对应结果_商业贷款&公积金贷款_等额本息(按揭总期数，贷款总额_商业贷，贷款总额_公积金贷，月利率_商业贷，月利率_公积金贷，首次还款时间)
            result_commercialLoans0(count, n10, n11, n20, n21, n3, arrCount){
                let list = [];
                let remain0 = n10;
                let remain1 = n11;
                // 月供=〔贷款总额×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月预期年化利率)＾还款月数-1〕
                let result0 = n10 == 0 ? 0 : (n10*n20*(Math.pow((1+n20),count)))/(Math.pow((1+n20), count)-1); // 月供_商业贷
                let result1 = n11 == 0 ? 0 : (n11*n21*(Math.pow((1+n21),count)))/(Math.pow((1+n21), count)-1); // 月供_公积金贷
                const count_num = arrCount ? arrCount : count;
                let totalRate = 0;
                for(var i = 0; i < count_num; i++){
                    // 日期 & 月供 & 本金 & 利息 & 剩余本金
                    let obj = { date: '', monthlyPayment: 0, principal: 0, moneyRates: 0, remainPrincipal: 0 };
                    obj['date'] = this.get_n_month(n3,i); // 日期
                    // 月利=贷款总额×月利率×〔(1+月预期年化利率)^还款月数-(1+月预期年化利率)^(还款月序号-1)〕÷〔(1+月预期年化利率)^还款月数-1〕
                    let moneyRates0 = n10 == 0 ? 0 : n10*n20*(Math.pow((1+n20), count)-Math.pow((1+n20),i))/(Math.pow((1+n20),count)-1); // 利息_商业贷
                    let moneyRates1 = n11 == 0 ? 0 : n11*n21*(Math.pow((1+n21), count)-Math.pow((1+n21),i))/(Math.pow((1+n21),count)-1); // 利息_公积金
                    let principal0 = result0 - moneyRates0;
                    let principal1 = result1 - moneyRates1;
                    let remainPrincipal0 = remain0 - principal0;
                    let remainPrincipal1 = remain1 - principal1;
                    obj['monthlyPayment'] = result0+result1;
                    if(i<(count_num - 1) || i == 0 || ((list[i-1]['remainPrincipal'] > obj['monthlyPayment']))){
                        obj['monthlyPayment'] = result0+result1;
                        obj['monthlyPayment2'] = common.format_number(obj['monthlyPayment']); // 月供
                        obj['moneyRates'] = moneyRates0+moneyRates1;
                        obj['moneyRates2'] = common.format_number((moneyRates0+moneyRates1)); // 利息 -- 计算得来
                        obj['principal'] = principal0+principal1;
                        obj['principal2'] = common.format_number((principal0+principal1));  // 本金
                        obj['remainPrincipal'] = remainPrincipal0+remainPrincipal1;
                        obj['remainPrincipal2'] = common.format_number((remainPrincipal0+remainPrincipal1)); // 剩余本金
                        remain0 = remain0 - (result0 - moneyRates0);
                        remain1 = remain1 - (result1 - moneyRates1);
                    } else {
                        obj['moneyRates'] = moneyRates0+moneyRates1;
                        obj['moneyRates2'] = common.format_number((moneyRates0+moneyRates1)); // 利息 -- 计算得来
                        obj['remainPrincipal'] = 0;
                        obj['remainPrincipal2'] = '0.00';  // 剩余本金
                        obj['principal'] = list[i-1]['remainPrincipal'];
                        obj['principal2'] = list[i-1]['remainPrincipal2'];  // 本金
                        obj['monthlyPayment'] = obj['principal']+obj['moneyRates'];
                        obj['monthlyPayment2'] = common.format_number(obj['monthlyPayment']); // 月供
                    }
                    list[i] = obj;
                    totalRate = totalRate + obj['moneyRates'];
                }
                return {
                    list: list,
                    rate: totalRate
                };
            },
            // 生成对应结果_商业贷款&公积金贷款_等额本金 (贷款总额_商业贷，贷款总额_公积金贷，月利率_商业贷，月利率_公积金贷，按揭总期数，首次还款时间)
            result_commercialLoans1(n10, n11, n20, n21, n3, n4, arrCount){
                let list = [];
                let remain0 = n10;
                let remain1 = n11;
                let principal0 = n10/n3;
                let principal1 = n11/n3; // 贷款总额/还款月数
                const count_num = arrCount ? arrCount : n3;
                let totalRate = 0;
                for(var i = 0; i < count_num; i++){
                    // 日期 & 月供 & 本金 & 利息 & 剩余本金
                    let obj = { date: '', monthlyPayment: 0, principal: 0, moneyRates: 0, remainPrincipal: 0};
                    let remainPrincipal0 = remain0 - principal0;
                    let remainPrincipal1 = remain1 - principal1;
                    // 月供 = (本金÷还款月数)+(本金-累计已还本金)×月利率
                    let monthlyPayment0 = n20 == 0 ? 0 : n10/n3+(n10-n10*i/n3)*n20;
                    let monthlyPayment1 = n21 == 0 ? 0 : n11/n3+(n11-n11*i/n3)*n21;
                    // 每月还款利息=(贷款总额-累计已还本金)×月利率
                    let moneyRates0 = n20 == 0 ? 0 : (n10 - n10*i/n3)*n20;
                    let moneyRates1 = n21 == 0 ? 0 : (n11 - n11*i/n3)*n21;
                    obj['date'] = this.get_n_month(n4,i);
                    if(i<(count_num-1) || i == 0 || (i>0&&(list[i-1]['remainPrincipal2'] > (principal0+principal1)))){
                        obj['principal'] = principal0+principal1;
                        obj['principal2'] = common.format_number(obj['principal']); // 本金 : 贷款总额/还款月数
                        obj['remainPrincipal']  = remainPrincipal0+remainPrincipal1;
                        obj['remainPrincipal2']  = common.format_number(obj['remainPrincipal']);  // 剩余本金
                        obj['monthlyPayment'] = monthlyPayment0 + monthlyPayment1;
                        obj['monthlyPayment2'] = common.format_number(obj['monthlyPayment']);    // 月供
                        obj['moneyRates'] = moneyRates0 + moneyRates1;
                        obj['moneyRates2'] = common.format_number(obj['moneyRates']);  //  利息
                    } else {
                        obj['remainPrincipal']  = 0;
                        obj['remainPrincipal2']  = '0.00';  // 剩余本金
                        obj['principal'] = principal0+principal1;
                        obj['principal2'] = common.format_number(obj['principal']); // 本金 : 贷款总额/还款月数
                        obj['moneyRates'] = moneyRates0 + moneyRates1;
                        obj['moneyRates2'] = common.format_number(moneyRates0 + moneyRates1);  //  利息
                        obj['monthlyPayment'] = obj['principal'] + obj['moneyRates'];
                        obj['monthlyPayment2'] = common.format_number(obj['monthlyPayment']);    // 月供
                    }
                    remain0 = remainPrincipal0;
                    remain1 = remainPrincipal1;
                    totalRate = totalRate + obj['moneyRates'];
                    list[i] = obj;
                }
                return {
                    list: list,
                    rate: totalRate
                };
            },
            // 计算并得出详情列表数据
            nav_to_result(){
                let n1 = 0, n10 = 0, n11 = 0, n2 = 0, n20 = 0, n21 = 0, n3 = 0, result = 0;
                let totalHousePrice = 0; // 房价总款
                let repaymentType = 1; // 详情页类型（商业贷款&公积金贷：1；组合贷&提前还：2）
                let openType = 0; // 点亮的详情标签（等额本息：0，等额本金：1）
                let downPament = 0; // 首付
                let totleLending = 0; // 贷款总额
                let totalMortgage = 0; // 按揭总期数
                let totalPayment = 0; // 还贷总额
                let obj1 = {}; // 生成等额本息信息
                let obj2 = {}; // 生成等额本金信息
                let canLeave = false;
                switch (this.showContent) {
                    case 'commercialLoans':
                        totalHousePrice = this.chosenObj['total_house_price'];
                        if(totalHousePrice.length > 0){
                            canLeave = true;
                            openType = this.chosenObj['repayment_method'];
                            downPament = totalHousePrice*this.arrDownPaymentRatio[this.chosenObj['commercial_loan']]['result'];
                            totleLending = totalHousePrice - downPament;
                            totalMortgage = this.yearsOfMortgage[this.chosenObj['yearsOf_mortgage']]['result'];
                            // 贷款总额
                            n1 = totleLending*10000;
                            // 月利率
                            n2 = this.baseRnterestRate[this.chosenObj['base_interest_rate']]['result']/12;
                            obj1 = this.result_commercialLoans0(totalMortgage, n1, 0, n2, 0, this.chosenObj['first_repayment_time']);
                            obj2 = this.result_commercialLoans1(n1, 0, n2, 0, totalMortgage, this.chosenObj['first_repayment_time']);
                        } else {
                            canLeave = false;
                            common.show_weakTip('请完善信息');
                        }
                        break;
                    case 'providentFundLoan':
                        totalHousePrice = this.chosenObj2['total_house_price'];
                        if(totalHousePrice.length > 0){
                            canLeave = true;
                            openType = this.chosenObj2['repayment_method'];
                            downPament = totalHousePrice*this.arrDownPaymentRatio[this.chosenObj2['commercial_loan']]['result'];
                            totleLending = totalHousePrice - downPament;
                            totalMortgage = this.yearsOfMortgage[this.chosenObj2['yearsOf_mortgage']]['result'];
                            // 贷款总额
                            n1 = (totleLending)*10000;
                            // 月利率
                            n2 = this.baseRnterestRate0[this.chosenObj2['base_interest_rate0']]['result']/12;
                            obj1 = this.result_commercialLoans0(totalMortgage, n1, 0, n2, 0, this.chosenObj2['first_repayment_time']); // 生成等额本息的列表
                            obj2 = this.result_commercialLoans1(0, n1, 0, n2, totalMortgage, this.chosenObj2['first_repayment_time']); // 生成等额本金的列表
                        } else {
                            canLeave = false;
                            common.show_weakTip('请完善信息');
                        }
                        break;
                    case 'portfolioLoan':
                        if(this.chosenObj3['total_house_price0'].length > 0 && this.chosenObj3['total_house_price1'].length > 0){
                            canLeave = true;
                            repaymentType = 2;
                            openType = this.chosenObj3['repayment_method'];
                            totleLending = Number(this.chosenObj3['total_house_price0']) + Number(this.chosenObj3['total_house_price1']);
                            // 贷款总额_商业贷 & 贷款总额_公积金贷
                            n10 = this.chosenObj3['total_house_price0']*10000;
                            n11 = this.chosenObj3['total_house_price1']*10000;
                            // 月利率_商业贷 & 月利率_公积金贷
                            n20 = this.baseRnterestRate[this.chosenObj3['base_interest_rate']]['result']/12;
                            n21 = this.baseRnterestRate0[this.chosenObj3['base_interest_rate0']]['result']/12;
                            // 按揭总期数
                            n3 = this.yearsOfMortgage[this.chosenObj3['yearsOf_mortgage']]['result'];
                            totalMortgage = n3;
                            obj1 = this.result_commercialLoans0(n3, n10, n11, n20, n21, this.chosenObj3['first_repayment_time']); // 生成等额本息的列表
                            obj2 = this.result_commercialLoans1(n10, n11, n20, n21, n3, this.chosenObj3['first_repayment_time']); // 生成等额本金的列表
                        } else {
                            canLeave = false;
                            common.show_weakTip('请完善信息');
                        }
                        break;
                }
                if(canLeave){
                    this.toDetail = {
                        /*
                            详情类型：
                            1：包含 =》 房价总款 & 首付 & 贷款总额 & 按揭总期数 & 贷款总利息_等额本息 & 贷款总利息_等额本金 & 还贷总额_等额本息 & 还贷总额_等额本金 & 列表_等额本息 & 列表等额本金
                            2：包含 =》 按揭总期数 & 贷款总利息_等额本息 & 贷款总利息_等额本金 & 还贷总款_等额本息 & 还贷总款_等额本金
                        */
                        open_type: openType, // 还款方式 
                        repayment_type: repaymentType, // 详情页类型
                        total_house_price: totalHousePrice, // 房价总款
                        down_pament: common.format_number(downPament), // 首付
                        totle_lending: totleLending, // 贷款总额
                        total_mortgage1: totalMortgage, // 按揭总期数_等额本息
                        total_mortgage2: totalMortgage, // 按揭总期数_等额本期
                        gross_interest1: common.format_number(obj1['rate']/10000), // 贷款总利息 -- 等额本息
                        gross_interest2: common.format_number(obj2['rate']/10000), // 贷款总利息 -- 等额本金
                        totalPayment1: common.format_number((obj1['rate'] + totleLending*10000)/10000), // 还贷总额 -- 等额本息
                        totalPayment2: common.format_number((obj2['rate'] + totleLending*10000)/10000), // 还贷总额 -- 等额本金
                        list1: obj1['list'], // 列表 -- 等额本息
                        list2: obj2['list'], // 列表 -- 等额本金
                    }
                    this.getCaculateInfo(this.toDetail);
                    this.$router.push({path: '/mortgageCaculate/result'});
                }
            },
            // 提前还款计算
            nav_to_result_early(){
                let timeObj1 = common.change_to_date(this.chosenObj4['first_repayment_time']);
                let timeObj2 = common.change_to_date(this.chosenObj4['early_repayment_time']);
                let timeObj1First = new Date(timeObj1['year']+'/'+timeObj1['month']+'/1 00:00:00').getTime();
                let timeObj2Early = new Date(timeObj2['year']+'/'+timeObj2['month']+'/1 00:00:00').getTime();
                let totleLending = this.chosenObj4['total_house_price'];
                let obj10 = {}; // 前半部数据信息_等额本息
                let obj11 = {}; // 前半部数据信息_等额本金
                let obj20 = {}; // 后半部数据信息_等额本息
                let obj21 = {}; // 后半部数据信息_等额本金
                let totalMortgage1 = 0; // 按揭总期数_等额本息
                let totalMortgage2 = 0; // 按揭总期数_等额本金
                if(totleLending.length == 0 || (this.chosenObj4['early_repayment_method'] == 1 && this.chosenObj4['early_repayment'].length == 0)){
                    common.show_weakTip('请完善信息');
                } else if(timeObj1First > timeObj2Early || timeObj2Early == timeObj1First){
                    common.show_weakTip('提前还款时间必须大于首次还款时间');
                } else {
                    let count = this.get_month_num(this.chosenObj4['first_repayment_time'], this.chosenObj4['early_repayment_time']); // 已还期数
                    // 贷款总额
                    const n1 = totleLending*10000;
                    // 月利率
                    const n2 = this.chosenObj4['type_of_loan'] == 0 ? this.baseRnterestRate[this.chosenObj4['base_interest_rate']]['result']/12 : this.baseRnterestRate0[this.chosenObj4['base_interest_rate0']]['result']/12;
                    // 按揭总期数
                    const n3 = this.yearsOfMortgage[this.chosenObj4['yearsOf_mortgage']]['result'];
                    totalMortgage1 = n3;
                    totalMortgage2 = n3;
                    // 前半部分数据 -- 等额本息
                    obj10 = this.result_commercialLoans0(n3, n1, 0, n2, 0, this.chosenObj4['first_repayment_time'],count);
                    let list1 = obj10['list'];
                    // 前半部分数据 -- 等额本金
                    obj11 = this.result_commercialLoans1(n1, 0, n2, 0, n3, this.chosenObj4['first_repayment_time'], count);
                    let list2 = obj11['list'];
                    switch (this.chosenObj4['early_repayment_method']) {
                        case 0: // 提前还款方式 -- 一次性还清
                            list1 = this.reset_one_time_repament(list1,count); // 生成等额本息的列表
                            list2 = this.reset_one_time_repament(list2,count); // 生成等额本金的列表
                            obj10['list'] = list1;
                            obj11['list'] = list2;
                            obj20['list'] = [];
                            obj21['list'] = [];
                            obj20['rate'] = 0;
                            obj21['rate'] = 0;
                            totalMortgage1 = count;
                            totalMortgage2 = count;
                            break;
                        default: // 提前还款方式 -- 部分提前还款
                            // 重置前半部分数据
                            list1 = this.reset_partial_repament1(this.chosenObj4['early_repayment'],list1,count);
                            list2 = this.reset_partial_repament2(this.chosenObj4['early_repayment'],list2,count);
                            obj10['list'] = list1;
                            obj11['list'] = list2;
                            if(this.chosenObj4['disposition'] == 0){ // 还款时间不变
                                // 剩余的贷款总额
                                let new_n10 = list1[list1.length - 1]['remainPrincipal'];
                                let new_n11 = list2[list2.length - 1]['remainPrincipal'];
                                // 剩余按揭总数
                                let new_n3 = n3 - count;
                                // 剩余首次还款时间
                                let new_first_time = this.reset_first_time(list1[list1.length-1]['date']);
                                obj20 = this.result_commercialLoans0(new_n3, new_n10, 0, n2, 0, new_first_time);
                                obj21 = this.result_commercialLoans1(new_n11, 0, n2, 0, new_n3, new_first_time);
                            } else { // 月供不变
                                let new_first_time = this.reset_first_time(list1[list1.length-1]['date']);
                                obj20 = this.reset_partial_monthly1(list1,list1[0]['monthlyPayment'], list1[list1.length-1]['remainPrincipal'],n2,new_first_time);
                                obj21 = this.reset_partial_monthly2(list2,list2[0]['monthlyPayment'], list2[list2.length-1]['remainPrincipal'],n2,new_first_time);
                                totalMortgage1 = obj20['totalMortgage']+count;
                                totalMortgage2 = obj20['totalMortgage']+count;

                            }
                            break;
                    }
                    this.toDetail = {
                        /*
                            详情类型：
                            2：包含 =》 按揭总期数_等额本息 & 按揭总期数_等额本息 & 贷款总利息_等额本息 & 贷款总利息_等额本金 & 还贷总款_等额本息 & 还贷总款_等额本金
                        */
                        open_type: this.chosenObj4['repayment_method'], // 还款方式 
                        repayment_type: 2, // 详情页类型
                        total_house_price: 0, // 房价总款
                        down_pament: 0, // 首付
                        totle_lending: totleLending, // 贷款总额
                        total_mortgage1: totalMortgage1, // 按揭总期数
                        total_mortgage2: totalMortgage1, // 按揭总期数
                        gross_interest1: common.format_number((obj10['rate'] + obj20['rate'])/10000), // 贷款总利息 -- 等额本息
                        gross_interest2: common.format_number((obj11['rate'] + obj21['rate'])/10000), // 贷款总利息 -- 等额本金
                        totalPayment1: common.format_number((obj10['rate'] + obj20['rate'])/10000 + Number(totleLending)), // 还贷总额 -- 等额本息
                        totalPayment2: common.format_number((obj11['rate'] + obj21['rate'])/10000 + Number(totleLending)), // 还贷总额 -- 等额本金
                        list1: [...obj10['list'], ...obj20['list']], // 列表 -- 等额本息
                        list2: [...obj11['list'], ...obj21['list']]  // 列表 -- 等额本金
                    }
                    this.getCaculateInfo(this.toDetail);
                    this.$router.push({path: '/mortgageCaculate/result'});
                }
            }
        },
        activated(){
            $('body,html').addClass('fbfafa').removeClass('origin').removeClass('gray247').removeClass('f7');
            if(!this.$route.meta.isUseCache){
                this.init();
            }
        },
        beforeRouteLeave(to, from, next){
            if(to.path.indexOf('/mortgageCaculate/result')>-1 || to.path.indexOf('/mortgageCaculate/rateTable')>-1 ){
                from.meta.isUseCache = true;
            } else {
                from.meta.isUseCache = false;
            }
            next();
        }
    }
</script>
<style lang="less" scoped>
    @import './caculate.less';
</style>
