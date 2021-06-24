import styled from 'styled-components';
import { color } from '@src/constants';

type SwitchType = {
  toggle: number;
};

type Props = {
  onClick: (toggle: boolean) => void;
  isToggle: boolean;
}


const ToggleSwitch: React.FunctionComponent<Props> = ({ onClick, isToggle }) => {
  const switchChange = () => {
    onClick(!isToggle);
  };

  return (
    <ToggleSwitchWrapper onClick={switchChange} toggle={+isToggle}>
      <SwitchCircle />
    </ToggleSwitchWrapper>
  );
};

export default ToggleSwitch;

//TODO 3 -> 20
const ToggleSwitchWrapper = styled.div<SwitchType>`
  position: relative;
  background-color: ${color.pastel.white};
  display: inline-block;
  vertical-align: middle;
  width: 26.6px;
  height: 14.9px;
  padding: 2px;
  border-radius: 10px;
  margin-left: .25rem;
  cursor: pointer;
  background-color: ${attr => attr.toggle ? color.pastel.skyBlue : color.pastel.lightGray};

  div {
    left: ${attr => attr.toggle ? '12px' : '2px'}  
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