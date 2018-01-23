/**
 * Created by apple on 2017/7/17.
 *
 * 书城
 */
const initialSate = {
    columnList:{
        xianxia: {
            id: 22,
            link: "https://www.qidian.com/xianxia",
            type: "xianxia",
            imgUrl:require("../images/column/wuxia.jpg"),
            name:"仙侠"
        },
        kehuan:{
            id: 9,
            link: "https://www.qidian.com/kehuan",
            type: "kehuan",
            imgUrl:require("../images/column/youxi.jpg"),
            name:"科幻"
        },
        xuanhuan:{
            id: 21,
            link: "https://www.qidian.com/xuanhuan",
            type: "xuanhuan",
            imgUrl:require("../images/column/qihuan.jpg"),
            name:"玄幻"
        },
        qihuan:{
            id: 1,
            link: "https://www.qidian.com/qihuan",
            type: "qihuan",
            imgUrl:require("../images/column/qihuan.jpg"),
            name:"奇幻"
        },
        dushi:{
            id: 4,
            link: "https://www.qidian.com/dushi",
            type: "dushi",
            imgUrl:require("../images/column/xiaoyuan.jpg"),
            name:"都市"
        },
        lishi:{
            id: 5,
            link: "https://www.qidian.com/lishi",
            type: "lishi",
            imgUrl:require("../images/column/mingzhu.jpg"),
            name:"历史"
        },
        wuxia:{
            id: 2,
            link: "https://www.qidian.com/wuxia",
            type: "wuxia",
            imgUrl:require("../images/column/wuxia.jpg"),
            name:"武侠"
        },
        
        junshi:{
            id: 6,
            link: "https://www.qidian.com/junshi",
            type: "junshi",
            imgUrl:require("../images/column/junshi.jpg"),
            name:"军事"
        },
        
        lingyi:{
            id: 10,
            link: "https://www.qidian.com/lingyi",
            type: "lingyi",
            imgUrl:require("../images/column/kongbu.jpg"),
            name:"灵异"
        },
        type: {
            id: 12,
            link: "https://www.qidian.com/2cy",
            type: "2cy",
            imgUrl:require("../images/column/gudai.jpg"),
            name:"二次元"
        },
        youxi: {
            id: 7,
            link: "https://www.qidian.com/youxi",
            type: "youxi",
            imgUrl:require("../images/column/youxi.jpg"),
            name:"游戏"
        },
        tiyu: {
            id: 8,
            link: "https://www.qidian.com/tiyu",
            type: "tiyu",
            imgUrl:require("../images/column/youxi.jpg"),
            name:"体育"
        },
        xianshi:{
            id: 15,
            link: "https://www.qidian.com/xianshi",
            type: "xianshi",
            imgUrl:require("../images/column/dushi.jpg"),
            name:"现实"
        },
        lizhi:{
            id: 100,
            link: "https://www.qidian.com/xianxia",
            type: "lizhi",
            imgUrl:require("../images/column/lizhi.jpg"),
            name:"成功励志"
        }
    },
    hotList:[],
    isLoading: false,
    hotLoading: false
}

function bookCity(state = initialSate,action){
    switch (action.type){
        case "BOOK_CITY_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookCity;