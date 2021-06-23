import { useState } from 'react';
import styled from 'styled-components';
import ToggleSwitch from './ToggleSwitch';
import { useExperts } from '../hooks/useExperts';
import Select from './Select';

const ExpertsFilter = () => {
  const [available, setAvailable] = useState(false);
  const { changePayload } = useExperts();
  const switchClick = (toggle: boolean) => {
    setAvailable(toggle);
    changePayload({
      isAvailable: toggle
    });
  };
  // TODO: constant
  const filterItems = [
    { label: '평점 높은 순', key: 'rates' },
    { label: '후기 많은 순', key: 'reviews' },
    { label: '상담진행 많은 순' key: 'sessions' }
  ];

  return (
    <ExpertsFilterWrapper>
      <ToggleSwitchWrapper>
        <FilterLabel>지금 상담 가능</FilterLabel>
        <ToggleSwitch isToggle={available} onClick={switchClick} />
      </ToggleSwitchWrapper>
      <SortExpertsWrapper>
        <Select optionList={filterItems} />
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
  font-size: 0.875rem;
  color: white;
`;