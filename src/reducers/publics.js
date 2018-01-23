/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
const initialSate = {
    isLogin: false,
    name:'',
    loading: false,
    uploading: false,
    status: false
}

function Publics(state = initialSate,action){
    switch (action.type){
        case "PUBLICS_HANDLE":
            return Object.assign({},state,action.data)

        default :
            return state
    }
}

export default Publics;