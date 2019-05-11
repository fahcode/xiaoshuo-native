/**
 * Created by apple on 2017/7/17.
 *
 * 分类书库
 */
import Fetch from '../../util/fetch';

export function handle(data){
    return {
        type:"BOOK_CLASS_IFY_LIST_HANDLE",
        data
    }
}

//获取分类对应的排行数据
export function getLists(option, old){
    console.log('参数'+JSON.stringify(option));
    let orderId = !!option.orderId? option.orderId: '';
    return dispatch => {
        console.log('开始请求');
        Fetch({
            url:"getClfBookList",
            type: "GET",
            data: {link: option.link, chanId: option.chanId, subCateId: option.subCateId, orderId: orderId, page: option.page},
            success:function(data){
                let list = data.data;
                console.log(list)

                if(data.status==1){
                    dispatch(handle({
                        bookList: old.concat(list),
                        isLoading: false,
                        moreLoading: false,
                        isOpen: false,
                        page: option.page,
                        seleIdx: (option.id),
                        seleName: option.text,
                        chanId: option.chanId,
                        subCateId: option.subCateId,
                        orderId: orderId,
                    }))
                }
            }
        })
    }
}


//获取类别分类
export function getMenu(option){
    return dispatch => {
        Fetch({
            url:"getClfMenus",
            type: "GET",
            data: {link: option.link},
            success:function(data){
                let list = data.data;
                if(data.status==1){
                    dispatch(handle({
                        types: list
                    }))
                    //请求默认数据
                    dispatch(getLists({
                        id: list[0].id,
                        text: list[0].text,
                        chanId: list[0].chanId,
                        subCateId: list[0].subCateId,
                        page: 1
                    }, []))
                }
            }
        })
    }
}

