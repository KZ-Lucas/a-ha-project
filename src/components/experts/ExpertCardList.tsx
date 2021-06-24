import styled from 'styled-components';

const ExpertsCardList: React.FunctionComponent = ({ children }) => {
  return (
    <ExpertsCardListWrapper>
      {children}
    </ExpertsCardListWrapper>
  )
};

export default ExpertsCardList;

const ExpertsCardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
