/**
 * Created by apple on 2017/8/15.
 *
 * 本地存储数据
 */
const Realm = require('realm');

//模型版本号
const version = 1;

//本地缓存小说
const BookSchema = {
    name: 'Book',
    primaryKey: 'id',
    properties: {
        id:'int',//小说ID
        name:  'string',//小说名称
        imgUrl:'string',//图片URL
        introduce: {type: 'string', default: ""},//作品简介
        author: 'string',//作者,
        authorId: 'int',
        pageNumbe: 'string',//总字数
        nowPage: 'string',//最新章节
        nowTime: 'string',//最新更新的时间
        comment: {type: 'int', default: 1},//评论次数
        //commentCon: {type: 'list',objectType:'Comment'},//评论内容，前15条
        ptotal: {type: 'int', default: 1}, //小说阅读总章节数
        rdPst:{type: 'int', default: 1},//小说阅读到第几章节
        isRead:{type:'bool',default:false},//是否阅读
        //pageList: {type: 'list', objectType:'Content'},//小说章节内容列表
        //authorBooks: {type: 'list',objectType:'AuthorBook'},//作者其它书籍
        rdDate:{type:'date',default:new Date()},//最近阅读的时间,
        isAdd: {type:'bool',default:false},//是否加入到书架
        addDate:{type:'date',default:new Date()}//添加入书架的时间
    }
};

//小说章节
const ContentSchema = {
    name:'Content',
    primaryKey: 'pid',
    properties:{
        bid: 'int',
        name:'string',
        pid:'int',
        info: 'string',
        link: 'string',
        isvip: {type:'bool',default:false},
        column: {type: 'int', default: 1},
        content: {type: 'string', default: ""}
    }
}

//小说评论
const CommentSchema = {
    name:'Comment',
    primaryKey: 'id',
    properties:{
        id: 'int',
        ico:'string',
        name: 'string',
        extend: 'string',
        time: 'string'
    }
}
//作者其它书籍
const AuthorBookSchema = {
    name:'AuthorBook',
    primaryKey: 'id',
    properties:{
        //小说ID
        id:'int',
        //小说名称
        name: 'string',
        //图片URL
        imgUrl:'string',
        //作品简介
        introduce: {type: 'string', default: ""},
        //总字数
        pageNumbe: 'string',
        //最新章节
        nowPage: 'string',
        //最新更新的时间
        nowTime: 'string'
    }
}
//本地小说阅读页设置
const SettingSchema = {
    name: 'Setting',
    primaryKey: 'id',
    properties: {
        id:'string',
        backStyle:{type: 'int'},
        fontSizeVal:{type: 'int'},
        lightVal:{type: 'int'},
    }
};

////建表
const realmDB = new Realm({schema: [BookSchema, ContentSchema, CommentSchema, AuthorBookSchema, SettingSchema], schemaVersion: version});

/*export const _RM = (type, options) => {
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
}*/
export default realmDB