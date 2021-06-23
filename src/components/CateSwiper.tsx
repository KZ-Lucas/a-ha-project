import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation
} from 'swiper/core';
import useSwiperRef from '../hooks/useSwiperRef';
import type { Categories } from '../type/experts';

SwiperCore.use([Navigation]);

type SwiperNavBtnType = {
  Btype: string;
};
type Props = {
  cateList: Categories[];
  onClick: (id: string) => void;
  selectedItem: string;
};

// TODO: svg global style로 분기
const SwiperNavBtn = forwardRef<HTMLButtonElement, SwiperNavBtnType>(
  function callback (props, ref) {
    return (
      <Button ref={ref} {...props}>
        <PrevSvg fill="none" viewBox="0 0 13 23">
          <path d="M3.47 11.5l9.043 9.04c.56.56.56 1.48 0 2.04-.562.56-1.471.56-2.033 0L.421 12.52a1.447 1.447 0 010-2.04L10.481.42a1.438 1.438 0 012.032 0c.56.56.56 1.48 0 2.04L3.469 11.5z" fill="currentColor" />
        </PrevSvg>
      </Button>
    );
  }
);

const CateSwiper: React.FunctionComponent<Props> = ({ cateList, onClick, selectedItem }) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();

  return (
    <SwiperWrapper>
      <SwiperNavBtn ref={prevElRef as RefObject<HTMLButtonElement>} Btype='prev' />
      <Swiper slidesPerView="auto" navigation={{ prevEl: prevEl as HTMLButtonElement, nextEl: nextEl as HTMLButtonElement }}>
        {
          cateList.map(el => (
            <SwiperSlide key={el.id} onClick={() => onClick(el.id.toString())}>
              <SwiperText className={+selectedItem === el.id ? 'selected' : ''}>
                {el.title}
              </SwiperText>
            </SwiperSlide>
          ))
        }
      </Swiper>
        <SwiperNavBtn ref={nextElRef as RefObject<HTMLButtonElement>} Btype='next' />
    </SwiperWrapper>
  );
};

export default CateSwiper;

const SwiperWrapper = styled.div`
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid #333333;
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
    color: #888888;
    margin-right: 32px;
    width: auto;
  }
`;

const PrevSvg = styled.svg`
  width: 1em;
  height: 1em;
`;

const Button = styled.button<SwiperNavBtnType>`
  background-color: transparent;
  cursor: pointer;
  color: white;
  border: 0;
  ${attr => attr.Btype === 'next' ? 'transform: rotate(180deg);' : ''}
  margin-${attr => attr.Btype === 'next' ? 'left' : 'right'}: 5px;
`;

const SwiperText = styled.a`
  cursor: pointer;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 1rem;
  padding-bottom: 0.75rem;

  &.selected {
    border-bottom: 4px solid #1fc7c1;
    color: white;
    font-weight: 500;
  }

  &:hover {
    color: white;
    font-weight: 500;
  }
`;