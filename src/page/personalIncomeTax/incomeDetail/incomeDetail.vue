<template>
    <div id="incomeDetail">
        <div class="top-head">
            <wHead :titleJson='titleJson'></wHead>
        </div>
        <div class="table-con">
            <table v-if='transfer'>
                <tr>
                    <td><div class="center-vh">月份</div></td>
                    <td><div class="center-vh">税前</div></td>
                    <td><div class="center-vh">当月个税</div></td>
                    <td><div class="center-vh">税后收入</div></td>
                </tr>
                <tr v-for="(i,index) in transfer" :key="index">
                    <td><div class="center-vh">{{index}}</div></td>
                    <td><div class="center-vh" v-if='i.before'>{{i.before}}</div></td>
                    <td><div class="center-vh" v-if='i.tax'>{{i.tax}}</div></td>
                    <td><div class="center-vh" v-if='i.fiveTax'>{{i.before - i.tax - i.fiveTax}}</div></td>
                </tr>
            </table>
            <div class="tip" @click="showDetail = !showDetail">
                计算结果仅供参考
                <strong class="center-vh">?</strong>
            </div>
            <div class="detail" v-if='showDetail'>
                <div>说明：</div>
                <div>税后收入 = 税前 - 当月个税 - 当月五险一金（个人缴纳部分）</div>
                <div>当月五险一金（个人缴纳部分）= {{transfer[0].fiveTax}}元</div>
            </div>
        </div>
    </div>
</template>
<script> 
    import wHead from '@/page/windowHead/windowHead'
    import $ from 'jquery'
    export default {
        name: 'incomeDetail',
        components:{
            wHead,
        },
        data(){
            return {
                transfer: null,
                showDetail: false,
                titleJson:{
                    title: '每月收入明细',
                    toolBol: true,
                    toolTitle: '',
                    hasRed: false,
                    close: true
                },
            }
        },
        mounted(){
            this.transfer = this.$store.state.caculateTax['result']['detail'];
            document.querySelector('body').style='background:rgba(249,249,249,1);';
        },
        methods:{
        }
    }
</script>
<style lang="less" scoped>
    @import './incomeDetail.less';
</style>
