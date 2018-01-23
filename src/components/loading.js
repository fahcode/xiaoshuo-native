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
    ActivityIndicator
} from 'react-native';
import pxToDp   from '../util/px';

const LoadingComponent = (props) =>{
    return (
        <View style={styles.loadingBox}>
          <View style={styles.loading}>
            <ActivityIndicator 
                size="large"
                color="#6435c9"
            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingBox: {
        flex: 1,
        flexDirection: 'row',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingComponent;