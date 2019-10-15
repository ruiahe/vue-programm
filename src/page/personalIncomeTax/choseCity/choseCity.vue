<template>
    <div id="choseCity">
        <wHead :titleJson='titleJson'></wHead>
        <div class="search container">
            <input type="text" placeholder="输入所在城市">
            <i></i>
        </div>
        <div class="history">
            <div class="history-title container">历史选择城市</div>
            <div class="list-con">
                <ul class="list">
                    <li class="center-vh">石家庄</li>
                    <li class="center-vh">上海市</li>
                    <li class="center-vh">呼和浩特市</li>
                    <li class="center-vh">哈尔滨市</li>
                    <li class="center-vh">北京市</li>
                </ul>
            </div>
        </div>
        <ul class="city-list">
            <li class="space-between" @click="link_to('/personalIncomeTax/input')"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
            <li class="space-between"> <span>北京市</span><i></i> </li>
        </ul>
    </div>
</template>
<script> 
    import wHead from '@/page/windowHead/windowHead'
    import $ from 'jquery'
    export default {
        name: 'choseCity',
        components:{
            wHead,
        },
        data(){
            return {
                titleJson:{
                    title: '选择城市',
                    toolBol: false,
                    toolTitle: '',
                    hasRed: false
                }, 
            }
        },
        mounted(){
        },
        methods:{
            // 跳转至其他页面
            link_to(path){
                this.$router.push({
                    path: path, 
                    query:{cityId: 1}
                });
            },
        },
        activated(){
            document.querySelector('body').style='background: rgba(255,255,255,1);';
        }
    }
</script>
<style lang="less" scoped>
    @import './choseCity.less';
</style>
