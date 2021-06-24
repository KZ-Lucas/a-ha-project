import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/modules';
import * as experts from '@store/modules/experts';

const useExperts = () => {
  const payload = useSelector((state: RootState) => state.experts);

  const dispatch = useDispatch();

  const changePayload = useCallback((payload: any) => {
    return dispatch(experts.changePayload({ page: 1, ...payload }))
  }, [dispatch]);
  
  return {
    payload,
    changePayload
  };
};

export default useExperts;