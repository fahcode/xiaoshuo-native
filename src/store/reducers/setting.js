/**
 * Created by hfh on 2018/1/31.
 *
 *设置
 */
const initialSate = {
    isOpenNightMode: true,
    colorScheme: {
        mainThemeColor: 'rgb(40,40,40)',
        pageBackgroundColor: 'rgb(58,58,58)',
        segmentColor: 'rgb(54,54,54)',
        titleColor: 'rgb(177,177,177)',
        subTitleColor: 'rgb(130,130,130)',
        rowItemBackgroundColor: 'rgb(63,63,63)',
        arrowColor: 'rgb(200,200,200)',
        tabIconColor: 'rgb(230,230,230)',
        thumbnailColor: 'rgb(130,130,130)',
        webViewToolbarColor: 'rgba(40,40,40,.9)'
    }
}

function settings(state = initialSate,action){
    switch (action.type){
        case "OPEN_NIGHT_MODE":
            return Object.assign({},state,{
            	colorScheme： {
			        mainThemeColor: 'rgb(40,40,40)',
			        pageBackgroundColor: 'rgb(58,58,58)',
			        segmentColor: 'rgb(54,54,54)',
			        titleColor: 'rgb(177,177,177)',
			        subTitleColor: 'rgb(130,130,130)',
			        rowItemBackgroundColor: 'rgb(63,63,63)',
			        arrowColor: 'rgb(200,200,200)',
			        tabIconColor: 'rgb(230,230,230)',
			        thumbnailColor: 'rgb(130,130,130)',
			        webViewToolbarColor: 'rgba(40,40,40,.9)'
			    }
            })

        default :
            return state
    }
}

export default settings;