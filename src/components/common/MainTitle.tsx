import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  /** 표시할 타이틀 */
  title: string;
};

const MainTitle: React.FunctionComponent<Props> = ({ title }) => (
  <MainTitleStyled>{title}</MainTitleStyled>
);

export default MainTitle;

const MainTitleStyled = styled.span`
  position: relative;
  color: ${color.pastel.white};
  font-weight: 700;
  font-size: 32px;

  &:after {
    position: absolute;
    content: '';
    border-radius: 9999px;
    background-color: ${color.pastel.skyBlue};
    margin-left: .25rem;
    width: .2em;
    height: .2em;
    bottom: .2rem;
  }
`;
