/**
 * Created by apple on 17/7/3.
 *
 * 我的页面
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';
import pxToDp     from '../util/px';

class User extends Component {
    static navigationOptions = {
        header:null,
        headerBackTitle:null,
    }

    //是否登录
    isLogin(){
        let user = false;
        if(user){
            return(
                <View style={styles.topView}>
                    <Image
                        source={require('../images/user/login-photo.jpg')}
                        style={styles.photo}
                        />
                    <View style={styles.topRight}>
                        <Text style={[styles.topText,styles.name]}>神话</Text>
                        <Text style={[styles.topText,styles.info]}>青铜用户</Text>
                    </View>
                </View>
            )
        }else{
            return(
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                    <View style={styles.topView}>
                        <Image
                            source={require('../images/user/not-login.jpg')}
                            style={styles.photo}
                            />
                        <View style={styles.topRight}>
                            <Text style={[styles.topText,styles.info]}>点击登录</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userTop}>
                    {this.isLogin()}
                </View>

                <TouchableOpacity>
                <View style={styles.list}>
                    <Image
                        source={require('../images/user/help.jpg')}
                        style={styles.listIco}
                        />
                    <Text style={styles.listText}>用户帮助</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity>
                <View style={styles.list}>
                    <Image
                        source={require('../images/user/contact.jpg')}
                        style={styles.listIco}
                        />
                    <Text style={styles.listText}>联系我们</Text>
                </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#eee"
    },
    userTop:{
        height:pxToDp(Platform.OS === 'ios'?470:410),
        backgroundColor:"#ffb307",
        flexDirection:"row",
        alignItems:"flex-end"
    },
    topView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:pxToDp(90)
    },
    photo:{
        width:pxToDp(220),
        height:pxToDp(220),
        marginLeft:pxToDp(50),
        marginRight:pxToDp(40)
    },
    topRight:{
        flexDirection:"column",
    },
    topText:{
        fontSize:pxToDp(56),
        color:"#ffeec7"
    },
    name:{
        color:"white",
        marginBottom:pxToDp(16)
    },
    info:{
        fontSize:pxToDp(42)
    },
    list:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"white",
        marginTop:pxToDp(30),
        height:pxToDp(150)
    },
    listIco:{
        width:pxToDp(90),
        height:pxToDp(90),
        marginLeft:pxToDp(50),
        marginRight:pxToDp(50)
    },
    listText:{
        fontSize:pxToDp(42),
        color:"#333"
    }
});


export default User;