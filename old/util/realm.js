/**
 * Created by apple on 2017/8/15.
 *
 * 本地存储数据
 */
const Realm = require('realm');

//模型版本号
export const version = 6;

//本地缓存小说
export const BookSchema = {
    name: 'Book',
    primaryKey: 'id',
    properties: {
        name:  'string',//小说名称
        imgUrl:'string',//图片URL
        id:'int',//小说ID
        pid:{type: 'int', default: 1},//小说阅读到第几章节
        isRead:{type:'bool',default:false},//是否阅读
        list:{type: 'list',objectType:'Content'},//小说章节内容列表
        date:{type:'date',default:new Date()}
    }
};

//小说章节
export const ContentSchema = {
    name:'Content',
    primaryKey: 'id',
    properties:{
        name:'string',
        id:'int',
        pid:'int',
        column:'int',
        content:'string'
    }
}

//本地小说阅读页设置
export const SettingSchema = {
    name: 'Setting',
    primaryKey: 'id',
    properties: {
        id:'string',
        backStyle:{type: 'int'},
        fontSizeVal:{type: 'int'},
        lightVal:{type: 'int'},
    }
};

export function RM(type,options){
    switch (type) {
        //加入书架
        case 'addBook':
            Realm.open({schema: [BookSchema,ContentSchema],schemaVersion: version})
                .then(realm => {
                    realm.write(() => {
                        realm.create('Book', options);
                    });
            });
            break;
        //读取书架
        case 'getBook':
            Realm.open({schema: [BookSchema,ContentSchema],schemaVersion: version})
                .then(realm => {
                   let list = realm.objects('Book');
                   return list;
            });
            break;
        //读取目录
        case 'list':
            Realm.open({schema: [ContentSchema],schemaVersion: version})
                .then(realm => {
                    let list = realm.objects('Content');
                    return list.filtered('column = '+options.column);
            });
            break;
        //读取章节
        case 'content':
            Realm.open({schema: [ContentSchema],schemaVersion: version})
                .then(realm => {
                    let list = realm.objects('Content');
                    return list.filtered('pid = '+options.pid+' AND column = '+options.list);
            });
            break;
        //下载书籍
        case 'down':
            Realm.open({schema: [BookSchema,ContentSchema],schemaVersion: version})
                .then(realm => {
                    realm.write(() => {
                        realm.create('Book', options);
                    });
            });
            break;
        //删除书籍
        case 'delete':
            Realm.open({schema: [BookSchema,ContentSchema],schemaVersion: version})
                .then(realm => {
                    realm.write(() => {
                        let book = realm.create('Book').filtered('id = '+options.id);
                        realm.delete(book);
                    });
            });
            break;
        //获取设置
        case 'getSet':
            Realm.open({schema: [SettingSchema],schemaVersion: version})
                .then(realm => {
                    let list = realm.objects('Setting');
                    return list;
            });
            break;
        //存储设置
        case 'set':
            Realm.open({schema: [SettingSchema],schemaVersion: version})
                .then(realm => {
                    realm.write(() => {
                        let book = realm.create('Setting',options);
                        if(book.length==0){
                            realm.create('Setting',options)
                        }else{
                            book[0]=options
                        }
                    });
            });
            break;
        default :
            break;
    }
}