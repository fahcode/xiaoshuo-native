/**
 * Created by apple on 2017/7/17.
 *
 * 搜索
 */
const initialSate = {
    searchVal:'',
    list:null,
    status:false
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