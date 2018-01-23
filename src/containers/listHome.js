/**
 * Created by hfhleo on 17/10/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import pxToDp from '../util/px';//比率px

import BookLine   from './bookLine';//在读书架
import BookCase   from './bookCase';//书架
import BookCity   from './bookCity';//书城
import User       from './user';//用户
import Login      from './login';//登陆
import BookList   from './bookList';//书籍列表
import BookInfo   from './bookInfo';//书籍介绍
import Search     from './search';//书籍搜索
import BookRead   from './bookRead';//阅读页
import BookChapter   from './bookChapter';//目录列表页
import BookClassifyList   from './bookClassifyList';//分类列表页
import BookRankList   from './bookRankList';//分类排行页


////////主按钮
const MainScreenNavigator = TabNavigator({
    BookLine: {
        screen: BookLine,
        navigationOptions: {
            title:"在读",
            tabBarLabel: '在读',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name="ios-analytics" size={28} color={focused?"#ffb307":"#000"}/>
            ),
        },

    },
    BookCase: {
        screen: BookCase,
        navigationOptions: {
            title:"书架",
            tabBarLabel: '书架',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon name="ios-ionitron" size={28} color={focused?"#ffb307":"#000"}/>
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
    User: {
        screen: User,
        navigationOptions: {
            tabBarLabel: '用户',
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
            height:pxToDp(160)
        },
        labelStyle: {
            marginTop:pxToDp(4),
            marginBottom:pxToDp(10),
            fontSize: pxToDp(34), // 文字大小
        },
    },
});

//全部的screen
export default StackNavigator({
    Home: {
        screen: MainScreenNavigator
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
    BookClassifyList: {
        screen:BookClassifyList
    },
    BookRankList: {
        screen:BookRankList
    },
});


const styles = StyleSheet.create({
    icon:{
        height:pxToDp(90),
        width:pxToDp(90),
    }
});