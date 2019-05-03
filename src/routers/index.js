/**
 * Created by hfhleo on 17/10/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator
} from 'react-navigation';
//左侧栏
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import px from '../util/px';//比率px

import BookLine   from '../containers/bookLine';//在读书架
import BookCase   from '../containers/bookCase';//书架
import BookCity   from '../containers/bookCity';//书城
import User       from '../containers/user';//用户
import Login      from '../containers/login';//登陆
import Register      from '../containers/register';//登陆
import BookList   from '../containers/bookList';//书籍列表
import BookInfo   from '../containers/bookInfo';//书籍介绍
import Search     from '../containers/search';//书籍搜索
import BookRead   from '../containers/bookRead';//阅读页
import BookChapter   from '../containers/bookChapter';//目录列表页
import BookClassifyList   from '../containers/bookClassifyList';//分类列表页
import BookRankList   from '../containers/bookRankList';//分类排行页
import DrawerMenu  from '../containers/DrawerMenu';//分类排行页
import webNavigation  from '../containers/webNavigation';//分类排行页
import webViews  from '../containers/webViews';//分类排行页
import Loading  from '../components/loading';//



////////主按钮
const MainTabNavigator = createBottomTabNavigator({
    /*BookLine: {
        screen: BookLine,
        navigationOptions: {
            title:"在读",
            tabBarLabel: '在读',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name="ios-analytics" size={28} color={focused?"#ffb307":"#000"}/>
            ),
        },

    },*/
    BookCase: {
        screen: BookCase,
        navigationOptions: {
            title:"书架",
            tabBarLabel: '书架',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name="ios-bookmarks" size={28} color={focused?"#ffb307":"#000"}/>
            ),
        }
    },
    BookCity: {
        screen: BookCity,
        navigationOptions: {
            title:"书城",
            tabBarLabel: '书城',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name="ios-cloud-done" size={28} color={focused?"#ffb307":"#000"}/>
            ),
        },
    },
    webNavigation: {
        screen: webNavigation,
        navigationOptions: {
            tabBarLabel: '导航',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name="ios-contact" size={28} color={focused?"#ffb307":"#000"}/>
            ),
        },
    },
}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    //swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#ff7e3a', // 文字和图片选中颜色
        inactiveTintColor: '#888', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#f9f9f9', // TabBar 背景色
            height:px(160)
        },
        labelStyle: {
            marginTop:px(4),
            marginBottom:px(10),
            fontSize: px(34), // 文字大小
        },
    }
});

MainTabNavigator.navigationOptions = ({ navigation}) => ({
    headerTitle: "",
    headerStyle: {
        backgroundColor: "#ffb307",//rgb(46, 173, 208)rgb(255, 99, 120)rgb(102, 163, 147)
        height: px(Platform.OS === 'ios' ? 190 : 130)
    },
    headerTitleStyle: {
        color: 'white'
    },
    headerBackTitle: null,
    headerLeft: (
        <TouchableOpacity onPress={() => { navigation.toggleDrawer() }} >
            {/* navigation.navigate("DrawerMenu") */}
            <Image
                source={require("../images/icons/ic_menu_logo.png")}
                style={{ width: px(294), height: px(144), marginRight: px(50) }}
            />
        </TouchableOpacity>
    ),
    headerRight: (
        <TouchableOpacity onPress={() => { navigation.navigate("Search") }} >
            {/*<Icon name="ios-search" size={28} color="#fff" style={{marginRight:px(50)}} />*/}
            <Image
                source={require("../images/search.png")}
                style={{ width: px(54), height: px(54), marginRight: px(50) }}
            />
        </TouchableOpacity>
    )
})


//全部的screen
let MainStackNavigator = createStackNavigator({
    Home: {
        screen: MainTabNavigator
    },
    BookLine:{
        screen:BookLine
    },
    BookCase:{
        screen:BookCase
    },
    BookCity:{
        screen:BookCity
    },
    User:{
        screen:User
    },
    BookList:{
        screen: BookList
    },
    BookInfo:{
        screen:BookInfo
    },
    Search:{
        screen:Search
    },
    BookRead:{
        screen:BookRead
    },
    BookChapter:{
        screen:BookChapter
    },
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    },
    BookClassifyList: {
        screen: BookClassifyList
    },
    BookRankList: {
        screen:BookRankList
    },
    webNavigation: {
        screen: webNavigation
    },
    webViews: {
        screen: webViews
    }
}, {
    initialRouteName: 'Home', // 默认显示界面
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#ffb307",//rgb(46, 173, 208)rgb(255, 99, 120)rgb(102, 163, 147)
            height: px(Platform.OS === 'ios' ? 190 : 130)
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerBackTitle: null
    }
});



//export default MainStackNavigator
/////通过侧边栏包裹
const DrawerNavigator = createDrawerNavigator(
    {
        DNHome: {
            screen: MainStackNavigator
        }
    }, {
        initialRouteName: 'DNHome',
        drawerWidth: px(900),
        drawerPosition: 'left',
        title: "",
        contentComponent: (props) => <DrawerMenu dwData={props} />,
        drawerBackgroundColor: 'transparent'
    }
)
//);
const Apps = createAppContainer(DrawerNavigator)

export default Apps


const styles = StyleSheet.create({
    icon:{
        height:px(90),
        width:px(90),
    },
    SideMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});