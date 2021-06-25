import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@store/modules';
import { CategoryApi } from '@src/core/api';
import * as expertsModules from '@store/modules/experts';
import { defaultCount } from '@constants/experts';
import { GetExpertPayload } from '@Ptypes/experts';

// 하기 안건 처리를 위해 개발됨
// https://github.com/KZ-Lucas/a-ha-project/pull/1
const useExperts = () => {
  const router = useRouter();
  const { rootId, subId, keywords, isAvailable, sortBy } = router.query;
  const experts = useSelector((state: RootState) => state.experts);
  const dispatch = useDispatch();
  const page = useRef(1);

  const getPayload = useCallback(() => {
    const availablePayload: Record<string, any> = keywords
      ? { keywords }
      : subId
      ? { subId }
      : rootId
      ? { rootId }
      : {};

    const originPayload: GetExpertPayload & { keywords?: Array<string> } = {
      count: defaultCount,
      page: page.current,
      ...availablePayload,
    };

    if (isAvailable) {
      originPayload.isAvailable = isAvailable as string;
    }

    if (sortBy) {
      originPayload.sortBy = sortBy as string;
    }

    if (Object.keys(availablePayload)[0] === 'keywords') {
      originPayload.leafIds = JSON.parse(
        decodeURIComponent(Object.values(availablePayload)[0])
      );

      delete originPayload.keywords;
    }

    return originPayload;
  }, [isAvailable, sortBy, keywords, subId, rootId]);

  const fetchExperts = useCallback(
    (payload: Partial<GetExpertPayload> = {}) => {
      page.current = 1;
      CategoryApi.getExperts({ ...getPayload(), ...payload }).then((res) => {
        try {
          dispatch(expertsModules.fetchExperts(res.data));
        } catch (err) {
          throw Error(err);
        }
      });
    },
    [dispatch, getPayload]
  );

  const moreExperts = useCallback(() => {
    page.current++;
    CategoryApi.getExperts({ ...getPayload() }).then((res) => {
      try {
        dispatch(expertsModules.moreExperts(res.data));
      } catch (err) {
        throw Error(err);
      }
    });
  }, [dispatch, getPayload]);

  return {
    experts,
    fetchExperts,
    moreExperts,
  };
};

export default useExperts;
