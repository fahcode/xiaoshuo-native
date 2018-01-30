/**
 * Created by hfh on 2017/11/04.
 *
 * 小说目录列表
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Platform,
    Modal,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import px   from '../util/px';
import * as actions from '../actions/bookChapter';
import Icon from 'react-native-vector-icons/Ionicons';

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            backgroundColor:'#ffb307',
            height:px(Platform.OS === 'ios'?210:150)
        },
        headerTitle:'目录',
        headerTintColor:"white",
        headerBackTitle:null,
        
    })
    constructor(props) {
        super(props);
        this.state = {
            pageRdPst: 0
        }
    }
    
    //列表目录点击,章节里面是记录的pid
    bookDetail(pid, index){
        let params = this.props.navigation.state.params;
        this.props.navigation.navigate("BookRead",{
            bid: params.bid,
            list: this.props.bookChapter.list,
            qidianid: params.qidianid,
            name: params.name,
            link: params.link,
            isAdd: params.isAdd,
            sourceType: params.sourceType,
            rdPst: pid
        });
        /////告诉列表进入的位置
        this.props._handle({
            rdPst: index
        })
    }

    //下拉刷新
    _onRefresh = ()=>{
        if(!this.props.bookChapter.loading){
            this.getData(null, null, true);
        }
    }

    _keyExtractor = (item, index) => item.pid;

    //渲染数据
    _renderItem = (item, index, pageRdPst)=>{
        let dianColor = (item.content != "")? "red": "#999";
        let name = item.name  + (item.isvip? "--(vip)": "");
        /////当前阅读的位置
        let listBg = (index == pageRdPst)? {backgroundColor: '#ffb307'}: {};
        return (
            <TouchableOpacity onPress={()=>{this.bookDetail(item.pid, index)}}>
                <View key={item.index} style={[styles.listView, listBg]}>
                    <View style={styles.dian}><Icon name="md-bulb" size={20} color={dianColor} /></View>

                    <Text style={styles.title}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    //渲染来源列表
    _sourceRenderItem = ({item})=>{
        let dianColor = (this.props.bookChapter.oldSourceType==item.type)? "red": "#999";
        return (
            <TouchableOpacity onPress={()=>{this.sourceTab(item.type)}}>
                <View key={item.pid} style={styles.listView}>
                    <View style={styles.dian}><Icon name="md-bulb" size={20} color={dianColor} /></View>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    //显示选择来源弹窗
    showSourcePop = (visible)=>{
        this.props._handle({
            showPop: visible
        })
    }
    ////切换来源
    sourceTab = (type)=>{
        ///切换来源，重新请求列表数据
        this.getData(type, "asc")
        this.showSourcePop(false);
    }
    
    
    //切换排序
    listSort = ()=>{
        let sort = this.props.bookChapter.sort;
            sort = (sort == "asc")? "desc": "asc";

        /////排序后重新请求列表
        this.getData(null, sort);
    }
    /////更新当前书籍章节列表
    listUpdate= ()=>{
        this.getData(null, this.props.bookChapter.sort, true);
    }

    //请求数据，根据刷新的方式来加载不同请求,这边增加界面选择来源
    getData(sourceType, sort, isupdate){
        let params = this.props.navigation.state.params;
        this.props._getChapter({
            bid: params.bid,
            qidianid: params.qidianid,
            oldSourceType: params.sourceType,
            sourceType: sourceType,
            sort: sort,
            isupdate: isupdate
        })
    } 
    componentWillMount(){

        let getAllData = async ()=>{
            //获取默认配置项
            this.Setting = await storage.load({
                key: 'Setting'
            });
            //设置来源列表
            this.props._handle({
                sourceList: this.Setting.sourceList,
            })
            
        }
        getAllData();
        this.getData();
    }
    componentDidMount() {
        //列表
        /*let data = this.props.bookChapter.list,
            listLen = data.length==0? 1: data.length;
        let oneListHei = px(120) + 1;
        let rdPst = this.props.bookChapter.sort=="asc"? (this.props.bookChapter.rdPst-1): (listLen-this.props.bookChapter.rdPst);
        console.log('设置到位置')
        console.log(rdPst)
        console.log(oneListHei*(rdPst+1))
        this.refs.sectionList.scrollToOffset({offset: oneListHei*(rdPst+1)})*/
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.bookChapter.isUpView){
            /////重新抓列表，不发请求，只是取列表阅读下载状态
            this.getData()
            this.props._handle({
                isUpView: false
            })
        }
    }
    //组件判断是否重新渲染时调用, 控制render
    shouldComponentUpdate(nextProps, nextState){
        //console.log('改变'+ JSON.stringify(nextProps.bookChapter));
        ////////列表长度，排序规则，修改来源,是否显示弹窗改变才会触发。或者每次修改都情况list
        //list改变， 来源弹窗, list本身比较大，但是loding会增加一次
        let nextData = nextProps.bookChapter,
            proData = this.props.bookChapter;
        return (nextData.list !== proData.list || nextData.loading !== proData.loading || nextData.showPop !== proData.showPop)
    }
    /////出去的时候清空列表，释放内存占用
    componentWillUnmount(){

        this.props._handle({
            list: [],
            rdPst: 1,
            showPop: false,
            loading:false
        })
    }

    render() {
        console.log('章节列表render次数')
        //列表
        let data = this.props.bookChapter.list,
            listLen = data.length==0? 1: data.length;
        let oneListHei = px(120) + 1;
        //当前阅读的位置,排序不一样，位置也不一样
        let rdPst = this.props.bookChapter.sort=="asc"? (this.props.bookChapter.rdPst-1): (listLen-this.props.bookChapter.rdPst);
        //this.setState({pageRdPst: rdPst});

        //当前来源列表
        let sourceList = this.props.bookChapter.sourceList;
        let showPop = this.props.bookChapter.showPop; 

        return (
            <View style={styles.container}>
                {/*
                    initialNumToRender={30}
                initialScrollIndex={rdPst}
                getItemLayout={(data, index)=>(
                        {length: oneListHei, offset: oneListHei * index, index}
                    )}*/}
                <TouchableOpacity activeOpacity={1} style={styles.sourceType} onPress={ ()=>{this.showSourcePop(true)} } >
                    <Icon name="ios-list-box-outline" size={40} color="#999" />
                </TouchableOpacity>
                <FlatList
                    ref="sectionList"
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, index})=>(this._renderItem(item, index, rdPst))}
                    refreshing={this.props.bookChapter.loading}
                    onRefresh={this._onRefresh}
                    initialNumToRender={50}
                    initialScrollIndex={rdPst}
                    getItemLayout={(data, index)=>(
                        {length: oneListHei, offset: oneListHei * index, index}
                    )}
                />
                <Modal
                  animationType={"none"}
                  visible={showPop}
                  transparent={true}
                  onRequestClose={()=>{}}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.sourcePop}>
                            <View style={styles.closePop}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {this.showSourcePop(false)}}
                                >
                                    <Icon name="ios-close-outline" size={36} color="#666" />
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Text style={styles.poptit}>选择来源</Text>
                                <View style={styles.popinner}>
                                    <FlatList
                                        data={sourceList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._sourceRenderItem}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.listSort}>
                    <TouchableOpacity
                        activeOpacity={1} 
                        onPress={() => {this.listSort()}}
                    >
                        <Image source={ require('../images/icons/reading_dir_seq.png') } style={styles.sortIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.listUpdate}>
                    <TouchableOpacity
                        activeOpacity={1} 
                        onPress={() => {this.listUpdate()}}
                    >
                        <Image source={ require('../images/icons/reading_dir_refresh.png') } style={styles.sortIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    listView:{
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc',
        height: px(120),
        justifyContent: "center",

    },
    listView_show: {
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc',
        height: px(120),
        backgroundColor: 'red',
        justifyContent: "center",
    },
    title:{
        fontSize:px(42),
        color:"#666",
        marginLeft: px(100)
    },
    sourceType: {
        position: "absolute",
        top: px(50),
        right: px(50),
        zIndex: 10
    },
    modalBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        height: px(1000),
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
    listSort: {
        position: "absolute",
        width: px(160),
        height: px(160),
        bottom: px(50),
        right: px(50),
        zIndex: 10,
    },
    sortIcon: {
        width: px(160),
        height: px(160),
    },
    listUpdate: {
        position: "absolute",
        width: px(160),
        height: px(160),
        bottom: px(50),
        left: px(50),
        zIndex: 10,
    },
    sortIcon: {
        width: px(160),
        height: px(160),
    },
    dian: {
        position: "absolute",
        width: px(100),
        height: px(120),
        top: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "center",
    }
});

function mapStateToProps(state){
    return {bookChapter: state.bookChapter};
}


function mapDispatchToProps(dispatch){
    return {
        _handle:(options)=>{
            dispatch(actions.handle(options))
        },
        _getChapter:(options, data)=>{
            dispatch(actions.getChapter(options, data))
        },
    }
}

const BookChapter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default BookChapter;