import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/modules';
import { queryMapping } from '@constants/experts';
import { CategoryApi } from '@src/core/api';
import { useRouter } from 'next/router';
import { CommonUtil } from '@src/core/util';
import * as expertsModules from '@store/modules/experts'

const useExperts = () => {
  const experts = useSelector((state: RootState) => state.experts);
  const router = useRouter();
  const dispatch = useDispatch();
  const ref = useRef(1);

  // 개선 ㅋㅋ
  const lastDrpKey = Object.keys(CommonUtil.ObjPick(router.query, ['keywords', 'mCate', 'section'])[0])[0];
  const lastDrpValue = Object.values(CommonUtil.ObjPick(router.query, ['keywords', 'mCate', 'section'])[0])[0];

  const getPayload = useCallback(() => {
    const originPayload = {
      count: 3,
      page: ref.current,
      [queryMapping[lastDrpKey]]: lastDrpValue
    };

    if (router.query.isAvailable) {
      originPayload.isAvailable = router.query.isAvailable;
    }

    if (router.query.sortBy) {
      originPayload.sortBy = router.query.sortBy;
    }
  
    if (lastDrpKey === 'keywords') {
      const leafIdArr = JSON.parse(decodeURIComponent(lastDrpValue));

      originPayload.leafIds = leafIdArr;
      delete originPayload.leafId;
    }

    return originPayload;
  }, [lastDrpKey, lastDrpValue, router.query.isAvailable, router.query.sortBy]);

  const fetchExperts = useCallback((payload: any) => {
      ref.current = 1;
    // get dynamic route params
    CategoryApi.getExperts({ ...getPayload(), ...payload }).then((res) => {
      try {
       dispatch(expertsModules.fetchExperts(res.data));
      } catch (err) {
        throw Error(err);
      }
    })
  }, [dispatch, getPayload]);

  const moreExperts = useCallback(() => {
    ref.current++;
    CategoryApi.getExperts({ ...getPayload()}).then((res) =>{
      try {
       dispatch(expertsModules.moreExperts(res.data));
      } catch (err) {
        throw Error(err);
      }
    })
  }, [dispatch, getPayload])
  
  return {
    experts,
    fetchExperts,
    moreExperts
  };
};

export default useExperts;