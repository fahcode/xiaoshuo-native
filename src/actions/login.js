/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
import Fetch from '../util/fetch';
import publics from './publics';

 
export function handle(data){
    return {
        type:"LOGIN_HANDLE",
        data
    }
}

//获取搜索结果
export function dologin(options, navigation){
    return dispatch => {
        dispatch(handle({
            loading: true
        }))

        Fetch({
            url:"login",
            data: options,
            type: "POST",
            success:function(data){
                if(data.status==1){
                    //修改登陆状态
                    dispatch(handle({
                        loading: false,
                        isLogin: true,
                        name: options.name
                    }));
                    dispatch(publics.handle({
                        loading: false,
                        isLogin: true,
                        name: options.name
                    }));
                    ////设置cookie的状态

                    //console.log('登陆成功后跳转')
                    navigation.navigate('BookCase');
                    //打开左侧栏
                    navigation.navigate('DrawerOpen');
                }else{
                    alert(data.result);
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