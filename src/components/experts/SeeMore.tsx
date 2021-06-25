import styled from 'styled-components';
import { color } from '@constants';
import { PlusIcon } from '../common/icons';

type Props = {
  /** 더보기 클릭 이벤트 핸들러 */
  onClick: () => void;
};

const SeeMore: React.FunctionComponent<Props> = ({ onClick }) => (
  <SeeMoreWrapper onClick={onClick}>
    더보기
    <IconWrapper>
      <PlusIcon width={'.8rem'} height={'.8rem'} />
    </IconWrapper>
  </SeeMoreWrapper>
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
  color: ${color.basic.white};
`;

const IconWrapper = styled.div`
  margin-left: .6rem;
`;
