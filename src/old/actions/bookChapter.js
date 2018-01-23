/**
 * Created by apple on 2017/8/10.
 *
 * 小说目录列表
 */
import Fetch from '../util/fetch';
const Realm = require('realm');
import * as RM from '../util/realm';

export function handle(data){
    return {
        type:"BOOK_CHAPTER_HANDLE",
        data
    }
}

//获取目录列表
export function getChapter(options){
    return dispatch => {
        dispatch(handle({
            loading:true
        }))

        Realm.open({schema: [RM.BookSchema,RM.ContentSchema,RM.SettingSchema],schemaVersion: RM.version})
            .then(realm => {
                let book = realm.objects('Content').filtered('column = '+options.id);
                if(book.length>0){
                    dispatch(handle({
                        list:book,
                        loading:false
                    }))
                }else{
                    Fetch({
                        url:"getChapter",
                        type:"GET",
                        data:{
                            id:options.id
                        },
                        success:function(data){
                            if(data.status==1){
                                dispatch(handle({
                                    list:data.data,
                                    loading:false
                                }))
                            }
                        }
                    })
                }
        });
    }
}
