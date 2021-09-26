import types from '../actions/types';

function getApiTypes () {

    let apiTypes = [];
    let regTest = /^API_REQUEST/;

    for( var t in types) {
        if(regTest.test(t)){
            apiTypes.push(types[t]);
        }
    }

    return apiTypes;
}

export { getApiTypes as getApiRequestTypes };