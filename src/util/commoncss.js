import {
    StyleSheet
} from 'react-native';
import px from './px';

const styles = StyleSheet.create({
	xlist: {
		width: '100%',
		flexDirection: 'row',
		paddingBottom: px(20),
	},
    xmenuItem: {
    	position: 'relative',
    	width: '100%',
    	height: px(80),
    	borderWidth: 1,
        borderColor: 'rgba(100, 53, 201, 0.1)',
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'nowrap' ,
        borderRadius: px(20),
        flexShrink: 1,
        marginLeft: px(5),
        marginRight: px(5),
    },
    seleXmenuItem: {
    	backgroundColor: 'red',
    },
    xmenuText: {
    	fontSize: px(36),
        textAlign: 'center',
    },
    seleMenuText: {

    },
    doSelectBtn: {
    	width: '100%',
    	height: '100%'
    },
    seleSubBtns: {
    	position: 'absolute',
    	width: '100%',
    	height: px(800),
    	backgroundColor: '#ccc',
    	top: '100%',
    	left: 0,
    	zIndex: 100
    }
});

export default styles