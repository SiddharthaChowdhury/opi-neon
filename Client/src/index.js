import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import Store from './store';

import Signup from '../components/signup';

const App = () => (
    <div>
        <h2>Hello World!!!</h2>
        <Signup/>
    </div>
)

ReactDOM.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);