/**
 * Created by apple on 17/7/3.
 */
import { combineReducers} from 'redux';
import bookCase from './bookCase';
import bookCity from './bookCity';
import bookList from './bookList';
import bookInfo from './bookInfo';
import bookRead from './bookRead';
import search   from './search';
import login   from './login';
import bookChapter from './bookChapter';

export default combineReducers({
    bookCase,
    bookCity,
    bookList,
    bookInfo,
    bookRead,
    bookChapter,
    search,
    login
})
