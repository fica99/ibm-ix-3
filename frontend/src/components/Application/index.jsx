import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

import Filter from './containers/Filter';

const localStorageMiddleware = ({ getState }) => next => action => {
  const res = next(action);
  if ([action.type].includes(res.type)) {
    //
  }
  return res;
};

export const store = createStore(rootReducer, applyMiddleware(localStorageMiddleware));

const Application = () => (
     <div className="Test">
        <Provider store={store}>
            <Filter/>
        </Provider>
     </div>
)

export default Application;
