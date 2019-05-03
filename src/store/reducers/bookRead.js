/**
 * Created by apple on 2017/7/17.
 *
 * 小说阅读页
 */
const initialSate = {
    loading:false,//章节内容请求状态
    backStyle:0,//皮肤样式
    fontSizeVal: 24,//字体大小
    bookId:'',//小说ID
    bookName:'',//小说名字
    chapter: 1,//小说当前章节
    ptotal: 1,//小说总章节
    content: '',//章节内容
    title: '',//章节标题
    showMenu: false,//显示菜单
    showPop: false,
    chapterSliderVal: 0,//章节进度值
    lightVal: 0.5,//屏幕亮度0-1
    sysLight: true, //是否使用系统亮度
    bottomNavModel: 0,//默认0 为主界面，1为目录界面，2为文字设置，3为主题亮度，4为缓存下载
    language: false,//默认为简体，当为TRUE表示为繁体
    volume: 0, //音量0-1
    autoSpeed: 0, //自动播放速度

    isAdd: false,//是否已经加入书架，，默认不加入,
    ctOffset: {x: 0, y: 0}
}

function bookRead(state = initialSate,action){
    switch (action.type){
        case "BOOK_READ_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default bookRead;