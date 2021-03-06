import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import { useSwiperRef } from '@hooks';
import type { expertsType } from '@Ptypes';
import { color } from '@constants';
import { ArrowIcon } from '@components/common/icons';

SwiperCore.use([Navigation]);

type SwiperNavBtnType = {
  direction: string;
};
type Props = {
  /** 리스트 대상 카테고리 */
  cateList: expertsType.Categories[];
  /** 카테고리 클릭 이벤트 핸들러 */
  onClick: (id: string) => void;
  /** 현재 지정 카테고리 */
  selectedItem: string;
};

const SwiperNavBtn = forwardRef<HTMLButtonElement, SwiperNavBtnType>(
  function callback(props, ref) {
    return (
      <Button ref={ref} {...props}>
        <ArrowIcon {...props} />
      </Button>
    );
  }
);

const CateSwiper: React.FunctionComponent<Props> = ({
  cateList,
  onClick,
  selectedItem,
}) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();

  return (
    <SwiperWrapper>
      <SwiperNavBtn
        ref={prevElRef as RefObject<HTMLButtonElement>}
        direction={'left'}
      />
      <Swiper
        slidesPerView={'auto'}
        navigation={{
          prevEl: prevEl as HTMLButtonElement,
          nextEl: nextEl as HTMLButtonElement,
        }}
      >
        {cateList.map((el) => (
          <SwiperSlide key={el.id} onClick={() => onClick(el.id.toString())}>
            <SwiperText className={+selectedItem === el.id ? 'selected' : ''}>
              {el.title}
            </SwiperText>
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavBtn
        ref={nextElRef as RefObject<HTMLButtonElement>}
        direction={'right'}
      />
    </SwiperWrapper>
  );
};

export default CateSwiper;

const SwiperWrapper = styled.div`
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid ${color.pastel.darkGray};
  margin: 0 0 25px;

  .swiper-container {
    overflow: hidden;
  }
  .swiper-wrapper {
    display: flex;
  }
  .swiper-slide {
    display: flex;
    flex-shrink: 0;
    color: ${color.basic.gray};
    margin-right: 32px;
    width: auto;
  }
`;

const Button = styled.button<SwiperNavBtnType>`
  background-color: transparent;
  cursor: pointer;
  color: ${color.basic.white};
  border: 0;
  ${(attr) =>
    attr.direction === 'right' ? 'margin-left' : 'margin-right'}: 5px;
`;


const SwiperText = styled.a`
  cursor: pointer;
  padding: 1rem .25rem .75rem .25rem;

  &.selected {
    border-bottom: 4px solid ${color.pastel.skyBlue};
    color: ${color.basic.white};
    font-weight: 500;
  }

  &:hover {
    color: ${color.basic.white};
    font-weight: 500;
  }
`;
