/**
 * Created by apple on 17/7/4.
 *
 * 我的页面
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
import pxToDp     from '../util/px';
import {connect} from 'react-redux';
import * as actions from '../actions/login';

class Main extends Component {
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#ffb307',
            height:pxToDp(Platform.OS === 'ios'?210:150)
        },
        headerTitleStyle:{
            color:'white'
        },
        headerTintColor:"white",
        headerTitle:"登录"
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginWrap}>
                    <View style={styles.phoneWrap}>
                        <Image
                            source={require('../images/login/phone.png')}
                            style={styles.loginIco}
                            />
                        <TextInput
                            placeholder="请输入手机号"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            style={styles.textInput}
                            value={this.props.login.phone}
                        />
                    </View>
                    <View style={styles.smsWrap}>
                        <Image
                            source={require('../images/login/lock.png')}
                            style={styles.loginIco}
                            />
                        <TextInput
                            placeholder="请输入验证码"
                            maxLength={8}
                            underlineColorAndroid="transparent"
                            style={styles.textInput}
                            value={this.props.login.smsCode}
                        />
                        <TouchableOpacity style={styles.send} >
                            <Text style={styles.smsText}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.btn,styles.activeBtn]} >
                        <Text style={styles.btnText}>登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        flexDirection:"row",
        paddingTop:pxToDp(260)
    },
    userTop:{
        height:pxToDp(Platform.OS === 'ios'?470:410),
        backgroundColor:"#ffb307"
    },
    loginWrap:{
        flexDirection:"column",
        flex:1,
        padding:pxToDp(50)
    },
    phoneWrap:{
        backgroundColor:"#f3f3f3",
        borderRadius:pxToDp(12),
        height:pxToDp(166),
        marginBottom:pxToDp(40),
        flexDirection:"row",
        alignItems:"center"
    },
    smsWrap:{
        backgroundColor:"#f3f3f3",
        borderRadius:pxToDp(12),
        height:pxToDp(166),
        marginBottom:pxToDp(200),
        flexDirection:"row",
        alignItems:"center"
    },
    loginIco:{
        width:pxToDp(60),
        height:pxToDp(60),
        marginLeft:pxToDp(60),
        marginRight:pxToDp(60)
    },
    textInput:{
        height:pxToDp(100),
        width:pxToDp(420),
        marginTop:pxToDp(33),
        fontSize:pxToDp(44)
    },
    send:{
        borderLeftWidth:1,
        borderLeftColor:'#ccc',
        paddingLeft:pxToDp(80),
        height:pxToDp(90)
    },
    smsText:{
        color:"#ffb307",
        fontSize:pxToDp(44),
        lineHeight:pxToDp(80)
    },
    btn:{
        backgroundColor:"#cccccc",
        height:pxToDp(140),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:pxToDp(12),
    },
    activeBtn:{
        backgroundColor:"#ffb307",
    },
    btnText:{
        color:"white",
        fontSize:pxToDp(50),
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
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default Login;