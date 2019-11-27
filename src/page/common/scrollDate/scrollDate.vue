<template>
    <div id="date" class='flex-bottom' @touchmove.prevent>
        <div class="date-box">
            <div class="date-title space-between">
                <i @click="close()">取消</i>
                <span>选择时间</span>
                <strong @click='confirm()'>确定</strong>
            </div>
            <div class="date-swiper-box">
                <div class="date-selector space-between">
                    <div class="date-month-text">月份</div>
                    <div class="date-selector-con date-month center-vl">
                        <div class="date-selector-con-width">
                            <swiper :options="swiperOptionMonth" ref="mySwiperMonth">
                                <swiper-slide v-for="i in 12" :key='i'>
                                    <div class="slide-txt center-v">{{i}}</div>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <div class="date-selector-con date-day center-vr">
                        <div class="date-selector-con-width">
                            <swiper :options="swiperOptionDay" ref="mySwiperDay">
                                <swiper-slide v-for="i in 31" :key='i'>
                                    <div class="slide-txt center-vr">{{i}}</div>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <div class="date-month-text">日期</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import $ from 'jquery'
    import { common } from '../../../common/js/common';
    export default {
        name: 'headerTool',
        components:{
            swiper,
            swiperSlide,
        },
        data(){
            const _this = this;
            return {
                dayNum: 30,
                currentYear: 0,
                currentMonth: 0,
                currentDate: 0,
                swiperOptionMonth: {
                    slidesPerView: 5,//每页显示的side个数
                    paginationClickable: true,//是否支持点击
                    spaceBetween: 0,//每个side的距离
                    direction: 'vertical',//是否ֱ垂直居中
                    centeredSlides: true,
                    on: {
                        slideChangeTransitionStart: function(){
                            _this.resetClass(this.activeIndex, 'date-month', 2);
                        },
                    },
                },
                swiperOptionDay: {
                    slidesPerView: 5,//每页显示的side个数
                    paginationClickable: true,//是否支持点击
                    spaceBetween: 0,//每个side的距离
                    direction: 'vertical',//是否ֱ垂直居中
                    centeredSlides: true,
                    on: {
                        slideChangeTransitionStart: function(){
                            _this.resetClass(this.activeIndex, 'date-day', 3);
                        },
                    },
                },
                scrollSetTimeOut: 1,
                returnDayNum: 30,
                returnName: 'first_repayment_time',
            }
        },
        methods: {
            open(time, txt){
                var _this = this;
                const obj = common.change_to_date(time);
                const indexMonth = common.change_to_date(time).month - 1;
                const indexDay = common.change_to_date(time).day - 1;
                this.returnName = txt;
                $('#date').fadeIn(150)
                setTimeout(()=>{
                    $('.date-box').slideDown(150)
                    _this.update_swiper();
                    setTimeout(()=>{
                        _this.$refs['mySwiperMonth'].swiper.slideTo(indexMonth,0);
                        _this.$refs['mySwiperDay'].swiper.slideTo(indexDay,0);
                    },200)
                }, 150)
            },
            return_day_num(index, type){
                var _this = this;
                if(this.$refs['mySwiperMonth']) var currentMonth = this.$refs['mySwiperMonth'].swiper.activeIndex + 1;
                if(this.$refs['mySwiperDay']) var currentDay = this.$refs['mySwiperDay'].swiper.activeIndex + 1;
                setTimeout(()=>{
                    switch (currentMonth) {
                        case 2:
                            if(currentDay == 30 || currentDay == 31){
                                console.log('这里进入了')
                                _this.$refs['mySwiperDay'].swiper.slideTo(28,0);
                            }
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            if(currentDay == 31){
                                _this.$refs['mySwiperDay'].swiper.slideTo(29,0);
                            }
                            break;
                    }
                },0);
            },
            resetClass(index, className, type){
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
                if(_this.scrollSetTimeOut == 1){
                    _this.return_day_num();
                    _this.scrollSetTimeOut = 0;
                }
                setTimeout(()=>{ _this.scrollSetTimeOut = 1 },500)
            },
            close(){
                $('.date-box').slideUp(150);
                setTimeout(()=>{$('#date').fadeOut(150)},50)
            },
            confirm(){
                const obj = {};
                obj['month'] = this.$refs['mySwiperMonth'].swiper.activeIndex + 1;
                obj['day'] = this.$refs['mySwiperDay'].swiper.activeIndex + 1;
                const time = (new Date('2016/'+obj['month']+'/'+obj['day'])).getTime();
                this.$emit('date',{ 'name': this.returnName, 'result': time });
                this.close();
            },
            update_swiper(){
                this.$refs['mySwiperMonth'].swiper.updateSize();
                this.$refs['mySwiperMonth'].swiper.updateSlides();
                this.$refs['mySwiperDay'].swiper.updateSize();
                this.$refs['mySwiperDay'].swiper.updateSlides();
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './scrollDate.less';
</style>
