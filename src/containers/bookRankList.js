/**
 * Created by apple on 17/7/3.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import px   from '../util/px';
import * as actions from '../actions/bookRankList';
import Loading from '../components/loading';
import Icon from 'react-native-vector-icons/Ionicons';
//左侧栏
import SideMenu from 'react-native-side-menu';

import * as search from '../actions/search';
import Menu from './menu';

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#ffb307',
            height: px(Platform.OS === 'ios'?190:130)
        },
        headerTitleStyle:{
            color: '#fff'
        },
        headerBackTitle: null,
        headerTitle:`${navigation.state.params.name}--排行榜`,
        headerRight:(
            <TouchableOpacity onPress={()=>{navigation.navigate("BookClassifyList", {name: navigation.state.params.name, clasfy: navigation.state.params.type, link: navigation.state.params.link})}}>
                <Image
                   source={require("../images/icons/menu_icon_file_vip.png")}
                   style={{width:px(96),height:px(96),marginRight:px(50)}}
                />
            </TouchableOpacity>
        ),
    })

    //热门推荐书籍点击
    bookTab(id,name){
        this.props.navigation.navigate("BookInfo", {id,name})
    }

    //分类点击
    listTab(name){
        this.props.navigation.navigate("BookList", {name})
    }
    //列表书籍点击
    _bookInfo(item){
        this.props.navigation.navigate("BookInfo",{item: item})
    }
    ////添加到书架
    _addBoox = (item, e)=>{

        item.isAdd = true;
        item.addDate = new Date().getTime();
        console.log(item)
        //////执行add action,true 是否请求详细信息
        this.props._addBook(item, e.taget, true);
    }
    //下拉加载更多的强推数据
    _onEndReached= ()=>{
        let oldList = this.props.bookRankList.bookList;
        //强推没有下拉加载
        if(this.props.bookRankList.seleType == "qiantui") return false;

        this.props._handle({
            moreLoading: true
        });
        this.props._getRanks({
            id: this.props.navigation.state.params.id,
            //大分类
            clasfy: this.props.navigation.state.params.type,
            type: this.props.bookRankList.seleType,
            name: this.props.bookRankList.seleName,
            page: 1 + this.props.bookRankList.page,
        }, oldList)
    }
    //点击按钮
    onMenuSelected = (type, name) =>{
        this.props._handle({
            isLoading: true,
        })
        this.props._getRanks({
            id: this.props.navigation.state.params.id,
            //大分类
            clasfy: this.props.navigation.state.params.type,
            type: type,
            name: name,
            //第一页
            page: 1,
        }, [])
    }
    //显示侧栏
    showMenu(isOpen){
        console.log(isOpen);
        this.props._handle({
            isOpen: isOpen,
        })
    }

    _keyExtractor = (item, index) => item.id+index;
    //////左侧按钮
    _leftMenu= ()=>{
        let self = this;

        let lists = this.props.bookRankList.types.map(function(ele){
            let sty = ele.type==self.props.bookRankList.seleType? styles.seleMenuItem: styles.menuItem;
            return (
                <TouchableOpacity style={sty} onPress={()=>self.onMenuSelected(ele.type, ele.name)} key={ele.id}>
                    <Text  style={styles.menuText} >{ele.name}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <ScrollView style={styles.menu} scrollsToTop={false}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{uri: "https://qidian.qpic.cn/qdbimg/349573/2113490/150.png"}}
                    />
                </View>
                { lists }
            </ScrollView>
        )
    }
    _renderItem = ({item})=>{
        if(this.props.bookRankList.seleType == "qiantui"){
            return (
                <TouchableHighlight 
                    underlayColor="rgba(34, 26, 38, 0.1)"
                    onPress={()=>{this._bookInfo(item)} }
                >
                    <View key={item.id}  style={styles.bookView}>
                        <View style={styles.infoTxts}>
                            <Text style={styles.bookName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.author}>作者：{item.author}</Text>
                        </View>
                        <TouchableOpacity style={styles.addBtn} onPress={(e)=>{this._addBoox(item, e)}}>
                            <Icon name="md-add" size={16} color="#000" />
                            <Text style={{fontSize: px(38), marginLeft: 4}}>书架</Text>
                        </TouchableOpacity>
                    </View>
                    
                </TouchableHighlight>
            )
        }
        return (
            <TouchableHighlight 
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=> this._bookInfo(item) }
            >
                <View key={item.id}  style={styles.bookView}>
                    <View style={styles.leftImg}>
                        <Text style={styles.brank}>{item.brank}</Text>
                        <Image
                           source={ item.imgUrl!=""? {uri: item.imgUrl}: (require('../images/book-test.jpg')) }
                           style={styles.bookImage}
                         />
                    </View>
                    <View style={styles.infoTxts}>
                        <Text style={styles.bookName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.author}>作者：{item.author}</Text>
                        <Text style={styles.nowPage}>{item.nowPage}</Text>
                        <Text style={styles.nowTime}>{item.nowTime}</Text>
                    </View>
                    <TouchableOpacity style={styles.addBtn} onPress={(e)=> this._addBoox(item, e)}>
                        <Icon name="md-add" size={16} color="#000" />
                        <Text style={{fontSize: px(38), marginLeft: 4}}>书架</Text>
                    </TouchableOpacity>
                </View>
                
            </TouchableHighlight>
        )
    }

    componentDidMount() {
        this.props._handle({
            isLoading: true
        })
        console.log(this.props.navigation.state.params.type)
        this.props._getRanks({
            id: this.props.navigation.state.params.id,
            clasfy: this.props.navigation.state.params.type,
            type: this.props.bookRankList.seleType,
            name: this.props.bookRankList.seleName,
            //第一页
            page: 1,
        }, [])
    }
    componentWillUnmount(){
        console.log('退出的时候')
        //退出的时候保存配置
        this.props._handle({
            bookList:[],
            isOpen: true,
            moreLoading: false,
            seleType: "qiantui",
            seleName: "本周强推",
        })
    }
    render() {
        console.log("排行页面rander")
        let bookList = this.props.bookRankList.bookList;
        ////判断显示loading
        let dom = ()=>{
            if(this.props.bookRankList.isLoading){
                return (<Loading />)
            }else{
                /*本周强推*/
                return (
                    <View style={styles.hotWrap}>
                        <View style={styles.hotTitle}>
                            <View style={styles.leftBorder}></View>
                            <Text style={styles.hotText}>{this.props.bookRankList.seleName}</Text>
                        </View>
                        <FlatList
                            style={styles.hotList}
                            data={bookList}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            refreshing={this.props.bookRankList.moreLoading}
                            onEndReachedThreshold={0.1}
                            onEndReached={this._onEndReached}
                        />
                    </View>
                )
            }
        }

        return (
            <SideMenu
                menu={ this._leftMenu() }
                isOpen ={this.props.bookRankList.isOpen}
                openMenuOffset={px(320)}
                onChange={(isOpen)=>this.showMenu(isOpen)}
                menuPosition="right"
            >
                <View style={styles.SideMenu}>
                    { dom() }
                </View>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    SideMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    hotWrap:{
        flex: 1,
        backgroundColor:"white",
        width: "100%",
        height: "100%",
        padding:px(50),
        paddingLeft: px(30),
        paddingRight: px(30),
        paddingBottom:px(25)
    },
    hotTitle:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom: px(30),
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
    bookView: {
        position: "relative",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(100, 53, 201, 0.1)',
        padding: px(20),
        marginTop: px(50),
        marginLeft: px(26),
        marginRight: px(26),
        backgroundColor: "#fff",
        alignItems: "center",
    },
    leftImg: {
        position: "relative",
        width:px(190),
        marginRight: px(10),
        justifyContent: "center",
        overflow:"hidden"
    },
    brank: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: px(60),
        backgroundColor: '#ccc',
        fontSize: px(30),
        color: "#fff",
        textAlign: 'center',
        padding: px(5),
        zIndex: 10,
    },
    bookImage: {
        width:px(160),
        height:px(214)
    },
    bookType: {
        color: "#ccc"
    },
    infoTxts: {
        flex: 1, 
        justifyContent: "space-around",
        paddingTop: px(10),
        paddingBottom: px(10),
    },
    bookName: {
        fontSize:px(48),
        color:"#666",
        marginBottom:px(6)
    },
    author: {

    },
    addBtn: {
        width: px(180),
        height: px(80),
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#000'
    },
    nowPage:{
        fontSize: px(30),
    },
    nowTime:{
        fontSize: px(26)
    },

    menu:{
        flex:1,
        width: Dimensions.get('window').width,
        height: "100%",
        backgroundColor:'gray',
        padding: px(30),
    },
    avatarContainer:{
        marginBottom: 20,
        marginTop: 20
    },
    avatar: {
        width: px(200),
        height: px(250),
        marginLeft: px(30),
    },
    menuItem:{
        flex: 1,
        width: px(258),
        height: px(100),
        borderWidth: 1,
        borderColor: '#ed424b',
        marginBottom: px(36),
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'nowrap' ,
        borderRadius: px(20),
    },
    seleMenuItem:{
        flex: 1,
        width: px(258),
        height: px(100),
        borderWidth: 1,
        borderColor: '#ed424b',
        marginBottom: px(36),
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'nowrap' ,
        borderRadius: px(20),
        backgroundColor: '#fff',
    },
    menuText: {
        fontSize: px(36),
        textAlign: 'center',
    }
});

function mapStateToProps(state){
    return {bookRankList: state.bookRankList};
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _getMenu:(option)=>{
            dispatch(actions.getMenu(option))
        },
        _getRanks:(option, old)=>{
            dispatch(actions.getRanks(option, old))
        },
        _addBook:(options, tag, isGetInfo)=>{
            dispatch( search.addBook(options, tag, isGetInfo) )
        }
    }
}

const bookRankList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default bookRankList;