/**
 * AI 配置管理 Actions
 */
import Fetch from '../../util/fetch';

export function handle(data) {
    return {
        type: "AI_CONFIG_HANDLE",
        data
    };
}

// 获取 AI 配置状态
export function getAIConfig() {
    return dispatch => {
        Fetch({
            url: "aiConfigGet",
            data: {},
            type: "GET",
            success: function(ret) {
                if (ret.status == 1) {
                    dispatch(handle({
                        ...ret.data,
                        loaded: true
                    }));
                }
            },
            error: function(status, text) {
                console.log('getAIConfig error:', text);
            },
            reset: function() {}
        });
    };
}

// 保存 AI 配置
export function setAIConfig(config) {
    return dispatch => {
        Fetch({
            url: "aiConfigSet",
            data: JSON.stringify(config),
            type: "POST",
            contentType: 'application/json',
            success: function(ret) {
                if (ret.status == 1) {
                    dispatch(handle({
                        ...ret.data.data,
                        loaded: true,
                        saved: true
                    }));
                    alert('AI 配置已保存');
                } else {
                    alert('保存失败: ' + (ret.msg || '未知错误'));
                }
            },
            error: function(status, text) {
                alert('网络错误: ' + text);
            },
            reset: function() {}
        });
    };
}
