/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
import Fetch from '../../util/fetch';
export function handle(data){
    return {
        type:"REGISTER_HANDLE",
        data
    }
}

//获取搜索结果
export function doRegister(options, navigation){
    return dispatch => {
        dispatch(handle({
            loading: true
        }))

        Fetch({
            url:"register",
            data: options,
            type: "POST",
            success:function(ret){
                if(ret.status==1 && ret.data.code==1){
                    //跳转到
                    //console.log('注册成功后跳转')
                    alert('注册成功，请登陆！');
                    navigation.navigate('Login');
                }else{
                    alert(ret.data.msg);
                }
            },
            error: function(status, text){
                dispatch(handle({
                    loading: false
                }));
            },
            reset: function(result){
                dispatch(handle({
                    loading: false
                }));
            }
        })
    }
}