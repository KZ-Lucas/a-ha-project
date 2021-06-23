import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import * as experts from '../modules/experts';
import { useRouter } from 'next/router';

export const useExperts = () => {
  const payload = useSelector((state: RootState) => state.experts);
  const dispatch = useDispatch();

  const changePayload = useCallback((payload: any) => dispatch(experts.changePayload(payload)), [dispatch]);
  
  return {
    payload,
    changePayload
  };
};