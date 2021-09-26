import types from './types';

const requestGetSymbols = symbol => {
    return {
        endPoint: `/api/v3/ticker/price`,
        ajaxType: 'GET',
        params: {
            symbol
        },
        type: types.API_REQUEST_GET_SYMBOLS,
        onSuccess: receiveGetSymbols,
        fetchName: 'fetchingSymbols'
    };
};

const receiveGetSymbols = response => {
    return {
        type: types.API_RECEIVE_GET_SYMBOLS,
        response
    };
};

const updateCoinList = coins => {
    return {
        type: types.UPDATE_COIN_LIST,
        coins
    };
};

export {
    requestGetSymbols,
    updateCoinList
}
