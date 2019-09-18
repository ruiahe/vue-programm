<template>
<!-- 
  配置信息：
    title: 配置导航文案;
    toolBol: 配置右侧是否有工具,默认为否;
    toolTitle: 配置右侧工具文案;
    hasRed: 配置右侧工具是否有红点;
    url: 配置右侧工具跳转链接;
 -->
    <div id="swiper" class='center-vh' @touchmove.prevent>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(i, index) in imgsList" :key="index">
                <div class="slide-img center-vh">
                    <div class="slide-img-box center-vh swiper-zoom-container">
                        <img :src="i.img" alt="" @click.stop='close()'>   
                    </div>
                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import $ from 'jquery'
    export default {
        name: 'headerTool',
        components:{
            swiper,
            swiperSlide
        },
        props:{
            imgsList: Array
        },
        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        data(){
            return {
                pageNum: null,
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                    height: 300,
                    zoom : true,
                }
            }
        },
        methods: {
            close(){
                $('#swiper').fadeOut(100);
                document.querySelector('body').style='background: linear-gradient(#F7F7F7 95%, #fff 100%);';
            },
            show(index){
                $('#swiper').fadeIn(100);
                document.querySelector('body').style='background: #000;';
                this.swiper.slideTo(index, 0, false);
            },

        }
    }
</script>
<style lang="less" scoped>
  @import './swiper.less';
</style>
