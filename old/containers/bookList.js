/**
 * Created by apple on 17/7/3.
 *
 * 书籍列表页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import pxToDp   from '../util/px';
import * as actions from '../actions/bookList';
import BookListComponent from '../components/bookList';
import LoadingComponent  from '../components/loading';

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor:'#ffb307',
            height:pxToDp(Platform.OS === 'ios'?210:150)
        },
        headerTitle:`${navigation.state.params.name}`,
        headerTintColor:"white",
        headerBackTitle:null,
    })

    //列表书籍点击
    listTab(id,name){
        this.props.navigation.navigate("BookInfo",{name,id})
    }

    _keyExtractor = (item, index) => item.id;

    //渲染热门推荐书籍数据
    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>this.listTab(item.id,item.name)}>
                <BookListComponent data={item} />
            </TouchableOpacity>
        )
    }

    //下拉刷新
    _onRefresh = ()=>{
        if(!this.props.bookList.isLoadUpdate&&!this.props.bookList.isLoadMore){
            this.getData("up")
        }
    }

    //上提加载
    _onEndReached = ()=>{
        if(!this.props.bookList.isLoadUpdate&&!this.props.bookList.isLoadMore){
            this.getData("more")
        }
    }

    //请求数据，根据刷新的方式来加载不同请求
    getData(text){
        this.props._getList({
            name:this.props.navigation.state.params.name,
            nowPage:this.props.bookList.nowPage,
            pageSize:this.props.bookList.pageSize,
            data:this.props.bookList.list,
            text
        })
    }

    componentDidMount() {
        this.getData("up")
    }

    componentWillUnmount(){
        this.props._handle({
            list:[],
            nowPage:1,
            pageSize:10,
            isLoadUpdate:false,
            isLoadMore:false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.props.bookList.list}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    refreshing={this.props.bookList.isLoadUpdate}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.02}
                />
                {this.props.bookList.isLoadMore?<LoadingComponent />:null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    list:{
        paddingRight:pxToDp(40),
        marginLeft:pxToDp(40)
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
        _getList:(options)=>{
            dispatch(actions.getList(options))
        },
    }
}

const BookList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookList;