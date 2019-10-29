import $ from 'jquery'
// 设置info信息
export const common = {
    // 返回上一页
    back: function(bol){
        if (bol) {
            common.link_to_app({
                "methodName": "back"
            });
        }else {
            window.history.go(-1);
        }
    },
    // 跳转到app
    link_to_app(obj){
        if(common.isAndroid()){
            window.Android.linkTo(JSON.stringify(obj));
        }else{
            window.webkit.messageHandlers.linkTo.postMessage(obj);
        }
    },
    // 转换json字符串
    change_type(jsonStr){
        return JSON.parse(jsonStr);
    },
    // 弱提示(展示文本)
    show_weakTip(txt){
        $('.weakTip').html(txt).fadeIn(0);
        setTimeout(() => {
            $('.weakTip').fadeOut(1000);
        }, 2000)
    },
    // 时间戳获取日期、时间
    change_to_date(t){
        var get_y = new Date(t).getFullYear();
        var get_mon = new Date(t).getMonth() + 1;
        var get_d = new Date(t).getDate();
        var get_h = new Date(t).getHours();
        var get_m = new Date(t).getMinutes();
        var get_s = new Date(t).getSeconds();
        var y = get_y > 9 ? get_y : '0' + get_y; 
        var mon = get_mon > 9 ? get_mon : '0' + get_mon; 
        var d = get_d > 9 ? get_d : '0' + get_d; 
        var h = get_h > 9 ? get_h : '0' + get_h; 
        var m = get_m > 9 ? get_m : '0'+ get_m; 
        var s = get_s > 9 ? get_s : '0'+ get_s; 
        var obj = {
            'year': y,
            'month': mon,
            'day': d,
            'hour': h,
            'minutes': m,
            'seconds': s
        }
        return obj;
    },
    // 判断是否是安卓
    isAndroid(){
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            return true;
        }
        return false;
    },
    // 判断是否是ios
    isIos(){
        var u = navigator.userAgent;
        if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
            return true;
        }
        return false;
    },
    // 格式化数据（保留2位小数，若为整数则添加2个0)
    format_number(num){
        return (Math.round(num*100)/100).toFixed(2);
    }
}