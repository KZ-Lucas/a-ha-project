import { ActionType } from 'typesafe-actions';
import * as actions from '@store/modules/experts/actions';

export type PayloadState = {
  experts: [],
  total: 0
};

// Reducer Action Type
export type ExpertsAction = ActionType<typeof actions>;