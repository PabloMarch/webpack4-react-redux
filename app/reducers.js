import { combineReducers } from 'redux';

const reducers = { sample: (state = {}) => ({ state }) };
const rootReducer = combineReducers(reducers);

export default rootReducer;
