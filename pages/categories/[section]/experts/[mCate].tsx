import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CategoryApi } from '@api';
import { MainTitle, CateSwiper, KeywordList, ToggleSwitch, Select } from '@components/common';
import { ExpertCardItem, ExpertCardList, SeeMore } from '@components/experts';
import { useExperts } from '@hooks';
import { DateUtil } from '@util';
import type { expertsType, routerType } from '@Ptypes';
import * as constants from '@src/constants';

type Props = {
  categoriesProp: expertsType.getCategoriesResponse,
  keywordsProp: expertsType.getCategoriesResponse,
}

// TODO: 데이터 정제해주는 로직만들자.
// TODO:: 내부 로직 검수(성능? 명)
// TODO: experts Effect랑 Selector랑 합쳐보자.
const CallPage: React.FunctionComponent<Props> = ({ categoriesProp, keywordsProp }) => {
  const router = useRouter();
  const { section: rootId, mCate: subId, keywords, isAvailable, sortBy } = router.query;
  const { experts, fetchExperts, moreExperts } = useExperts();
  
  const selectCategory = (id: string) => {
    router.push(`/categories/${rootId}/experts/${id}`);
  };
  const selectKeyword = (keywords: Array<number>) => {
    const routerObj: routerType.RouterUrlObj = {
      pathname: router.pathname,
      query: router.query
    };

    delete router.query.keywords;
    if (keywords.length) {
      routerObj.query = {
        ...router.query,
        keywords: encodeURIComponent(JSON.stringify(keywords))
      };
    }
    router.push(routerObj, undefined, { shallow: true });
  };
  const switchChange = (toggle: boolean) => {
    router.push({ pathname: router.pathname, query: { ...router.query, isAvailable: toggle }}, undefined, { shallow: true });
  };
  const filterChange = (value: string) => {
    router.push({ pathname: router.pathname, query: { ...router.query, sortBy: value }}, undefined, { shallow: true });
  }
  const seeMore = () => {
    moreExperts();
  };

  console.log(2);

  useEffect(() => {
    fetchExperts({});
  }, [fetchExperts]);
  
  return (
    <Wrapper>
      <Nav>
        <NavMain>
          <MainTitle title={categoriesProp.title} />
        </NavMain>
        <NavSub>
          <CateSwiper cateList={categoriesProp.children} onClick={selectCategory} selectedItem={subId as string} />
          <KeywordList keywords={keywordsProp.children} onClick={selectKeyword} selectedItem={keywords ? JSON.parse(decodeURIComponent(keywords as string)) : []} />
          <ExpertsFilterWrapper>
            <ToggleSwitchWrapper>
              <FilterLabel>지금 상담 가능</FilterLabel>
              <ToggleSwitch isToggle={JSON.parse(isAvailable as string ?? false)} onClick={switchChange} />
            </ToggleSwitchWrapper>
            <SortExpertsWrapper>
              <Select optionList={constants.experts.filterItems} onClick={filterChange} defaultValue={sortBy as string} />
            </SortExpertsWrapper>
          </ExpertsFilterWrapper>
        </NavSub>
      </Nav>
      <Main>
        {
          experts ?
            <ExpertCardList>
              {
                experts.experts.length ?
                experts.experts.map(({ uuid, title, rateAvg, reviewCount, productCount, consultingAreas, profileImages, fastestAvailable }) => (
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
                experts.total > experts.experts.length ?
                  <SeeMore onClick={seeMore}/>
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
const ExpertsFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ToggleSwitchWrapper = styled.div`
`;

const SortExpertsWrapper = styled.div`
  margin-left: 1rem;
`;

const FilterLabel = styled.span`
  font-size: .875rem;
  color: ${constants.color.basic.white};
`;