<template>
    <div id="feedback">
        <headerTool ref='headerTool' :titleJson='titleJson'></headerTool>
        <div class="box">
            <div class="list" v-for='(item,index) in list' :key="index" v-on:click='link_to("/statementList", item.id, item.title)'>
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
<script src='./feedbackToDiscuss.js'></script>
<style lang="less" scoped>
  @import './feedbackToDiscuss.less';
</style>
