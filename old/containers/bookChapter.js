/**
 * Created by apple on 2017/8/10.
 *
 * 小说目录列表
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
import * as actions from '../actions/bookChapter';

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor:'#ffb307',
            height:pxToDp(Platform.OS === 'ios'?210:150)
        },
        headerTitle:'目录',
        headerTintColor:"white",
        headerBackTitle:null,
    })

    //列表目录点击
    listTab(pid){
        this.props.navigation.navigate("BookRead",{
            name:this.props.navigation.state.params.name,
            id:this.props.navigation.state.params.id,
            pid
        })
    }

    //下拉刷新
    _onRefresh = ()=>{
        if(!this.props.bookChapter.loading){
            this.getData()
        }
    }

    _keyExtractor = (item, index) => item.id;

    //渲染数据
    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>this.listTab(item.pid)}>
                <View style={styles.listView}>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    //请求数据，根据刷新的方式来加载不同请求
    getData(id){
        this.props._getChapter({
            id:this.props.navigation.state.params.id
        })
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount(){
        this.props._handle({
            list:[],
            loading:false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.bookChapter.list}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    refreshing={this.props.bookChapter.loading}
                    onRefresh={this._onRefresh}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    listView:{
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc',
        padding:pxToDp(40)
    },
    title:{
        fontSize:pxToDp(42),
        color:"#666"
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
        _getChapter:(options)=>{
            dispatch(actions.getChapter(options))
        },
    }
}

const BookChapter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookChapter;