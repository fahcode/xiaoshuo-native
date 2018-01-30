/**
 * Created by apple on 2017/7/17.gulp对不使用的js不打包
 *
 * 网络请求
 */
 //"react": "16.0.0-beta.5","react-native": "0.49.3","react-native-storage": "^0.2.2","react-native-cookies": "^3.2.0","react-native-fs": "^2.9.7","react-native-storage": "^0.2.2","react-navigation": "^1.0.0-beta.27",
//接口域名
//const host="http://45.124.67.223:3888/";
//const host="http://112.74.33.167:3888/";
const host="http://192.168.140.56:3888/";
//const host="http://192.168.1.111:3888/";
//接口URL集合
const urls={
    init       : 'init',//获取登陆状态，获取初始化数据
    getList       : 'getBookList',//获取小说列表
    getHot        : 'getHotList',//获取起点首页强推小说
    bookInfo      : 'getBookInfo',//小说详情
    getBookList    : 'getBookList',//小说章节目录
    bookDetails   : 'getBookDetails',//获取章节的内容
    bookAllDetails   : 'getBookAllDetails',//获取章节的内容
    updataBookList      : 'updataBookList',//更新书架
    downBook      : 'downBook',//下载小说
    search        : 'searchBook',//搜索小说
    getRanks        : 'getRanks',//获取排行
    getClfMenus        : 'getClfMenus',//获取大分类的小列表
    getClfBookList        : 'getClfBookList',//获取大分类的小列表
    register         : 'register',//注册
    login         : 'login',//登陆
    logOut        : 'logOut',//退出登陆
    sendSms       : 'sendSmsCode',//发生短信
    updateCase      : 'updateCase',//上传书架
    dldateCase      : 'dldateCase',//下载书架
};

function Fetch(options){
    //请求头部参数
    let sendHeader={
        method: options.type?options.type:"POST",//发送方式
        credentials: "include", //带cookie
        headers:options.contentType === "multipart/form-data"?{}:{
            "Content-Type":options.contentType?options.contentType:"application/x-www-form-urlencoded"
        },//psot请求的内容请求头部格式
        body:options.data&&options.type!=='GET'?sortKey(options.data,options.contentType):null //发送数据
    }

    //初始化请求
    let sendUrl;
    if(options.type==='GET'){
        sendUrl=new Request(host+urls[options.url]+'?'+sortKey(options.data,options.contentType));//构造请求资源
    }else{
        sendUrl=new Request(host+urls[options.url]);//构造请求资源
    }
    console.log(sendUrl);
    console.log(sendHeader);

    fetch(sendUrl,sendHeader).then(function(res) {
        if (res.ok) {
            //成功返回数据
            res.json().then(function(data) {
                if(data.status == 1){
                    if(typeof options.success==="function"){options.success(data)};
                }else if(data.status == -1){
                    if(typeof options.reset==="function"){options.reset(data)}
                    alert('站点访问出错，请检查是否可以正常访问！')
                }else if(data.status == -2){
                    if(typeof options.reset==="function"){options.reset(data)}
                    alert('站点可以访问，但是抓取不到内容，请检查爬虫规则或者检查站点内容是否ajax异步载入的！')
                }else if(data.status == -3){
                    if(typeof options.reset==="function"){options.reset(data)}
                    alert('站点可以访问，爬虫规则也正常，但是没有搜索到此小说！')
                }else{
                    if(typeof options.success==="function"){options.success(data)}
                };
            });
        } else {
            //返回错误信息
            var errText;
            switch(res.status){

                case 403:
                    errText="服务器禁止访问,请重新登录试试";
                    break;
                case 404:
                    errText="未找到服务器,请重新登录试试";
                    break;
                case 500:
                    errText="服务器未响应,请重新登录试试";
                    break;
                case 503:
                    errText="服务器不可用,请重新登录试试";
                    break;
                case 504:
                    errText="网关超时,请重新登录试试";
                    break;
                default :
                    errText="异常错误，请重新在试";
                    break;
            }
            if(typeof options.error==="function"){options.error(res.status,errText)};
        }
    }, function(e) {
        alert("网络异常，请求错误");
        if(typeof options.error==="function"){options.error(444, e)};
    });
}

//对象转换为key=value&key=value
function sortKey(data,type){
    let tempData='';
    let i = 0;
    //上传文件无需KEY
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