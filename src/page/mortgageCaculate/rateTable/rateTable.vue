<template>
    <div id="rateTable">
        <wHead :titleJson='titleJson'></wHead>
        <div class="box1 center-vh">
            <span>采取央行2015年10月24日最新基准利率</span>
        </div>
        <div class="box container">
            <div class="title">贷款基准利率:</div>
            <table>
                <tr>
                    <td class='col1'>期限</td>
                    <td class='col2'>年利率</td>
                </tr>
                <tr>
                    <td class='col1'>1年以内(含1年)</td>
                    <td class='col2 green'>4.35%</td>
                </tr>
                <tr>
                    <td class='col1'>1年到5年(含5年)</td>
                    <td class='col2 green'>4.75%</td>
                </tr>
                <tr>
                    <td class='col1'>5年以上</td>
                    <td class='col2 green'>4.90%</td>
                </tr>
            </table>
            <div class="content">
                以上为央行公布的贷款基准利率，房贷以此为基准上浮或下调。消费、经营贷款各银行利率差异很大，但是一般不会超过5年期利率的4倍。
            </div>
        </div>
        <div class="box container">
            <div class="title">公积金贷款基准利率:</div>
            <table>
                <tr>
                    <td class='col1'>期限</td>
                    <td class='col2'>年利率</td>
                </tr>
                <tr>
                    <td class='col1'>1年到5年(含5年)</td>
                    <td class='col2 green'>2.75%</td>
                </tr>
                <tr>
                    <td class='col1'>5年以上</td>
                    <td class='col2 green'>3.25%</td>
                </tr>
            </table>
            <div class="content">
                以上为央行公布的公积金贷款基准利率，公积金贷款只能用于房贷，各地会根据当地政策对利率进行上浮或下调。
            </div>
        </div>
    </div>
</template>
<script>
    import wHead from '@/page/windowHead/windowHead'
    // import scrollSelector from '@/page/common/scrollSelector/scrollSelector'
    // import $ from 'jquery'
    export default {
        name: 'rateTable',
        components:{
            wHead,
        },
        data() {
            return {
                titleJson:{
                    title: '利率表',
                    toolBol: true,
                    toolTitle: '',
                    hasRed: false,
                    close: true
                },
            }
        },
        methods:{
        },
    }
</script>
<style lang="less" scoped>
    @import './rateTable.less';
</style>
