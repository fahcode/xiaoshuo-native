## xiaoshuo-native
react-native 做的小说阅读器
*功能未完善，但是勉强可以使用了*

1. 首先得配置sdk,最好安装studio，具体配置可以看官网

2.构建Android测试
```react-native run-android```

3.如果是只跑服务
```react-native start```

4.发布apk
> 首先生成key
`keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
> 修改配置文件
* 把my-release-key.keystore文件放到你工程中的android/app文件夹下
* `项目目录/android/gradle.properties`下添加
    ```
    MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
    MYAPP_RELEASE_KEY_ALIAS=my-key-alias
    MYAPP_RELEASE_STORE_PASSWORD=*****
    MYAPP_RELEASE_KEY_PASSWORD=*****
    ```
* android/app/build.gradle下添加如下代码
    ```
    ...
    android {
        ...
        defaultConfig { ... }
        signingConfigs {
            release {
                if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                    storeFile file(MYAPP_RELEASE_STORE_FILE)
                    storePassword MYAPP_RELEASE_STORE_PASSWORD
                    keyAlias MYAPP_RELEASE_KEY_ALIAS
                    keyPassword MYAPP_RELEASE_KEY_PASSWORD
                }
            }
        }
        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
            }
        }
    }
    ...
    ```
> 执行打包
```cd android && ./gradlew assembleRelease```

*根目录下的app-release.apk 是可以直接安装使用的*
*注意：手机需要打开开发者模式*

![Image](/imgs/app1.png)
![Image](/imgs/app2.png)
![Image](/imgs/app3.png)
![Image](/imgs/app4.png)
![Image](/imgs/app5.png)
