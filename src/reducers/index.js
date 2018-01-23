/**
 * Created by hfhleo on 17/10/16.
 */
import { combineReducers} from 'redux';
import bookLine from './bookLine';
import bookCase from './bookCase';
import bookCity from './bookCity';
import bookList from './bookList';
import bookInfo from './bookInfo';
import bookRead from './bookRead';
import search   from './search';
import login   from './login';
import bookChapter from './bookChapter';
import bookClassifyList from './bookClassifyList';
import bookRankList from './bookRankList';
import register from './register';
import publics from './publics';
import nav from './navReducer';

///////合并全部的reducers
export default combineReducers({
	bookLine,
    bookCase,
    bookCity,
    bookList,
    bookInfo,
    bookRead,
    bookChapter,
    search,
    login,
    register,
    bookClassifyList,
    bookRankList,
    publics,
    nav
})
