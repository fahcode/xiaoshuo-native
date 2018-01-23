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
    StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import DeviceBattery from 'react-native-device-battery';
import Slider from "react-native-slider";
import * as actions from '../actions/bookRead';
import pxToDp   from '../util/px';
import readTemplate from '../util/readTemplate';
const Realm = require('realm');
import * as RM from '../util/realm';
import * as caseActions from '../actions/bookCase';

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
]

class Main extends Component {
    static navigationOptions = {
        header:null,
        gesturesEnabled:false
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
                            thumbTouchSize={{width:pxToDp(40),height:pxToDp(40)}}
                            onSlidingComplete={(value) => this.props._handle({fontSizeVal:value})}
                            />
                        <Image
                            style={styles.fontImageBig}
                            source={require('../images/read/bottom-2.jpg')}
                            />
                    </View>
                )
            case 3 :
                return(
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
                            maximumValue={100}
                            thumbTouchSize={{width:pxToDp(40),height:pxToDp(40)}}
                            onSlidingComplete={(value) => this.props._handle({lightVal:value})}
                            />
                        <Image
                            style={styles.lightImageBig}
                            source={require('../images/read/light.jpg')}
                            />
                    </View>
                )
            default :
                return(
                    <View style={styles.bottomNavTop}>
                        <TouchableOpacity>
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
                            thumbTouchSize={{width:pxToDp(40),height:pxToDp(40)}}
                            onSlidingComplete={(value) => this.props._handle({chapterSliderVal:value})}
                        />
                        <TouchableOpacity>
                            <Text style={styles.white}>下一章</Text>
                        </TouchableOpacity>
                    </View>
                )
        }
    }

    //切换皮肤
    selectSkin(id){
        this.props._handle({
            backStyle:id-1,
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
                        <TouchableOpacity onPress={()=>this.selectSkin(1)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-1.jpg')}
                                />
                            {this.showSelectIco(0)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(2)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-2.jpg')}
                                />
                            {this.showSelectIco(1)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(3)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-3.jpg')}
                                />
                            {this.showSelectIco(2)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(4)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-4.jpg')}
                                />
                            {this.showSelectIco(3)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(5)} style={styles.bottomNavSkin}>
                            <Image
                                style={styles.skinImage}
                                source={require('../images/read/book-style-5.jpg')}
                                />
                            {this.showSelectIco(4)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectSkin(6)} style={styles.bottomNavSkin}>
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

    //触摸页面，显示隐藏菜单,请求上一章或下一章
    touchContent(event){
        switch(event.nativeEvent.data){
            case "left"  :
                if(this.props.bookRead.chapter!=1){
                    this.getData(--this.props.bookRead.chapter)
                }
                break;
            case "right" :
                this.getData(++this.props.bookRead.chapter)
                break;
            default :
                this.props._handle({
                    showMenu:!this.props.bookRead.showMenu,
                    bottomNavModel:0
                })
                break;
        }
    }

    //底部菜单导功能
    bottomNavTab(id){
        switch(id){
            case 1 :
                this.props.navigation.navigate("BookChapter",{id:this.props.navigation.state.params.id})
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
                this.props._downBook(
                    this.props.navigation.state.params.id,
                    this.props.bookRead.chapter
                )
                this.props._handle({
                    bottomNavModel:4
                })
                break;
            default :
                break;
        }
    }

    //获取章节内容
    getData(pid){
        this.props._getBookDetails({
            id:this.props.navigation.state.params.id,
            pid,
            isAdd:this.props.bookRead.isAdd
        })
    }

    componentDidMount() {
        Realm.open({schema: [RM.BookSchema,RM.ContentSchema,RM.SettingSchema],schemaVersion: RM.version})
            .then(realm => {
                let book = realm.objects('Book').filtered('id = '+this.props.navigation.state.params.id);
                let set  = realm.objects('Setting').filtered('id = "setting"');
                //判断书籍是否已经加入过书架
                if(book.length>0){
                    this.props._handle({
                        isAdd:true
                    })
                }else{
                    this.props._handle({
                        isAdd:false
                    })
                }
                //读取阅读样式设置
                if(set.length>0){
                    this.props._handle({
                        backStyle:set[0].backStyle,
                        fontSizeVal:set[0].fontSizeVal,
                        lightVal:set[0].lightVal
                    })
                }
                this.getData(this.props.navigation.state.params.pid)
        });
    }

    componentWillUnmount(){
        if(this.props.bookRead.isAdd){
            Realm.open({schema: [RM.BookSchema,RM.ContentSchema,RM.SettingSchema],schemaVersion: RM.version})
                .then(realm => {
                    realm.write(() => {
                        realm.create('Book',{
                            id:this.props.navigation.state.params.id,
                            pid:this.props.bookRead.chapter,
                            isRead:true,
                            date:new Date()
                        },true);

                        realm.create('Setting',{
                            id:'setting',
                            backStyle:this.props.bookRead.backStyle,
                            fontSizeVal:this.props.bookRead.fontSizeVal,
                            lightVal:this.props.bookRead.lightVal
                        },true);

                        this.props._updateCase({
                            isUpdate:true
                        })
                    });
            });
        }
        this.props._handle({
            showMenu:false,
            bottomNavModel:0,
            content:'',
        })
    }

    render() {
        const textStyle = {
            color:bookStyleArray[this.props.bookRead.backStyle].color,
        }
        const html = readTemplate(
            this.props.bookRead.content,
            Dimensions.get('window').width,
            this.props.bookRead.fontSizeVal,
            textStyle.color
        )
        console.log(html)
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Image
                    source={bookStyleArray[this.props.bookRead.backStyle].path}
                    style={styles.backImg}
                />
                <View style={styles.readWrap}>

                    <View style={styles.topView}>
                       <Text style={{color:textStyle.color}}>
                           {this.props.bookRead.title}
                       </Text>
                       <Text style={{color:textStyle.color}}>
                           {this.props.navigation.state.params.name}
                       </Text>
                    </View>
                    <WebView
                        automaticallyAdjustContentInsets={false}
                        style={styles.scroll}
                        source={{html: html}}
                        onMessage={(e)=>this.touchContent(e)}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        startInLoadingState={false}
                        scrollEnabled={false}
                    />
                </View>
                {this.props.bookRead.showMenu&&this.showTop()}
                {this.props.bookRead.showMenu&&this.showBottom()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#eee"
    },
    backImg:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    readWrap:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:"transparent",
        paddingTop:pxToDp(150),
        paddingBottom:pxToDp(100)
    },
    tabViews:{
        backgroundColor:"transparent"
    },
    topView:{
        position:"absolute",
        top:0,
        left:0,
        flexDirection:"row",
        justifyContent:"space-between",
        width:Dimensions.get('window').width,
        height:pxToDp(150),
        alignItems:"center",
        paddingLeft:pxToDp(50),
        paddingRight:pxToDp(50)
    },
    topNav:{
        backgroundColor:'#282828',
        position:"absolute",
        top:0,
        left:0,
        width:Dimensions.get('window').width,
        height:pxToDp(Platform.OS === 'ios'?210:150),
    },
    leftNav:{
        width:pxToDp(140),
        height:pxToDp(60),
        position:"absolute",
        bottom:pxToDp(40),
        left:pxToDp(50)
    },
    leftNavImg:{
        width:pxToDp(34),
        height:pxToDp(60),
    },
    scroll:{
        backgroundColor:"transparent",
    },
    bookText:{
        fontSize:pxToDp(48),
        lineHeight:pxToDp(84),
        marginBottom:pxToDp(30)
    },
    bottomNav:{
        backgroundColor:'#282828',
        position:"absolute",
        bottom:0,
        left:0,
        width:Dimensions.get('window').width,
        padding:pxToDp(40)
    },
    bottomNavTop:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:'#393f4c',
        marginBottom:pxToDp(54),
        paddingBottom:pxToDp(54),
        marginTop:pxToDp(10)
    },
    chapterSlider:{
        flex:1,
        marginRight:pxToDp(30),
        marginLeft:pxToDp(30),
    },
    white:{
        fontSize:pxToDp(44),
        color:"#e8e3d4"
    },
    bottomNavB:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",

    },
    bottomNavList:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    settingImage:{
        width:pxToDp(80),
        height:pxToDp(66),
        marginBottom:pxToDp(36),
    },
    settingText:{
        fontSize:pxToDp(36),
        color:'#989faf'
    },
    lightImageSmall:{
        width:pxToDp(64),
        height:pxToDp(64)
    },
    lightImageBig:{
        width:pxToDp(74),
        height:pxToDp(74)
    },
    fontImageSmall:{
        width:pxToDp(70),
        height:pxToDp(54)
    },
    fontImageBig:{
        width:pxToDp(80),
        height:pxToDp(66)
    },
    bottomNavSkin:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    skinImage:{
        width:pxToDp(120),
        height:pxToDp(120)
    },
    skinSelectView:{
        position:"absolute",
        backgroundColor:'#000000',
        width:pxToDp(60),
        height:pxToDp(60),
        opacity:0.3,
        borderRadius:pxToDp(14),
        justifyContent:"center",
        alignItems:"center",
    },
    skinSelectImage:{
        width:pxToDp(34),
        height:pxToDp(21)
    },
    languageView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    languageText:{
        color:'#e8e3d4',
        fontSize:pxToDp(50)
    }

});

function mapStateToProps(state){
    return state;
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _getBookDetails:(options)=>{
            dispatch(actions.getBookDetails(options))
        },
        _downBook:(id,pid)=>{
            dispatch(actions.downBook(id,pid))
        },
        _updateCase:(options)=>{
            dispatch(caseActions.handle(options))
        }
    }
}

const BookRead = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookRead;