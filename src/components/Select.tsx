import styled from 'styled-components';

type Props = {
  optionList: Array<{ key: string; label: string; }>;
};

const Select: React.FunctionComponent<Props> = ({ optionList }) => {
  console.log(2);
  return (
    <SelectStyled onChange={(e) => console.log(e)}>
      {
        optionList.map((option, index) => (
          <OptionStyled key={index} value={option.key}>
            {option.label}
          </OptionStyled>
        ))
      }
    </SelectStyled>
  );
};

export default Select;

const SelectStyled = styled.select`
  font-size: 0.875rem;
  text-align-last: center;
  text-align: center;
  background-color: transparent;
  color: white;
  border: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 0;
  }
`;

const OptionStyled = styled.option`
  color: black;
`;