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
    TouchableOpacity,
    Dimensions,
    WebView
} from 'react-native';
import px from '../util/px';
import Icon from 'react-native-vector-icons/Ionicons';
import webTemplate from '../util/webTemplate';
class Main extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#ffb307',
            height: px(Platform.OS === 'ios' ? 190 : 130)
        },
        headerTitleStyle: {
            color: '#fff'
        },
        headerBackTitle: null,
        headerTitle: `${navigation.state.params.info.name}`
    })
    constructor(props) {
        super(props);
        this.state = { isDefault: true };
    }
    injectJavaScript(){
        let div = window.document.createElement('div');
            div.innerHTML('返回');
            div.style.cssText = 'position: fixed;width: 100%;height: 50px;line-height: 50px;top: 0;left: 0;background-color: rgba(0, 0, 0, 0.5);font-size: 14px;color: red;z-inde: 1000;'
        window.document.body.appendChild(div);

    }
    componentDidMount(){
        //let params = this.props.navigation.state.params;
        //let link = params.link;
        //console.log(link)
    }
    historyBack(){
        this.refs['webView'].goBack();
    }
    render() {
        let params = this.props.navigation.state.params;
        let info = params.info;
        /* const html = webTemplate({
            px: px,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - px(Platform.OS === 'ios' ? 190 : 130),
            uri: info.link,
        }); */

        return (
            <View style={[styles.container]}>
                <View style={styles.topControl}>
                    <TouchableOpacity onPress={() => { this.historyBack() }}>
                        <View style={styles.historyBack}>
                            <View style={styles.dian}><Icon name="ios-arrow-round-back" size={36} /></View>
                            <Text style={styles.title}>返回</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <WebView
                    ref="webView"
                    automaticallyAdjustContentInsets={false}
                    style={styles.webview}
                    source={{ uri: info.link }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scrollEnabled={false}
                    //injectJavaScript={this.injectJavaScript()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
    },
    topControl:{
        width: Dimensions.get('window').width,
        height: px(90),
        backgroundColor: "rgba(34, 157, 255, 0.5)"//97cbff
    },
    historyBack: {
        width: px(200),
        height: px(90),
        marginLeft: px(20),
        flexDirection: "row",
        alignItems: "center",
    },
    dian: {
        
    },
    title:{
        fontSize: px(46),
        color: "#000",
        marginLeft: px(10)
    },
    webview: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - px(Platform.OS === 'ios' ? 190 : 130) - px(90)
    }

});


export default Main;