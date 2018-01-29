/**
 * Created by apple on 2017/7/17.
 *
 * 书籍详情
 */
import Fetch from '../util/fetch';
///////当前props修改会影响的页面
import * as bookCase from './bookCase';

export function handle(data){
    return {
        type:"BOOK_INFO_HANDLE",
        data
    }
}

//获取书籍详情
export function bookInfo(options){
    return dispatch => {
        /////先清空数据
        dispatch(handle({
            book: {},
            isLoad: true
        }));

        /*storage.load({
            key: 'bookInfo',
            id: options.bid
        }).then(ret => {
            ///直接从书架拿
            dispatch(handle({
                book: ret,
                isLoad: false
            }));
        }).catch(err => {
            //////数据里面
            if(err.name == "NotFoundError") {
                getData();
            }
        });*/
        //function getData(){
            Fetch({
                url:"bookInfo",
                type:"GET",
                data: {qidianid: options.qidianid, authorId: options.authorId},
                success:function(data){
                    if(data.status==1){
                        dispatch(handle({
                            book: data.data,
                            isLoad: false
                        }));
                        console.log('临时保存'+ data.data)
                        //临时保存
                        /*storage.save({
                            key: "bookInfo",
                            id: options.bid,  
                            data: data.data
                        });*/
                    }
                },
                error: function(result){
                    dispatch(handle({
                        book: {},
                        isLoad: false
                    }))
                },
                reset: function(result){
                    dispatch(handle({
                        book: {},
                        isLoad: false
                    }))
                }
            })
        //}
    }
}
