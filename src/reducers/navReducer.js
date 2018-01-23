//全部的路由
import Routers from '../routers/index';

//创建路由的Reducer
const navReducer = (state, action) => {
    const newState = Routers.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducer;