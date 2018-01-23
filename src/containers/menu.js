import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import { 
    DrawerNavigator,
    DrawerItems,
 } from 'react-navigation';

const AvatarUri = "http://cdn-qn0.jianshu.io/assets/default_avatar/3-9a2bcc21a5d89e21dafc73b39dc5f582.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240";
export default class Menu extends Component{
    /*static propTypes={
        onItemSelected:React.PropTypes.func.isRequired,
    };*/
    render (){
        return (
            <ScrollView style={styles.menu} scrollsToTop={false}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{uri:AvatarUri}}
                    />
                </View>
                <Text style={styles.item} onPress={()=>this.props.onItemSelected('我的收藏')}>我的收藏</Text>
                <Text style={styles.item} onPress={()=>this.props.onItemSelected('我的文章')}>我的文章</Text>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    menu:{
      flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'gray',
        padding:20
    },
    avatarContainer:{
        marginBottom:20,
        marginTop:20
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:20,
    },
    nickName:{
        position:'absolute',
        left:70,
        top:20,
        fontSize:18,
    },
    item:{
        fontSize:16,
        fontWeight:'300',
        paddingTop:10,
    }
});