import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  /** 표시할 옵션 리스트 */
  optionList: Array<{ key: string; label: string }>;
  /** 옵션 선택 이벤트 핸들러 */
  onClick: (value: string) => void;
  /** 옵션 기본 선택값 */
  defaultValue: string;
};

const Select: React.FunctionComponent<Props> = ({
  optionList,
  onClick,
  defaultValue,
}) => {
  const selectFilter = (event: { target: HTMLSelectElement }) => onClick(event.target.value);

  return (
    <SelectStyled onChange={selectFilter} value={defaultValue ?? optionList[0].key}>
      {optionList.map((option) => (
        <OptionStyled key={option.key} value={option.key}>
          {option.label}
        </OptionStyled>
      ))}
    </SelectStyled>
  );
};

export default Select;

const SelectStyled = styled.select`
  font-size: .875rem;
  text-align-last: center;
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
