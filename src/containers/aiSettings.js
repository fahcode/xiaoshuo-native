/**
 * 设置页面：服务端地址 + AI 配置
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
import ServerConfig from '../util/serverConfig';
import px from '../util/px';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 服务端地址
            httpHost: '',
            wsHost: '',
            // AI 配置
            aiUrl: '',
            apiKey: '',
            modelId: '',
            modelName: '',
            vendor: ''
        };
        this.aiLoaded = false;
    }

    async componentWillMount() {
        // 加载服务端配置
        const config = await ServerConfig.getConfig();
        this.setState({
            httpHost: config.httpHost,
            wsHost: config.wsHost
        });
        // 加载 AI 配置
        this.props._getAIConfig();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.aiConfig && nextProps.aiConfig.loaded && !this.aiLoaded) {
            this.aiLoaded = true;
            this.setState({
                aiUrl: nextProps.aiConfig.url || '',
                apiKey: nextProps.aiConfig.apiKey ? '******' : '',
                modelId: nextProps.aiConfig.id || '',
                modelName: nextProps.aiConfig.name || '',
                vendor: nextProps.aiConfig.vendor || ''
            });
        }
    }

    saveAll = async () => {
        const { httpHost, wsHost, aiUrl, apiKey, modelId, modelName, vendor } = this.state;

        // 保存服务端地址
        if (httpHost) {
            await ServerConfig.setHttpHost(httpHost);
        }
        if (wsHost) {
            await ServerConfig.setWsHost(wsHost);
        }

        // 保存 AI 配置
        if (aiUrl) {
            const config = {
                url: aiUrl,
                id: modelId,
                name: modelName,
                vendor
            };
            if (apiKey && !apiKey.startsWith('******')) {
                config.apiKey = apiKey;
            }
            this.props._setAIConfig(config);
        }

        Alert.alert('提示', '配置已保存，重启 App 后服务端地址生效');
    };

    resetDefaults = async () => {
        await ServerConfig.reset();
        const defaults = ServerConfig.getDefaults();
        this.setState({
            httpHost: defaults.httpHost,
            wsHost: defaults.wsHost
        });
        Alert.alert('提示', '已恢复默认服务端地址');
    };

    render() {
        const { httpHost, wsHost, aiUrl, apiKey, modelId, modelName, vendor } = this.state;
        const isConfigured = this.props.aiConfig && this.props.aiConfig.configured;

        return (
            <ScrollView style={styles.container}>
                {/* 服务端地址 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>服务端地址</Text>

                    <View style={styles.item}>
                        <Text style={styles.label}>HTTP 地址 *</Text>
                        <TextInput
                            style={styles.input}
                            value={httpHost}
                            onChangeText={(text) => this.setState({ httpHost: text })}
                            placeholder="http://192.168.1.100:3888"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.hint}>后端服务 HTTP 地址</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.label}>WebSocket 地址</Text>
                        <TextInput
                            style={styles.input}
                            value={wsHost}
                            onChangeText={(text) => this.setState({ wsHost: text })}
                            placeholder="ws://192.168.1.100:3889"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.hint}>后端服务 WebSocket 地址</Text>
                    </View>

                    <TouchableOpacity style={styles.resetBtn} onPress={this.resetDefaults}>
                        <Text style={styles.resetBtnText}>恢复默认地址</Text>
                    </TouchableOpacity>
                </View>

                {/* AI 配置 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>AI 配置</Text>
                        <Text style={[styles.status, isConfigured ? styles.statusOk : styles.statusErr]}>
                            {isConfigured ? '已配置' : '未配置'}
                        </Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.label}>API URL *</Text>
                        <TextInput
                            style={styles.input}
                            value={aiUrl}
                            onChangeText={(text) => this.setState({ aiUrl: text })}
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

                <TouchableOpacity style={styles.saveBtn} onPress={this.saveAll}>
                    <Text style={styles.saveBtnText}>保存全部配置</Text>
                </TouchableOpacity>

                <View style={styles.tips}>
                    <Text style={styles.tipsTitle}>使用说明：</Text>
                    <Text style={styles.tipsText}>1. 服务端地址变更后需重启 App 生效</Text>
                    <Text style={styles.tipsText}>2. AI 配置后搜索可自动发现更多小说来源</Text>
                    <Text style={styles.tipsText}>3. AI 会分析可用网站并生成爬取规则</Text>
                    <Text style={styles.tipsText}>4. API Key 仅保存在服务器，不会泄露</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    section: {
        backgroundColor: '#fff',
        marginTop: px(20),
        marginHorizontal: px(20),
        borderRadius: px(16),
        padding: px(30)
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: px(20)
    },
    sectionTitle: {
        fontSize: px(42),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: px(20)
    },
    status: {
        fontSize: px(32),
        paddingHorizontal: px(16),
        paddingVertical: px(6),
        borderRadius: px(16),
        overflow: 'hidden'
    },
    statusOk: { backgroundColor: '#4caf50', color: '#fff' },
    statusErr: { backgroundColor: '#f44336', color: '#fff' },
    item: { marginBottom: px(24) },
    label: { fontSize: px(34), color: '#666', marginBottom: px(10) },
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
    hint: { fontSize: px(28), color: '#999', marginTop: px(6) },
    saveBtn: {
        backgroundColor: '#ffb307',
        marginHorizontal: px(20),
        marginTop: px(30),
        paddingVertical: px(24),
        borderRadius: px(12),
        alignItems: 'center'
    },
    saveBtnText: { color: '#fff', fontSize: px(40), fontWeight: 'bold' },
    resetBtn: {
        backgroundColor: '#f5f5f5',
        paddingVertical: px(16),
        borderRadius: px(10),
        alignItems: 'center',
        marginTop: px(10),
        borderWidth: 1,
        borderColor: '#ddd'
    },
    resetBtnText: { color: '#666', fontSize: px(34) },
    tips: {
        margin: px(30),
        padding: px(20),
        backgroundColor: '#fff3e0',
        borderRadius: px(12),
        marginBottom: px(60)
    },
    tipsTitle: { fontSize: px(32), color: '#e65100', fontWeight: 'bold', marginBottom: px(10) },
    tipsText: { fontSize: px(28), color: '#666', lineHeight: px(44) }
});

function mapStateToProps(state) {
    return { aiConfig: state.aiConfig || {} };
}

function mapDispatchToProps(dispatch) {
    return {
        _getAIConfig: () => dispatch(actions.getAIConfig()),
        _setAIConfig: (config) => dispatch(actions.setAIConfig(config))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
