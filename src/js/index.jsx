import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import People from 'containers/people';
import reducer from 'reducer/people';

const middleware = [thunk];
const store = createStore(reducer, compose(applyMiddleware(...middleware)));

render(
    (
        <Provider store={store}>
            <People />
        </Provider>
    )
    , document.getElementById('app')
);
