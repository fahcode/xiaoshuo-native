/**
 * Created by hfhleo on 17/10/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    FlatList,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Platform,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import px from '../util/px';

import * as actions from '../actions/bookLine';
import Icon from 'react-native-vector-icons/Ionicons';

/************
规划
作品的来源统一从起点获取，只有章节列表和内容是从其它网站抓取
**********/
//navigation.state.params.leftUser()
class Main extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: "",
        headerStyle:{
            backgroundColor: "#ffb307",//rgb(46, 173, 208)rgb(255, 99, 120)rgb(102, 163, 147)
            height: px(Platform.OS === 'ios'?190:130)
        },
        headerTitleStyle:{
            color:'white'
        },
        headerLeft: (
            <TouchableOpacity onPress={ ()=> {navigation.navigate("DrawerMenu")} } >
                <Image
                   source={require("../images/icons/ic_menu_logo.png")}
                   style={{width:px(294),height:px(144),marginRight:px(50)}}
                />
            </TouchableOpacity>
        ),
        headerRight:(
            <TouchableOpacity onPress={ ()=> {navigation.navigate("Search")} } >
                <Image
                   source={require("../images/search.png")}
                   style={{width:px(54),height:px(54),marginRight:px(50)}}
                />
            </TouchableOpacity>
        )
    })
    //将要插入dom
    componentWillMount(){
    }
    //已经插入dom
    componentDidMount() {
        this.props.navigation.setParams({
                leftUser: () => this._leftUser()
        });
        this.props._getBookLine();
    }
    //将要更新
    componentWillUpdate(prevProps, prevState) {
        //console.log('App Will receive props');
    }
    //更新完成
    componentDidUpdate(prevProps, prevState) {
        //console.log('更新完成');
        //this.props._getBookLine();
    }
    //将要移出真实 DOM
    componentWillUnmount(){

    }
    //已加载组件收到新的参数时调用
    componentWillReceiveProps(nextProps) {
        if(nextProps.bookLine.isUpView){
            this.props._getBookLine(true);
            this.props._handle({
                isUpView: false
            })
            console.log('更新在读');
        }
    }
    //组件判断是否重新渲染时调用, 控制render
    /*shouldComponentUpdate(nextProps, nextState){

    }*/
    _leftUser =()=>{
        console.log('显示左边栏')
    }
    //添加书籍, 跳转到起点抓的书城数据
    _addTab = (item)=>{
        console.log(item)
    }
    _shareBoox = (id)=>{
        console.log(id)
    }
    //删除当前id的在读列表里面
    delectLineBook = (id)=>{
        this.props._delectLineBook(id)
    }
    //直接进入阅读的章节
    _bookRead = (item)=>{
        let ops = {
            id: item.id,
            name: item.name,
            rdPst: item.rdPst
        }
        this.props.navigation.navigate('BookRead', ops) 
    }
    _onRefresh = ()=>{}
    _onEndReached = ()=>{}
    //列表对象,使用属性的方式定义方法
    _renderItem = (ite)=>{

        let item = ite.item;
        //是否显示更新,只有起点的长度大于其它源
        let upicon = function(){
            if(item.ptotal<item.qidian_ptotal){
                return(
                    <Image style={styles.upIcon} source={require('../images/icons/reading__shared__bookmark_highlight.png')} resizeMode='cover'
                    />
                )
            }
        }
        //是否显示章节进度
        let isPlan = function(){
            if(!!item.ptotal && item.ptotal != 0){
                return (
                    <ImageBackground style={styles.pageNumBg} source={require('../images/icons/bookrack_colortag_uncached.png')} resizeMode='cover'>
                        <Text style={styles.pageNum}>{item.rdPst + "/" + item.ptotal}</Text>
                    </ImageBackground>
                )
            }
        };

        return (
            <TouchableHighlight 
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=> {this._bookRead(item)} }
            >
                <View style={styles.bookView}>
                    { isPlan() }
                    <View style={styles.leftImg}>
                        { upicon() }
                        <Image
                           source={ item.imgUrl!=""? {uri: item.imgUrl}: (require('../images/book-test.jpg')) }
                           style={styles.bookImage}
                         />
                    </View>
                    <View style={styles.infoTxts}>
                        <Text style={styles.bookName} numberOfLines={1}>{item.name}</Text>
                        <Text>作者：{item.author}</Text>
                        <Text style={{fontSize: px(30)}}>{item.nowPage}</Text>
                        <Text style={{fontSize: px(26)}}>{item.nowTime}</Text>
                        
                    </View>
                    <View style={styles.control}>
                        <TouchableOpacity style={styles.shareIcon} onPress={()=>{this._shareBoox(item.id)}}>
                            <Image
                                source={require('../images/icons/bookrack_icon_share.png')}
                                style={{width: px(38),height: px(41)}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.delectLineBook(item.id)}}>
                            <Image
                               source={require('../images/icons/bookrack_icon_delete.png')}
                               style={{width: px(44),height: px(44)}}
                            />
                        </TouchableOpacity>
                           
                    </View>
                </View>
            </TouchableHighlight>
        )
    };
    _keyExtractor = (item, index) => item.id;

    render() {
        console.log('render在读书架')
        let rdList  = this.props.bookLine.rdList;

        return (
            <View style={styles.container}>
                
                <FlatList
                    data={rdList}
                    keyExtractor={this._keyExtractor}
                    numColumns={1}
                    //列表的内容
                    renderItem={ this._renderItem }
                    //下拉刷新
                    //onRefresh={this._onRefresh}
                    //上提加载更多
                    //onEndReached={this._onEndReached}
                />
            </View>
        );
    }
}

