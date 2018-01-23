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
import px from '../util/px';

class Main extends Component {
    static navigationOptions = {
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
        )
    }

    render() {
        console.log("用户页面render次数")
        return (
            <View style={styles.container}>
                <View  style={styles.userTop}>
                    <TouchableOpacity>
                        <Image 
                            source={ require('../images/user/login-photo.jpg') } 
                            style={styles.headIcon}
                        />
                        <Text style={styles.userText}>点击登录</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.funcList}>
                    <View style={styles.ls}>
                        <TouchableOpacity>
                            <Image 
                                source={ require('../images/icons/mf_wangpan.png') } 
                                style={styles.lt_icon}
                            />
                            <Text style={styles.lt_text}>云端同步</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ls}>
                        <TouchableOpacity>
                            <Image 
                                source={ require('../images/icons/mf_newwork.png') } 
                                style={styles.lt_icon}
                            />
                            <Text style={styles.lt_text}>用户帮助</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ls}>
                        <TouchableOpacity>
                            <Image 
                                source={ require('../images/icons/mf_theme.png') } 
                                style={styles.lt_icon}
                            />
                            <Text style={styles.lt_text}>联系我们</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        height:px(Platform.OS === 'ios'?470:410),
        backgroundColor:"#ffb307",
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'center',
    },
    headIcon: {
        width: px(220),
        height: px(220),
    },
    userText: {
        width: '100%',
        textAlign: "center",
        marginTop: px(20),
    },
    funcList: {
        flexDirection: "row",
        marginTop: px(20),
        paddingLeft: px(30),
        paddingRight: px(30),
    },
    ls: {
        flex: 1,
        alignItems:"center",
        paddingBottom: px(40),
        paddingTop: px(40),
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    lt_icon: {
        width: px(160),
        height: px(160),    
    },
    lt_text: {
        fontSize: px(40),
    }
});


export default Main;