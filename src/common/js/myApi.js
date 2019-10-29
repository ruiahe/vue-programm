import { post } from './axios'
import QS from 'qs'
const key = 'ff5181333f7100930cbaf117276119e7'; 
// 历史上的今天 -- 列表
// export const toh = (p, suc) => post('/api/a/toh', QS.stringify({...p,key: key}), suc, true);
export const listHistoryEvents = (p, suc) => post('/historyEvent/listHistoryEvents', JSON.stringify(p), suc, false, true);
// 历史上的今天 -- 详情
// export const tohdet = (p, suc) => post('/api/a/tohdet', QS.stringify({...p,key: key}), suc, true);
export const getEventDetail = (p, suc) => post('/historyEvent/getEventDetail', JSON.stringify(p), suc, false, true);
// 获取北京时间
export const time = (suc) => post('/date/getBJTime', {}, suc, false, true);
// 论坛  --  反馈论坛
export const feedList = (p, suc) => post('/app/forum/queryForumFeedbackModulesList', JSON.stringify(p), suc, false, true);
// 论坛  --  消息（获取红点展示信息）
export const statisticsReplyInfo = (suc) => post('/app/forum/statisticsReplyInfo', JSON.stringify({}), suc, false, true);
// 论坛  --  发言列表  --  列表信息
export const queryForumReplyList = (p, suc) => post('/app/forum/queryForumReplyList', JSON.stringify(p), suc, false, true);
// 论坛  --  发言列表  --  点赞
export const upReply = (p, suc) => post('/app/forum/upReply', JSON.stringify(p), suc, false, true);
// 论坛  --  发言详情
export const queryForumReplyInfo = (p, suc) => post('/app/forum/queryForumReplyInfo', JSON.stringify(p), suc, false, true);
// 论坛  --  消息列表页
export const varibal = (p, url, suc) => post(url, JSON.stringify(p), suc, false, true);
// 论坛  --  删除 
export const deleteForumReplyInfo = (p, suc) => post('/app/forum/deleteForumReplyInfo', JSON.stringify(p), suc, false, true);
// 论坛  --  提交 
export const userReplyForumInfo = (p, suc) => post('/app/forum/userReplyForumInfo', JSON.stringify(p), suc, false, true);
// 论坛  --  举报 
export const reportForumReplyInfo = (p, suc) => post('/app/forum/reportForumReplyInfo', JSON.stringify(p), suc, false, true);
// 个税  --  城市列表
export const queryCityList = (suc) => post('/app/rate/queryCityList', JSON.stringify({}), suc, false, true);
// 个税  --  根据城市名称获取城市税率信息
export const getRateValueByCityName = (p, suc) => post('/app/rate/getRateValueByCityName', JSON.stringify(p), suc, false, true);
// 个税  --  历史纪录
export const queryRateHistoryCityList = (suc) => post('/app/rate/queryRateHistoryCityList', JSON.stringify({}), suc, false, true);
// 个税  --  根据城市id获取城市税率信息
export const getRateValueByCityId = (p, suc) => post('/app/rate/getRateValueByCityId', JSON.stringify(p), suc, false, true);
