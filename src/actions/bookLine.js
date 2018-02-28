/**
 * Created by hfhleo on 17/10/16.
 *
 * 书架
 */

export function handle(data){
    return {
        type:"BOOK_LINE_HANDLE",
        data
    }
}

//获取本地书架列表
export function getBookLine(noDele){
    return dispatch => {
        //按照阅读时间排序
        storage.getAllDataForKey('bookInfo').then(ret => {

            let arr = [];
            /////排序规则，添加
            for(let i=0;i<ret.length;i++){
                if(ret[i].isAdd){
                    //只有在读的
                    if(ret[i].isRead) arr.push(ret[i]);
                }else{
                    if(!!noDele) return false;
                    //////删除残留的临时书籍
                    storage.remove({
                        key: 'bookInfo',
                        id: ret[i].bid
                    });
                }
            }
            //根据readTime排序,大到小
            if(ret.length>1) arr.sort(compare("readTime"))

            dispatch(handle({
                rdList: arr
            }))
        }).catch(err => {
            console.log(err);
        });
    }
}

//删除在读的书籍,修改isread
export function delectLineBook(bid, tag){
    return dispatch => {
        storage.load({
            key: 'bookInfo',
            id: bid
        }).then(old => {
            var dd = Object.assign({}, old, {isRead: false});
            //保存
            storage.save({
                key: "bookInfo",
                id: bid,  
                data: dd
            });
            /////更新在读视图
            dispatch( handle({isUpView: true}) )
        }).catch(err => {
        
        });
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