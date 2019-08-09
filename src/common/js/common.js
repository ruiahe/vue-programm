import config from '../json/config.json'
export const common = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzQiLCJpYXQiOjE1NjUzMzA4MDksInN1YiI6IjI3NCIsImlzcyI6InRhbmtlIiwiZXhwIjoxNTY3OTIyODA5fQ.WwmLyxKttyAf9hw8biLnQkR0R1e9CQm9TB89fWvZ-p4',
    domain: getDomain(),
    back: function(){
        // alert(document.referrer);
        // if(document.referrer){
            // alert(1)
            window.history.go(-1);
        // }else {
            // alert(2)
        // }
    },
    link_to_app(obj){
        alert('马上要跳转拉！');
        alert(1)
        alert(obj['titleId'])
        alert(obj['methodName'])
        // if(window.webkit.messageHandlers){
            window.webkit.messageHandlers.linkTo.postMessage(obj);
        // } else {
        //     alert('不是app内部跳转，需要跳转到下载');
            // window.location.href=getDownLoadUrl();
        // }
    },
    // 转换json字符串
    change_type(jsonStr){
        return JSON.parse(jsonStr);
    },
    // 设备信息
    jsonInfo: {}
}
// domain: beta => 测试；local => 本地； 
function getDomain(){
    var domain = config.domain == 'beta' ? 'http://test.36jiapp.com:8080/' : (config.domain == 'local' ? 'http://192.168.0.148:8080/' : '正式库域名');
    return domain;
}