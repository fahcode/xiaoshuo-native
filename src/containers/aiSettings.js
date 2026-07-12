/**
 * AI 配置页面
 * 设置 DeepSeek API URL、Key、模型 ID
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../store/actions/aiConfig';
import px from '../util/px';

class AISettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            apiKey: '',
            modelId: '',
            modelName: '',
            vendor: ''
        };
    }

    componentWillMount() {
        this.props._getAIConfig();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.aiConfig && nextProps.aiConfig.loaded && !this.state.url) {
            this.setState({
                url: nextProps.aiConfig.url || '',
                apiKey: nextProps.aiConfig.apiKey ? '******' : '', // 脱敏显示
                modelId: nextProps.aiConfig.id || '',
                modelName: nextProps.aiConfig.name || '',
                vendor: nextProps.aiConfig.vendor || ''
            });
        }
    }

    saveConfig = () => {
        const { url, apiKey, modelId, modelName, vendor } = this.state;

        if (!url) {
            Alert.alert('提示', '请输入 API URL');
            return;
        }

        // 如果用户没改 apiKey（还是脱敏的 ******），则不传 apiKey
        const config = {
            url,
            id: modelId,
            name: modelName,
            vendor
        };

        // 只有用户手动输入了新 key 才传
        if (apiKey && !apiKey.startsWith('******')) {
            config.apiKey = apiKey;
        }

        this.props._setAIConfig(config);
    };

    render() {
        const { url, apiKey, modelId, modelName, vendor } = this.state;
        const isConfigured = this.props.aiConfig && this.props.aiConfig.configured;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>AI 配置</Text>
                    <Text style={[styles.status, isConfigured ? styles.statusOk : styles.statusErr]}>
                        {isConfigured ? '已配置' : '未配置'}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>API 设置</Text>

                    <View style={styles.item}>
                        <Text style={styles.label}>API URL *</Text>
                        <TextInput
                            style={styles.input}
                            value={url}
                            onChangeText={(text) => this.setState({ url: text })}
                            placeholder="https://your-api-endpoint/v1/chat/completions"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.label}>API Key</Text>
                        <TextInput
                            style={styles.input}
                            value={apiKey}
                            onChangeText={(text) => this.setState({ apiKey: text })}
                            placeholder="sk-xxxxxxxxxxxxxxxx"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={false}
                        />
                        <Text style={styles.hint}>留空则保留已有 Key</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.label}>模型 ID</Text>
                        <TextInput
                            style={styles.input}
                            value={modelId}
                            onChangeText={(text) => this.setState({ modelId: text })}
                            placeholder="deepseek-v4-flash"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.label}>模型名称</Text>
                        <TextInput
                            style={styles.input}
                            value={modelName}
                            onChangeText={(text) => this.setState({ modelName: text })}
                            placeholder="[sensenova]deepseek-v4-flash"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.label}>供应商</Text>
                        <TextInput
                            style={styles.input}
                            value={vendor}
                            onChangeText={(text) => this.setState({ vendor: text })}
                            placeholder="sensenova"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={this.saveConfig}>
                    <Text style={styles.saveBtnText}>保存配置</Text>
                </TouchableOpacity>

                <View style={styles.tips}>
                    <Text style={styles.tipsTitle}>使用说明：</Text>
                    <Text style={styles.tipsText}>1. 配置 AI 后，搜索时可自动发现更多小说来源</Text>
                    <Text style={styles.tipsText}>2. AI 会分析可用网站并生成爬取规则</Text>
                    <Text style={styles.tipsText}>3. API Key 仅保存在服务器，不会泄露</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        backgroundColor: '#ffb307',
        paddingTop: px(60),
        paddingBottom: px(40),
        paddingHorizontal: px(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: px(56),
        color: '#fff',
        fontWeight: 'bold'
    },
    status: {
        fontSize: px(36),
        paddingHorizontal: px(20),
        paddingVertical: px(8),
        borderRadius: px(20),
        overflow: 'hidden'
    },
    statusOk: {
        backgroundColor: '#4caf50',
        color: '#fff'
    },
    statusErr: {
        backgroundColor: '#f44336',
        color: '#fff'
    },
    section: {
        backgroundColor: '#fff',
        marginTop: px(20),
        marginHorizontal: px(20),
        borderRadius: px(16),
        padding: px(30)
    },
    sectionTitle: {
        fontSize: px(42),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: px(20)
    },
    item: {
        marginBottom: px(24)
    },
    label: {
        fontSize: px(34),
        color: '#666',
        marginBottom: px(10)
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: px(10),
        paddingHorizontal: px(20),
        paddingVertical: px(16),
        fontSize: px(34),
        color: '#333',
        backgroundColor: '#fafafa'
    },
    hint: {
        fontSize: px(28),
        color: '#999',
        marginTop: px(6)
    },
    saveBtn: {
        backgroundColor: '#ffb307',
        marginHorizontal: px(20),
        marginTop: px(30),
        paddingVertical: px(24),
        borderRadius: px(12),
        alignItems: 'center'
    },
    saveBtnText: {
        color: '#fff',
        fontSize: px(40),
        fontWeight: 'bold'
    },
    tips: {
        margin: px(30),
        padding: px(20),
        backgroundColor: '#fff3e0',
        borderRadius: px(12),
        marginBottom: px(60)
    },
    tipsTitle: {
        fontSize: px(32),
        color: '#e65100',
        fontWeight: 'bold',
        marginBottom: px(10)
    },
    tipsText: {
        fontSize: px(28),
        color: '#666',
        lineHeight: px(44)
    }
});

function mapStateToProps(state) {
    return {
        aiConfig: state.aiConfig || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        _getAIConfig: () => dispatch(actions.getAIConfig()),
        _setAIConfig: (config) => dispatch(actions.setAIConfig(config))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AISettings);
