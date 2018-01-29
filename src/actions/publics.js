/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
import Fetch from '../util/fetch';
import * as bookCase from './bookCase';
 
export function handle(data){
    return {
        type:"PUBLICS_HANDLE",
        data
    }
}

//云端上传
export function upYundata(data){
    //console.log('同步'+data);
    
    return dispatch => {
        dispatch(handle({
            uploading: true
        }))

        Fetch({
            url:"updateCase",
            data: JSON.stringify(data),
            type: "POST",
            contentType: 'application/json',
            success:function(data){
                if(data.status==1){
                    //上传成功
                    
                }else{
                    alert(data.result);
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
            success:function(result){
                if(result.status==1){
                    //console.log(result);return false;
                    //下载成功，写入书架
                    let len = result.data.length,
                        i = 0;
                    saveOne(result.data[i]);
                    function saveOne(data){
                        let ndata = data;
                        ndata.bid = parseInt(ndata.bid);
                        ndata.qidianid = parseInt(ndata.qidianid);
                        ndata.authorId = parseInt(ndata.authorId);
                        console.log(ndata.bid);
                        ////保存单独一本书
                        storage.save({
                            key: "bookInfo",
                            id: ndata.bid,  
                            data: ndata
                        }).then(()=>{
                            /////添加搜索数据到书架后 就直接去获取详细的数据
                            getInfo(ndata);
                            i++;
                            if(i <= len-1) saveOne(result.data[i]);
                        });
                    };
                    dispatch(handle({
                        uploading: false
                    }));
                }else{
                    alert(result.data);
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
                data: {qidianid: oldData.qidianid, authorId: oldData.authorId},
                success: function(result){
                    console.log('详细的'+result.data)
                    if(result.status==1){
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