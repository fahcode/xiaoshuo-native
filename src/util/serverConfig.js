/**
 * 服务端地址配置管理
 * 支持用户自定义后端 IP/域名，存于 AsyncStorage
 */
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'server_config';

// 默认配置（首次使用或未配置时）
const DEFAULT_CONFIG = {
    httpHost: 'http://23.94.163.5:3888',
    wsHost: 'ws://23.94.163.5:3889'
};

const ServerConfig = {
    /**
     * 获取完整配置
     * @returns {Promise<{httpHost: string, wsHost: string}>}
     */
    async getConfig() {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) {
                const config = JSON.parse(json);
                return { ...DEFAULT_CONFIG, ...config };
            }
        } catch (e) {
            console.warn('读取服务配置失败:', e.message);
        }
        return { ...DEFAULT_CONFIG };
    },

    /**
     * 获取 HTTP 地址
     * @returns {Promise<string>}
     */
    async getHttpHost() {
        const config = await this.getConfig();
        return config.httpHost;
    },

    /**
     * 获取 WebSocket 地址
     * @returns {Promise<string>}
     */
    async getWsHost() {
        const config = await this.getConfig();
        return config.wsHost;
    },

    /**
     * 设置 HTTP 地址
     * @param {string} host - 如 http://192.168.1.100:3888
     */
    async setHttpHost(host) {
        const config = await this.getConfig();
        config.httpHost = host.replace(/\/$/, ''); // 去掉末尾斜杠
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    },

    /**
     * 设置 WebSocket 地址
     * @param {string} host - 如 ws://192.168.1.100:3889
     */
    async setWsHost(host) {
        const config = await this.getConfig();
        config.wsHost = host.replace(/\/$/, '');
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    },

    /**
     * 批量设置
     * @param {{httpHost?: string, wsHost?: string}} config
     */
    async setConfig(config) {
        const current = await this.getConfig();
        const merged = { ...current, ...config };
        if (merged.httpHost) merged.httpHost = merged.httpHost.replace(/\/$/, '');
        if (merged.wsHost) merged.wsHost = merged.wsHost.replace(/\/$/, '');
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    },

    /**
     * 重置为默认
     */
    async reset() {
        await AsyncStorage.removeItem(STORAGE_KEY);
    },

    /**
     * 获取默认配置（同步）
     */
    getDefaults() {
        return { ...DEFAULT_CONFIG };
    }
};

export default ServerConfig;
