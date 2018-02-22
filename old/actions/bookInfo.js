/**
 * Created by apple on 2017/7/17.
 *
 * 书籍详情
 */
import Fetch from '../util/fetch';

export function handle(data){
    return {
        type:"BOOK_INFO_HANDLE",
        data
    }
}

//获取书籍详情
export function bookInfo(options){
    return dispatch => {
        Fetch({
            url:"bookInfo",
            type:"GET",
            data:options,
            success:function(data){
                if(data.status==1){
                    dispatch(handle({
                        book:data.data
                    }))
                }
            }
        })
    }
}

//获取猜你喜欢
export function getLove(options){
    return dispatch => {
        Fetch({
            url:"getLove",
            type:"GET",
            data:options,
            success:function(data){
                if(data.status==1){
                    dispatch(handle({
                        loveList:data.data
                    }))
                }
            }
        })
    }
}