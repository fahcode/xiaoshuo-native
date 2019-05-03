/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
import Fetch from '../../util/fetch';
import * as bookCase from './bookCase';
 
export function handle(data){
    return {
        type:"PUBLICS_HANDLE",
        data
    }
}

//获取初始化数据
export function getInit(){
    return dispatch => {

        Fetch({
            url:"init",
            data: {},
            type: "GET",
            success:function(ret){
                if(ret.status==1){
                    //获取状态值
                    dispatch(handle({
                        isLogin: ret.data.isLogin,
                        uid: ret.data.uid,
                        name: ret.data.name,
                        img: ret.data.img,
                        settings: ret.data.settings
                    }));
                }else{
                    alert(ret.data.msg);
                }
            },
            error: function(status, text){
                console.log(text);
            },
            reset: function(result){
            }
        })
    }
}
//退出登陆
export function loginOut(){
    return dispatch => {
        Fetch({
            url:"loginOut",
            data: {},
            type: "GET",
            success:function(ret){
                if(ret.status==1 && ret.data.code == 1){
                    //获取状态值
                    dispatch(handle({
                        isLogin: false,
                        name: '',
                        img: ''
                    }));
                    
                    //提示
                    alert(ret.data.msg);
                }else{
                    alert(ret.data.msg);
                }
            },
            error: function(status, text){
                console.log(text);
            },
            reset: function(result){
            }
        })
    }
}

//云端上传
export function upYundata(data, uid){
    //console.log('同步'+data);
    
    return dispatch => {
        dispatch(handle({
            uploading: true
        }))

        Fetch({
            url:"updateCase",
            data: JSON.stringify({books: data, uid: uid}),
            type: "POST",
            contentType: 'application/json',
            success:function(ret){
                if(ret.status==1 && ret.data.code ==1){
                    //上传成功
                    alert(ret.data.msg);
                }else{
                    alert(ret.data.msg);
                }
            },
            error: function(status, text){
                console.log(text);
                dispatch(handle({
                    uploading: false
                }));
            },
            reset: function(result){
                dispatch(handle({
                    uploading: false
                }));
            }
        })
    }
}
//云端下载
export function dlYundata(data){
    //console.log('同步'+data);
    
    return dispatch => {
        dispatch(handle({
            uploading: true
        }))

        Fetch({
            url:"dldateCase",
            data: data,
            type: "GET",
            success:function(ret){
                if(ret.status==1 && ret.data.code==1){
                    console.log(ret.data.arr)
                    //下载成功，写入书架
                    let darr = ret.data.arr,
                        len = darr.length,
                        i = 0;
                    if (darr.length<1) {
                        alert('暂无书籍！');
                        return;
                    }
                    saveOne(darr[i]);
                    function saveOne(data){
                        let ndata = data;
                        console.log(ndata)
                        //在本地不存在
                        storage.load({
                            key: 'bookInfo',
                            id: ndata.bid,
                        }).catch(err => {
                            console.log(err)
                            if(err.name != "NotFoundError"){ alert(err.message); return false;}
                            ////保存单独一本书
                            storage.save({
                                key: "bookInfo",
                                id: ndata.bid,  
                                data: ndata
                            }).then(()=>{
                                /////添加搜索数据到书架后 就直接去获取详细的数据
                                getInfo(ndata);
                                /////设置书架更新
                                dispatch( bookCase.handle({isUpView:true}) )
                                i++;
                                if(i <= len-1) saveOne(darr[i]);
                            });
                        });
                    };
                    alert('书架下载成功');
                    dispatch(handle({
                        uploading: false
                    }));
                }else{
                    alert(ret.data.msg);
                }
            },
            error: function(status, text){
                console.log(text);
                dispatch(handle({
                    uploading: false
                }));
            },
            reset: function(result){
                dispatch(handle({
                    uploading: false
                }));
            }
        });
        ///////搜索是需要单独再去请求的
        function getInfo(oldData){
            ////请求书籍详情信息
            Fetch({
                url:"bookInfo",
                type:"GET",
                data: {bookID: oldData.bookID, authorId: oldData.authorId},
                success: function(result){
                    if (result.status == 1){
                        let bookInfo = result.data;
                            delete bookInfo.rdPst;
                            delete bookInfo.readTime;
                        //把书籍合并到数据库,先取再合
                        var dd = Object.assign({}, oldData, result.data);
                            dd.isAdd = true;
                        console.log(dd)
                        //保存
                        storage.save({
                            key: "bookInfo",
                            id: oldData.bid,  
                            data: dd
                        });
                        /////设置书架更新
                        dispatch( bookCase.handle({isUpView:true}) )
                    }
                },
                reset: function(result){
                    console.log('未抓到起点书籍')
                }
            });
        };

    }
}