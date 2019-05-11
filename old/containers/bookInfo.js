/**
 * Created by apple on 17/7/4.
 *
 * 书籍详情页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import pxToDp   from '../util/px';
import * as actions from '../actions/bookInfo';
import * as caseActions from '../actions/bookCase';
import BookListComponent from '../components/bookList';
const Realm = require('realm');
import * as RM from '../util/realm';


class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor:'#ffb307',
            height:pxToDp(Platform.OS === 'ios'?210:150)
        },
        headerTitleStyle:{
            color:'white'
        },
        headerBackTitle:null,
        headerTintColor:"white",
        headerTitle:`${navigation.state.params.name}`
    })

    //书籍点击
    bookTab(id,name){
        this.props.navigation.navigate("BookInfo",{id,name})
    }

    //阅读书籍
    readTab(){
        Realm.open({schema: [RM.BookSchema,RM.ContentSchema,RM.SettingSchema],schemaVersion: RM.version})
            .then(realm => {
                realm.write(() => {
                    let pid = 1;
                    let book = realm.objects('Book').filtered('id = '+this.props.navigation.state.params.id);
                    if(book.length>0){
                        pid = book[0].pid
                    }
                    this.props.navigation.navigate("BookRead",{
                        id:this.props.navigation.state.params.id,
                        pid:1,
                        name:this.props.navigation.state.params.name
                    })
                });
        });
    }

    //加入书架
    addTab(){
        Realm.open({schema: [RM.BookSchema,RM.ContentSchema,RM.SettingSchema],schemaVersion: RM.version})
            .then(realm => {
                realm.write(() => {
                    let book = realm.objects('Book').filtered('id = '+this.props.navigation.state.params.id);
                    if(book.length==0){
                        realm.create('Book', {
                            id:this.props.navigation.state.params.id,
                            name:this.props.navigation.state.params.name,
                            imgUrl:this.props.bookInfo.book.imgUrl,
                            list:[]
                        });
                        this.props._updateCase({
                            isUpdate:true
                        })
                    }
                    alert('已经添加到书架')
                });
        });
    }

    _keyExtractor = (item, index) => item.id;
    //渲染热门推荐书籍数据
    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>this.bookTab(item.id,item.name)}>
                <BookListComponent data={item} />
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.props._bookInfo({
            id:this.props.navigation.state.params.id
        })

        this.props._getLove()
    }

    render() {
        return (
            <ScrollView>
                {/*栏目分类*/}
                <View style={styles.columnWrap}>
                    <View style={styles.listView}>
                        <Image
                            source={{uri:this.props.bookInfo.book.imgUrl}}
                            style={styles.listImage}
                        />
                        <View style={styles.rightView}>
                            <Text style={styles.listName}>{this.props.bookInfo.book.name}</Text>
                            <Text style={styles.listAuthor}>作者: {this.props.bookInfo.book.author}</Text>
                            <Text style={styles.listInfo} >章节: 共{this.props.bookInfo.book.chapter}章</Text>
                            <View style={styles.btnView}>
                                <TouchableOpacity
                                    style={styles.addBtn}
                                    onPress={()=>this.addTab()}
                                >
                                    <Text style={styles.addBtnText}>加入书架</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.readBtn}
                                    onPress={()=>this.readTab()}
                                >
                                    <Text style={styles.readBtnText}>开始阅读</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/*内容介绍*/}
                <View style={styles.hotWrap}>
                    <View style={styles.hotTitle}>
                        <View style={styles.leftBorder}></View>
                        <Text style={styles.hotText}>图书简介</Text>
                    </View>
                    <View>
                        <Text style={styles.content}>
                            {this.props.bookInfo.book.info}
                        </Text>
                    </View>
                </View>

                {/*猜你喜欢*/}
                <View style={styles.hotWrap}>
                    <View style={styles.hotTitle}>
                        <View style={styles.leftBorder}></View>
                        <Text style={styles.hotText}>猜你喜欢</Text>
                    </View>
                    <FlatList
                        style={styles.hotList}
                        data={this.props.bookInfo.loveList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        />
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    columnWrap:{
        backgroundColor:"white",
    },

    listView:{
        padding:pxToDp(50),
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"#dcdcdc"
    },
    listImage:{
        width:pxToDp(280),
        height:pxToDp(380),
        marginRight:pxToDp(40)
    },
    rightView:{
        flexDirection:"column",
        flex:1
    },
    listName:{
        fontSize:pxToDp(50),
        color:"#333",
        marginTop:pxToDp(4),
        marginBottom:pxToDp(16)
    },
    listInfo:{
        fontSize:pxToDp(40),
        color:"#999",
        //lineHeight:pxToDp(44),
        marginBottom:0,
    },
    listAuthor:{
        fontSize:pxToDp(40),
        color:"#999",
        marginBottom:pxToDp(16)
    },
    hotWrap:{
        flex:1,
        backgroundColor:"white",
        padding:pxToDp(50),
        paddingBottom:pxToDp(25),
        marginTop:pxToDp(30)
    },
    hotTitle:{
        flexDirection:"row",
        alignItems:"center"
    },
    leftBorder:{
        width:pxToDp(16),
        height:pxToDp(48),
        backgroundColor:"#ffb307",
        marginRight:pxToDp(30)
    },
    hotText:{
        fontSize:pxToDp(42),
        color:"#333"
    },
    content:{
        lineHeight:pxToDp(70),
        fontSize:pxToDp(40),
        color:"#999",
        marginTop:pxToDp(15)
    },
    btnView:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:pxToDp(66)
    },
    addBtn:{
        borderWidth:1,
        borderColor:"#ffb307",
        padding:pxToDp(60),
        paddingTop:pxToDp(30),
        paddingBottom:pxToDp(30),
        borderRadius:pxToDp(12),
    },
    readBtn:{
        backgroundColor:"#ffb307",
        padding:pxToDp(60),
        paddingTop:pxToDp(30),
        paddingBottom:pxToDp(30),
        borderRadius:pxToDp(12),
    },
    addBtnText:{
        color:"#ffb307"
    },
    readBtnText:{
        color:"white"
    }
});

function mapStateToProps(state){
    return state;
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _bookInfo:(options)=>{
            dispatch(actions.bookInfo(options))
        },
        _getLove:(options)=>{
            dispatch(actions.getLove(options))
        },
        _updateCase:(options)=>{
            dispatch(caseActions.handle(options))
        }
    }
}

const BookInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);


export default BookInfo;