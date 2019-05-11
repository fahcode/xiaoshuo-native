/**
 * Created by apple on 2017/8/11.
 *
 * 阅读模版
 */
export default function readTemplate(ops){
    return `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <title></title>
                            <style>
                                *{
                                    margin: 0px;
                                    padding: 0px;
                                }
                                #content,body,html{
                                    width: 100%;
                                    height: 100%;
                                }
                                #wrap{
                                    box-sizing: border-box;
                                    -webkit-box-sizing: border-box;
                                    width: ${ops.width}px;
                                    height: ${ops.height}px;
                                    padding-top: ${ops.px(80)}px;
                                    overflow: hidden;
                                }


                                #native-control{
                                    position: absolute;
                                    box-sizing: border-box;
                                    -webkit-box-sizing: border-box;
                                    width: 100%;
                                    height: ${ops.px(80)}px;
                                    line-height: ${ops.px(80)}px;
                                    top: 0;
                                    left: 0;
                                    background-color: rgba(255, 179, 7, 0.5);
                                }
                                .nc-backBnt{
                                    width: ${ops.px(200)}px;
                                    height: ${ops.px(80)}px;
                                    border: none;
                                    background-color: #eee;
                                    font-size: 14px;
                                    color: #000;
                                }

                                #content{
                                    box-sizing: border-box;
                                    -webkit-box-sizing: border-box;
                                    width: 100%;
                                    height: 100%;
                                    transition: transform 400ms ease;
                                    transform: translate3d(0px, 0px, 0px);
                                    text-align: justify;
                                    overflow: hidden;
                                }
                                #webIframe{
                                    width: 100%;
                                    height: 100%;
                                    overflow: hidden;
                                }
                            </style>
                        </head>
                        <body>
                            <div id="wrap">
                                <div id="native-control">
                                    <button class="nc-backBnt" id="backBtn">返回</button>
                                </div>
                                <div id="content">
                                    <iframe id="webIframe" frameborder="0" name="web" width="100%" src="${ops.uri}"></iframe>
                                </div>
                            </div>
                            <script>

                            window.onload=function(){

                                var content = document.getElementById('content');
                                var backBtn = document.getElementById('backBtn');

                                backBtn.addEventListener("click", function(){
                                    history.go(-1);
                                })
                            }
                        </script>
                        </body>
                </html>`;
}