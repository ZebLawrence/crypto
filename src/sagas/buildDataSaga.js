
import { call, put, cancel, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import types from '../actions/types';
import { getApiRequestTypes } from './getApiRequestTypes';
import { apiRequest, apiFailure } from '../actions/utilityActions';

export default api => {
    function* worker(action) {
        let apiType;
 
        switch (action.ajaxType) {
            case 'POST':
                apiType = api.postData;
                break;
            case 'PUT':
                apiType = api.putData;
                break;
            case 'DELETE':
                apiType = api.deleteData;
                break;
            default:
                apiType = api.getData;
                break;
        }

        try {
            let response = yield call(apiType, action.endPoint, action.params);

            switch (response.status) {
                case 304:
                case 200:
                case 202:
                case 205:
                case 207:
                    yield put(action.onSuccess(response.data, action.responseDetails));
                    break;
                case 401:
                    yield put(apiFailure(`unauthorized: ${action.type}`));
                    break;
                default:
                    yield put(apiFailure(`non 200,304,401 response: ${action.type}`));
                    break;
            }
        }
        catch (e) {
            yield put(apiFailure(`API error caught: ${e}`));
        }
        finally {
            // Call utitlity method
        }
    }

    let actionsForWorkerToWatch = getApiRequestTypes();

    function* watcher(){
        yield takeEvery(actionsForWorkerToWatch, worker);
        //yield fork(takeLatest, types.KILL_ALL_WORKERS, cancelWorkerSaga, tasks);
    };

    function* cancelWorkerSaga(task) {
        yield cancel(task);
        yield fork(watcher);
    };

    return {
        watcher,
        worker
        //api
    };
};