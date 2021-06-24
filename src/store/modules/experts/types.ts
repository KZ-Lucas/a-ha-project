import { ActionType } from 'typesafe-actions';
import * as actions from '@store/modules/experts/actions';

export type PayloadState = {
  count: number;
  page: number;
  rootId?: number;
  subId?: number;
  leafId?: number[];
  sortBy?: 'rates' | 'reviews' | 'sessions' | 'recent';
  isAvailable?: boolean;
};

// Reducer Action Type
export type ExpertsAction = ActionType<typeof actions>;