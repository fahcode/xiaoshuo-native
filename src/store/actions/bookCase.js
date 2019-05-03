/**
 * Created by apple on 2017/7/17.
 *
 * 书架
 */
import Fetch from '../../util/fetch';
import Socket from '../../util/Socket';
///////当前read的props修改会影响的页面
import * as bookChapter from './bookChapter';

export function handle(data){
    return {
        type:"BOOK_CASE_HANDLE",
        data
    }
}

//获取本地书架列表
export function getBookCase(noDele){
    return dispatch => {
        // 获取某个key下的所有数据(仅key-id数据)
        storage.getAllDataForKey('bookInfo').then(users => {
            let arr = [];
            for(let i=0;i<users.length;i++){
                //如果不是书架内容,直接删除内容
                if(users[i].isAdd){
                    arr.push(users[i]);
                }else{
                    if(!!noDele) return false;
                    //////删除残留的临时书籍
                    storage.remove({
                        key: 'bookInfo',
                        id: users[i].bid
                    });
                }
            }
            //根据addTime排序,大到小
            if(users.length>1) arr.sort(compare("readTime"))
                
            //arr.push({id:'last'})
            
            dispatch(handle({
                list: arr
            }))
        }).catch(err => {
            console.log(err);
        });
    }
}
//更新本地书架的书籍
export function updataBookCase(){
    return dispatch => {
        // 获取某个key下的所有数据(仅key-id数据)
        storage.getAllDataForKey('bookInfo').then(users => {

            let ws = new Socket('updataBookList');
            ws.onopen = () => {
                //过滤非书架
                let list = users.filter((item)=>(
                    !!item.isAdd
                ))
                // 打开一个连接
                for (let i = 0; i < list.length; i++) {
                    let nowd = list[i];
                    if (nowd.isAdd) {
                        let options = {
                            len: list.length,
                            bid: nowd.bid,
                            bookID: nowd.bookID,
                            name: nowd.name,
                            sourceType: nowd.sourceType,
                            listLink: encodeURIComponent(nowd.listLink),
                            charset: nowd.charset
                        }
                        ws.send(JSON.stringify(options)); // 发送一个消息
                    }
                }
                
            };
            ws.onmessage = (e) => {
                // 接收到了一个消息
                let data = JSON.parse(e.data || '{}');
                console.log(data)
                if (data.status == 1){
                    let d_result = data.data.result;
                    if (d_result.pageList.length <= 0) return;
                    //////先找对应的数据，再使用合并
                    storage.load({
                        key: 'bookInfo',
                        id: d_result.bid
                    }).then(ret => {
                        //列表不改变，删除pageList，不合并保存这个值
                        if (ret.pageList.length == d_result.pageList.length) {
                            delete d_result.pageList;
                        }
                        // 如果找到数据，合并后保存
                        let adds = Object.assign({}, ret, d_result);
                        storage.save({
                            key: "bookInfo",
                            id: d_result.bid,
                            data: adds
                        }).then(()=>{
                            dispatch(handle({ isUpView: true }));
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                } else if (data.status == 100) {
                    console.log('搜索失败');
                }else if (data.end){
                    dispatch(handle({isUpdata: false }));
                    ws.close();
                }else{
                    dispatch(handle({isUpdata: false }));
                    ws.close();
                    console.log(data.msg)
                }
            };

            ws.onerror = (e) => {
                dispatch(handle({isUpdata: false }));
                // 发生了一个错误
                console.log(e.message);
            };

            ws.onclose = (e) => {
                // 连接被关闭了
                console.log(e.code, e.reason);
            };
                
        }).catch(err => {
            dispatch(handle({ isUpdata: false }));
            console.log(err);
        });
    }
}

//删除书籍
export function delectBook(options, tag){
    return dispatch => {
        // 删除单个数据
        storage.remove({
            key: 'bookInfo',
            id: options.bid
        });
        /////设置书架更新
        dispatch( handle({isUpView:true}) )
        
    }
}


function compare(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}