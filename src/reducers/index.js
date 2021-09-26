import { combineReducers } from 'redux';

import utilityReducer from './utilityReducer';
import symbolsReducer from './symbolsReducer';

const reducers = combineReducers({
    utility: utilityReducer,
    symbols: symbolsReducer
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;