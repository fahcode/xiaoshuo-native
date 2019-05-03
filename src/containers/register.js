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
import px     from '../util/px';
import {connect} from 'react-redux';
import * as actions from '../store/actions/register';

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
        headerTitle:"注册"
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            repeatPwd: '',
            phone: '',
            smsCode: ''
        }
    }
    goLogin=()=>{
        this.props.navigation.navigate('Login');
    }
    handleChange=(text, type)=>{
        if(type=='name') this.setState({name: text});
        if(type=='password') this.setState({password: text});
        if(type=='repeatPwd') this.setState({repeatPwd: text});
        if(type=='phone') this.setState({phone: text});
        if(type=='smsCode') this.setState({smsCode: text});
    }
    doRegister=()=>{
        if(this.state.name==''&&this.state.name.length<6){
            alert('请填写6个字符以上的用户名')
            return false;
        }
        if((this.state.password==''||this.state.repeatPwd=='')&&this.state.password.length<6){
            alert('请填写6个字符以上的密码')
            return false;
        }
        if(this.state.password!=this.state.repeatPwd){
            alert('两次输入的密码不一样')
            return false;
        }
        if(this.state.phone==''&&this.state.password.length!=11){
            alert('请填写正确的11位手机号码')
            return false;
        }
        if(this.state.smsCode==''){
            alert('请填写手机验证码')
            return false;
        }
        /////开始登陆
        this.props._doRegister({
            name: this.state.name,
            password: this.state.password,
            repeatPwd: this.state.repeatPwd,
            phone: this.state.phone,
            smsCode: this.state.smsCode
        }, this.props.navigation)
    }
    componentDidMount() {
        console.log(this.props)
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
                            placeholder="请填写6个字符以上的用户名"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            multiline = {true}
                            style={styles.textInput}
                            value={this.state.name}
                            onChangeText={(txt)=>this.handleChange(txt, 'name')}
                        />
                    </View>
                    <View style={styles.phoneWrap}>
                        <Image
                            source={require('../images/login/lock.png')}
                            style={styles.loginIco}
                            />
                        <TextInput
                            placeholder="请填写6个字符以上的密码"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            multiline = {true}
                            secureTextEntry = {true}
                            style={styles.textInput}
                            value={this.state.password}
                            onChangeText={(txt)=>this.handleChange(txt, 'password')}
                        />
                    </View>
                    <View style={styles.phoneWrap}>
                        <Image
                            source={require('../images/login/lock.png')}
                            style={styles.loginIco}
                            />
                        <TextInput
                            placeholder="确认密码"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            multiline = {true}
                            secureTextEntry = {true}
                            style={styles.textInput}
                            value={this.state.repeatPwd}
                            onChangeText={(txt)=>this.handleChange(txt, 'repeatPwd')}
                        />
                    </View>
                    <View style={styles.phoneWrap}>
                        <Image
                            source={require('../images/login/phone.png')}
                            style={styles.loginIco}
                            />
                        <TextInput
                            placeholder="请填写正确的11位手机号码"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            multiline = {true}
                            style={styles.textInput}
                            value={this.state.phone}
                            onChangeText={(txt)=>this.handleChange(txt, 'phone')}
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
                            multiline = {true}
                            style={styles.textInput}
                            value={this.state.smsCode}
                            onChangeText={(txt)=>this.handleChange(txt, 'smsCode')}
                        />
                        <TouchableOpacity style={styles.send} >
                            <Text style={styles.smsText}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={[styles.btn,styles.activeBtn]} onPress={()=>{this.doRegister()}}>
                        <Text style={styles.btnText}>登录</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.tagLink} onPress={ ()=>{this.goLogin()} }>
                        <Text style={styles.linkText}>登录</Text>
                    </TouchableOpacity>*/}
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
        paddingTop:px(200)
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
        height:px(140),
        marginBottom:px(40),
        flexDirection:"row",
        alignItems:"center"
    },
    smsWrap:{
        backgroundColor:"#f3f3f3",
        borderRadius:px(12),
        height:px(140),
        marginBottom:px(40),
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
        width: '100%',
        height:px(140),
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
    smsText:{
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
    return {register: state.register, nav: state.nav};
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _doRegister:(options, navigation)=>{
            dispatch(actions.doRegister(options, navigation))
        },
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default Login;