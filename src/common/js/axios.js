/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import store from '@/store/index'
import { common } from '@/common/js/common';
// 设置请求超时
const post_obj = {};
const formal_host = 'http://www.36jiapp.com:8080/core';
const beta_host = 'http://test.36jiapp.com:8080';
export let set_post_bol = false; // 判断是否已经设置了请求头 && 暴露的变量（为方便不需要设置请求头的接口使用）
export let type = {"Content-Type": "application/json;charset=UTF-8"};
axios.defaults.timeout = 10000;
// post请求头设置
export function set_headers(){
    if (store.state.appInfo.token){
        set_post_bol = true;
        post_obj['token'] = store.state.appInfo.token;
    }
    if (store.state.appInfo.deviceName){
        post_obj['Device-Name'] = store.state.appInfo.deviceName;
    }
    if (store.state.appInfo.appVersion){
        post_obj['App-Version'] = store.state.appInfo.appVersion;
    }
    axios.defaults.headers = { 
        ...post_obj,
        ...type
    }
}
/*
    get请求
    参数：url => 请求链接， params => 传参，callbackSuc => 成功回调， reset_headers => 是否需要重置请求头，reset_host => 是否需要重置域名
*/
export function get(url, params, calbackSuc, reset_headers, reset_host){
    if(!no_token && set_post_bol){
        return net_result(url, params, calbackSuc, reset_headers, reset_host);
    } else {
        setTime(()=>{
            return net_result(url, params, calbackSuc, reset_headers, reset_host);
        });
    }
}
/* 
    post请求
    参数：url => 请求链接， params => 传参，callbackSuc => 成功回调， reset_headers => 是否需要重置请求头，reset_host => 是否需要重置域名
*/
export function post(url, params, calbackSuc, reset_headers, reset_host) {
    if(set_post_bol){
        return net_result(url, params, calbackSuc, reset_headers, reset_host);
    } else {
        setTime(()=>{
            return net_result(url, params, calbackSuc, reset_headers, reset_host);
        });
    }
}
function net_result(url, params, calbackSuc, reset_headers, reset_host){
    if(reset_headers){
        type = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
        set_headers();
    } else{
        type = {"Content-Type": "application/json;charset=UTF-8"};
        set_headers();
    }
    const new_url = reset_host ? (store.state.appInfo.istest ? (beta_host + url) : (formal_host + url) ) : url;
    axios.post(new_url, params).then(res => {
        switch(res['data']['code'] || res['data']['error_code']){
            case 0:
                calbackSuc(res['data']);
                break;
            case '0':
                calbackSuc(res['data']);
                break;
            case '1012':
            case '1011':
            case '1006':
                common.link_to_app({'methodName': 'login'});
                break;
            default:
                common.show_weakTip('服务器正忙，请稍后再试')
                break;
        }
    }).catch((err) =>{
        common.show_weakTip('服务器正忙，请稍后再试')
    })
}
// 不断延迟请求获取并设置头部
function setTime(calback){
    var time = setTimeout(()=>{
        if(store.state.appInfo.token){
            calback();
            clearTimeout(time);
        } else {
            setTime();
        }
    },500)
}