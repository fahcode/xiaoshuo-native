/**
 * Created by apple on 2017/7/17.
 *
 * 网络请求
 */
//接口域名
const host="http://172.16.12.63:3000/";
//接口URL集合
const urls={
    getList       : 'getBookList',//获取小说列表
    getHot        : 'getHotList',//获取热门小说
    getLove       : 'getLoveList',//获取猜你喜欢
    bookInfo      : 'getBookInfo',//小说详情
    getChapter    : 'getBookChapter',//小说章节目录
    bookDetails   : 'getBookDetails',//获取章节的内容
    downBook      : 'downBook',//下载小说
    search        : 'searchBook',//搜索小说
    login         : 'login',//登陆
    logOut        : 'logOut',//退出登陆
    sendSms       : 'sendSmsCode',//发生短信
};

function Fetch(options){
    //请求头部参数
    let sendHeader={
        method: options.type?options.type:"POST",//发送方式
        headers:options.contentType === "multipart/form-data"?{}:{
            "Content-Type":options.contentType?options.contentType:"application/x-www-form-urlencoded"
        },//请求头部格式
        body:options.data&&options.type!=='GET'?sortKey(options.data,options.contentType):null //发送数据
    }

    //初始化请求
    let sendUrl;
    if(options.type==='GET'){
        sendUrl=new Request(host+urls[options.url]+'?'+sortKey(options.data,options.contentType));//构造请求资源
        console.log(sendUrl)
    }else{
        sendUrl=new Request(host+urls[options.url]);//构造请求资源
    }

    fetch(sendUrl,sendHeader).then(function(res) {
        if (res.ok) {
            //成功返回数据
            res.json().then(function(data) {
                if(typeof options.success==="function"){options.success(data)};
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
    });
}

//对象转换为key=value&key=value
function sortKey(data,type){
    let tempData='';
    for(let key in data){
        //上传文件无需KEY
        if(type === "multipart/form-data"){
            tempData=data[key];
        } else {
            tempData+=key+'='+data[key]+'&';
        }
    }
    return tempData;
}

export default Fetch;