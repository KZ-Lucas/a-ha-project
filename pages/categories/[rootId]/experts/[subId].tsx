import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CategoryApi } from '@api';
import {
  MainTitle,
  CateSwiper,
  KeywordList,
  ToggleSwitch,
  Select,
} from '@components/common';
import { ExpertCardItem, ExpertCardList, SeeMore } from '@components/experts';
import { useExperts } from '@hooks';
import { DateUtil } from '@util';
import type { expertsType, routerType } from '@Ptypes';
import * as constants from '@src/constants';

type Props = {
  categoriesProp: expertsType.GetCategoriesResponse;
  keywordsProp: expertsType.GetCategoriesResponse;
};

const CallPage: React.FunctionComponent<Props> = ({
  categoriesProp,
  keywordsProp,
}) => {
  const router = useRouter();
  const { rootId, subId, keywords, isAvailable, sortBy }: Record<string, any> = router.query;
  const { experts, fetchExperts, moreExperts } = useExperts();

  // 중분류 변경에 따른 라우터 푸시 핸들러
  const selectCategory = (id: string) =>
    router.push(`/categories/${rootId}/experts/${id}`);

  // 하분류 변경에 따른 라우터 푸시 핸들러
  const selectKeyword = (keywords: Array<number>) => {
    const routerObj: routerType.RouterUrlObj = {
      pathname: router.pathname,
      query: router.query,
    };

    delete router.query.keywords;
    if (keywords.length) {
      routerObj.query = {
        ...router.query,
        keywords: encodeURIComponent(JSON.stringify(keywords)),
      };
    }
    router.push(routerObj, undefined, { shallow: true });
  };

  // 즉시 상담 가능 토글 핸들러
  const switchChange = (toggle: boolean) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, isAvailable: toggle },
      },
      undefined,
      { shallow: true }
    );
  };

  // 전문가 정렬 셀렉터 핸들러
  const sortChange = (value: string) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, sortBy: value } },
      undefined,
      { shallow: true }
    );
  };

  // 페이지 더보기 핸들러
  const seeMore = () => moreExperts();

  // 페이지 렌더링 시 전문가 리스팅
  useEffect(fetchExperts, [fetchExperts]);

  return (
    <Wrapper>
      <Nav>
        <NavMain>
          <MainTitle title={categoriesProp.title} />
        </NavMain>
        <NavSub>
          <CateSwiper
            cateList={categoriesProp.children}
            onClick={selectCategory}
            selectedItem={subId}
          />
          <KeywordList
            keywords={keywordsProp.children}
            onClick={selectKeyword}
            selectedItem={
              keywords ? JSON.parse(decodeURIComponent(keywords)) : []
            }
          />
          <ExpertsFilterWrapper>
            <ToggleSwitchWrapper>
              <FilterLabel>지금 상담 가능</FilterLabel>
              <ToggleSwitch
                isToggle={JSON.parse((isAvailable) ?? false)}
                onClick={switchChange}
              />
            </ToggleSwitchWrapper>
            <SortExpertsWrapper>
              <Select
                optionList={constants.experts.filterItems}
                onClick={sortChange}
                defaultValue={sortBy}
              />
            </SortExpertsWrapper>
          </ExpertsFilterWrapper>
        </NavSub>
      </Nav>
      <Main>
        <ExpertCardList>
          {
            experts.experts.map(
              ({
                uuid,
                title,
                rateAvg,
                reviewCount,
                productCount,
                consultingAreas,
                profileImages,
                fastestAvailable,
              }) => (
                <ExpertCardItem
                  key={uuid}
                  title={title}
                  rateAvg={rateAvg}
                  reviewCount={reviewCount}
                  productCount={productCount}
                  activeKeywords={keywords}
                  profileImages={profileImages}
                  fastestSchedule={(() => {
                    if (!fastestAvailable) {
                      return null;
                    }

                    if (DateUtil.getToday() === fastestAvailable.date) {
                      const indexMinute = Math.floor(
                        fastestAvailable.index * 15
                      );
                      return `오늘 ${DateUtil.getMinuteToDate(
                        indexMinute,
                        'HH:mm'
                      )}`;
                    } else {
                      return `${DateUtil.getDate(
                        fastestAvailable.date
                      ).format('MM월 DD일 (dd)')}`;
                    }
                  })()}
                  keywords={(() => {
                    return (
                      consultingAreas
                        .find(({ id }) => id === +rootId)
                        ?.children.find(({ id }) => id === +subId)?.children ??
                      []
                    );
                  })()}
                />
              )
            )
          }
          {experts.total > experts.experts.length ? (
            <SeeMore onClick={seeMore} />
          ) : (
            <></>
          )}
        </ExpertCardList>
      </Main>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps<
  Props,
  routerType.DynamicRouter
> = async (ctx) => {
  const { rootId, subId } = ctx.params!;

  try {
    const categories = await CategoryApi.getCategories(rootId);
    const keywords = await CategoryApi.getCategories(subId);

    return {
      props: {
        categoriesProp: categories.data,
        keywordsProp: keywords.data,
      },
    };
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
const Nav = styled.nav``;
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
  padding-bottom: .75rem;
  border-width: 0 0 1px 0;
  border-color: ${constants.color.pastel.darkGray};
  border-style: solid;
`;
const ToggleSwitchWrapper = styled.div``;
const SortExpertsWrapper = styled.div`
  margin-left: 1rem;
`;
const FilterLabel = styled.span`
  font-size: 0.875rem;
  color: ${constants.color.basic.white};
`;
