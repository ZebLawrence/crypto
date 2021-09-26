import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import buildStore from './buildStore';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import './assets/styles/bootstrap/bootstrap.scss';
import './index.scss';

ReactDOM.render(
    <Provider store={buildStore('https://api.binance.us/')}>
        <App />
    </Provider>, document.getElementById('root')
);
registerServiceWorker();
