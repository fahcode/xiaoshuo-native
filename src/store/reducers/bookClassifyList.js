/**
 * Created by apple on 2017/7/17.
 *
 * 书城
 */
const initialSate = {
    types:[],
    
    bookList:[],
    isLoading: false,
    moreLoading: false,
    isOpen: true,
    seleIdx: 0,
    seleName: '',
    chanId: 0,
    subCateId: 0,
    orderId: '',
    page: 1,
    ptype: [
        {name: '人气排序', orderId: ''},
        {name: '更新时间', orderId: 5},
        {name: '总收藏', orderId: 11},
        {name: '总字数', orderId: 3},
        {name: '会员点击', orderId: 1, child: [
            {name: '会员周点击', orderId: 1},
            {name: '会员月点击', orderId: 7},
            {name: '会员总点击', orderId: 8}
        ]},
        {name: '推荐票', orderId: 9, child: [
            {name: '周推荐票', orderId: 9},
            {name: '月推荐票', orderId: 10},
            {name: '总推荐票', orderId: 2}
        ]}
        
    ],
    seleTypeIdx: 0
}

function bookClassifyList(state = initialSate,action){
    switch (action.type){
        case "BOOK_CLASS_IFY_LIST_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookClassifyList;