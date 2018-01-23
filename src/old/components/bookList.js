/**
 * Created by apple on 2017/7/18.
 *
 * 书籍列表组件
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import pxToDp   from '../util/px';

const BookListComponent = (props) =>{
   return (
       <View key={props.data.id}  style={styles.listView}>
           <Image
               source={{uri:props.data.imgUrl}}
               style={styles.listImage}
               />
           <View style={styles.rightView}>
               <Text style={styles.listName}>{props.data.name}</Text>
               <Text style={styles.listAuthor}>作者: {props.data.author}</Text>
               <Text style={styles.listInfo} numberOfLines={3}>{props.data.info}</Text>
           </View>
       </View>
   )
}

const styles = StyleSheet.create({
    listView:{
        paddingTop:pxToDp(40),
        paddingBottom:pxToDp(40),
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"#dcdcdc"
    },
    listImage:{
        width:pxToDp(200),
        height:pxToDp(266),
        marginRight:pxToDp(36)
    },
    rightView:{
        flexDirection:"column",
        flex:1
    },
    listName:{
        fontSize:pxToDp(44),
        color:"#333",
        marginTop:pxToDp(4),
        marginBottom:pxToDp(14)
    },
    listInfo:{
        fontSize:pxToDp(36),
        color:"#999",
        lineHeight:pxToDp(44),
        marginBottom:0,
    },
    listAuthor:{
        fontSize:pxToDp(36),
        color:"#999",
        marginBottom:pxToDp(14)
    }

});

export default BookListComponent;