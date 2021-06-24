import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  title: string;
};

const MainTitle: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <MainTitleStyled>
      {title}
    </MainTitleStyled>
  )
}

export default MainTitle;

const MainTitleStyled = styled.span`
  position: relative;
  color: ${color.pastel.white};
  font-weight: 700;
  font-size: 32px;

  &:after {
    border-radius: 9999px;
    --bg-opacity: 1;
    background-color: ${color.pastel.skyBlue};
    position: absolute;
    margin-left: .25rem;
    content: '';
    width: .2em;
    height: .2em;
    bottom: .2rem
  }
`;