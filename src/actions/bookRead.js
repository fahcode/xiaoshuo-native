/**
 * Created by apple on 2017/7/17.
 *
 * 小说阅读页
 */
import Fetch from '../util/fetch';

///////当前read的props修改会影响的页面
import * as bookCase from './bookCase';
import * as bookChapter from './bookChapter';

export function handle(data){
    return {
        type:"BOOK_READ_HANDLE",
        data
    }
}

//获取章节内容
export function getBookDetails(options, listdata){
    return dispatch => {
        dispatch(handle({
            loading: true
        }))
        
        storage.load({
            key: 'bookInfo',
            id: options.bid,
        }).then(ret => {

            ///查询是否有内容
            let tpage = ret.pageList[options.rdPst-1];

            // 如果找到数据，则在then方法中返回
            dispatch(handle({
                bookName: ret.name,
                title: tpage.name,
                bookId: options.bid,
                isAdd: ret.isAdd,
                chapter: options.rdPst,
                ptotal: ret.ptotal,
                ctOffset: tpage.ctOffset,
                loading: true
            }))

            if(tpage.content!=""){
                ////更新阅读的内容
                dispatch(handle({
                    content: tpage.content,
                    ctOffset: tpage.ctOffset,
                    loading: false
                }));
                
                let now = ret;
                //标记阅读进度
                now.rdPst = options.rdPst;
                now.isRead = true;
                now.readTime = new Date().getTime();
                //增加单章节阅读的位置
                //保存
                storage.save({
                    key: "bookInfo",
                    id: options.bid,  
                    data: now
                }).then(ret =>{
                    //更新在读书籍和书架的视图, 主要是修改阅读的进度
                    dispatch(bookCase.handle({isUpView: true}))
                    /////更新章节列表视图，主要是修改是否下载的状态
                    dispatch(bookChapter.handle({isUpView: true}));
                });
            }else{
                console.log('开始抓文章内容')
                Fetch({
                    url:"bookDetails",
                    type:"GET",
                    //link和charset都单独记录在列表的每一条
                    data: {name: ret.name, link: tpage.link, sourceType: ret.sourceType, charset: tpage.charset},
                    success:function(result){
                        if(result.status==1){
                            
                            dispatch(handle({
                                content: result.data,
                                loading: false
                            }));
                            let now = ret;
                            //把书籍合并到数据库,先取再合
                            now.pageList[options.rdPst-1].content = result.data;
                            //标记阅读进度
                            now.rdPst = options.rdPst;
                            now.isRead = true;
                            now.readTime = new Date().getTime();
                            //保存
                            storage.save({
                                key: "bookInfo",
                                id: options.bid,  
                                data: now
                            }).then(dd => {
                                //更新在读书籍和书架的视图, 主要是修改阅读的进度
                                dispatch(bookCase.handle({isUpView: true}))
                                /////更新章节列表视图，主要是修改是否下载的状态
                                dispatch(bookChapter.handle({isUpView: true}));
                            })
                        }
                    },
                    error:function(result){
                        ////可能网络错误 保留原来内容
                        dispatch(handle({
                            loading: false
                        }))
                    },
                    reset: function(result){
                        dispatch(handle({
                            title: "",
                            content: "",
                            loading: false
                        }))
                    }
                })
            };
        }).catch(err => {
            //////没查询到书籍，代表未加入书架,已经废弃，使用临时保存逻辑
            if(err.name != "NotFoundError"){ alert(err.message); return false;}

            let tpage = listdata[options.rdPst-1];
            Fetch({
                    url:"bookDetails",
                    type:"GET",
                    //link和charset都单独记录在列表的每一条
                    data: {name: "", link: tpage.link, sourceType: options.sourceType, charset: tpage.charset},
                    success:function(result){
                        if(result.status==1){
                            
                            dispatch(handle({
                                content: result.data,
                                chapter: options.rdPst,
                                ptotal: listdata.length.ptotal,
                                title: tpage.name,
                                loading: false
                            }));
                        }
                    },
                    error:function(result){
                        ////可能网络错误 保留原来内容
                        dispatch(handle({
                            loading: false
                        }))
                    },
                    reset: function(result){
                        dispatch(handle({
                            title: "",
                            content: "",
                            loading: false
                        }))
                    }
                })
        });
    }
}

//缓存下载
export function downBook(bid, startPost, endPost){
    console.log(startPost)
    console.log(endPost)
    return dispatch => {
        /*dispatch(handle({
            loading: true
        }))*/
        storage.load({
            key: 'bookInfo',
            id: bid,
        }).then(ret => {
            let tpage = ret.pageList[0];

            //原始的章节列表
            let nowArr = ret.pageList;

                //////需要请求的link集合
            let _nowArr = [],
                //判断是否有内容，可以节约请求
                contentList = [];
            for(var i = startPost-1; i<=(endPost-1);i++){

                _nowArr.push(nowArr[i].link)
                contentList.push( (nowArr[i].content==""? 0: 1) );
            }
            //////传递链接数组，是否有内容数组
            getAllPage(_nowArr, contentList, startPost, endPost);

            /************* 下载对应章节的内容 ****************/
            function getAllPage(linkArrs, contentList, startPost, endPost){

                Fetch({
                    url:"bookAllDetails",
                    //type: "POST",
                    //charset每一条都一样的
                    data: {name: ret.name, pageList: linkArrs, contentList: contentList, sourceType: ret.sourceType, charset: ret.pageList[0].charset},
                    success:function(result){
                        if(result.status==1){
                            let dd = result.data,
                                cur = 0;

                            //写入对应起始的内容
                            for(var j = startPost-1;j<=(endPost-1);j++){
                                if(nowArr[j].content==""){
                                    nowArr[j].content = dd[cur];
                                }
                                cur++;
                            };
                            console.log('拼接后的数组'+JSON.stringify(nowArr))

                            //把书籍合并到数据库,先取再合
                            ret.pageList = nowArr;

                            //保存
                            storage.save({
                                key: "bookInfo",
                                id: bid,  
                                data: ret
                            });

                            dispatch(handle({
                                loading: false
                            }));
                            /////更新章节列表视图，主要是修改是否下载的状态
                            dispatch(bookChapter.handle({isUpView: true}))
                        }
                    },
                    reset: function(result){
                        dispatch(handle({
                            loading: false
                        }))
                    }
                })
            };
            function getOnePage(tpage, pid){
                console.log('开始抓第'+ pid +'文章内容');
                Fetch({
                    url:"bookDetails",
                    type:"GET",
                    //link和charset都单独记录在列表的每一条
                    data: {name: ret.name, link: tpage.link, sourceType: ret.sourceType, charset: tpage.charset},
                    success:function(result){
                        if(result.status==1){
                            //最后一条隐藏loading
                            if(pid == endPost){
                                dispatch(handle({
                                    loading: false
                                }));
                                /////更新章节列表视图，主要是修改是否下载的状态
                                dispatch(bookChapter.handle({isUpView: true}))
                            };
                            
                            let now = ret;
                            //把书籍合并到数据库,先取再合
                            now.pageList[pid-1].content = result.data;

                            //保存
                            storage.save({
                                key: "bookInfo",
                                id: bid,  
                                data: now
                            });
                            
                        }
                    },
                    reset: function(result){
                        dispatch(handle({
                            loading: false
                        }))
                    }
                })
            };
            
        }).catch(err => {
            console.log(err)
        });
    }
}