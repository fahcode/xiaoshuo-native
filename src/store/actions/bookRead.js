/**
 * Created by apple on 2017/7/17.
 *
 * 小说阅读页
 */
import Fetch from '../../util/fetch';
import Socket from '../../util/Socket';

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
export const getBookDetails = (options, listdata) => {
    return (dispatch) => {
        return new Promise(function (resolve, reject) {
            dispatch(handle({
                bookName: options.name,
                title: ''
            }))
            
            storage.load({
                key: 'bookInfo',
                id: options.bid,
            }).then(ret => {
                //console.log(options)
                //console.log(ret)
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
                        resolve()
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
                                    resolve()
                                })
                            }
                        },
                        error:function(result){
                            ////可能网络错误 保留原来内容
                            dispatch(handle({
                                content: result.data,
                                ctOffset: { x: 0, y: 0 },
                                loading: false
                            }))
                            reject()
                        },
                        reset: function(result){
                            dispatch(handle({
                                title: "",
                                content: "",
                                loading: false
                            }))
                            reject()
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
                                    ptotal: listdata.length,
                                    title: tpage.name,
                                    loading: false
                                }));
                                resolve()
                            }
                        },
                        error:function(result){
                            ////可能网络错误 保留原来内容
                            dispatch(handle({
                                content: result.data,
                                chapter: options.rdPst,
                                ptotal: listdata.length,
                                title: tpage.name,
                                ctOffset: { x: 0, y: 0 },
                                loading: false
                            }))
                            reject()
                        },
                        reset: function(result){
                            dispatch(handle({
                                title: "",
                                content: "",
                                loading: false
                            }))
                            reject()
                        }
                    })
            });
        })
    }
}

//缓存下载
export function downloadBook(bid, startPost, endPost){
    return (dispatch) => {
        return new Promise(function (resolve, reject) {
            storage.load({
                key: 'bookInfo',
                id: bid,
            }).then(ret => {
                //原始的章节列表
                let pageList = ret.pageList;
                let ws = new Socket('getDownloadBook');
                ws.onopen = () => {
                    // 打开一个连接
                    for (var i = startPost - 1; i <= (endPost - 1); i++) {
                        let nowp = pageList[i];
                        //只有内容为空的需要抓取
                        if (nowp.content == "") {
                            let options = {
                                len: endPost - startPost,
                                name: ret.name,
                                bid: ret.bid,
                                sourceType: ret.sourceType,
                                link: nowp.link,
                                pos: i,
                                charset: nowp.charset || "utf8"
                            }
                            ws.send(JSON.stringify(options)); // 发送一个消息
                        }
                    }

                };
                ws.onmessage = (e) => {
                    // 接收到了一个消息
                    let data = JSON.parse(e.data || '{}');
                    console.log(data)
                    if (data.status == 1) {
                        //保存当前拿到了的章节内容
                        ret.pageList[data.pos].content = data.data;

                        storage.save({
                            key: "bookInfo",
                            id: bid,
                            data: ret
                        }).then(() => {
                            
                        }).catch(err => {
                            console.log(err);
                        });
                    } else if (data.status == -1) {
                        console.log('下载失败');
                    } else if (data.status == -2) {
                        console.log('解析失败');
                    }else if (data.end) {
                        dispatch(handle({loading: false}));
                        //更新
                        dispatch(bookChapter.handle({ isUpView: true }))
                        
                        ws.close();
                        resolve();
                    } else {
                        dispatch(handle({ loading: false }));
                        ws.close();
                        console.log(data.msg)
                        reject()
                    }
                };

                ws.onerror = (e) => {
                    dispatch(handle({ loading: false }));
                    // 发生了一个错误
                    console.log(e.message);
                    reject()
                };

                ws.onclose = (e) => {
                    // 连接被关闭了
                    console.log(e.code, e.reason);
                };
            }).catch(err => {
                console.log(err)
                reject()
            });
        });
    }
}