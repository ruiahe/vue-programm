import config from '../json/config.json'
import $ from 'jquery'
const token1 = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMjQiLCJpYXQiOjE1NjU2NjQ2MTEsInN1YiI6IjMyNCIsImlzcyI6InRhbmtlIiwiZXhwIjoxNTY4MjU2NjExfQ.kAfzIp_SnJpo-J2GJOxrcJ-Dtjf9fcAXbzRhm6iLcdw';
// const token2 = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NzUiLCJpYXQiOjE1NjU3OTMzMTQsInN1YiI6IjQ3NSIsImlzcyI6InRhbmtlIiwiZXhwIjoxNTY4Mzg1MzE0fQ.oTNKmwlMFfd3zHAKzj4qBNMHgvXczmtVfvV_xALKPfI'
// 设置info信息
export const common = {
    token: token1,
    domain: getDomain(),
    back: function(bol){
        if (bol) {
            common.link_to_app({
                "methodName": "back"
            });
        }else {
            window.history.go(-1);
        }
    },
    link_to_app(obj){
        if(isAndroid()){
            window.Android.linkTo(JSON.stringify(obj));
        }else if(isIos()){
            window.webkit.messageHandlers.linkTo.postMessage(obj);
        }
    },
    // 转换json字符串
    change_type(jsonStr){
        return JSON.parse(jsonStr);
    },
    // 弱提示(展示文本)
    show_weakTip(txt){
        $('.weakTip').html(txt).fadeIn(1000);
        setTimeout(() => {
            $('.weakTip').fadeOut(1000);
        }, 2000)
    },
    // app获取手机信息
    getInfo(){
        var info;
        if(isAndroid()){
            info = window.Android.getInfo();
            window.localStorage.setItem('infJson', info);
        } else if(isIos()){
            window.webkit.messageHandlers.linkTo.postMessage({'methodName': 'getInfo'});
        }
    }
}
// domain: fomal => 正式; beta => 测试; local => 本地; 
function getDomain(){
    var domain;
    switch(config.domain) {
        case 'formal':
            domain = 'http://www.36jiapp.com:8080/core/';
            break;
        case 'beta':
            domain = 'http://test.36jiapp.com:8080/';
            break;
        case 'local':
            domain = 'http://192.168.0.148:8080/';
            break;
    }
    return domain;
}
// 判断安卓
function isAndroid(){
    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        return true;
    }
    return false;
}
// 判断设备为 ios
function isIos(){
    var u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
    }
    return false;
}