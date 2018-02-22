/**
 * Created by apple on 17/7/3.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import pxToDp     from '../util/px';
import BookCase   from './bookCase';//书架
import BookCity   from './bookCity';//书城
import User       from './user';//用户
import Login      from './login';//登陆
import BookList   from './bookList';//书籍列表
import BookInfo   from './bookInfo';//书籍介绍
import Search     from './search';//书籍搜索
import BookRead   from './bookRead';//阅读页
import BookChapter   from './bookChapter';//目录列表页

const MainScreenNavigator = TabNavigator({
    BookCase: {
        screen: BookCase,
        navigationOptions: {
            title:"书架",
            tabBarLabel: '书架',
            tabBarIcon: ({focused,tintColor}) => (
                <Image
                    source={focused?require("../images/tab/bookSelect.png"):require('../images/tab/book.png')}
                    style={styles.icon}
                />
            ),
        },

    },
    BookCity: {
        screen: BookCity,
        navigationOptions: {
            title:"书城",
            tabBarLabel: '书城',
            tabBarIcon: ({focused,tintColor}) => (
                <Image
                    source={focused?require('../images/tab/citySelect.png'):require('../images/tab/city.png')}
                    style={styles.icon}
                    />
            ),
        },
    },
    User: {
        screen: User,
        navigationOptions: {
            tabBarLabel: '用户',
            tabBarIcon: ({focused,tintColor}) => (
                <Image
                    source={focused?require('../images/tab/userSelect.png'):require('../images/tab/user.png')}
                    style={styles.icon}
                    />
            ),
        },
    },
}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#ff7e3a', // 文字和图片选中颜色
        inactiveTintColor: '#888', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#f9f9f9', // TabBar 背景色
            height:pxToDp(160)
        },
        labelStyle: {
            marginTop:pxToDp(4),
            marginBottom:pxToDp(10),
            fontSize: pxToDp(34), // 文字大小
        },
    },
});




const styles = StyleSheet.create({
    icon:{
        height:pxToDp(90),
        width:pxToDp(90),
    }
});



export default StackNavigator({
    Home: {
        screen: MainScreenNavigator,
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
        screen:BookList
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
    }
});

