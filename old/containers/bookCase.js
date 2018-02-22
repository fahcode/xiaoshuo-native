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
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import pxToDp   from '../util/px';
import * as actions from '../actions/bookCase';

class Main extends Component {
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#ffb307',
            height:pxToDp(Platform.OS === 'ios'?210:150)
        },
        headerTitleStyle:{
            color:'white'
        },
    }

    _tab(item){
        if(item.id === 'last'){
            this.props.navigation.navigate("BookCity")
        }else{
            this.props.navigation.navigate("BookRead",{pid:item.pid,id:item.id,name:item.name})
        }
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item})=>{
        if(item.id === 'last'){
            return (
                <TouchableOpacity onPress={()=>this._tab(item)}>
                <View key={item.id}  style={styles.bookView}>
                     <View style={styles.last}>
                         <Image
                           source={require('../images/book-add.png')}
                           style={styles.bookAdd}
                         />
                     </View>
                </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity onPress={()=>this._tab(item)}>
            <View key={item.id}  style={styles.bookView}>
                    <Image
                       source={require('../images/book-test.jpg')}
                       style={styles.bookImage}
                     />
                    <Text style={styles.bookName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.readInfo}>{item.isRead?'阅读至第'+item.pid+'章':'尚未阅读'}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bookCase.isUpdate){
            this.props._getBookCase();
            this.props._handle({
                isUpdate:false
            })
            console.log('更新书架');
        }
    }

    componentDidMount() {
        this.props._getBookCase()
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.wrap}
                    data={this.props.bookCase.list}
                    keyExtractor={this._keyExtractor}
                    numColumns={3}
                    renderItem={this._renderItem}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#eee"
    },
    bookView:{
       marginTop:pxToDp(40),
       marginLeft:pxToDp(45),
        width:pxToDp(300),
    },
    last:{
        backgroundColor:"white",
        width:pxToDp(300),
        height:pxToDp(400),
        borderRadius:pxToDp(12),
        overflow:"hidden",
        alignItems:"center",
        justifyContent:"center"
    },
    bookImage:{
        width:pxToDp(300),
        height:pxToDp(400),
        borderRadius:pxToDp(12),
        overflow:"hidden"
    },
    bookName:{
        fontSize:pxToDp(40),
        color:"#666",
        marginTop:pxToDp(16),
        marginBottom:pxToDp(8)
    },
    readInfo:{
        fontSize:pxToDp(34),
        color:"#aaa",
        marginBottom:0
    },
    bookAdd:{
        width:pxToDp(104),
        height:pxToDp(110)
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
        _getBookCase:()=>{
            dispatch(actions.getBookCase())
        }
    }
}

const BookCase = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookCase;