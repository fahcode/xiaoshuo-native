/**
 * Created by apple on 17/7/4.
 */
import {Dimensions} from 'react-native';

//  app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 1080
const uiWidthPx = 1080;

function pxToDp(uiElementPx) {
    return parseInt(uiElementPx *  (deviceWidthDp / uiWidthPx));
}

export default pxToDp;