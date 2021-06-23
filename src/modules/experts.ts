import { DEFALUT_COUNT } from '../constants/experts';

/** Certain Payload Change */
const CHANGE_PAYLOAD = 'experts/CHANGE_PAYLOAD' as const;

/** Declare Action Creation Function */
export const changePayload = (payload: any) => ({ type: CHANGE_PAYLOAD, payload });

export type ExpertsAction = 
  ReturnType<typeof changePayload>;

type ExpertsState = {
  count: number;
  page: number;
  rootId?: number;
  subId?: number;
  leafId?: number[];
  sortBy?: 'rates' | 'reviews' | 'sessions' | 'recent';
  isAvailable?: boolean;
};

const initialState: ExpertsState = {
  count: DEFALUT_COUNT,
  page: 1,
};

function experts (state: ExpertsState = initialState, action: ExpertsAction) {
  switch (action.type) {
    case CHANGE_PAYLOAD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default experts;