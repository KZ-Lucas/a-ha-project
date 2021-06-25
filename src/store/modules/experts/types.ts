import { ActionType } from 'typesafe-actions';
import * as actions from '@store/modules/experts/actions';
// Reducer Action Type
export type ExpertsAction = ActionType<typeof actions>;
