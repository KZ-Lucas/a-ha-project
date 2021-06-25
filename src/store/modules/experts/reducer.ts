import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { EXPERTS_FETCH, EXPERTS_SEEMORE } from '@store/modules/experts/actions';
import { PayloadState, ExpertsAction } from '@store/modules/experts/types';
import { getExpertsResponse } from '@src/types/experts';

// Reducer State
const initialState: PayloadState = {
  experts: [],
  total: 0
};

// Reducer
export const expertsReducer = createReducer<getExpertsResponse, ExpertsAction>(initialState, {
  [EXPERTS_FETCH]: (_, action) => action.payload,
  [EXPERTS_SEEMORE]: (state, action) =>
    produce(state, draft => {
      draft.experts.push(...action.payload.experts);
    })
});