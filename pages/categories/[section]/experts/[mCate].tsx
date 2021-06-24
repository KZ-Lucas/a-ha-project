import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { CategoryApi } from '@api';
import { MainTitle, CateSwiper, KeywordList } from '@components/common';
import { ExpertCardItem, ExpertCardList, ExpertFilter, SeeMore } from '@components/experts';
import { useExperts } from '@hooks';
import { CommonUtil, DateUtil } from '@util';
import type { expertsType, routerType } from '@Ptypes';

type Props = {
  categoriesProp: expertsType.getCategoriesResponse,
  keywordsProp: expertsType.getCategoriesResponse,
}

// TODO: 데이터 정제해주는 로직만들자.
// TODO: experts Effect랑 Selector랑 합쳐보자.
const CallPage: React.FunctionComponent<Props> = ({ categoriesProp, keywordsProp }) => {
  const router = useRouter();
  const [expertsData, setExpertsData] = useState<expertsType.getExpertsResponse>(); 
  const { section, mCate, keywords } = router.query;
  const { payload, changePayload } = useExperts();
  const {
    count,
    page,
    rootId = section,
    subId = mCate,
    leafId = keywords,
    sortBy,
    isAvailable,
  } = payload;

  const selectCategory = (id: string) => {
    router.push(`/categories/${section}/experts/${id}`);
  }
  const selectKeyword = (keywords: Array<number>) => {
    const routerObj: routerType.RouterUrlObj = {
      pathname: `/categories/${section}/experts/${mCate}`
    };

    if (keywords.length) {
      routerObj.query = {
        keywords: encodeURIComponent(JSON.stringify(keywords))
      };
    }
    router.push(routerObj, undefined, { shallow: true });
  };

  // 페이지 넘길때는 리렌더링안되도록 하는 방법이 있을까?
  useEffect(() => {
    const handleRouteChange = () => {
      changePayload(({ page: 1 }))
    };

    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [changePayload]);

  //TODO: 훅으로 분기
  useEffect(() => {
    void async function () {
      try {
        const vaildObj = CommonUtil.filterVaildObj({ count, page, sortBy, isAvailable });
        const payload = {
          ...vaildObj,
          ...CommonUtil.ObjPick({ rootId, subId, leafId }, ['leafId', 'subId', 'rootId'])[0]
        };

        if (payload.leafId) {
          const leafIdArr = JSON.parse(decodeURIComponent(payload.leafId));

          payload.leafIds = leafIdArr;
          delete payload.leafId;
        }

        const res = await CategoryApi.getExperts(payload);
 
        if (page > 1) {
          setExpertsData(
            (prev: any) => ({
                ...prev,
                experts: prev?.experts.concat(res.data.experts)
            })
          );
        } else {
          setExpertsData(res.data);
        }
      } catch (err) {
        throw Error(err);
      }
    }();
  }, [count, page, rootId, subId, leafId, sortBy, isAvailable]);
  
  return (
    <Wrapper>
      <Nav>
        <NavMain>
          <MainTitle title={categoriesProp.title} />
        </NavMain>
        <NavSub>
          <CateSwiper cateList={categoriesProp.children} onClick={selectCategory} selectedItem={mCate as string} />
          <KeywordList keywords={keywordsProp.children} onClick={selectKeyword} selectedItem={keywords ? JSON.parse(decodeURIComponent(keywords as string)) : []} />
          <ExpertFilter />
        </NavSub>
      </Nav>
      <Main>
        {
          expertsData ?
            <ExpertCardList>
              {
                expertsData.experts.length ?
                  expertsData.experts.map(({ uuid, title, rateAvg, reviewCount, productCount, consultingAreas, profileImages, fastestAvailable }) => (
                  <ExpertCardItem
                    key={uuid}
                    title={title}
                    rate={rateAvg}
                    reviewCount={reviewCount}
                    productCount={productCount}
                    keywords={(() => {
                      return consultingAreas.find(({ id }) => id == rootId)
                        ?.children.find(({ id }) => id == subId)?.children ?? [];
                    })()}
                    imgSrc={profileImages}
                    fastestSchedule={(() => {
                      if (!fastestAvailable) { return null; }
                      const isToday = DateUtil.getToday() === fastestAvailable.date;
                    
                      //TODO: 여기 최종확인
                      if (isToday) {
                        const indexMinute = Math.floor(fastestAvailable.index * 15);

                        return `오늘 ${DateUtil.getMinuteToDate(indexMinute, 'HH:mm')}`;
                      } else {
                        return `${DateUtil.getDate(fastestAvailable.date).format('MM월 DD일 (dd)')}`;
                      }
                    })()}
                  />
                )) : <></>
              }
              {
                expertsData.total > expertsData.experts.length ?
                  <SeeMore onClick={() => changePayload({ page: page + 1 })}/>
                : <></>
              }
            </ExpertCardList> : <></>
        }
      </Main>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps<Props, routerType.DynamicRouter> = async (ctx) => {
  const { section, mCate } = ctx.params!;

  try {
    const categories = await CategoryApi.getCategories(section);
    const keywords = await CategoryApi.getCategories(mCate);

    return {
      props: {
        categoriesProp: categories.data,
        keywordsProp: keywords.data
      }
    }
  } catch (err) {
    throw Error(err);
  }
};

export default CallPage;

const Wrapper = styled.div`
  max-width: 924px;
  margin-left: auto;
  margin-right: auto;
`;
const Nav = styled.nav`
`;
const NavMain = styled.div`
  padding: 2.5rem 0;
`;
const NavSub = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  margin-top: 1.4rem;
`;