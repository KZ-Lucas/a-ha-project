import { useState } from 'react';
import styled from 'styled-components';
import { ToggleSwitch, Select } from '@components/common';
import { useExperts } from '@hooks';
import { color, experts } from '@constants';

const ExpertsFilter: React.FunctionComponent = () => {
  const [available, setAvailable] = useState(false);
  const { changePayload } = useExperts();
  const switchChange = (toggle: boolean) => {
    setAvailable(toggle);
    changePayload({
      isAvailable: toggle
    });
  };
  const filterChange = (value: string) => {
    changePayload({
      sortBy: value
    });
  };

  return (
    <ExpertsFilterWrapper>
      <ToggleSwitchWrapper>
        <FilterLabel>지금 상담 가능</FilterLabel>
        <ToggleSwitch isToggle={available} onClick={switchChange} />
      </ToggleSwitchWrapper>
      <SortExpertsWrapper>
        <Select optionList={experts.filterItems} onClick = {filterChange}/>
      </SortExpertsWrapper>
    </ExpertsFilterWrapper>
  )
}

export default ExpertsFilter;

// TODO: Wraper Styled 공통 처리
const ExpertsFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ToggleSwitchWrapper = styled.div`
`;

const SortExpertsWrapper = styled.div`
  margin-left: 1rem;
`;

const FilterLabel = styled.span`
  font-size: .875rem;
  color: ${color.basic.white};
`;