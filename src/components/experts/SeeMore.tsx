import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  onClick: () => void;
};

// TODO: React already defined?
const SeeMore: React.FunctionComponent<Props> = ({ onClick }) => (
  <SeeMoreWrapper onClick={onClick}>더보기</SeeMoreWrapper>
);

export default SeeMore;

const SeeMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid ${color.pastel.darkGray};
  font-size: 1.125rem;
  padding: 1.4rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: white;
`;