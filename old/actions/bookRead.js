/**
 * Created by apple on 2017/7/17.
 *
 * 小说阅读页
 */
import Fetch from '../util/fetch';
const Realm = require('realm');
import * as RM from '../util/realm';

export function handle(data){
    return {
        type:"BOOK_READ_HANDLE",
        data
    }
}

//获取章节内容
export function getBookDetails(options){
    return dispatch => {
        dispatch(handle({
            loading:true,
            chapter:options.pid
        }))

        if(options.isAdd){
            Realm.open({schema: [RM.BookSchema,RM.ContentSchema,RM.SettingSchema],schemaVersion: RM.version})
                .then(realm => {
                    let book = realm.objects('Content').filtered(
                        'column = '+options.id+' AND pid = '+options.pid
                    );
                    if(book.length>0){
                        dispatch(handle({
                            content:book[0].content,
                            title:book[0].name,
                            loading:false
                        }))
                    }else{
                        Fetch({
                            url:"bookDetails",
                            type:"GET",
                            data:options,
                            success:function(data){
                                if(data.status==1){
                                    dispatch(handle({
                                        content:data.data.content,
                                        title:data.data.title,
                                        loading:false
                                    }))
                                }
                            }
                        })
                    }
            });
        }else{
            Fetch({
                url:"bookDetails",
                type:"GET",
                data:options,
                success:function(data){
                    if(data.status==1){
                        dispatch(handle({
                            content:data.data.content,
                            title:data.data.title,
                            loading:false
                        }))
                    }
                }
            })
        }
    }
}

//缓存下载
export function downBook(id,pid){
    return dispatch => {
        Realm.open({schema: [RM.BookSchema,RM.ContentSchema],schemaVersion: RM.version})
            .then(realm => {
                let book = realm.objects('Content').filtered(
                    'column = '+id
                );
                if(book.length==0){
                    Fetch({
                        url:"downBook",
                        type:"GET",
                        data:{id},
                        success:function(data){
                            if(data.status==1){
                                realm.write(() => {
                                    realm.create('Book',{
                                        name:data.data.book.name,//小说名称
                                        imgUrl:data.data.book.thumb_img,//图片URL
                                        id:data.data.book.id,//小说ID
                                        pid:pid,//小说阅读到第几章节
                                        isRead:true,//是否阅读
                                        list:data.data.content,//小说章节内容列表
                                    },true)
                                    alert('缓存成功')
                                });
                            }
                        }
                    })
                }else{
                    alert('已经缓存到本地')
                }
        });
    }
}