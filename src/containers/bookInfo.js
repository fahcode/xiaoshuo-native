/**
 * Created by hfhleo on 17/10/16.
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
import px   from '../util/px';
import * as actions from '../actions/bookInfo';

import * as caseActions from '../actions/bookCase';
import * as lineActions from '../actions/bookLine';
import * as searchActions from '../actions/search';

import Loading from '../components/loading';
/************
规划
作品图片，作品作者，作品介绍，作品评论，起点获取
作品列表，可以选择获取来源
**********/

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor:'#ffb307',
            height:px(Platform.OS === 'ios'?190:130)
        },
        headerTitleStyle:{
            color:'white'
        },
        headerBackTitle:null,
        headerTintColor:"white",
        headerTitle:`${navigation.state.params.item.name}`
    })

    //书籍点击
    bookTab(qidianid,name){
        this.props.navigation.navigate("BookInfo",{qidianid: qidianid,name: name})
    }

    //阅读书籍
    readBook(){
        let book = this.props.bookInfo.book;
        /*this.props.navigation.navigate("BookRead", {
            id: this.props.bookInfo.book.id, 
            rdPst: this.props.bookInfo.book.rdPst,
            //////因为需要不加入书架阅读
            data: this.props.bookInfo.book
        });*/
        this.props.navigation.navigate('BookChapter', {qidianid: book.qidianid, name: this.props.navigation.state.params.item.name, sourceType: book.sourceType, isAdd: this.props.bookInfo.isAdd})
        //return false;
    }

    //加入书架
    addBook(e){
        let item = this.props.bookInfo.book;
        item.isAdd = true;
        item.addDate = new Date().getTime();
        //////执行add action,true 是否请求详细信息
        this.props._addBook(item, null, false);
    }

    _keyExtractor = (item, index) => item.bid;
    //渲染热门推荐书籍数据
    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>this.bookTab(item.qidianid,item.name)}>
                <View></View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        ////获取数据数据
        this.props._bookInfo({
            qidianid: this.props.navigation.state.params.item.qidianid,
            authorId: this.props.navigation.state.params.item.authorId
        })
        //this.props._getLove()
    }
    //已加载组件收到新的参数时调用
    componentWillReceiveProps(nextProps) {
    }
    componentWillUnmount(){
        /*console.log('删除临时书籍！')
        let id = this.props.navigation.state.params.item.id;
        storage.load({
            key: 'bookInfo',
            id: id
        }).then(ret => {
            // 删除临时的书籍。
            if(!ret.isAdd){
                storage.remove({
                    key: 'bookInfo',
                    id: id
                });
            };
            
        });*/
    }
    render() {
        if(this.props.bookInfo.isLoad){
            return <Loading />
        };
        ////是否显示加入书架
        let shujiaBtn = ()=>{
            if(this.props.bookInfo.isAdd){
                return(
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={()=>{}}
                    >
                        <Text style={styles.addBtnText}>已在书架</Text>
                    </TouchableOpacity>
                )
            }else{
                return(
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={()=>this.addBook()}
                    >
                        <Text style={styles.addBtnText}>加入书架</Text>
                    </TouchableOpacity>
                )
            }
        }
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
                            <Text style={styles.listInfo} >章节: 共{this.props.bookInfo.book.ptotal}章</Text>
                            <View style={styles.btnView}>
                                { shujiaBtn() }
                                <TouchableOpacity
                                    style={styles.readBtn}
                                    onPress={()=>this.readBook()}
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
                            {this.props.bookInfo.book.introduce}
                        </Text>
                    </View>
                </View>

                {/*来源数据*/}
                <View style={styles.hotWrap}>
                    <View style={styles.hotTitle}>
                        <View style={styles.leftBorder}></View>
                        <Text style={styles.hotText}>来源数据</Text>
                    </View>
                    <FlatList
                        style={styles.hotList}
                        data={this.props.bookInfo.souceBookList}
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
        padding:px(50),
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"#dcdcdc"
    },
    listImage:{
        width:px(280),
        height:px(380),
        marginRight:px(40)
    },
    rightView:{
        flexDirection:"column",
        flex:1
    },
    listName:{
        fontSize:px(50),
        color:"#333",
        marginTop:px(4),
        marginBottom:px(16)
    },
    listInfo:{
        fontSize:px(40),
        color:"#999",
        //lineHeight:px(44),
        marginBottom:0,
    },
    listAuthor:{
        fontSize:px(40),
        color:"#999",
        marginBottom:px(16)
    },
    hotWrap:{
        flex:1,
        backgroundColor:"white",
        padding:px(50),
        paddingBottom:px(25),
        marginTop:px(30)
    },
    hotTitle:{
        flexDirection:"row",
        alignItems:"center"
    },
    leftBorder:{
        width:px(16),
        height:px(48),
        backgroundColor:"#ffb307",
        marginRight:px(30)
    },
    hotText:{
        fontSize:px(42),
        color:"#333"
    },
    content:{
        lineHeight:px(70),
        fontSize:px(40),
        color:"#999",
        marginTop:px(15)
    },
    btnView:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:px(66)
    },
    addBtn:{
        borderWidth:1,
        borderColor:"#ffb307",
        padding:px(60),
        paddingTop:px(30),
        paddingBottom:px(30),
        borderRadius:px(12),
    },
    readBtn:{
        backgroundColor:"#ffb307",
        padding:px(60),
        paddingTop:px(30),
        paddingBottom:px(30),
        borderRadius:px(12),
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
        _addBook:(options)=>{
            dispatch(searchActions.addBook(options))
        }
    }
}

const BookInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);


export default BookInfo;