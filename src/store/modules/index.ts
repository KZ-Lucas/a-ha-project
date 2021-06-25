import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { expertsReducer } from '@store/modules/experts';

// Reducer Root Combine
export const rootReducer = combineReducers({
  experts: expertsReducer,
});

// Reducer Root State type
export type RootState = StateType<typeof rootReducer>;
