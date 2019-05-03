/**
 * Created by apple on 2017/8/10.
 *
 * 小说目录列表
 */
const initialSate = {
    list:[],
    oldSourceType: 'qidian',
    sort: "asc",
    ////当前阅读第几章，控制显示的位置
    rdPst: 1,
    loading: false,
    ////来源列表
    sourceList: [],
    //是否显示来源列表
    showPop: false,
    isUpView: false
}

function bookChapter(state = initialSate, action){
    switch (action.type){
        case "BOOK_CHAPTER_HANDLE":
            return Object.assign({}, state, action.data)

        default :
            return state
    }
}

export default bookChapter;