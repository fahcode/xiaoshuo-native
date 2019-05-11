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
    ScrollView,
    Dimensions,
} from 'react-native';
import px from '../util/px';

const webNavig = [
    {
        typeName: '聚合',
        list: [
            { rk: 0, name: '搜读小说', icon: require('../images/icons/newpage_sougou.png'), link: 'http://www.sodu.cc/' },
            { rk: 1, name: '腾讯文学', icon: require('../images/icons/newpage_tencent.png'), link: 'http://ubook.qq.com/' },
            { rk: 1, name: '3G书城', icon: require('../images/icons/newpage_3g.png'), link: 'http://book.3g.cn' },
            { rk: 2, name: 'UC书城', icon: require('../images/icons/newpage_uc.png'), link: 'http://www.zongheng.com/' },
            { rk: 3, name: '宜搜小说', icon: require('../images/icons/newpage_yisou.png'), link: 'http://btouch.easou.com/' },
            { rk: 4, name: '咪咕阅读', icon: require('../images/icons/newpage_heyuedu.png'), link: 'http://wap.cmread.com/' }
        ]
    },
    {typeName: '男频推荐', list: [
        { rk: 0, name: '起点中文网', icon: require('../images/icons/newpage_qidian.png'), link: 'https://www.qidian.com/' },
        { rk: 1, name: '飞卢小说', icon: require('../images/icons/newpage_shucheng.png'), link: 'http://dev.open.baidu.com/home/padhd/show/novel' },
        { rk: 1, name: '百度书城', icon: require('../images/icons/newpage_shucheng.png'), link: 'http://dev.open.baidu.com/home/padhd/show/novel' },
        { rk: 2, name: '纵横中文网', icon: require('../images/icons/newpage_zongheng.png'), link: 'http://www.zongheng.com/' },
        { rk: 3, name: '逐浪网', icon: require('../images/icons/newpage_zhulang.png'), link: 'http://www.zhulang.com/' },
        { rk: 4, name: '17k小说网', icon: require('../images/icons/newpage_17k.png'), link: 'http://www.17k.com/' },
        { rk: 5, name: '创世中文网', icon: require('../images/icons/newpage_chuangshi.png'), link: 'http://chuangshi.qq.com/' }
    ]},
    {
        typeName: '女频推荐', 
        list: [
            { rk: 0, name: '红袖添香', icon: require('../images/icons/newpage_hongxiu.png'), link: 'https://m.hongxiu.com/' },
            { rk: 1, name: '潇湘书院', icon: require('../images/icons/newpage_xiaoxiang.png'), link: 'http://m.xxsy.net/' },
            { rk: 1, name: '晋江文学', icon: require('../images/icons/newpage_jinjiang.png'), link: 'http://wap.jjwxc.net' },
            { rk: 2, name: '胭脂言情', icon: require('../images/icons/newpage_yanzhi.png'), link: 'http://m.yznovel.com/' },
            { rk: 3, name: '言情小说吧', icon: require('../images/icons/newpage_xs8.png'), link: 'http://m.xs8.com/' },
            { rk: 4, name: '小说阅读网', icon: require('../images/icons/newpage_xs.png'), link: 'http://m.readnovel.com/' }
        ]
    },
    {
        typeName: '漫画专区',
        list: [
            { rk: 0, name: '轻漫画', icon: require('../images/icons/newpage_qingmanhua.png'), link: 'http://m.comic.oacg.cn/' }
        ]
    }
]
class Main extends Component {
    static navigationOptions = {
        header: null
    }
    goBrowse(info){
        this.props.navigation.navigate("webViews", { info: info })
    }
    _renderRow(){
        return webNavig.map((item, index) => {
            return (
                <View style={styles.rowWrap} key={index}>
                    <View style={styles.rowTitle}>
                        <Text style={styles.rowTitleTxt}>{item.typeName}</Text>
                    </View>
                    <View style={styles.columnWrap}>
                        {this._renderColumn(item.list)}
                    </View>
                </View>
            )
        })
    }
    //渲染分类数据
    _renderColumn(list) {
        let _list = list || [];
        return _list.sort((a, b)=> a.rk-b.rk).map((item, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => this.goBrowse(item)}>
                    <View style={styles.columnView}>
                        <Image
                            source={item.icon}
                            style={styles.columnImage}
                        />
                        <Text style={styles.columnName}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    render() {
        return (
            <View style={[styles.container]}>
                {/*栏目分类*/}
                <ScrollView>
                {this._renderRow()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#eee"
    },
    rowWrap: {
        width: Dimensions.get('window').width,
        backgroundColor: "white",
        marginTop: px(50),
    },
    rowTitle: {
        paddingLeft: px(60),
    },
    rowTitleTxt:{
        height: px(100),
        lineHeight: px(100),
        fontSize: px(50),
    },
    columnWrap: {
        //flex: 1,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    columnView: {
        width: Dimensions.get('window').width/2,
        height: px(150),
        paddingLeft: px(60),
        paddingRight: px(60),
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: 'center',
    },
    columnImage: {
        width: px(150),
        height: px(150),
        marginRight: px(20),
    },
    columnName: {
        fontSize: px(42),
        color: "#666"
    }
    
});


export default Main;