/**
 * Created by apple on 2017/7/17.
 *
 * 书城
 */
import Fetch from '../../util/fetch';

export function handle(data){
    return {
        type:"BOOK_CITY_HANDLE",
        data
    }
}

//获取书籍分类
export function getMenu(){

}

//获取首页的强推
export function getHot(oldList, type){
    return dispatch => {
        Fetch({
            url:"getHot",
            type:"GET",
            data: {type: type},
            success:function(data){
                let list = data.data;

                if(data.status==1){
                    dispatch(handle({
                        hotList: oldList.concat(list),
                        isLoading: false,
                        hotLoading: false
                    }))
                }
            }
        })
    }
}