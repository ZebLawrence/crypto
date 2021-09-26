import types from './types';

const apiFailure = message => {
    return {
        type: types.API_FAILURE,
        message
    };
};

export {
    apiFailure
}