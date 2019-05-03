/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
import Fetch from '../../util/fetch';
import * as publics from './publics';

 
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
            success:function(ret){
                if(ret.status==1 && ret.data.code==1){
                    //修改登陆状态
                    /* dispatch(handle({
                        loading: false,
                        isLogin: true,
                        name: options.name,
                        uid: ret.data.uid
                    }));
                    dispatch(publics.handle({
                        loading: false,
                        isLogin: true,
                        name: options.name,
                        uid: ret.data.uid
                    })); */
                    dispatch(publics.getInit());
                    ////设置cookie的状态

                    //console.log('登陆成功后跳转')
                    navigation.navigate('Home');
                    //打开左侧栏
                    navigation.navigate('DrawerOpen');
                    alert(ret.data.msg)
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