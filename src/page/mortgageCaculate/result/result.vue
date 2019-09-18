<template>
    <div id="cacultResult">
        <head class="space-between">
            <i @click="back_to()"></i>
            <div class="top-box space-between">
                <div class="top" @click="change_tab('left',$event)">等额本息</div>
                <div class="top" @click="change_tab('right',$event)">等额本金</div>
            </div>
            <span></span>
        </head>
        <div class="show1-container">
            <ul class="show1 flex-wrap container">
                <li v-for='(i,index) in arr' :key='index' :class="{'center-vh': (index == 1||index == 4),'center-h':(index == 0||index == 3),'center-vr':(index == 2||index == 5)}">
                    <div class="show1-box">
                        <div class="show1-top">{{i}}</div>
                        <div class="show1-bottom">{{arr2[index]}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <table>
            <tr>
                <td>期数</td>
                <td>月供</td>
                <td>本金</td>
                <td>利息</td>
                <td>剩余本金</td>
            </tr>
            <tr>
                <td>1</td>
                <td>12078.87</td>
                <td>12078.87.87</td>
                <td>12078.87</td>
                <td>12078.87</td>
            </tr>
            <tr>
                <td>2</td>
                <td>12078.87</td>
                <td>12078.87.87</td>
                <td>12078.87</td>
                <td>12078.87</td>
            </tr>
            <tr>
                <td>3</td>
                <td>12078.87</td>
                <td>12078.87.87</td>
                <td>12078.87</td>
                <td>12078.87</td>
            </tr>
            <tr>
                <td>4</td>
                <td>12078.87</td>
                <td>12078.87.87</td>
                <td>12078.87</td>
                <td>12078.87</td>
            </tr>
            <tr>
                <td>5</td>
                <td>12078.87</td>
                <td>12078.87.87</td>
                <td>12078.87</td>
                <td>12078.87</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {common} from '@/common/js/common'
    export default {
        name: 'caculate',
        components:{
        },
        data() {
            return {
                arr: ['房价总款', '首付', '贷款总额', '还款总款', '利息', '还款月数' ],
                arr2: ['200万', '200万', '200万', '200万', '200万', '200万']
            }
        },
        methods:{
            // 切换tab标签
            change_tab(txt,e){
                switch (txt) {
                    case 'left':
                        $(e.target).parents('.top-box').removeClass('right');
                        break;
                    default:
                        $(e.target).parents('.top-box').removeClass('left');
                        $(e.target).parents('.top-box').addClass('right');
                        break;
                }
            },
            // 返回上一页
            back_to(){
                console.log('asdjfiojoi')
                var bol = this.$route.path.indexOf('feed') > -1;
                common.back(bol);
            },
        },
        beforeCreate(){
            document.querySelector('body').style='background: linear-gradient(rgba(245,245,245,1) 95%, #fff 100%);';
        }
    }
</script>
<style lang="less" scoped>
    @import './result.less';
</style>
