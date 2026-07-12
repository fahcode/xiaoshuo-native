/**
 * AI 配置 Reducer
 */
const initialState = {
    configured: false,
    id: '',
    name: '',
    vendor: '',
    url: '',
    apiKey: '',
    loaded: false,
    saved: false
};

export default function aiConfig(state = initialState, action) {
    switch (action.type) {
        case 'AI_CONFIG_HANDLE':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}
