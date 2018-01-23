/**
 * Created by hfhleo on 17/10/16.
 *
 * 搜索
 */
import Fetch from '../util/fetch';
///////当前props修改会影响的页面
import * as bookCase from './bookCase';

export function handle(data){
    return {
        type:"SEARCH_HANDLE",
        data
    }
}

//获取搜索结果
export function search(options){
    return dispatch => {
        dispatch(handle({
            list: [],
            status:true,
            isLoad: true
        }))

        Fetch({
            url:"search",
            data: options,
            type: "GET",
            success:function(data){

                if(data.status==1){
                    dispatch(handle({
                        list: data.data,
                        status: false,
                        isLoad: false
                    }))
                }
            },
            error: function(status, text){
                dispatch(handle({
                    list: [],
                    status: false,
                    isLoad: false
                }));
            },
            reset: function(result){
                dispatch(handle({
                    list: [],
                    status: false,
                    isLoad: false
                }));
            }
        })
    }
}
//获取单个来源的书籍搜索结果
export function searchOne(options){
    return dispatch => {
        dispatch(handle({
            list: [],
            status:true,
            isLoad: true
        }))

        Fetch({
            url:"search",
            data: options,
            type: "GET",
            success:function(data){

                if(data.status==1){
                    dispatch(handle({
                        list: data.data,
                        status: false,
                        isLoad: false
                    }))
                }
            },
            error: function(status, text){
                dispatch(handle({
                    list: [],
                    status: false,
                    isLoad: false
                }));
            },
            reset: function(result){
                dispatch(handle({
                    list: [],
                    status: false,
                    isLoad: false
                }));
            }
        })
    }
}

//添加到书架
export function addBook(options, tag, isGetInfo){
    
    return dispatch => {
        storage.load({
            key: 'bookInfo',
            id: options.id
        }).then(old => {
            if(old.isAdd){
                alert('书架已经有这本书了！');
                return false;
            }else{
                //////在临时数据里面
                saveBook(old)
            }
            
        }).catch(err => {
            //////不在临时数据里面
            if(err.name == "NotFoundError") {
                saveBook(options)
                /////添加搜索数据到书架后 就直接去获取详细的数据
                getInfo(options);
            }else{
                console.log(err)
            }
                     
        });

        function saveBook(data){
            let nowData  = data;
                nowData.isAdd = true;
                nowData.addDate = new Date().getTime();
                nowData.readTime = new Date().getTime();
            ////保存单独一本书
            storage.save({
                key: "bookInfo",
                id: options.id,  
                data: nowData
            });
            /////设置书架更新
            dispatch( bookCase.handle({isUpView:true}) )
            
            alert('已经添加到书架！');
            
        };
        ///////搜索是需要单独再去请求的
        function getInfo(oldData){
            ////请求书籍详情信息
            Fetch({
                url:"bookInfo",
                type:"GET",
                data: {id: options.id, authorId: options.authorId},
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
                            id: options.id,  
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
        }
        
    }
}