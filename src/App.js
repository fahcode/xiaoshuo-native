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
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
                {/* <View>
                    
                    <Modal
                        animationType={"fade"}
                        visible={true}
                        transparent={true}
                        onRequestClose={() => { }}
                    >
                    </Modal>
                </View> */}
            </Provider>
        )
    }
}

export default Root;