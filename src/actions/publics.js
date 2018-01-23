/**
 * Created by apple on 2017/7/21.
 *
 * 登录
 */
import Fetch from '../util/fetch';
 
export function handle(data){
    return {
        type:"PUBLICS_HANDLE",
        data
    }
}

//获取搜索结果
export function upYundata(data){
	console.log(data);
    return dispatch => {
        dispatch(handle({
            uploading: true
        }))

        /*Fetch({
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
        })*/
    }
}