import {common} from '../js/common.js'
import axios from 'axios'
import $ from 'jquery'
/*
    暴露请求的方法 Request
    url: '请求接口'
    params: 参数
    method: 请求方法
    timeout: 超时时间
    headers: 请求头
*/
var token = common.token;
export function Request(url, params, method, deviceName, appVersion, sucCal, errCal){
    var data = method == 'post' ? JSON.stringify(params) : params;
    var headerJson = {};
    if(token) headerJson['token'] = token;
    if(deviceName) headerJson['Device-Name'] = deviceName;
    if(appVersion) headerJson['App-Version'] = appVersion;
    try{
        $.ajax({
            contentType:"application/json",
            url:(common.domain+url),
            type:method,
            data:data,
            timeout: 5000,
            beforeSend(req){
                if(token) req.setRequestHeader('token',token);
                if(deviceName) req.setRequestHeader('Device-Name', deviceName);
                if(appVersion) req.setRequestHeader('App-Version', appVersion);
            },
            headers: headerJson,
            success(data){
                if(data['code'] == 0) {
                    sucCal(data);
                }else{
                    alert('服务器繁忙，请稍后再试1！')
                }
            },
            error(err){
                alert('服务器繁忙，请稍后再试2！')
                console.log(err)
                errCal(err);
            }
        })
    } catch (err){
        alert('服务器繁忙，请稍后再试3！')
        console.log(err);
    }
    
}