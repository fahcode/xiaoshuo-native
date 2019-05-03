/**
 * Created by apple on 2017/7/6.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Dimensions,
    ScrollView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Switch,
    WebView,
    StatusBar,
    Modal
} from 'react-native';
import {connect} from 'react-redux';
//import DeviceBattery from 'react-native-device-battery';
import Slider from "react-native-slider";
import SystemSetting from 'react-native-system-setting' //系统设置选项
//import KeyEvent from 'react-native-keyevent';
import * as actions from '../store/actions/bookRead';
import readTemplate from '../util/readTemplate';

import Loading from '../components/loading';
import px from '../util/px';
import Icon from 'react-native-vector-icons/Ionicons';


let autoTimer = null;

const bookStyleArray = [
    {
        path:require('../images/read/bg-1.jpg'),
        color:'#484136'
    },
    {
        path:require('../images/read/bg-2.jpg'),
        color:'#32373e'
    },
    {
        path:require('../images/read/bg-3.jpg'),
        color:'#332d29'
    },
    {
        path:require('../images/read/bg-4.jpg'),
        color:'#372e33'
    },
    {
        path:require('../images/read/bg-5.jpg'),
        color:'#606277'
    },
    {
        path:require('../images/read/bg-6.jpg'),
        color:'#888888'
    },
    {
        backgroundColor: "#000",
        color: '#fff'
    },
]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
    },
    backImg: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    readWrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
        paddingTop: px(150),
        paddingBottom: px(80)
    },
    tabViews: {
        backgroundColor: "transparent"
    },
    topView: {
        position: "absolute",
        top: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: Dimensions.get('window').width,
        height: px(150),
        alignItems: "center",
        paddingLeft: px(50),
        paddingRight: px(50)
    },
    topNav: {
        backgroundColor: '#282828',
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: px(Platform.OS === 'ios' ? 210 : 150),
    },
    leftNav: {
        width: px(140),
        height: px(60),
        position: "absolute",
        bottom: px(40),
        left: px(50)
    },
    leftNavImg: {
        width: px(34),
        height: px(60),
    },
    scroll: {
        backgroundColor: "transparent",
    },
    bookText: {
        fontSize: px(48),
        lineHeight: px(84),
        marginBottom: px(30)
    },
    bottomNav: {
        backgroundColor: '#282828',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width,
        padding: px(40)
    },
    bottomNavTop: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#393f4c',
        marginBottom: px(30),
        paddingBottom: px(30),
        marginTop: px(10)
    },
    selectUl: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    selectLi: {
        width: px(120),
        height: px(60),
        borderWidth: 1,
        borderColor: "red",
        marginLeft: px(5),
        marginRight: px(5),

    },
    chapterSlider: {
        flex: 1,
        marginRight: px(30),
        marginLeft: px(30),

    },
    white: {
        fontSize: px(44),
        color: "#e8e3d4",
        textAlign: 'center'
    },
    bottomNavB: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
    bottomNavList: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    settingImage: {
        width: px(80),
        height: px(66),
        marginBottom: px(36),
    },
    settingText: {
        fontSize: px(36),
        color: '#989faf'
    },
    lightImageSmall: {
        width: px(64),
        height: px(64)
    },
    lightImageBig: {
        width: px(74),
        height: px(74)
    },
    fontImageSmall: {
        width: px(70),
        height: px(54)
    },
    fontImageBig: {
        width: px(80),
        height: px(66)
    },
    bottomNavSkin: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    skinImage: {
        width: px(120),
        height: px(120)
    },
    skinImageColor: {
        width: px(120),
        height: px(120),
        backgroundColor: "#000"
    },
    skinSelectView: {
        position: "absolute",
        backgroundColor: '#000000',
        width: px(60),
        height: px(60),
        opacity: 0.3,
        borderRadius: px(14),
        justifyContent: "center",
        alignItems: "center",
    },
    skinSelectImage: {
        width: px(34),
        height: px(21)
    },
    languageView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    languageText: {
        color: '#e8e3d4',
        fontSize: px(50)
    },
    contentContainer: {
        width: "100%",
    },
    contents: {
        marginLeft: px(30),
        marginRight: px(30),
    },
    contentText: {
        fontSize: 24,
        lineHeight: px(120),
        color: "#000",
    },
    modalBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: "center",
    },
    closePop: {
        position: "absolute",
        width: px(80),
        height: px(80),
        top: 0,
        right: 0,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    sourcePop: {
        width: px(800),
        height: px(600),
        alignItems: "center",
        backgroundColor: '#fff',
        borderRadius: px(20),
    },
    poptit: {
        width: px(800),
        fontSize: px(60),
        marginTop: px(20),
        textAlign: 'center',
    },
    popinner: {
        width: px(740),
        marginTop: px(20),
        marginLeft: px(30),
        height: px(850)
    },
    dlboxt: {
        paddingLeft: px(30),
        paddingRight: px(30),
        height: px(120),
        marginBottom: px(30),
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: px(10),
    },
    dltext: {
        fontSize: px(50)
    }
});

class Main extends Component {
    static navigationOptions = {
        header:null,
        gesturesEnabled:false
    }
    constructor(props){
        super(props);
        this.state = {isDefault: true};
    }
    //显示顶部导航菜单
    showTop(){
        return(
            <View style={styles.topNav}>
                <StatusBar barStyle="light-content" hidden={false} />
                <TouchableOpacity style={styles.leftNav} onPress={()=>this.props.navigation.goBack()}>
                    <Image
                        style={styles.leftNavImg}
                        source={require('../images/read/left-nav.jpg')}
                        />
                </TouchableOpacity>
            </View>
        )
    }

    //根据底部菜单模式返回组件
    getBottomNavTop(id){
        switch(id){
            //字体设置
            case 2 :
                return(
                    <View style={styles.bottomNavTop}>
                        <Image
                            style={styles.fontImageSmall}
                            source={require('../images/read/bottom-2.jpg')}
                            />
                        <Slider
                            style={styles.chapterSlider}
                            value={this.props.bookRead.fontSizeVal}
                            maximumTrackTintColor="#525967"
                            minimumTrackTintColor="#e8e3d4"
                            minimumValue={12}
                            maximumValue={40}
                            thumbTintColor="#e8e3d4"
                            thumbTouchSize={{width:px(40),height:px(40)}}
                            onSlidingComplete={(value) => this.props._handle({fontSizeVal:value})}
                            />
                        <Image
                            style={styles.fontImageBig}
                            source={require('../images/read/bottom-2.jpg')}
                            />
                    </View>
                )
            //主题亮度
            case 3 :
                return(
                    <View>
                    <View style={styles.bottomNavTop}>
                        <Image
                            style={styles.lightImageSmall}
                            source={require('../images/read/light.jpg')}
                            />
                        <Slider
                            style={styles.chapterSlider}
                            value={this.props.bookRead.lightVal}
                            maximumTrackTintColor="#525967"
                            minimumTrackTintColor="#e8e3d4"
                            thumbTintColor="#e8e3d4"
                            minimumValue={0}
                            maximumValue={1}
                            thumbTouchSize={{width:px(40),height:px(40)}}
                            onSlidingComplete={(value) => this.cgBrightness(value)}
                            />
                        <Image
                            style={styles.lightImageBig}
                            source={require('../images/read/light.jpg')}
                            />
                        
                    </View>
                    <View style={styles.bottomNavB}>
                        <View style={styles.languageView}>
                            <Text style={styles.languageText}>使用系统亮度</Text>
                            <Switch
                                value={this.props.bookRead.sysLight}
                                onValueChange={(val) => this.changeLight(val)}
                            />
                        </View>
                    </View>
                    </View>
                )
            //默认章节切换
            default :
                return(
                    <View>
                        <View style={styles.bottomNavTop}>
                            <TouchableOpacity onPress={()=>{this.touchContent('left')}}>
                                <Text style={styles.white}>上一章</Text>
                            </TouchableOpacity>
                            <Slider
                                style={styles.chapterSlider}
                                value={this.props.bookRead.chapterSliderVal}
                                minimumValue={0}
                                maximumValue={100}
                                maximumTrackTintColor="#525967"
                                minimumTrackTintColor="#e8e3d4"
                                thumbTintColor="#e8e3d4"
                                thumbTouchSize={{width:px(40),height:px(40)}}
                                onSlidingComplete={(value) => this.readPlan(value)}
                            />
                            <TouchableOpacity onPress={()=>{this.touchContent('right')}}>
                                <Text style={styles.white}>下一章</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomNavTop}>
                            <TouchableOpacity>
                                <Text style={styles.white}>减速</Text>
                            </TouchableOpacity>
                            <View style={styles.selectUl}>
                                <TouchableOpacity style={this.btnstyle(0)} onPress={() => this.autoSeePaly(0)}>
                                    <Text style={styles.white}>0S</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.btnstyle(2)} onPress={()=> this.autoSeePaly(2)}>
                                    <Text style={styles.white}>2S</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.btnstyle(4)} onPress={() => this.autoSeePaly(4)}>
                                    <Text style={styles.white}>4S</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.btnstyle(6)} onPress={() => this.autoSeePaly(6)}>
                                    <Text style={styles.white}>6S</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.btnstyle(8)} onPress={() => this.autoSeePaly(8)}>
                                    <Text style={styles.white}>8S</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.btnstyle(10)} onPress={() => this.autoSeePaly(10)}>
                                    <Text style={styles.white}>10S</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <TouchableOpacity>
                                <Text style={styles.white}>加速</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
        }
    }
    //切换阅读进度
    readPlan(val){
        let self = this;
        
        let contentHei = self.refs._scrollView.contentSize.height - self.refs._scrollView.layoutMeasurement.height;
        let shei = (val / 100) * contentHei;

        self.refs._scrollView.scrollTo({ x: 0, y: shei });
        
    }
    //切换皮肤
    selectSkin(id){
        this.props._handle({
            backStyle: id,
        })
    }

    //是否选中当前皮肤组件
    showSelectIco(id){
        if(this.props.bookRead.backStyle == id){
            return(
                <View style={styles.skinSelectView}>
                   <Image
                       style={styles.skinSelectImage}
                       source={require('../images/read/choose.png')}
                   />
                </View>
            )
        }
    }

    //切换繁体简体
    changeLanguage(val){
        this.props._handle({
            language:val
        })
    }
    //自定义亮度
    cgBrightness(val){
        SystemSetting.setScreenMode(0).catch(()=>{
            //无权限
            SystemSetting.grantWriteSettingPremission()
        });//手动模式
        SystemSetting.setAppBrightness(val);
        //同时不使用自动亮度
        this.props._handle({ 
            //lightVal: value
            sysLight: false
        });
    }
    //切换自动亮度
    changeLight(val){
        this.props._handle({
            sysLight: val
        })
        //恢复默认自动亮度
        if (val){
            SystemSetting.setScreenMode(1);
            SystemSetting.setAppBrightness(this.props.bookRead.lightVal);
        }
    }
    btnstyle(val){
        if (val == this.props.bookRead.autoSpeed){
            return Object.assign( {}, {
                width: px(120),
                height: px(60),
                borderWidth: 1,
                borderColor: "red",
                marginLeft: px(5),
                marginRight: px(5)
            }, { backgroundColor:'blue' } );
        }
        return styles.selectLi;
    }
    autoSeePaly(val){
        let self = this;
        let av = Dimensions.get('window').height - px(Platform.OS === 'ios' ? 210 : 150);

        if (val <= 1) {
            clearInterval(autoTimer);
        }else{
            autoTimer = setInterval(() => {
                let sy = self.props.bookRead.ctOffset.y + av;
                self.refs._scrollView.scrollTo({ x: 0, y: sy });

                self.props._handle({
                    ctOffset: { x: 0, y: sy }
                })

            }, val * 1000);
        };
        this.props._handle({ autoSpeed: val })
    }
    

    //根据底部菜单模式返回组件
    getBottomNavB(id){
        switch(id){
            case 2 :
                return(
                    <View style={styles.bottomNavB}>
                        <View style={styles.languageView}>
                            <Text style={styles.languageText}>
                                {this.props.bookRead.language?'切換成簡體':'切换成繁体'}
                            </Text>
                            <Switch
                                value={this.props.bookRead.language}
                                onValueChange={(val)=>this.changeLanguage(val)}
                            />
                        </View>
                    </View>
                )
            case 3 :
                return(
                    <View style={styles.bottomNavB}>
                        <TouchableOpacity onPress={()=>this.selectSkin(0)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-1.jpg')}
                                />
                            {this.showSelectIco(0)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectSkin(6)} style={styles.bottomNavSkin}>
                            <View style={styles.skinImageColor}></View>
                            {this.showSelectIco(6)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(1)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-2.jpg')}
                                />
                            {this.showSelectIco(1)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(2)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-3.jpg')}
                                />
                            {this.showSelectIco(2)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(3)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-4.jpg')}
                                />
                            {this.showSelectIco(3)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(4)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-5.jpg')}
                                />
                            {this.showSelectIco(4)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(5)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-6.jpg')}
                                />
                            {this.showSelectIco(5)}
                        </TouchableOpacity>
                    </View>
                )
            default :
                return(
                    <View style={styles.bottomNavB}>
                        <TouchableOpacity onPress={()=>this.bottomNavTab(1)} style={styles.bottomNavList}>
                            <Image
                                style={styles.settingImage}
                                source={require('../images/read/bottom-1.jpg')}
                                />
                            <Text style={styles.settingText}>章节列表</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.bottomNavTab(2)} style={styles.bottomNavList}>
                            <Image
                                style={styles.settingImage}
                                source={require('../images/read/bottom-2.jpg')}
                                />
                            <Text style={styles.settingText}>字体设置</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.bottomNavTab(3)} style={styles.bottomNavList}>
                            <Image
                                style={styles.settingImage}
                                source={require('../images/read/bottom-3.jpg')}
                                />
                            <Text style={styles.settingText}>主题亮度</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.bottomNavTab(4)} style={styles.bottomNavList}>
                            <Image
                                style={styles.settingImage}
                                source={require('../images/read/bottom-4.jpg')}
                                />
                            <Text style={styles.settingText}>缓存下载</Text>
                        </TouchableOpacity>
                    </View>
                )
        }
    }

    //显示底部导航菜单
    showBottom(){
        return(
            <View style={styles.bottomNav}>
                {this.getBottomNavTop(this.props.bookRead.bottomNavModel)}
                {this.getBottomNavB(this.props.bookRead.bottomNavModel)}
            </View>
        )
    }
    //显示选择下载选项
    showDownloadPop(){
        let showPop = this.props.bookRead.showPop;
        return(
            <Modal
              animationType={"fade"}
              visible={showPop}
              transparent={true}
              onRequestClose={()=>{}}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.sourcePop}>
                        <View style={styles.closePop}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {this.showSourcePop(!this.props.bookRead.showPop)}}
                            >
                                <Icon name="ios-close" size={36} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <View >
                            <Text style={styles.poptit}>下载</Text>
                            <View style={styles.popinner}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {this.dlContent(50)}}
                                    style={styles.dlboxt}
                                >
                                    <Text style={styles.dltext}>后面50章</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {this.dlContent("after")}}
                                    style={styles.dlboxt}
                                >
                                    <Text style={styles.dltext}>后面全部</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {this.dlContent()}}
                                    style={styles.dlboxt}
                                >
                                    <Text style={styles.dltext}>全部</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    //切换显示下载弹窗
    showSourcePop=(visible)=>{
        this.props._handle({
            showPop: visible,
        })
        return false;
    }
    //下载
    dlContent=(type)=>{
        let params = this.props.navigation.state.params;
        //判断是否已经加入书架
        if (!params.isAdd){
            alert('请加入书架后下载');
            return;
        }
        //隐藏
        this.props._handle({
            showPop: false,
        });
        if(!!type && (type==50 || type=="after")){
            //endPost
            let startPost = this.props.bookRead.chapter+1;
            let endPost = type=="after"? this.props.bookRead.ptotal: (this.props.bookRead.chapter+51);
            if(endPost>this.props.bookRead.ptotal) endPost = this.props.bookRead.ptotal;

            this.props._downloadBook(params.bid, startPost, endPost).then(()=>{
                //全部下载完成
            });
        }else{
            //下载全部内容
            this.props._downloadBook(params.bid, 1, this.props.bookRead.ptotal).then(() => {

            });
        }
    }
    ///记录滚动的位置，在退出的时候保存
    _onScroll=(event)=>{
        let self = this;
        this.ctOffset = event.nativeEvent.contentOffset;
        let offsetY = event.nativeEvent.contentOffset.y; //滑动距离
        let contentSizeHeight = event.nativeEvent.contentSize.height; //scrollView contentSize高度
        let oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; //scrollView高度
        //滚动到底部距离0
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            clearInterval(autoTimer);//停止翻页
            //console.log('滑动到底部事件');
            self.touchContent('right');
        };

        this.props._handle({
            chapterSliderVal: offsetY / (contentSizeHeight - oriageScrollHeight)
        })
    }
    ///插入内容以后修改位置
    setCtOffset=()=>{
        if(this.state.isDefault){
            this.refs._scrollView.scrollTo({ x: 0, y: this.props.bookRead.ctOffset.y })
        }else{
            this.refs._scrollView.scrollTo({ x: 0, y: 0})
        }
    }

    //触摸页面，显示隐藏菜单,请求上一章或下一章
    touchContent = (event)=>{
        //console.log(event)
        //switch(event.nativeEvent.data){
        switch(event){
            case "left"  :
                if(this.props.bookRead.chapter>1){
                    this.setState({ isDefault: false });//在阅读页面切换后就不是初始的状态了
                    this.getData(--this.props.bookRead.chapter)
                    //this.refs._scrollView.scrollTo({y: 0, animated: false});
                }else{
                    clearInterval(autoTimer);
                    alert('已经是第一章了！');
                }
                break;
            case "right" :
                if(this.props.bookRead.chapter<this.props.bookRead.ptotal){
                    this.setState({ isDefault: false });//在阅读页面切换后就不是初始的状态了
                    this.getData(++this.props.bookRead.chapter)
                    //this.refs._scrollView.scrollTo({y: 0, animated: false});
                }else{
                    clearInterval(autoTimer);
                    alert('没有更新的章节了！');
                }
                break;
            default :
                let showMenu = !this.props.bookRead.showMenu;
                console.log(showMenu)
                this.props._handle({
                    showMenu: showMenu,
                    bottomNavModel: 0
                })
                break;
        }
    }

    //底部菜单导功能
    bottomNavTab(id){
        switch(id){
            case 1 :
                let data = this.props.navigation.state.params;
                //this.props.navigation.goBack();
                this.props.navigation.navigate("BookChapter",{
                    bid: this.props.navigation.state.params.bid, 
                    data: data
                })
                break;
            case 2 :
                this.props._handle({
                    bottomNavModel:2
                })
                break;
            case 3 :
                this.props._handle({
                    bottomNavModel:3
                })
                break;
            case 4 :
                if(!this.props.bookRead.isAdd){alert('加入书架才能下载'); return false;}
                this.props._handle({
                    showPop: true,
                    bottomNavModel:4
                })
                break;
            default :
                break;
        }
    }

    //获取章节内容
    getData(chapter){
        let self = this;
        let data = {};//this.props.navigation.state.params.data;
        //if(data.isAdd == undefined) data={};
        let params = this.props.navigation.state.params;
        //判断是否是翻页
        let rdPst = !!chapter? chapter: params.rdPst;
            data.rdPst = rdPst;

        this.props._getBookDetails({
            bid: params.bid,
            name: params.name,
            sourceType: params.sourceType,
            bookID: params.bookID,
            //link: params.link,
            rdPst: rdPst
        }, params.list).then(()=>{
            self.autoSeePaly(this.props.bookRead.autoSpeed);
        })
    }

    componentWillMount() {
        this.getData();
    }
    componentDidMount(){
        let self = this;
        //读取阅读样式设置
        /*if(set.length>0){
            this.props._handle({
                backStyle:set[0].backStyle,
                fontSizeVal:set[0].fontSizeVal,
                lightVal:set[0].lightVal
            })
        }*/
        //获取原来的亮度
        SystemSetting.getAppBrightness().then((brightness) => {
            self.props._handle({
                lightVal: brightness
            })
        });

        let sysVolume = 0;
        //监听音量变化，控制切换位置
        SystemSetting.getVolume().then((volume) => {
            sysVolume = volume;
        });
        const volumeListener = SystemSetting.addVolumeListener((data) => {
            const volume = data.value;
            let av = Dimensions.get('window').height - px(Platform.OS === 'ios' ? 210 : 150);
            //加音量,上翻一页，
            if (sysVolume < volume) av = -1 * av;

            let sy = self.props.bookRead.ctOffset.y + av;
            self.refs._scrollView.scrollTo({ x: 0, y: sy });

            self.props._handle({
                ctOffset: { x: 0, y: sy}
            })
            sysVolume = volume;//保存修改值
        });
    }
    //已加载组件收到新的参数时调用
    componentWillReceiveProps(nextProps) {
    }
    componentWillUnmount(){
        console.log('退出的时候')
        clearInterval(autoTimer);
        //退出的时候保存配置
        this.props._handle({
            showMenu: false,
            bottomNavModel: 0,
            content:'',
        })
        let params = this.props.navigation.state.params;
        ////未加入书架则不保存
        if(!params.isAdd) return false;
        console.log(params)
        ///保存位置信息
        storage.load({
            key: 'bookInfo',
            id: params.bid,
        }).then(ret => {
            ////没有则保存不保存
            if(!!!this.ctOffset) return false;

            //有滚动把最后的滚动值保存
            ret.pageList[ret.rdPst-1].ctOffset= {x: this.ctOffset.x, y: this.ctOffset.y};
            //更新阅读时间
            ret.pageList[ret.rdPst - 1].readTime = new Date().getTime();
            ///保存位置信息
            storage.save({
                key: "bookInfo",
                id: params.bid,
                data: ret
            });
        }).catch(err => {
            console.log(err)
        })
    }
    //组件判断是否重新渲染时调用, 控制render
    /*shouldComponentUpdate(nextProps, nextState){
        return this.props.bookRead.content !== nextProps.bookRead.content
    }*/
    renderCentent(content, fontSizeVal, textColor){
        //let content = this.props.bookRead.content;
        return (
            <TouchableOpacity activeOpacity={1} onPress={ ()=>{this.touchContent("top")} }>
                <View style={styles.contents}>
                    <Text style={ { fontSize: fontSizeVal, lineHeight: px(100), color: textColor}}>{content}</Text>
                    <Text style={{ fontSize: fontSizeVal, lineHeight: px(180), color: textColor, textAlign: 'center'}}>下一章了哦</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        if(this.props.bookRead.loading){
            return <Loading />
        }
        console.log('阅读render次数')
        let content = this.props.bookRead.content,
            bookName = this.props.bookRead.bookName,
            title = this.props.bookRead.title,
            backStyle = this.props.bookRead.backStyle,
            fontSizeVal = this.props.bookRead.fontSizeVal;
        //从预设里取当前的字体颜色
        const textStyle = {
            color: bookStyleArray[backStyle].color,
            backgroundImage: bookStyleArray[backStyle].path,
            backgroundColor: bookStyleArray[backStyle].backgroundColor
        }
        const html = readTemplate(
            content,
            Dimensions.get('window').width,
            fontSizeVal,
            textStyle.color
        )
        let background  = ()=>{
            if (textStyle.backgroundImage) {
                return (
                    <Image
                        source={textStyle.backgroundImage}
                        style={styles.backImg}
                    />
                )
            } else {
                return (
                    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: textStyle.backgroundColor }}></View>
                )
            }
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                />
                {background()}
                <View style={styles.readWrap}>

                    <View style={styles.topView}>
                       <Text style={{color:textStyle.color, flex: 1, overflow: "hidden",flexWrap: "nowrap"}}>
                           { title }
                       </Text>
                       <Text style={{color:textStyle.color, marginRight: px(20)}}>
                           { bookName }
                       </Text>
                    </View>
                    <ScrollView 
                        ref="_scrollView"
                        scrollEventThrottle={800}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={true}
                        onScroll={this._onScroll}
                        onContentSizeChange={this.setCtOffset}
                    >
                        { this.renderCentent(content, fontSizeVal, textStyle.color) }
                    </ScrollView>
                    {/*<WebView
                        automaticallyAdjustContentInsets={false}
                        style={styles.scroll}
                        source={{html: html}}
                        onMessage={(e)=>this.touchContent(e)}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        startInLoadingState={false}
                        scrollEnabled={false}
                    />*/}
                    
                    
                </View>
                {this.props.bookRead.showMenu&&this.showTop()}
                {this.props.bookRead.showMenu&&this.showBottom()}
                {this.showDownloadPop()}
            </View>
        );
    }
}



function mapStateToProps(state){
    return {bookRead: state.bookRead};
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _getBookDetails:(options, data)=>{
            return dispatch(actions.getBookDetails(options, data))
        },
        _downloadBook:(bid, startPost, endPost)=>{
            return dispatch(actions.downloadBook(bid, startPost, endPost))
        }
    }
}

const BookRead = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookRead;


/*<ScrollView 
    ref='scrollView'
    scrollEventThrottle={800}
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={true}
>
    {this.renderCentent()}
</ScrollView>*/