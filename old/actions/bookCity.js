/**
 * Created by apple on 2017/7/17.
 *
 * 书城
 */
import Fetch from '../util/fetch';

export function handle(data){
    return {
        type:"BOOK_CITY_HANDLE",
        data
    }
}

//获取书籍分类
export function getMenu(){

}

//获取热门书籍
export function getHot(){
    return dispatch => {
        Fetch({
            url:"getHot",
            type:"GET",
            success:function(data){
                console.log(data)
                if(data.status==1){
                    dispatch(handle({
                        hotList:data.data
                    }))
                }
            }
        })
    }
}