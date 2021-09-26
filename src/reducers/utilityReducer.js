import types from '../actions/types';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
    hasUtility:true
};

const failure = (state, action) => {
    return Object.assign({}, state, {
        error: true,
        message: action
    });
};

const ACTION_HANDLERS = {
    [types.API_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);