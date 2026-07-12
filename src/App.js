/**
 * Created by hfhleo on 17/10/16.
 *
 * APP首页
 */
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers } from "react-navigation"
//导入全局的storage
import './util/Storage'
//全部的Store
import configureStore from './store/configureStore'
//全部的路由
import Routers from './routers/index'
// 服务端配置（启动时刷新 host 缓存）
import { refreshHost } from './util/fetch'
import { refreshWsHost } from './util/Socket'


/*const mapStateToProps = (state) => ({
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
}*/
//const AppWithNavigationState = connect(mapStateToProps)(App);
const AppWithNavigationState = Routers;

//创建store
const store = configureStore();

class Root extends Component {
    constructor(props) {
        super(props);
        // 启动时从 AsyncStorage 加载最新 host 配置
        refreshHost();
        refreshWsHost();
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        )
    }
}

export default Root