import ServerConfig from './serverConfig';

// 默认 WebSocket host
let cachedWsHost = 'ws://23.94.163.5:3889/';

/**
 * 获取当前生效的 WebSocket host
 */
async function getWsHost() {
    try {
        return await ServerConfig.getWsHost() + '/';
    } catch (e) {
        return cachedWsHost;
    }
}

/**
 * 同步获取缓存的 ws host
 */
function getWsHostSync() {
    return cachedWsHost;
}

/**
 * 刷新 ws host 缓存
 */
async function refreshWsHost() {
    cachedWsHost = await getWsHost();
    return cachedWsHost;
}

/**
 * 创建 WebSocket 连接
 * @param {string} path - 路径
 * @returns {Promise<WebSocket>}
 */
const Socket = async function(path) {
    const host = await getWsHost();
    var ws = new WebSocket(host + (path || ''));
    return ws;
};

/**
 * 同步创建 WebSocket（使用缓存的 host）
 */
const SocketSync = function(path) {
    var ws = new WebSocket(cachedWsHost + (path || ''));
    return ws;
};

export default Socket;
export { SocketSync, refreshWsHost, getWsHostSync };
