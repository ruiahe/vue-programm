<template>
    <div id="incomeDetail">
        <div class="top-head">
            <wHead :titleJson='titleJson'></wHead>
        </div>
        <div class="table-con">
            <table>
                <tr>
                    <td><div class="center-vh">月份</div></td>
                    <td><div class="center-vh">税前</div></td>
                    <td><div class="center-vh">当月个税</div></td>
                    <td><div class="center-vh">税后收入</div></td>
                </tr>
                <tr>
                    <td><div class="center-vh">1</div></td>
                    <td><div class="center-vh">10000</div></td>
                    <td><div class="center-vh">97.5</div></td>
                    <td><div class="center-vh">8152.5</div></td>
                </tr>
                <tr>
                    <td><div class="center-vh">1</div></td>
                    <td><div class="center-vh">10000</div></td>
                    <td><div class="center-vh">97.5</div></td>
                    <td><div class="center-vh">8152.5</div></td>
                </tr>
                <tr>
                    <td><div class="center-vh">1</div></td>
                    <td><div class="center-vh">10000</div></td>
                    <td><div class="center-vh">97.5</div></td>
                    <td><div class="center-vh">8152.5</div></td>
                </tr>
                <tr>
                    <td><div class="center-vh">1</div></td>
                    <td><div class="center-vh">10000</div></td>
                    <td><div class="center-vh">97.5</div></td>
                    <td><div class="center-vh">8152.5</div></td>
                </tr>
                <tr>
                    <td><div class="center-vh">1</div></td>
                    <td><div class="center-vh">10000</div></td>
                    <td><div class="center-vh">97.5</div></td>
                    <td><div class="center-vh">8152.5</div></td>
                </tr>
            </table>
            <div class="tip" @click="showDetail = !showDetail">
                计算结果仅供参考
                <strong class="center-vh">?</strong>
            </div>
            <div class="detail" v-if='showDetail'>
                <div>说明：</div>
                <div>税后工资+税前-当月五险一金（个人缴纳部分）当月五险一金（个人缴纳部分）=xx元</div>
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
            document.querySelector('body').style='background:rgba(249,249,249,1);';
        },
        methods:{
        },
        activated(){
            document.querySelector('body').style='background:rgba(249,249,249,1);';
        }
    }
</script>
<style lang="less" scoped>
    @import './incomeDetail.less';
</style>
