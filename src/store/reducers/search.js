/**
 * Created by apple on 2017/7/17.
 *
 * 搜索
 */
const initialSate = {
    searchVal:'',
    list: null,
    //控制单次点击
    status:false,
    isLoad: false
}

function search(state = initialSate,action){
    switch (action.type){
        case "SEARCH_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default search;