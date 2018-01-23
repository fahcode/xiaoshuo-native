/**
 * Created by apple on 2017/7/17.
 *
 *书架
 */
const initialSate = {
    list:[
        {
            id:"last"
        }
    ],
    isUpdate:false//触发更新书架信息
}

function bookCase(state = initialSate,action){
    switch (action.type){
        case "BOOK_CASE_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookCase;