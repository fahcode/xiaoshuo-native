/**
 * Created by apple on 2017/7/17.
 *
 * 书城
 */
const initialSate = {
    types:[
        {id: 7, type: "qiantui", name: "本周强推"},
        {id: 1, type: "hotsales", name: "24小时热销榜"},
        {id: 2, type: "newvipclick", name: "新锐会员周点击榜"},
        {id: 3, type: "click", name: "会员点击榜"},
        {id: 4, type: "recom", name: "推荐票榜"},
        {id: 5, type: "collect", name: "收藏榜"},
        {id: 6, type: "fin", name: "完本榜"},
    ],
    bookList:[],
    isLoading: false,
    moreLoading: false,
    isOpen: true,
    seleType: "qiantui",
    seleName: "本周强推",
    page: 1,
}

function bookRankList(state = initialSate,action){
    switch (action.type){
        case "BOOK_RANK_LIST_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookRankList;