<template>
    <div id="detail" v-cloak>
        <wHead :titleJson='titleJson' @emitClick='complaint'></wHead>
        <div class="fix">
            <div class="detail">
                <div class="detail-top space-between container">
                    <div class="detail-img">
                        <img :src="makeStatement.uimg" alt="">
                    </div>
                    <div class="detail-inf">
                        <div class="detail-name">{{makeStatement['nickname']}}</div>
                        <div class="detail-time">{{makeStatement['replyDatetime']}}</div>
                    </div>
                    <div class="detail-version">
                        <div class="detail-txt center-vr">
                            <img src="../../assets/statement/phone.png" alt="">
                            <span>{{makeStatement['deviceOsVersion']}} {{makeStatement['appVersion']}}</span>
                        </div>
                        <div class="detail-blank"></div>
                    </div>
                </div>
                <div class="detail-middle container">{{makeStatement['replyContent']}}</div>
                <div class="detail-bottom" v-if="makeStatement['replyImg']">
                    <div class="bottom-img" v-for="(img, ind) in makeStatement['replyImg']" :key='ind'  :style="{ 'background-image': 'url('+img.img+')'}" @click.stop="show_big_img(makeStatement['replyImg'], ind)"> 
                        <!-- <img :src="img.img" alt="">  -->
                    </div>
                </div>
            </div>
            <div class="gray-box"></div>
            <div class="list" v-if="makeStatement['dataList']">
                <div class="container">
                    <div class="item between" v-for="(item, index) in makeStatement['dataList']" :key='index'>
                        <div class="item-tx">
                            <img :src="item.uimg" alt="">
                        </div>
                        <div class="item-con">
                            <div class="item-info space-between">
                                <div class="item-info-left">
                                    <div class="item-name">{{item.nickname}}</div>
                                    <div class="item-time">{{item.replyDatetime}}</div>
                                </div>
                                <div class="item-info-right  center-vh" :class="{'animate': item.animate}">
                                    <img class='' src="../../assets/statement/discuss.png" alt="" @click.stop="show_input(item, false)">
                                    <strong>{{item.replyCount>0?item.replyCount:''}}</strong>
                                    <span class='center-v' @click.stop='give_up(index,item)'>
                                        <i class="img" :class="{'isUp':item.isUp}"></i>
                                        <span class="giveLike" :class='{"like": item.isUp}'>{{item.upCount>0?item.upCount:''}}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="item-content" @touchstart="touch_start(item,$event)" @touchmove="touch_move()" @touchend="touch_end()">
                                {{item.replyContent}}
                            </div>
                            <div class="item-gray" v-if="item.replyModelDataList.length > 0">
                                <div class="gray-list" v-for="(it, ind) in item.replyModelDataList" :key='ind' @click.stop="is_self(it, false)"><span>{{it.replyer}}</span>回复<span>{{it.responser}}</span>：{{it.content}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-box">
                <div class="container space-between">
                    <span class="bottom-input space-between">
                        <img src="../../assets/takeComment.png" alt="">
                        <input type="text" placeholder="评论点什么" readonly @click.stop='show_input(detailId, true)'>
                    </span>
                    <span class='bottom-up' :class="{'animate': makeStatement['animate'], 'isUp': makeStatement['isUp']}" @click.stop='give_up("bottom",makeStatement["id"], makeStatement["isUp"], true)'>
                        <i></i>
                        <span class="bottom-up-txt">{{makeStatement['upCount']>0?makeStatement['upCount']:''}}</span>
                    </span>
                </div>
            </div>
        </div>
        <!-- 阴影加弹框  （评论弹框） -->
        <popCommit ref='popCommit' :operaId='operaId' @refresh='commit_update'></popCommit>
        <!-- 强提示弹框 -->
        <strongTip ref='strongTip' :showStronTip = 'showStrongTip' :chosenItem = 'chosenItem' @delete_suc='delete_suc'></strongTip>
        <!-- 阴影加弹框 （举报&删除&排序） -->
        <pop :clickKind = 'clickKind' :chosenItem = 'chosenItem' @delete_current='delete_current'></pop>
        <!-- 弱提示 -->
        <span class="weakTip"></span>
        <!-- 图片轮播 -->
        <swiper :imgsList = "imgsList" ref='swiperImgs'></swiper>
    </div>
</template>
<script>
    import $ from 'jquery';
    import wHead from '../windowHead/windowHead';
    import { common } from '../../common/js/common';
    import strongTip from '@/page/common/strongTip/strongTip';
    import pop from '@/page/common/pop/pop'
    import popCommit from '@/page/common/popComment/popComment'
    import swiper from '@/page/common/swiper/swiper'
    import { queryForumReplyInfo, upReply } from '@/common/js/myApi'
    export default {
        name: 'detail',
        components:{
            wHead,
            strongTip,
            pop,
            popCommit,
            swiper
        },
        data() {
            return {
                detailId: 0,
                titleJson:{
                    title: '发言详情',
                    toolBol: true,
                    toolTitle: '···',
                    hasRed: false,
                },
                makeStatement: {},
                clickKind: '',
                operaId: {},
                chosenItem: null,
                showStrongTip: false,
                imgsList: [],
                timeout: 0,
                isSpeak: false,
                saveJson: {}
            }
        },
        mounted () {
            this.detailId = this.$route.query.id;
            this.saveJson['index'] = this.$route.query.index;
            this.getData();
        },
        methods:{
            // 打开发言框
            show_input(item, bol){
                this.isSpeak = bol;
                this.operaId = bol ? item : item.id;
                this.$refs['popCommit'].show_input(item.nickname?item.nickname:(item.replyer?item.replyer:false));
            },
            // 获取数据
            getData(){
                var _this = this;
                queryForumReplyInfo({"titleId":_this.detailId},(data) => {
                    _this.$nextTick(()=>{
                        _this.makeStatement = data['data'];
                        _this.saveJson['replyCount'] = data['data']['replyCount'];
                    })
                })
            },
            // 删除数据后弱提示
            delete_suc(){
                common.show_weakTip('删除成功');
                this.getData();
            },
            // 判断是打开评论弹框还是删除并执行对应方法
            is_self(item,bol){
                this.chosenItem = item;
                if(!item.isSelf){
                    this.show_input(item, bol);
                } else {
                    this.show_opera(false);
                }
            },
            // 展示删除强提示框
            show_opera(txt){
                this.$refs['strongTip'].show_opera(txt?txt:false);
            },
            // 点赞和取消点赞
            give_up(index,item, isUp, bol){
                var _this = this;
                var id = bol ? item : item.id;
                var up = bol ? isUp : item.isUp;
                upReply({ "titleId": id, "isUp": !up }, (data) => {
                    _this.$nextTick(function(){
                        if(index != 'bottom'){
                            _this.makeStatement['dataList'][index]['upCount'] = data['data']['upCount'];
                            if(!up){
                                _this.makeStatement['dataList'][index]['animate'] = true;
                                setTimeout(function(){
                                    _this.makeStatement['dataList'][index]['isUp'] = !up;
                                    _this.makeStatement['dataList'][index]['animate'] = false;
                                },1000);
                            } else {
                                _this.makeStatement['dataList'][index]['isUp'] = !up;
                            }
                        } else {
                            _this.makeStatement['upCount'] = data['data']['upCount'];
                            _this.saveJson['isUp'] = [true,!up];
                            _this.saveJson['upCount'] = data['data']['upCount'];
                            if(!up){
                                _this.makeStatement['animate'] = true;
                                setTimeout(function(){
                                    _this.makeStatement['isUp'] = !up;
                                    _this.makeStatement['animate'] = false;
                                },1000);
                            } else {
                                _this.makeStatement['isUp'] = !up;
                            }
                        }
                    });
                })
            },
            // 打开举报遮罩（有可能是举报有可能是删除）
            complaint(e){
                this.chosenItem = {'id': this.detailId};
                const x = e.target.getBoundingClientRect().left - 79;
                const y = e.target.getBoundingClientRect().top + 24;
                if (this.makeStatement['isSelf']) {
                    this.clickKind = 'list-tip-del';
                    pop.methods.pop_position(x, y, '#pop .list-tip-del',true);
                } else {
                    this.clickKind = 'list-tip-complaint';
                    pop.methods.pop_position(x, y, '#pop .list-tip-complaint',true);
                }
            },
            // 删除当前数据
            delete_current(){
                common.back();
            },
            // 放大图片
            show_big_img(list, index){
                this.imgsList = list;
                this.$refs['swiperImgs'].show(index);
            },
            // 长按 -- 触发
            touch_start(item, e){
                if(item.isSelf) {
                    e.preventDefault();
                    var _this = this;
                    this.timeout = 0;
                    this.timeout = setTimeout(function(){
                        _this.chosenItem = item;
                        _this.show_opera('是否删除您的评论');
                    },600)
                }
            },
            // 长按 -- 移动
            touch_move(){
                clearTimeout(this.timeout);
                this.timeout = 0;
            },
            // 长按 -- 结束
            touch_end(){
                var _this = this;
                clearTimeout(_this.timeout);
            },
            // 判断是回复还是评论，如果是评论则保存评论数据提供给list使用并更新数据，如果是回复则仅更新数据
            commit_update(data){
                if(this.isSpeak){
                    this.saveJson['replyCount'] = data['data']['replyCount'];
                } else {
                    this.saveJson['replyCount'] = false;
                }
                this.getData();
            }
        },
        beforeCreate(){
            document.querySelector('body').style='background: linear-gradient(#F7F7F7 95%, #fff 100%);';
        },
        beforeRouteLeave(to, from, next){
            if(to.path.indexOf('/list')>-1){
                window.localStorage.setItem('listInfo', JSON.stringify(this.saveJson));
            } else {
                window.localStorage.setItem('listInfo', false);
            }
            next();
        }
    }
</script>
<style lang="less" scoped>
  @import './detail.less';
</style>
