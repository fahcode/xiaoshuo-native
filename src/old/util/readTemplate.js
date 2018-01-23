/**
 * Created by apple on 2017/8/11.
 *
 * 阅读模版
 */
export default function readTemplate(content,width,fontSize,color){
    return `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
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
                                   width: 100%;
                                    height: 100%;
                                    overflow: hidden;
                                }
                                #content{

                                    padding:0 16px;
                                    box-sizing: border-box;
                                    -webkit-box-sizing: border-box;
                                    -webkit-column-width: ${width}px;
                                    -webkit-column-gap: 32px;
                                    column-gap: 32px;
                                    column-width:${width}px;
                                        transition: transform 400ms ease;
                                     transform: translate3d(0px, 0px, 0px);
                                     font-size: ${fontSize}px;
                                     text-align: justify;

                                }

                                p{
                                    font-size: ${fontSize}px;
                                    line-height: ${fontSize*1.9}px;
                                    font-weight: normal;
                                    text-align: justify;

                                }
                                .swiper{
                                    -webkit-tap-highlight-color: transparent;
                                }
                                .swiper div{
                                    position: fixed;
                                    top:0;
                                    width: 33.3%;
                                    height:100%;
                                    -webkit-user-drag: none;
                                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                                }
                                #swiper-center{
                                    left:33.3%;
                                }
                                #swiper-right{
                                    right: 0;
                                }
                            </style>
                        </head>
                        <body>
                           <div id="wrap">
                           <div id="content">
                            <p>${content}</p>
                           </div>
                           <div class="swiper">
                                <div  id="swiper-left"></div>
                                <div  id="swiper-center"></div>
                                <div  id="swiper-right"></div>
                            </div>
                           </div>
                           <script>

                            window.onload=function(){

                                var content = document.getElementById('content');
                                var page = 0,width = ${width},length = parseInt(content.scrollWidth/${width});
                                content.style.color= '${color}';
                                document.getElementById('swiper-left').addEventListener("click", function(){
                                       if(page==0){
                                           window.postMessage("left");
                                           return false;
                                       }
                                       page--;
                                       content.style.transform = "translate3d(-"+(width*page)+"px, 0px, 0px)";
                                });
                                document.getElementById('swiper-center').addEventListener("click", function(){
                                       window.postMessage("center");
                                });
                                document.getElementById('swiper-right').addEventListener("click", function(){
                                    if(page==length){
                                        window.postMessage("right");
                                        return false;
                                    }
                                    page++;
                                    content.style.transform = "translate3d(-"+(width*page)+"px, 0px, 0px)";
                                });

                            }
                        </script>
                        </body>
                </html>`;
}