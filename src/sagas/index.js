import { fork } from 'redux-saga/effects';
import buildDataSaga from './buildDataSaga';
import apiService from '../services/apiService';

const rootSaga = (apiUrl) => {
    const dataApi = apiService.create(apiUrl);
    function* root() {
        yield fork(buildDataSaga(dataApi).watcher);
    }

    return root;
};

export default rootSaga;