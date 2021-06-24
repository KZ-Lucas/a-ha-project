import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { CHANGE_PAYLOAD } from '@store/modules/experts/actions';
import { PayloadState, ExpertsAction } from '@store/modules/experts/types';
import { defaultCount } from '@constants/experts'

// Reducer State
const initialState: PayloadState = {
  count: defaultCount,
  page: 1,
};

// Reducer
export const expertsReducer = createReducer<PayloadState, ExpertsAction>(initialState, {
  [CHANGE_PAYLOAD]: (state, action) =>
    produce(state, draft => {
      return {...draft, ...action.payload };
    })
});