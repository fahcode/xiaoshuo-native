/**
 * Created by apple on 2017/8/10.
 *
 * 小说目录列表
 */
const initialSate = {
    list:[],
    loading:false
}

function bookChapter(state = initialSate,action){
    switch (action.type){
        case "BOOK_CHAPTER_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookChapter;