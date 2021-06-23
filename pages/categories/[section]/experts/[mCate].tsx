import Router, { useRouter } from 'next/router';
import React from 'react';
import { getCategories, getExperts } from '../../../../src/core/api/CategoryApi';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import type { getCategoriesResponse } from '../../../../src/type/experts';
import type { RouterUrlObj, DynamicRouter } from '../../../../src/type/router';
import MainTitle from '../../../../src/components/MainTitle';
import CateSwiper from '../../../../src/components/CateSwiper';
import KeywordList from '../../../../src/components/KeywordList';
import ExpertFilter from '../../../../src/components/ExpertFilter';

type Props = {
  categoriesProp: getCategoriesResponse,
  keywordsProp: getCategoriesResponse,
}

const CallPage: React.FunctionComponent<Props> = ({ categoriesProp, keywordsProp }) => {
  const router = useRouter();
  const { section, mCate, keywords } = router.query;
  const selectCategory = (id: string) => {
    router.push(`/categories/${section}/experts/${id}`);
  }
  const selectKeyword = (keywords: Array<number>) => {
    const routerObj: RouterUrlObj = {
      pathname: `/categories/${section}/experts/${mCate}`
    };

    if (keywords.length) {
      routerObj.query = {
        keywords: encodeURIComponent(JSON.stringify(keywords))
      };
    }
    router.push(routerObj, undefined, { shallow: true });
  };
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
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps<Props, DynamicRouter> = async (ctx) => {
  const { section, mCate } = ctx.params!;

  try {
    const categories = await getCategories(section);
    const keywords = await getCategories(mCate);

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
  padding: 4% 0;
`;
const NavSub = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  margin-top: 2%;
`;