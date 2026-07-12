/**
 * Created by apple on 2017/7/17.
 * 网络请求
 */

import ServerConfig from './serverConfig';

//接口URL集合
const urls={
    init       : 'init',
    getList       : 'getBookList',
    getHot        : 'getHotList',
    bookInfo      : 'getBookInfo',
    getBookList    : 'getBookList',
    bookDetails   : 'getBookDetails',
    bookAllDetails   : 'getBookAllDetails',
    updataBookList      : 'updataBookList',
    downloadBook      : 'getDownloadBook',
    search        : 'searchBook',
    getRanks        : 'getRanks',
    getClfMenus        : 'getClfMenus',
    getClfBookList        : 'getClfBookList',
    register         : 'register',
    login         : 'login',
    loginOut        : 'loginOut',
    sendSms       : 'sendSmsCode',
    updateCase      : 'updateCase',
    dldateCase      : 'dldateCase',
    // AI 配置
    aiConfigGet   : 'aiConfig',
    aiConfigSet   : 'aiConfig',
    aiDiscover    : 'aiDiscover',
    aiGenRule     : 'aiGenRule',
    aiExtract     : 'aiExtract',
};

// 默认 host（首次启动未配置时使用）
let cachedHost = 'http://23.94.163.5:3888/';

/**
 * 获取当前生效的 HTTP host（异步）
 */
async function getHost() {
    try {
        return await ServerConfig.getHttpHost() + '/';
    } catch (e) {
        return cachedHost;
    }
}

/**
 * 同步获取缓存的 host（用于不需要最新配置的场景）
 */
function getHostSync() {
    return cachedHost;
}

/**
 * 刷新 host 缓存（App 启动时调用）
 */
async function refreshHost() {
    cachedHost = await getHost();
    return cachedHost;
}

async function Fetch(options){
    // 动态获取最新 host
    const host = await getHost();

    //请求头部参数
    let sendHeader={
        method: options.type?options.type:"POST",
        credentials: "include",
        headers:options.contentType === "multipart/form-data"?{}:{
            "Content-Type":options.contentType?options.contentType:"application/x-www-form-urlencoded"
        },
        body:options.data&&options.type!=='GET'?sortKey(options.data,options.contentType):null
    }

    //初始化请求
    let sendUrl;
    if(options.type==='GET'){
        sendUrl=new Request(host+urls[options.url]+'?'+sortKey(options.data,options.contentType));
    }else{
        sendUrl=new Request(host+urls[options.url]);
    }
    console.log('Request URL:', sendUrl.url);
    
    Promise.race([
        fetch(sendUrl, sendHeader),
        new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), options.timeout || 20000)
        })])
        .then((res) => {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data.status == 1) {
                        if (typeof options.success === "function") { options.success(data) };
                    } else if (data.status == -1) {
                        if (typeof options.reset === "function") { options.reset(data) }
                        alert('站点访问出错，请检查是否可以正常访问！')
                    } else if (data.status == -2) {
                        if (typeof options.reset === "function") { options.reset(data) }
                        alert('站点可以访问，但是抓取不到内容，请检查爬虫规则或者检查站点内容是否ajax异步载入的！')
                    } else if (data.status == -3) {
                        if (typeof options.reset === "function") { options.reset(data) }
                        alert('站点可以访问，爬虫规则也正常，但是没有搜索到此小说！')
                    } else {
                        if (typeof options.success === "function") { options.success(data) }
                    };
                });
            } else {
                var errText;
                switch (res.status) {
                    case 403: errText = "服务器禁止访问,请重新登录试试"; break;
                    case 404: errText = "未找到服务器,请重新登录试试"; break;
                    case 500: errText = "服务器未响应,请重新登录试试"; break;
                    case 503: errText = "服务器不可用,请重新登录试试"; break;
                    case 504: errText = "网关超时,请重新登录试试"; break;
                    default: errText = "异常错误，请重新在试"; break;
                }
                if (typeof options.error === "function") { options.error(res.status, errText) };
            }
        }).catch((err) => {
            if (typeof options.error === "function") { 
                options.error(err) 
            } else if (typeof options.reset === "function"){
                options.reset(null, err)
            }
            alert(err || "网络异常，请求错误");
        });
}

//对象转换为key=value&key=value
function sortKey(data,type){
    let tempData='';
    let i = 0;
    if(type === "multipart/form-data" || type === "application/json"){
        tempData = data;
    }else{
        for(let key in data){
            i++;
            tempData+= (i==1?'':'&') +key+'='+data[key];
        }
    };
    return tempData;
}

export default Fetch;
export { refreshHost, getHostSync };
