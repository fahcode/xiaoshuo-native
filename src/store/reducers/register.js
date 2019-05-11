/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
const initialSate = {
    isLogin: false,
	name: "",
    phone:'',
    smsCode:'',
    pwd: "",
    repeatPwd: "",
    loading:false,
    status: false
}

function Register(state = initialSate,action){
    switch (action.type){
        case "REGISTER_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default Register;