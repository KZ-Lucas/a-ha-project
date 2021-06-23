import styled from 'styled-components';

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
  color: #f0f0f0;
  font-weight: 700;
  font-size: 32px;

  &:after {
    border-radius: 9999px;
    --bg-opacity: 1;
    background-color: #1fc7c1;
    background-color: rgba(31,199,193,var(--bg-opacity));
    position: absolute;
    margin-left: 0.25rem;
    content: '';
    width: 0.2em;
    height: 0.2em;
    bottom: 0.2rem
  }
`;