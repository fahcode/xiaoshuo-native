/**
 * Created by apple on 2017/7/20.
 *
 * 搜索
 */
import Fetch from '../util/fetch';

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
            status:true
        }))

        Fetch({
            url:"search",
            data:options,
            success:function(data){
                if(data.status==1){
                    dispatch(handle({
                        list:data.data,
                        status:false
                    }))
                }
            }
        })
    }
}