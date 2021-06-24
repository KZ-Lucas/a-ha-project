import { createAction } from 'typesafe-actions';
import { PayloadState } from '@store/modules/experts/types';

// Action Type
export const CHANGE_PAYLOAD = 'experts/CHANGE_PAYLOAD' as const;

// Action Creator
export const changePayload = createAction(CHANGE_PAYLOAD)<PayloadState>();