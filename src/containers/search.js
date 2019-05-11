/**
 * Created by apple on 2017/7/20.
 *
 * 搜索
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import px from '../util/px';
import * as actions from '../store/actions/search';
import BookListComponent from '../components/bookList';
import LoadingComponent  from '../components/loading';
import Icon from 'react-native-vector-icons/Ionicons';

class Main extends Component {
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#ffb307',
            height:px(Platform.OS === 'ios'?190:130)
        },
        headerTitle:'搜索',
        headerBackTitle:null,
        headerTintColor:"white",
    }

    //搜索书籍
    search(){
        //控制单次点击
        if(!this.props.search.status){
            if(this.props.search.searchVal=="") alert('请输入');
            //////通过接口去搜索
            this.props.search.searchVal&&this.props._search({kw: this.props.search.searchVal})
        }
    }

    //列表书籍点击
    _bookInfo(item){
        this.props.navigation.navigate("BookInfo",{item: item})
    }
    ////添加到书架
    _addBoox = (item, e)=>{
        item.isAdd = true;
        item.addDate = new Date().getTime();
        //////执行add action,true 是否请求详细信息
        this.props._addBook(item, e.taget, true);
    }

    searchResult(){
        let props=this.props.search;
        if(props.isLoad && props.status){
            return (<LoadingComponent />)
        }
        if(props.list == null){
            return false
        }
        if(props.list.length>0&&!props.status){
            return(
                <FlatList
                    style={styles.list}
                    data={this.props.search.list}
                    keyExtractor={this._keyExtractor}
                    numColumns={1}
                    renderItem={this._renderItem}
                />
            )
        }
        if(props.searchVal&&props.list.length==0){
            return(
                <Text style={styles.findText}>没有找到您要的书籍哦～</Text>
            )
        }
    }

    _keyExtractor = (item, index) => item.bookID.toString();

    //渲染搜索结果
    _renderItem = ({item})=>{
        return (
            <TouchableHighlight 
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=> this._bookInfo(item) }
            >
                <View key={item.bid}  style={styles.bookView}>
                    <View style={styles.booktop}>
                        <View style={styles.leftImg}>
                            <Image
                            source={ item.imgUrl!=""? {uri: item.imgUrl}: (require('../images/book-test.jpg')) }
                            style={styles.bookImage}
                            />
                        </View>
                        <View style={styles.infoTxts}>
                            <Text style={styles.bookName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.author}>作者：{item.author + " | " + item.bookType + " | " + item.bookState}</Text>
                            <Text style={styles.nowPage}>{item.nowPage}</Text>
                            <Text style={styles.nowTime}>{item.nowTime + " | " + item.pageNumbe}</Text>
                        </View>
                        <TouchableOpacity style={styles.addBtn} onPress={(e)=> this._addBoox(item, e)}>
                            <Icon name="md-add" size={16} color="#000" />
                            <Text style={{fontSize: px(38), marginLeft: 4}}>书架</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoDesc}>
                        <Text style={styles.nowPage}>{item.desc}</Text>
                    </View>
                </View>
                
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    
                    <TextInput
                        placeholder="请输入关键词"
                        maxLength={40}
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        onChangeText={(val)=>this.props._handle({searchVal:val})}
                        value={this.props.search.searchVal}
                    />
                    <TouchableOpacity onPress={()=>this.search()}>
                        <Image
                            source={require("../images/login/sousuo.png")}
                            style={{width:px(54),height:px(54)}}
                        />
                    </TouchableOpacity>
                </View>
                {this.searchResult()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    search:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:px(48),
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    textInput:{
        borderRadius:px(12),
        backgroundColor:"#f2f2f2",
        height:px(120),
        width:px(870),
        fontSize:px(42),
        padding:0,
        paddingLeft:px(30)
    },
    list:{
        padding:px(40),
        paddingTop:0
    },
    findText:{
        fontSize:px(42),
        color:'#999',
        margin:px(40)
    },
    bookView: {
        position: "relative",
        borderBottomWidth: 1,
        borderColor: 'rgba(100, 53, 201, 0.1)',
        padding: px(20),
        marginTop: px(50),
        marginLeft: px(26),
        marginRight: px(26),
        backgroundColor: "#fff"
    },
    booktop: {
        position: "relative",
        flexDirection: 'row',
        backgroundColor: "#fff",
        alignItems: "center",
    },
    leftImg: {
        position: "relative",
        width:px(160),
        height:px(214),
        borderRadius:px(12),
        marginRight: px(20),
        overflow:"hidden"
    },
    bookImage: {
        width:px(160),
        height:px(214)
    },
    infoTxts: {
        flex: 1, 
        justifyContent: "space-around",
        paddingTop: px(30),
        paddingBottom: px(30),
    },
    infoDesc: {
        width: "100%"
    },
    bookName: {
        fontSize:px(50),
        color:"#666",
        marginBottom:px(8)
    },
    author: {
        fontSize: px(36),
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
});

function mapStateToProps(state){
    return state;
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _search:(options)=>{
            dispatch( actions.search(options) )
        },
        _addBook:(options, tag, isGetInfo)=>{
            dispatch( actions.addBook(options, tag, isGetInfo) )
        }
    }
}

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default Search;