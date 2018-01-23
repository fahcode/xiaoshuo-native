/**
 * Created by hfhleo on 17/10/16.
 */
import {Dimensions} from 'react-native';

//  app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 1080
const uiWidthPx = 1080;

//////通过计算比例来做px大小
function pxToDp(uiElementPx) {
    return parseInt(uiElementPx *  (deviceWidthDp / uiWidthPx));
}

export default pxToDp;