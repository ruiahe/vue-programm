import { post } from './axios'
import status from '@/common/json/config.json'
import QS from 'qs'
const key = 'f8a9a802c1a1446d50cacf25b9a5efc9'; 
const host = (()=>{
    var url = '';
    switch (status.domain){
        case 'formal':
            url = 'http://www.36jiapp.com:8080/core';
            break;
        case 'beta':
            url = 'http://test.36jiapp.com:8080';
            break;
    }
    return url;
})();
// 历史上的今天 -- 列表
export const toh = (p, suc) => post('/api/a/toh', QS.stringify({...p,key: key}), suc, true);
// 历史上的今天 -- 详情
export const tohdet = (p) => post('/api/a/tohdet', QS.stringify({...p,key: key}));
// 获取北京时间
export const time = () => post(host + '/date/getBJTime', {}, suc);
// 论坛  --  反馈论坛
export const feedList = (p, suc) => post(host + '/app/forum/queryForumFeedbackModulesList', JSON.stringify(p), suc);
// 论坛  --  消息（获取红点展示信息）
export const statisticsReplyInfo = (suc) => post(host + '/app/forum/statisticsReplyInfo', JSON.stringify({}), suc);
// 论坛  --  发言列表  --  列表信息
export const queryForumReplyList = (p, suc) => post(host + '/app/forum/queryForumReplyList', JSON.stringify(p), suc);
// 论坛  --  发言列表  --  点赞
export const upReply = (p, suc) => post(host + '/app/forum/upReply', JSON.stringify(p), suc);
// 论坛  --  发言详情
export const queryForumReplyInfo = (p, suc) => post(host + '/app/forum/queryForumReplyInfo', JSON.stringify(p), suc);
// 论坛  --  消息列表页
export const varibal = (p, url, suc) => post(host + url, JSON.stringify(p), suc);
// 论坛  --  删除 
export const deleteForumReplyInfo = (p, suc) => post(host + '/app/forum/deleteForumReplyInfo', JSON.stringify(p), suc);
// 论坛  --  提交 
export const userReplyForumInfo = (p, suc) => post(host + '/app/forum/userReplyForumInfo', JSON.stringify(p), suc);
// 论坛  --  举报 
export const reportForumReplyInfo = (p, suc) => post(host + '/app/forum/reportForumReplyInfo', JSON.stringify(p), suc);
