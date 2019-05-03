/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
const initialSate = {
    isLogin: false,
    name:'',
    pwd:'',
    loading: false,
    status: false
}

function Login(state = initialSate,action){
    switch (action.type){
        case "LOGIN_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default Login;