import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '@store/modules';

// Store Creator
const configureStore = () => {
  // Create Store
  const store = createStore(rootReducer, composeWithDevTools());

  return store;
};

export default configureStore;
