import { combineReducers } from 'redux';
import reducers from './reducers';

//redux function to combine reducers into single state. Each reducer will become root node on state object
//i.e. getState() will return { options: {}, formEditor: {}}
const rootReducer = combineReducers({
  reducers,
});

export default rootReducer;
