import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  optionList: Array<{ key: string; label: string; }>;
  onClick: (value: string) => void;
};

const Select: React.FunctionComponent<Props> = ({ optionList, onClick }) => {
  const selectFilter = (event: { target: HTMLSelectElement }) => {
    onClick(event.target.value);
  };
  
  return (
    <SelectStyled onChange={selectFilter}>
      {
        optionList.map((option) => (
          <OptionStyled key={option.key} value={option.key}>
            {option.label}
          </OptionStyled>
        ))
      }
    </SelectStyled>
  );
};

export default Select;

const SelectStyled = styled.select`
  font-size: .875rem;
  text-align-last: center;
  text-align: center;
  background-color: transparent;
  color: ${color.pastel.white};
  border: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 0;
  }
`;

const OptionStyled = styled.option`
  color: ${color.pastel.black};
`;