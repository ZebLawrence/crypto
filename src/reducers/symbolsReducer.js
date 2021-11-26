import types from '../actions/types';
import { createReducer } from 'reduxsauce';
import { findIndex } from 'lodash';

export const INITIAL_STATE = {
    fetchingSymbols: false,
    symbolsData: [],
    coins: [
        {
            purchasedPrice: 300,
            coin: 'ETH',
            coinPair: 'ETHUSD',
            ratio: 0.08147,
            chartNum: 1027
        },
        {
            purchasedPrice: 300,
            coin: 'SOL',
            coinPair: 'SOLUSD',
            ratio: 1.66,
            chartNum: 5426
        },
        {
            purchasedPrice: 50,
            coin: 'ADA',
            coinPair: 'ADAUSD',
            ratio: 21.9,
            chartNum: 2010
        },
        {
            purchasedPrice: 50,
            coin: 'ATOM',
            coinPair: 'ATOMUSD',
            ratio: 1.253,
            chartNum: 3794
        },
        {
            purchasedPrice: 50,
            coin: 'DOGE',
            coinPair: 'DOGEUSD',
            ratio: 221,
            chartNum: 74
        },        
        {
            purchasedPrice: 50,
            coin: 'ALGO',
            coinPair: 'ALGOUSD',
            ratio: 26.719,
            chartNum: 4030
        },
        {
            purchasedPrice: 200,
            coin: 'MATIC',
            coinPair: 'MATICUSD',
            ratio: 127.1,
            chartNum: 3890
        }
    ],
    myHoldings: []
};

const requestGetSymbols = (state, action) => {
    return Object.assign({}, state, {
        fetchingSymbols: true
    });
};

const receiveGetSymbols = (state, action) => {
    const { response } = action;
    const { coins } = state;
    const myHoldings = [];
    response.forEach(quote => {
        const { symbol } = quote;
        const matchingIndex = findIndex(coins, { coinPair: symbol });
        if (matchingIndex > -1) {
            myHoldings.push({ ...coins[matchingIndex], ...quote });
        }
    });

    return Object.assign({}, state, {
        fetchingSymbols: false,
        symbolsData: action.response,
        myHoldings
    });
};

const updateCoinList = (state, action) => {
    return Object.assign({}, state, {
        coins: action.coins
    });
};

const ACTION_HANDLERS = {
    [types.API_REQUEST_GET_SYMBOLS]: requestGetSymbols,
    [types.API_RECEIVE_GET_SYMBOLS]: receiveGetSymbols,
    [types.UPDATE_COIN_LIST]: updateCoinList
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);