/**
 * Created by hfhleo on 17/10/16.
 */
import { createStore,compose,applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

//组合多个函数,store 增强器 依次执行;添加thunkMiddleware中间件
const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware)
)(createStore)

//创建store
export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState)
}