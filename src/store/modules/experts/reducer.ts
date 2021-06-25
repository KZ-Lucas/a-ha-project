import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { EXPERTS_FETCH, EXPERTS_SEEMORE } from '@store/modules/experts/actions';
import { ExpertsAction } from '@store/modules/experts/types';
import { GetExpertsResponse } from '@src/types/experts';

// Reducer State
const initialState: GetExpertsResponse = {
  experts: [],
  total: 0,
};

// Reducer
export const expertsReducer = createReducer<GetExpertsResponse, ExpertsAction>(
  initialState,
  {
    [EXPERTS_FETCH]: (_, action) => action.payload,
    [EXPERTS_SEEMORE]: (state, action) =>
      produce(state, (draft) => {
        draft.experts.push(...action.payload.experts);
      }),
  }
);
