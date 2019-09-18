<template>
    <div id="selector" class='flex-bottom'>
        <div class="date-box">
            <div class="date-title space-between">
                <i @click="close()">取消</i>
                <span>{{ contentJson["title"]}}</span>
                <strong @click='confirm()'>确定</strong>
            </div>
            <div class="date-swiper-box" v-show='contentJson["type"] == 5'>
                <div class="date-selector space-between">
                    <div class="date-selector-con date-selector5">
                        <swiper :options="selector5" ref="mySwiperSelector1">
                            <swiper-slide v-for="(i,index) in contentJson['arr']" :key='index'>
                                <div class="slide-txt center-vh">{{i}}</div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
            <div class="date-swiper-box type2" v-show='contentJson["type"] == 2'>
                <div class="date-selector space-between">
                    <div class="date-selector-con">
                        <swiper :options="selector2" ref="mySwiperSelector2">
                            <swiper-slide v-for="(i,index) in contentJson['arr']" :key='index'>
                                <div class="slide-txt center-vh">{{i}}</div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import $ from 'jquery'
    export default {
        name: 'scrollSelector',
        components:{
            swiper,
            swiperSlide
        },
        props:{
            contentJson: Object
        },
        data(){
            const _this = this;
            return {
                selector5: {
                    slidesPerView: 5,//每页显示的side个数
                    paginationClickable: true,//是否支持点击
                    spaceBetween: 0,//每个side的距离
                    direction: 'vertical',//是否ֱ垂直居中
                    centeredSlides: true,
                    on: {
                        slideChangeTransitionStart: function(){
                            _this.resetClass(this.activeIndex, 'date-selector5');
                        },
                    },
                },
                selector2: {
                    slidesPerView: 2,//每页显示的side个数
                    paginationClickable: true,//是否支持点击
                    spaceBetween: 0,//每个side的距离
                    direction: 'vertical',//是否ֱ垂直居中
                },
            }
        },
        methods: {
            open(index,setObj){
                var _this = this;
                $('#selector').fadeIn(150);
                this.contentJson = setObj;
                setTimeout(()=>{
                    $('.date-box').slideDown(150)
                    setTimeout(()=>{
                        _this.update_swiper();
                        switch (setObj['type']) {
                            case 5:
                                _this.$refs['mySwiperSelector1'].swiper.slideTo(index,0);
                                break;
                            default:
                                _this.$refs['mySwiperSelector2'].swiper.slideTo(index,0);
                                break;
                        }
                    },200)
                }, 150)
            },
            resetClass(index, className){
                const _this = this;
                var prev20 = index - 2; 
                var prev02 = index + 2; 
                var len = $('.'+className+' .swiper-slide').length;
                $('.'+className+' .swiper-slide').removeClass('swiper-slide-prev-prev');
                $('.'+className+' .swiper-slide').removeClass('swiper-slide-next-next');
                if(prev20 > 0 || prev20 == 0){
                    $($('.'+className+' .swiper-slide')[prev20]).addClass('swiper-slide-prev-prev');
                }
                if(prev02 + 1 < len || prev02 + 1 == len){
                    $($('.'+className+' .swiper-slide')[prev02]).addClass('swiper-slide-next-next');
                }
            },
            close(){
                $('.date-box').slideUp(150);
                setTimeout(()=>{$('#selector').fadeOut(150)},50)
            },
            confirm(){
                const index = this.contentJson['type'] == 5 ? this.$refs['mySwiperSelector1'].swiper.activeIndex : this.$refs['mySwiperSelector2'].swiper.activeIndex;
                this.$emit('date', index);
                this.close();
            },
            update_swiper(){
                const _this = this;
                switch (this.contentJson['type']) {
                    case 5:
                        _this.$refs['mySwiperSelector1'].swiper.update();
                        _this.$refs['mySwiperSelector1'].swiper.updateSize();
                        _this.$refs['mySwiperSelector1'].swiper.updateSlides();
                        break;
                    default:
                        _this.$refs['mySwiperSelector2'].swiper.update();
                        _this.$refs['mySwiperSelector2'].swiper.updateSize();
                        _this.$refs['mySwiperSelector2'].swiper.updateSlides();
                        break;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './scrollSelector.less';
</style>
