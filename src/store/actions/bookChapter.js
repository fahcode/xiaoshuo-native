/**
 * Created by hfhleo on 2017/10/29.
 *
 * 小说目录列表
 */
import Fetch from '../../util/fetch';
///////当前read的props修改会影响的页面
import * as bookCase from './bookCase';

export function handle(data){
    return {
        type:"BOOK_CHAPTER_HANDLE",
        data
    }
}

//获取目录列表id, sourceType, sort, isupdate
export const getChapter = (options)=>{
    return dispatch => {

        storage.load({
            key: 'bookInfo',
            id: options.bid
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            setDom(ret, ret.pageList, ret.sourceType)

        }).catch(err => {
            console.log(err)
            /////未加入书架, 废弃的内容
            setDom(options, [], options.oldSourceType)
        });

        function setDom(ret, pageList, oldSourceType){
            let sourceType = !!options.sourceType? options.sourceType: oldSourceType;

            ////如果传了sort则使用，没有则使用默认数据里面的。
            let sort = !!options.sort ? options.sort : (ret.sort || "asc");
            console.log('判断'+ options.sourceType)
            ////有数据,且不传来源,且不是更新章节列表,  代表只排序
            if(pageList.length>0 && !!!options.sourceType && !!!options.isupdate && ret.isAdd){
                ///////可以设置排序方式
                let arr = doSort(pageList, sort);

                dispatch(handle({
                    list: arr,
                    sort: sort,
                    rdPst: ret.rdPst,
                    oldSourceType: sourceType,
                    loading: false
                }))
                //未加入书架 不保存状态
                //if(!ret.isAdd) return false;

                //保存排序状态
                let dd = Object.assign({}, ret, {sort: sort});
                storage.save({
                    key: "bookInfo",
                    id: options.bid, 
                    data: dd
                }).catch(err => {
                    console.log(err)
                });
            }else{
                //在请求新列表显示loding
                dispatch(handle({
                    loading: true
                }));
                let ur = "getBookList";
                //////如果是起点，章节获取全部的信息
                //if(sourceType == "qidian") ur = "bookInfo";
                ////如果有islast，代表是来自书架的更新
                let islast = (typeof options.islast == "boolean" && options.islast);

                Fetch({
                    url: ur,
                    type:"GET",
                    data: {bookID: options.bookID, name: ret.name, author: ret.author, authorId:  ret.authorId, sourceType: sourceType},
                    success:function(result){
                        if(result.status==1){
                            let dds = result.data;

                            if(islast) dispatch( bookCase.handle({isUpView: true, isUpdata: false}) );

                            //判断长度,来源也不传，则不做任何修改
                            if(pageList.length==dds.pageList.length && !!!options.sourceType){
                                dispatch(handle({loading: false}));
                            }else{
                                ///////可以设置排序方式
                                let arr = doSort(dds.pageList, sort);
                                let rdPst = !!ret.rdPst? ret.rdPst: 1;
                                /*if(!!!options.isupdate){
                                    rdPst = 1;
                                }*/
                                ////只要长度改变了，全部重新写入，省去判断是否更新
                                dispatch(handle({
                                    list: arr,
                                    oldSourceType: sourceType,
                                    sort: sort,
                                    rdPst: rdPst,
                                    loading: false
                                }))
                                //未加入书架 不保存状态
                                if(!ret.isAdd) return false;

                                //把书籍合并到数据库,
                                let list = dds.pageList;
                                //来源也记录在数据里面,同时保存新的一些状态
                                let dd = Object.assign({}, ret, dds, {sourceType: sourceType, sort: sort, ptotal: dds.pageList.length, rdPst: rdPst});
                                
                                if(options.isupdate){
                                    //如果是更新，则老书籍合并到新数据，主要是保留内容
                                    list = Object.assign({}, dds.pageList, ret.pageList);
                                    dd.pageList = list;
                                }
                                if(sourceType == "qidian") dd.book_ptotal = dds.pageList.length;

                                ////判断isAdd是否保存到本地数据库
                                //保存
                                storage.save({
                                    key: "bookInfo",
                                    id: options.bid,  
                                    data: dd
                                }).then(ret =>{
                                    //更新在读书籍和书架的视图, 主要是修改阅读的进度
                                    dispatch(bookCase.handle({isUpView: true}))
                                }).catch(err => {
                                    console.log(err)
                                });
                            }

                        }
                    },
                    reset: function(result){
                        dispatch(handle({
                            loading: false
                        }))
                        //来自书架的
                        if(islast) dispatch( bookCase.handle({isUpView: true, isUpdata: false}) );
                    }
                })
            }
        }; 
    }
}


//////排序
export function doSort(list, sort){
    ///////可以设置排序方式
    let arr = [];
    if(sort == "asc"){
        arr = list.slice(0);
    }else{
        /////降序desc
        for(var i = list.length-1;i>=0;i--){
            arr.push(list[i])
        }
    }
    return arr;
}