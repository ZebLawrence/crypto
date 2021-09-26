import { createTypes } from 'reduxsauce';

export default createTypes(`
  KILL_ALL_WORKERS

  API_FAILURE
  API_REQUEST

  API_REQUEST_GET_SYMBOLS
  API_RECEIVE_GET_SYMBOLS
  UPDATE_COIN_LIST

`);