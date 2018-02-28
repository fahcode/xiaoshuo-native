/**
 * Created by hfhleo on 17/10/16.
 */
import { createStore,compose,applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunkMiddleware from 'redux-thunk'

const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware)
)(createStore)

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState)
}