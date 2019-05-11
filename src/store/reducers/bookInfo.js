/**
 * Created by apple on 2017/7/17.
 */
const initialSate = {
    book:{},
    souceBookList:[],
    Loading: true,
    isAdd: false,
    dialog:{
        show:false,
        content:''
    }
}

function bookInfo(state = initialSate,action){
    switch (action.type){
        case "BOOK_INFO_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookInfo;