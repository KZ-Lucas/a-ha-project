import styled from 'styled-components';

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

// TODO: 0.25 .25 COMMON
const ToggleSwitchWrapper = styled.div<SwitchType>`
  position: relative;
  background-color: #bbbbbb;
  display: inline-block;
  vertical-align: middle;
  width: 26.6px;
  height: 14.9px;
  padding: 2px;
  border-radius: 10px;
  margin-left: 0.25rem;
  cursor: pointer;
  background-color: ${attr => attr.toggle ? '#1fc7c1' : '#bbbbbb'};

  div {
    left: ${attr => attr.toggle ? '12px' : '2px'}  
  }
`;

const SwitchCircle = styled.div`
  position: absolute;
  background-color: #f0f0f0;
  border-radius: 9999px;
  top: 2px;
  width: 11px;
  height: 11px;
  transition: all 150ms linear;
`;