/*
let rdList = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});
rdList = rdList.cloneWithRows(this.props.bookLine.rdList);
<ListView
    dataSource={ rdList }
    renderRow={ self._renderItem }
    removeClippedSubviews={ false }
></ListView>
<FlatList
    data={this.props.bookLine.rdList}
    keyExtractor={this._keyExtractor}
    numColumns={1}
    //列表的内容
    renderItem={this._renderItem}
/>*/

////将需要的state的节点注入到与此视图数据相关的组件上
function mapStateToProps(state){
    /////////只需要注入当前的节点
    return {bookLine: state.bookLine}
}
////将需要绑定的actions注入到组件上,并合并dispatch方法
function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _getBookLine:(noDele)=>{
            dispatch(actions.getBookLine(noDele))
        },
        _delectLineBook:(id)=>{
            dispatch(actions.delectLineBook(id))
        }
    }
}

const BookLine = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);


export default BookLine;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#eee",
        justifyContent:"center",
        backgroundColor: "#eee"
    },
    bookView:{
        position: "relative",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(100, 53, 201, 0.1)',
        padding: px(20),
        marginLeft: px(26),
        marginRight: px(26),
        marginTop: px(20),
        marginBottom: px(20),
        backgroundColor: "#fff"
    },
    last:{
        backgroundColor:"white",
        width:px(180),
        height:px(240),
        overflow:"hidden",
        alignItems:"center",
        justifyContent:"center"
    },
    bookImage:{
        width:px(180),
        height:px(240)
    },
    bookName:{
        fontSize:px(50),
        color:"#666",
        marginBottom:px(8)
    },
    newsPage: {
        fontSize:px(34),
        color:"#aaa",
        marginBottom: px(8)
    },
    readInfo:{
        fontSize:px(28),
        color:"#aaa",
    },
    bookAdd:{
        width:px(104),
        height:px(110)
    },
    pageNumBg: {
        position: "absolute",
        top: px(-10),
        right: px(5),
        width: px(208),
        height: px(56),
        justifyContent: "center",
        alignItems: "center",
    },
    pageNum: {
        color: "#fff",
        fontSize:px(34),
        marginLeft: px(10),
    },
    leftImg: {
        position: "relative",
        width:px(180),
        height:px(240),
        borderRadius:px(12),
        marginRight: px(20),
        overflow:"hidden"
    },
    upIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        width: px(46),
        height: px(80),
        zIndex: 10,
    },
    infoTxts: {
        flex: 1, 
        justifyContent: "space-around",
        paddingTop: px(30),
        paddingBottom: px(30),
    },
    control: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        bottom: px(30),
        right: px(30),
        justifyContent: "center"
    },
    shareIcon:{
        marginRight: px(30),
    }
});