import { createAction } from 'typesafe-actions';
import { GetExpertsResponse } from '@src/types/experts';

// Action Type
export const EXPERTS_FETCH = 'experts/EXPERTS_FETCH' as const;
export const EXPERTS_SEEMORE = 'experts/EXPERTS_SEEMORE' as const;

// Action Creator
export const fetchExperts = createAction(EXPERTS_FETCH)<GetExpertsResponse>();
export const moreExperts = createAction(EXPERTS_SEEMORE)<GetExpertsResponse>();
