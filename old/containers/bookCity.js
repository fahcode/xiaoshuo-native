/**
 * Created by apple on 17/7/3.
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
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import pxToDp   from '../util/px';
import * as actions from '../actions/bookCity';
import BookListComponent from '../components/bookList';

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#ffb307',
            height: pxToDp(Platform.OS === 'ios'?210:150)
        },
        headerTitleStyle:{
            color: 'white'
        },
        headerBackTitle: null,
        headerRight:(
            <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
                <Image
                   source={require("../images/search.png")}
                   style={{width:pxToDp(54),height:pxToDp(54),marginRight:pxToDp(50)}}
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

    //渲染分类数据
    _renderColumn(){
       return this.props.bookCity.columnList.map((item)=>{
           return (
               <TouchableOpacity key={item.id} onPress={()=>this.listTab(item.name)}>
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

    _keyExtractor = (item, index) => item.id+index;
    //渲染热门推荐书籍数据
    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>this.bookTab(item.id,item.name)}>
                <BookListComponent data={item} />
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.props._getHot()
    }

    render() {
        return (
            <ScrollView>
                {/*栏目分类*/}
                <View style={styles.columnWrap}>
                    {this._renderColumn()}
                </View>

                { /*热门推荐*/ }
                <View style={styles.hotWrap}>
                    <View style={styles.hotTitle}>
                        <View style={styles.leftBorder}></View>
                        <Text style={styles.hotText}>热门推荐</Text>
                    </View>
                    <FlatList
                        style={styles.hotList}
                        data={this.props.bookCity.hotList}
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
        flex:1,
        backgroundColor:"white",
        flexDirection:"row",
        flexWrap:"wrap",
        paddingBottom:pxToDp(40),
        marginBottom:pxToDp(30)
    },

    columnView:{
        marginTop:pxToDp(40),
        marginLeft:pxToDp(68),
        flexDirection:"column",
        alignItems:"center"
    },
    columnImage:{
        width:pxToDp(186),
        height:pxToDp(186),
    },
    columnName:{
        fontSize:pxToDp(38),
        color:"#666",
        marginTop:pxToDp(16)
    },
    hotWrap:{
        flex:1,
        backgroundColor:"white",
        padding:pxToDp(50),
        paddingBottom:pxToDp(25)
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
        _getHot:()=>{
            dispatch(actions.getHot())
        }
    }
}

const BookCity = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookCity;