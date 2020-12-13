import { createStore } from 'redux';
import initialViewModel from './initialState';
import reducers from './reducers/rootReducer';

const store = createStore(reducers, initialViewModel);

export default store;