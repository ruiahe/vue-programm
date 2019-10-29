<template>
    <div id="timeSelectorIndex">
        <div class="top">
            <wHead :titleJson='titleJson'></wHead>
            <div class="top-nav">
                <ul class="nav space-between">
                    <li>间隔计算</li>
                    <li>日期推算</li>
                    <li>世界时间</li>
                    <li>闰年计算</li>
                    <li>生肖星座</li>
                </ul>
            </div>
        </div>
        时间计算器
    </div>
</template>
<script>
    import wHead from '@/page/common/windowHead/windowHead'
    import $ from 'jquery'
    export default {
        name: 'timeSelectorIndex',
        components:{
            wHead
        },
        data(){
            return {
                titleJson:{
                    title: '时间计算器',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                },
            }
        },
        methods:{
        },
        activated(){
            $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
        },
        mounted(){
            $('body,html').addClass('gray245').removeClass('origin').removeClass('gray247').removeClass('f7').removeClass('fbfafa');
        }
    }
</script>
<style lang="less" scoped>
    @import './index.less';
</style>
