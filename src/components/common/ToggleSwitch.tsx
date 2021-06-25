import styled from 'styled-components';
import { color } from '@src/constants';

type SwitchType = {
  /** 토글 여부 */
  toggle: number;
};

type Props = {
  /** 토글 변경 이벤트 핸들러 */
  onClick: (toggle: boolean) => void;
  /** 토글 상태 */
  isToggle: boolean;
};

const ToggleSwitch: React.FunctionComponent<Props> = ({
  onClick,
  isToggle,
}) => {
  const switchChange = () => onClick(!isToggle);

  return (
    <ToggleSwitchWrapper onClick={switchChange} toggle={+isToggle}>
      <SwitchCircle />
    </ToggleSwitchWrapper>
  );
};

export default ToggleSwitch;

const ToggleSwitchWrapper = styled.div<SwitchType>`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: ${color.pastel.white};
  width: 26.6px;
  height: 14.9px;
  padding: 2px;
  border-radius: 10px;
  margin-left: .25rem;
  cursor: pointer;
  background-color: ${(attr) =>
    attr.toggle ? color.pastel.skyBlue : color.pastel.lightGray};

  div {
    left: ${(attr) => (attr.toggle ? '12px' : '2px')};
  }
`;

const SwitchCircle = styled.div`
  position: absolute;
  background-color: ${color.pastel.white};
  border-radius: 9999px;
  top: 2px;
  width: 11px;
  height: 11px;
  transition: all 150ms linear;
`;
