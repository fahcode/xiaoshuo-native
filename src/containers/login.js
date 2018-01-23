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
import {
    NavigationActions
} from 'react-navigation';

import px     from '../util/px';
import {connect} from 'react-redux';
import * as actions from '../actions/login';

class Main extends Component {
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#ffb307',
            height:px(Platform.OS === 'ios'?190:130)
        },
        headerTitleStyle:{
            color:'white'
        },
        headerTintColor:"white",
        headerTitle:"登录"
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }
    goRegister = ()=>{
        this.props.navigation.navigate('Register');
    }
    nameHandleChange=(text)=>{
        console.log(text);
        this.setState({name: text});
    }
    pwHandleChange=(text)=>{
        console.log(text);
        this.setState({password: text});
    }
    doLogin(){
        if(this.state.name==''){
            alert('请填写用户名')
            return false;
        }
        if(this.state.password==''){
            alert('请填写密码')
            return false;
        }
        /////开始登陆
        this.props._dologin({
            name: this.state.name,
            password: this.state.password
        }, this.props.navigation)
    }
    componentWillMount(){
        console.log(this.props.navigation.state)
        /*const resetActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'BookCase'})]
        });
        this.props.navigation.dispatch(resetActions);*/
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
                            placeholder="请输入用户名"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            multiline = {true}
                            style={styles.textInput}
                            value={this.state.name}
                            onChangeText={this.nameHandleChange}
                        />
                    </View>
                    <View style={styles.smsWrap}>
                        <Image
                            source={require('../images/login/lock.png')}
                            style={styles.loginIco}
                            />
                        <TextInput
                            placeholder="请输入密码"
                            maxLength={8}
                            underlineColorAndroid="transparent"
                            multiline = {true}
                            secureTextEntry = {true}
                            style={styles.textInput}
                            value={this.state.password}
                            onChangeText={this.pwHandleChange}
                        />
                    </View>

                    <TouchableOpacity style={[styles.btn,styles.activeBtn]} onPress={()=>{this.doLogin()}}>
                        <Text style={styles.btnText}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagLink} onPress={ ()=>{this.goRegister()} }>
                        <Text style={styles.linkText}>注册</Text>
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
        paddingTop:px(260)
    },
    userTop:{
        height:px(Platform.OS === 'ios'?470:410),
        backgroundColor:"#ffb307"
    },
    loginWrap:{
        flexDirection:"column",
        flex:1,
        padding:px(50)
    },
    phoneWrap:{
        backgroundColor:"#f3f3f3",
        borderRadius:px(12),
        height:px(160),
        marginBottom:px(40),
        flexDirection:"row",
        alignItems:"center"
    },
    smsWrap:{
        backgroundColor:"#f3f3f3",
        borderRadius:px(12),
        height:px(160),
        marginBottom:px(200),
        flexDirection:"row",
        alignItems:"center"
    },
    loginIco:{
        width:px(60),
        height:px(60),
        marginLeft:px(60),
        marginRight:px(60)
    },
    textInput:{ 
        height:px(160),
        width:px(420),
        fontSize:px(44),
        padding: 0,
    },
    send:{
        borderLeftWidth:1,
        borderLeftColor:'#ccc',
        paddingLeft:px(80),
        height:px(90)
    },
    pwdText:{
        color:"#ffb307",
        fontSize:px(44),
        lineHeight:px(80)
    },
    btn:{
        backgroundColor:"#cccccc",
        height:px(140),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:px(12),
    },
    activeBtn:{
        backgroundColor:"#ffb307",
    },
    btnText:{
        color:"white",
        fontSize:px(50),
    },
    tagLink: {
        alignItems:"flex-end",
    },
    linkText:{
        color:"#ffb307",
        fontSize:px(50),
        lineHeight:px(100),
    },
});

function mapStateToProps(state){
    return {login: state.login, nav: state.nav};;
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        //登陆
        _dologin: (options, navigation)=>{
            dispatch(actions.dologin(options, navigation))
        }
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default Login;