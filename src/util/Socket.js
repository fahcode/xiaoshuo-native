const host = "ws://47.113.103.79:3889/";
//const host = "ws://172.18.4.32:3889/";

const Socket = function(path){
    var ws = new WebSocket( host + (path||"") );
    /* ws.onopen = () => {
        // 打开一个连接
        ws.send('something'); // 发送一个消息
    }; 

    ws.onmessage = (e) => {
        // 接收到了一个消息
        console.log(e.data);
    };

    ws.onerror = (e) => {
        // 发生了一个错误
        console.log(e.message);
    };

    ws.onclose = (e) => {
        // 连接被关闭了
        console.log(e.code, e.reason);
    };
    */
    return ws;
}


export default Socket;
