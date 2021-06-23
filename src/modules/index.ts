import { combineReducers } from 'redux';
import experts from './experts';

const rootReducer = combineReducers({
  experts
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;