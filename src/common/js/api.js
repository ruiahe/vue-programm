import {common} from '../js/common.js'
import $ from 'jquery'
/*
    暴露请求的方法 Request
    url: '请求接口'
    params: 参数
    method: 请求方法
    timeout: 超时时间
    headers: 请求头
*/
let info = null;
let token = null;
export function Request(url, params, method, deviceName, appVersion, sucCal, errCal){
    info = getInfo();
    if(info){
        req(url, params, method, deviceName, appVersion, sucCal, errCal);
    } else {
        setTime(()=>{
            req(url, params, method, deviceName, appVersion, sucCal, errCal);
        })
    }
}
function setTime(calSuc){
    var info = getInfo();
    var time = setTimeout(()=>{
        if(info) {
            calSuc(info);
            clearTimeout(time);
        } else {
            setTime();
        }
    }, 500);
}
function req(url, params, method, deviceName, appVersion, sucCal, errCal){
    info = getInfo();
    token = JSON.parse(info)['token'];//app
    // token = info['token'];//js
    var data = method == 'post' ? JSON.stringify(params) : params;
    var headerJson = {};
    // if(token) headerJson['token'] = token;
    // if(deviceName) {
    //     headerJson['Device-Name'] = info['device'];
    //     headerJson['App-Version'] = info['version'];
    // }
    if(deviceName) headerJson['Device-Name'] = JSON.parse(info)['device'];//app
    if(appVersion) headerJson['App-Version'] = JSON.parse(info)['version'];//app
    try{
        $.ajax({
            contentType:"application/json",
            url:(common.domain+url),
            type:method,
            data:data,
            timeout: 5000,
            beforeSend(req){
                if(token) req.setRequestHeader('token',token);
                if(deviceName) req.setRequestHeader('Device-Name', headerJson['Device-Name']);
                if(appVersion) req.setRequestHeader('App-Version', headerJson['App-Version']);
            },
            success(data){
                if(data['code'] == 0) {
                    sucCal(data);
                } else if (data['code'] == 1006 || data['1011'] || data['1012']){
                    window.localStorage.setItem('token',false);
                    window.webkit.messageHandlers.linkTo.postMessage({'methodName': 'login'});
                }
            },
            error(err){
                common.show_weakTip('服务器正忙，请稍后再试');
            }
        })
    } catch (err){
        common.show_weakTip('服务器正忙，请稍后再试');
    }
}
function getInfo(){
    var info = window.localStorage.getItem('infJson');
    // var info = { 'token': common.token, 'device': 'asdf', 'version': '2.2.2' };//js
    return info;
}