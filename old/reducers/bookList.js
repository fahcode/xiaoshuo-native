/**
 * Created by apple on 2017/7/17.
 *
 * 书籍列表
 */
const initialSate = {
    list:[],
    nowPage:1,
    pageSize:10,
    isLoadUpdate:false,
    isLoadMore:false
}

function bookList(state = initialSate,action){
    switch (action.type){
        case "BOOK_LIST_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookList;