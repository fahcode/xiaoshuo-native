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
} from 'react-native';
import {connect} from 'react-redux';
import px   from '../util/px';
import * as actions from '../actions/bookCity';
import Loading from '../components/loading';
import Icon from 'react-native-vector-icons/Ionicons';

import * as search from '../actions/search';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
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
        headerBackTitle: null,
        headerRight:(
            <TouchableOpacity onPress={()=>{navigation.navigate("Search")}}>
                <Image
                   source={require("../images/search.png")}
                   style={{width:px(54),height:px(54),marginRight:px(50)}}
                />
            </TouchableOpacity>
        ),
    })

    //分类点击,先进入排行页面
    listTab(item){
        this.props.navigation.navigate("BookRankList", item)
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
        let oldList = this.props.bookCity.hotList;
        if(oldList.length>20){
            alert('没有更多了！');
            return false;
        }
        this.props._handle({
            hotLoading: true
        });
        this.props._getHot(oldList, "all")
    }

    //渲染分类数据
    _renderColumn(){
       return Object.values(this.props.bookCity.columnList).map((item)=>{
           return (
               <TouchableOpacity key={item.id} onPress={()=>this.listTab(item)}>
                   <View style={styles.columnView}>
                       <Image
                           source={item.imgUrl}
                           style={styles.columnImage}
                           />
                       <Text style={styles.columnName}>{item.name}</Text>
                   </View>
               </TouchableOpacity>
           )
       })
    }

    _keyExtractor = (item, index) => item.qidianid+index;

   _renderItem = ({item})=>{
        //判断是否是标题
        if(!!item.title){
            return(
                <View style={styles.hotTimeTitle}>
                    <Text style={styles.bookName}>{item.title}</Text>
                </View>
            )
        }
        return (
            <TouchableHighlight 
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=>{this._bookInfo(item)} }
            >
                <View key={item.qidianid}  style={styles.bookView}>
                    <View style={styles.leftImg}>
                        <Text style={styles.bookType} numberOfLines={1}>{item.btype}</Text>
                    </View>
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

    componentDidMount() {
        this.props._handle({
            isLoading: true
        })
        this.props._getHot(this.props.bookCity.hotList, "index")
    }

    render() {
        if(this.props.bookCity.isLoading){
            return (<Loading />)
        }
        return (
            <View style={styles.cont}>
                {/*栏目分类*/}
                <View style={styles.columnWrap}>
                    {this._renderColumn()}
                </View>

                { /*本周强推*/ }
                <View style={styles.hotWrap}>
                    <View style={styles.hotTitle}>
                        <View style={styles.leftBorder}></View>
                        <Text style={styles.hotText}>起点强推</Text>
                    </View>
                    <FlatList
                        style={styles.hotList}
                        data={this.props.bookCity.hotList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshing={this.props.bookCity.hotLoading}
                        onEndReachedThreshold={0.1}
                        onEndReached={this._onEndReached}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1
    },
    columnWrap:{
        backgroundColor:"white",
        flexDirection:"row",
        flexWrap:"wrap",
        paddingBottom:px(40),
        marginBottom:px(30)
    },

    columnView:{
        marginTop:px(30),
        marginLeft:px(51.4),
        flexDirection:"column",
        alignItems:"center"
    },
    columnImage:{
        width:px(120),
        height:px(120),
    },
    columnName:{
        fontSize:px(38),
        color:"#666",
        marginTop:px(16)
    },
    hotWrap:{
        flex: 1,
        backgroundColor:"white",
        height: "100%",
        padding:px(50),
        paddingBottom:px(25)
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
    bookView: {
        position: "relative",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(100, 53, 201, 0.1)',
        padding: px(20),
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
    hotTimeTitle: {

    }
});

function mapStateToProps(state){
    return {bookCity: state.bookCity};
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _getHot:(oldList, type)=>{
            dispatch(actions.getHot(oldList, type))
        },
        _addBook:(options, tag, isGetInfo)=>{
            dispatch( search.addBook(options, tag, isGetInfo) )
        }
    }
}

const BookCity = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookCity;