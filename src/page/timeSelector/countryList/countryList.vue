<template>
    <div id="countryList">
        <div class="head-top">
            <wHead :titleJson='titleJson'></wHead>
            <div class="search">
                <input class='color245' :class='{"long": searchFocus}' type="text" placeholder="搜索城市或国家名称" @focus="change_focus()" @blur="change_focus()">
            </div>
        </div>
        <div class="head-placeholder"></div>
        <div class="local container">
            <div class="title center-vl">当地时间</div>
            <ul class="local-txt">
                <li class='center-vl'>北京（中国）</li>
            </ul>
        </div>
        <div class="attention-country container">
            <div class="title center-vl">关注国家</div>
            <draggable :options="{draggable:'.item'}"
              v-model="list2"
              @change="change">
                <li v-for="(item, index) in list2" class="item space-between" :key="index">
                    <span>{{item.name}}</span> <i class='i-box'><i></i></i>  
                </li>
          </draggable>
        </div>
        <div class="country-list container">
            <IndexBar :sticky-offset-top='stickyTop'>
                <IndexAnchor index="A" />
                <ul>
                    <li class='space-between'>
                        <span>阿比让（科特迪瓦）</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>啊啊啊啊啊</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>啊撒打发</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>安慰如下</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>啊joie今日分</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="B" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="C" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="D" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="E" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="F" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="G" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="H" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="I" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
                <IndexAnchor index="J" />
                <ul>
                    <li class='space-between'>
                        <span>报价送的肌肤</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把士大夫</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>边为皇后i就是</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>把违法的事</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>北京覅哦就扫i附件</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>被围殴警匪片</span>
                        <strong></strong>
                    </li>
                    <li class='space-between'>
                        <span>巴尔福的色如分手的v</span>
                        <strong></strong>
                    </li>
                </ul>
            </IndexBar>
        </div>
    </div>
</template>
<script> 
    import wHead from '@/page/common/windowHead/windowHead';
    import { IndexBar, IndexAnchor, Cell } from 'vant';
    import draggable from 'vuedraggable';
    import $ from 'jquery';
    export default {
        name: 'choseCity',
        components:{
            wHead,
            IndexBar,
            IndexAnchor,
            Cell,
            draggable
        },
        data(){
            return {
                titleJson:{
                    title: '国家列表',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false,
                }, 
                searchFocus: false,
                stickyTop: 0,
                list2: [
                    {id:1, name: '北京（中国）'},
                    {id:2, name: '华盛顿（美国）'},
                    {id:3, name: '东京（日本）'},
                    {id:4, name: '巴黎（法国）'},
                    {id:5, name: '伦敦（英国）'},
                    {id:6, name: '首尔（韩国）'},
                ]
            }
        },
        mounted(){
            $('body').addClass('origin').removeClass('f7').removeClass('gray247');
            this.stickyTop = $('#header').outerHeight(true) + $('.search').outerHeight(true);
        },
        methods:{
            // 输入时修改样式
            change_focus(){
                this.searchFocus = !this.searchFocus;
            },
            change: function (evt) {
                console.log(evt)
            },
        }
    }
</script>
<style lang="less" scoped>
    @import './countryList.less';
</style>
<style lang="less">
    .van-index-anchor{
        height:55px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:55px;
        padding:0;
        border-bottom:1px solid rgba(225, 225, 225, 0.5);
    }
    .van-index-anchor.van-index-anchor--sticky{
        width:100%;
        padding-left:20px;
    }
</style>
