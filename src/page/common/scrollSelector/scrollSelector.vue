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
                                <div class="slide-txt center-vh">{{i.name}}</div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
            <div class="date-swiper-box type2" v-show='contentJson["type"] == 2'>
                <div class="date-selector space-between">
                    <div class="date-selector-con date-selector2">
                        <swiper :options="selector2" ref="mySwiperSelector2">
                            <swiper-slide v-for="(i,index) in contentJson['arr']" :key='index'>
                                <div class="slide-txt center-vh">{{i.name}}</div>
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
                    on: {
                        slideChangeTransitionStart: function(){
                            _this.resetClass(this.activeIndex, 'date-selector2');
                        },
                    },
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
                        _this.update_swiper(()=>{
                            _this.$refs[_this.match_swiper(this.contentJson['type'])].swiper.slideTo(index,0);
                        });
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
                const obj = {};
                const index = this.contentJson['type'] == 5 ? this.$refs['mySwiperSelector1'].swiper.activeIndex : this.$refs['mySwiperSelector2'].swiper.activeIndex;
                obj['index'] = index;
                obj['arr'] = this.contentJson['arr'];
                obj['name'] = this.contentJson['name'];
                this.$emit('confirm_selector', obj);
                this.close();
            },
            update_swiper(calsucc){
                const _this = this;
                const name = _this.match_swiper(this.contentJson['type']);
                _this.$refs[name].swiper.update();
                _this.$refs[name].swiper.updateSize();
                _this.$refs[name].swiper.updateSlides();
                calsucc();
            },
            match_swiper(type){
                let name = '';
                switch (this.contentJson['type']) {
                    case 5:
                        name = 'mySwiperSelector1';
                        break;
                    default:
                        name = 'mySwiperSelector2';
                        break;
                }
                return name;
            }
        }
    }
</script>
<style lang="less" scoped>
  @import './scrollSelector.less';
</style>
