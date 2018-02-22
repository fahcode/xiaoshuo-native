/**
 * Created by apple on 2017/8/1.
 *
 * 加载中组件
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import pxToDp   from '../util/px';

const LoadingComponent = (props) =>{
    return (
        <View style={styles.loadingView}>
            <Text style={styles.loadingText}>正在加载中...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView:{
        padding:pxToDp(40),
        flexDirection:"row",
        justifyContent:"center",
    },
    loadingText:{
        fontSize:pxToDp(40),
        color:'#333'
    },
});

export default LoadingComponent;