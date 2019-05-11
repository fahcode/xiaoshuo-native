/**
 * Created by hfhleo on 17/10/16.
 *
 * 在读书架
 */
const initialSate = {
    rdList: [],
    isUpView: false,//是否更新视图
}

function bookLine(state = initialSate, action){
    switch (action.type){
        case "BOOK_LINE_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookLine;