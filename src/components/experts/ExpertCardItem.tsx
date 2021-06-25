import React from 'react';
import styled from 'styled-components';
import { KeywordList } from '@components/common';
import { color } from '@constants';
import { StarIcon, ScheduleIcon } from '@components/common/icons/BasicIcon';
import { common } from '@constants';
import { Expert, KeywordType, ProfileFile } from '@src/types/experts';

type ProfileImageType = {
  src: {
    small: ProfileFile
  }
};

type Props = Pick<
  Expert,
  'title' | 'rateAvg' | 'reviewCount' | 'productCount' | 'profileImages'
> & {
  /** 전문가 연관 키워드 */
  keywords: KeywordType[];
  /** 상담 가능 일자 */
  fastestSchedule: string | null;
  /** 현재 필터링 중인 키워드 */
  activeKeywords: string | null;
};

const ExpertsCardItem: React.FunctionComponent<Props> = ({
  title,
  rateAvg,
  reviewCount,
  productCount,
  keywords,
  profileImages,
  fastestSchedule,
  activeKeywords,
}) => (
  <ExpertsCardItemWrapper>
    <ProfileImageWrapper>
      <ProfileImage src={profileImages} />
    </ProfileImageWrapper>
    <ProfileDescriptionWrapper>
      <DescriptionNameWrapper>
        <DescriptionName>{title}</DescriptionName>
      </DescriptionNameWrapper>
      <DescriptionDetailWrapper>
        <StarIcon />
        <DescriptionDetailRate>
          {+rateAvg % 1 ? rateAvg : Math.floor(+rateAvg)}
        </DescriptionDetailRate>
        <DescriptionReviewCount>(후기 {reviewCount}개)</DescriptionReviewCount>
        <DescriptionProductCount>
          등록된 상담 {productCount}개
        </DescriptionProductCount>
      </DescriptionDetailWrapper>
      <DescriptionSchedule>
        <ScheduleIcon width="1.3em" height="1.3em" />
        <DescriptionScheduleLabel>가장 빠른 상담</DescriptionScheduleLabel>
        <DescriptionScheduleValue>{fastestSchedule}</DescriptionScheduleValue>
      </DescriptionSchedule>
      <KeywordListWrapper>
        <KeywordList
          keywords={keywords}
          selectedItem={
            activeKeywords ? JSON.parse(decodeURIComponent(activeKeywords)) : []
          }
          activeStyle={` 
            border-color: ${color.pastel.skyBlue};
            span {
              color: ${color.basic.white};
            }
          `}
          activeFirst
        />
      </KeywordListWrapper>
    </ProfileDescriptionWrapper>
    <ConsultSummitWrapper>
      <ConsultSummit>상담 예약</ConsultSummit>
    </ConsultSummitWrapper>
  </ExpertsCardItemWrapper>
);

export default React.memo(ExpertsCardItem);

const ExpertsCardItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 1.25rem 0;
  cursor: pointer;

  & + & {
    border-width: 1px 0 0 0;
    border-color: ${color.pastel.darkGray};
    border-style: solid;
  }
`;
const ProfileImageWrapper = styled.div``;
const ProfileImage = styled.span<ProfileImageType>`
  display: inline-block;
  background-image: url(${common.staticBaseUrl}${(attr) =>
    attr.src.small.fileUrl});
  width: 96px;
  height: 96px;
  user-select: none;
  border-radius: 9999px;
  background-position: center;
  background-size: cover;
`;
const ProfileDescriptionWrapper = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  padding-left: 2.5rem;
`;
const DescriptionNameWrapper = styled.div`
  margin-bottom: .25rem;
`;
const DescriptionName = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${color.basic.white};
`;
const DescriptionDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
`;
const DescriptionDetailRate = styled.span`
  color: ${color.pastel.skyBlue};
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: .25rem;
`;
const DescriptionReviewCount = styled.span`
  margin-left: .25rem;
  font-size: 1rem;
  color: ${color.pastel.lightGray};
`;
const DescriptionProductCount = styled.span`
  margin-left: .25rem;
  font-size: 1rem;
  color: ${color.pastel.lightGray};
`;
const DescriptionSchedule = styled.div`
  display: flex;
`;
const DescriptionScheduleLabel = styled.span`
  color: ${color.pastel.lightGray};
  font-size: 1rem;
  font-weight: 500;
  margin-left: .25rem;
`;
const DescriptionScheduleValue = styled.span`
  color: ${color.basic.white};
  font-size: 1rem;
  font-weight: 900;
  margin-left: .25rem;
`;
const KeywordListWrapper = styled.div`
  margin-top: 10px;
`;
const ConsultSummitWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ConsultSummit = styled.button`
  border: 1px solid ${color.pastel.skyBlue};
  background-color: ${color.pastel.skyBlue};
  color: ${color.pastel.black};
  border-radius: 9999px;
  width: auto;
  padding: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 36px;
  white-space: nowrap;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
`;
