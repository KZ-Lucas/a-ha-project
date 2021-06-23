import React from 'react';
import { getCategories, getExperts } from '../../../../src/core/api/CategoryApi';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import type { getCategoriesResponse } from '../../../../src/type/experts';
import type { DynamicRouter } from '../../../../src/type/router';

type Props = {
  categoriesProp: getCategoriesResponse,
  keywordsProp: getCategoriesResponse,
}

const CallPage: React.FunctionComponent<Props> = ({ categoriesProp, keywordsProp }) => {
  return (
    <Wrapper>
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