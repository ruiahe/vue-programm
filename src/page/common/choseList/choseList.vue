<template>
    <div id="choseList" @touchmove.prevent>
        <div class="choseListContent flex-bottom">
            <section>
                <div class='center-vh'>{{choseList['title']}}</div>
                <ul>
                    <li class='center-vh' @click="chose(i)" v-for="(i,index) in choseList['list']" :key="index">{{i}}</li>
                </ul>
                <button class='center-vh' @click="close">取消</button>
            </section>
        </div>
    </div>
</template>
<script> 
    import $ from 'jquery'
    export default {
        name: 'choseList',
        mounted(){
        },
        props:{
            choseList:null
        },
        methods:{
            // 打开时间选择列表
            open(){
                $('#choseList').fadeIn(200);
                setTimeout(()=>{
                    $('#choseList section').slideDown(200);
                },200)
            },
            // 关闭时间选择列表
            close(){
                $('#choseList section').slideUp(200);
                setTimeout(()=>{
                    $('#choseList').fadeOut(200);
                },200)
            },
            // 选择
            chose(item){
                this.$emit('returnConfirm',item);
                this.close();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './choseList.less';
</style>
