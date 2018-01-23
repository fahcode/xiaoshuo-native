/**
 * Created by apple on 2017/7/17.
 *
 * 书城
 */
import Fetch from '../util/fetch';

export function handle(data){
    return {
        type:"BOOK_RANK_LIST_HANDLE",
        data
    }
}

//获取排行分类
export function getMenu(option){
    return dispatch => {

    }
}

//获取首页的强推
export function getRanks(option, old){
    return dispatch => {
        Fetch({
            url:"getRanks",
            type: "GET",
            data: {id: option.id, clasfy: option.clasfy, type: option.type, name: option.name, page: option.page},
            success:function(data){
                let list = data.data;

                if(data.status==1){
                    dispatch(handle({
                        bookList: old.concat(list),
                        isLoading: false,
                        moreLoading: false,
                        isOpen: false,
                        page: option.page,
                        seleType: option.type,
                        seleName: option.name,
                    }))
                }
            }
        })
    }
}
