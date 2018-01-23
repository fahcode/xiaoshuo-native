/**
 * Created by apple on 2017/7/17.
 *
 * 书籍列表页
 */
import Fetch from '../util/fetch';

export function handle(data){
    return {
        type:"BOOK_LIST_HANDLE",
        data
    }
}

//获取当前分类列表
export function getList(options){
    return dispatch => {
        if(options.text === 'up'){
            options.nowPage=1;
            dispatch(handle({
                isLoadUpdate:true
            }))
        }

        if(options.text === 'more'){
            dispatch(handle({
                isLoadMore:true
            }))
        }

        Fetch({
            url:"getList",
            type:"GET",
            data:{
                name:options.name,
                nowPage:options.nowPage,
                pageSize:options.pageSize
            },
            success:function(data){
                if(data.status==1){
                    if(options.text === 'up'){
                        dispatch(handle({
                            list:data.data,
                            nowPage:2,
                            isLoadUpdate:false
                        }))
                    }

                    if(options.text === 'more'){
                        dispatch(handle({
                            list:options.data.concat(data.data),
                            nowPage:++options.nowPage,
                            isLoadMore:false
                        }))
                    }

                }
            },
            reset: function(result){
            }
        })
    }
}
