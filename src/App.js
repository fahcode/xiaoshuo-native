/**
 * Created by hfhleo on 17/10/16.
 *
 * APP首页
 */
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
//导入全局的storage
import './util/Storage'
//全部的Store
import configureStore from './store/configureStore';
//全部的路由
import Routers from './routers/index';

const mapStateToProps = (state) => ({
    nav: state.nav
});
//给每个路由注入方法
class App extends Component {
    render() {
        return (
            <Routers
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}
//const AppWithNavigationState = connect(mapStateToProps)(App);
const AppWithNavigationState = Routers;

//创建store
const store = configureStore();

//设置默认配置
storage.save({
    key: "Setting", 
    data: {
    	defaultType: "qidian",
    	sourceList: [
    		{
    			pid: 1,
    			name: "起点中文网",
    			type: "qidian"
    		},
            {
                pid: 2,
                name: "求小说",
                type: "qxiaoshuo"
            },
    		{
    			pid: 3,
    			name: "笔趣阁",
    			type: "biquge"
    		},
            {
                pid: 4,
                name: "八一中文网",
                type: "_81xsw"
            },
            {
                pid: 11,
                name: "少年文学",
                type: "snwx"
            },
            {
                pid: 5,
                name: "书趣吧--内容少",
                type: "shuquba"
            },
            {
                pid: 6,
                name: "乐文小说网--内容少",
                type: "lwtxt"
            },
            {
                pid: 7,
                name: "一流吧--内容少",
                type: "_168xs"
            },
            {
                pid: 8,
                name: "云来阁--post未实现",
                type: "yunlaige"
            },
            {
                pid: 9,
                name: "爱上中文网--post未实现",
                type: "aszw"
            },
            {
                pid: 10,
                name: "大海中文网--post未实现",
                type: "dhzw"
            }
    	]
    }
});

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
	            <AppWithNavigationState />
            </Provider>
        )
    }
}

export default Root;