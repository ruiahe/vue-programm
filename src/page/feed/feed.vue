<template>
    <div id="feedback">
        <wHead :titleJson='titleJson'></wHead>
        <div class="box">
            <div class="list" v-for='(item,index) in list' :key="index" v-on:click='link_to("/list", item.id, item.title)'>
                <div class="list-box">
                    <div class='space-between'>
                        <div class='list-title'>{{item.title}}</div>
                        <div class='list-participants'>{{item.peoNum}}人参与</div>
                    </div>
                    <div class='list-statement'>{{item.discuss}} 条发言</div>
                    <div class='list-content space-between'>
                        <div class="content-img"><img src="../../assets/statement/pic_touxiang.png" alt=""></div>
                        <div class="content-txt">{{item.content}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import wHead from '../windowHead/windowHead'
    export default {
        name: 'Feed',
        data () {
            return {
                list: [],
                titleJson:{
                    title: '反馈讨论',
                    url: '/myMessage',
                    toolBol: true,
                    toolTitle: '消息',
                    hasRed: true,
                }
            }
        },
        components:{
            wHead
        },
        methods:{
            link_to(url, id, title){
            this.$router.push({
                path: url, 
                query:{id: id, title: title}
            });
            }
        },
        beforeCreate(){
            document.querySelector('body').style = 'background:#F7F7F7';
        },
        mounted() {
            this.list = [
            { id:0, title: '#来点建议', imgSrc: '/static/images/pic_touxiang.png', peoNum: 188, discuss: 389, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
            { id:1, title: '#Bug反馈', imgSrc: '/static/images/pic_touxiang.png', peoNum: 2898, discuss: 6895, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
            { id:2, title: '#我要新功能', imgSrc: '/static/images/pic_touxiang.png', peoNum: 95, discuss: 586, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
            { id:3, title: '#我与探记的故事 投稿', imgSrc: '/static/images/pic_touxiang.png', peoNum: 368, discuss: 76, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
            ]
        }
    }
</script>
<style lang="less" scoped>
  @import './feed.less';
</style>
