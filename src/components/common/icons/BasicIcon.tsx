import styled from 'styled-components';
import { commonType } from '@Ptypes';
import { color } from '@constants';

type Props = {
  /** 아이콘 너비 */
  width?: string;
  /** 아이콘 높이 */
  height?: string;
  /** 아이콘 방향 */
  direction?: string;
};

const ArrowIcon: React.FunctionComponent<Props> = (Props) => (
  <Svg fill="none" viewBox="0 0 13 23" {...Props}>
    <path
      d="M3.47 11.5l9.043 9.04c.56.56.56 1.48 0 2.04-.562.56-1.471.56-2.033 0L.421 12.52a1.447 1.447 0 010-2.04L10.481.42a1.438 1.438 0 012.032 0c.56.56.56 1.48 0 2.04L3.469 11.5z"
      fill={color.basic.white}
    />
  </Svg>
);

const StarIcon: React.FunctionComponent<Props> = (Props) => (
  <Svg fill="none" viewBox="0 0 20 20" {...Props}>
    <path
      d="M19.935 7.659a1.428 1.428 0 00-1.185-1.011l-5.316-.734L11.331.888a1.443 1.443 0 00-2.664 0L6.564 5.914l-5.316.734a1.448 1.448 0 00-.763 2.515l4.004 3.57-.822 5.605c-.09.569.172 1.136.662 1.438.484.309 1.106.297 1.578-.03L10 16.964l4.092 2.785a1.445 1.445 0 002.24-1.408l-.822-5.606 4.004-3.571c.425-.375.59-.965.422-1.505z"
      fill={color.pastel.skyBlue}
    ></path>
  </Svg>
);

const ScheduleIcon: React.FunctionComponent<Props> = (Props) => (
  <Svg fill="none" viewBox="0 0 20 16" {...Props}>
    <path
      d="M14.472 10.237a.626.626 0 01-.372-.12l-2.482-1.808a.599.599 0 01-.248-.482V4.212c0-.333.278-.603.62-.603.343 0 .621.27.621.603v3.314l2.234 1.626a.596.596 0 01.242.398.584.584 0 01-.118.445.62.62 0 01-.497.242z"
      fill={color.pastel.skyBlue}
    />
    <path
      d="M11.989 15.557a8.128 8.128 0 01-5.98-2.609l.829-.91a6.85 6.85 0 005.151 2.314c3.733 0 6.77-2.949 6.77-6.573 0-3.625-3.037-6.574-6.77-6.574-.978 0-1.921.199-2.805.592A2.16 2.16 0 009 .56 8.16 8.16 0 0111.99 0C16.406 0 20 3.49 20 7.779s-3.594 7.778-8.011 7.778z"
      fill={color.pastel.skyBlue}
    />
    <path
      d="M1.932 15.443a1.51 1.51 0 01-1.231-.663c-.256-.387-.28-.844-.07-1.288l2.41-5.071-1.893-.346A1.384 1.384 0 01.13 7.303a1.316 1.316 0 01.062-1.255L3.326.796c.25-.42.717-.681 1.217-.681h2.351c.564 0 1.057.312 1.286.814.185.402.16.853-.068 1.236L6.757 4.439l2.534.462c.505.091.905.427 1.072.899a1.32 1.32 0 01-.277 1.348l-7.123 7.821a1.366 1.366 0 01-1.031.474zm-.13-1.427l.195.124L9.26 6.168l-4.53-.824 2.37-3.978H4.474l-3.252 5.45 3.68.672-3.101 6.528z"
      fill={color.pastel.skyBlue}
    />
  </Svg>
);

const PlusIcon: React.FunctionComponent<Props> = (Props) => (
  <Svg fill="none" viewBox="0 0 24 24" {...Props}>
    <path 
      d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
      fill={color.basic.white}
    />
  </Svg>
);

export { ArrowIcon, StarIcon, ScheduleIcon, PlusIcon };

const Svg = styled.svg<commonType.IconType>`
  width: ${(attr) => attr.width ?? '1em'};
  height: ${(attr) => attr.height ?? '1em'};
  ${(attr) => (attr.direction === 'right' ? 'transform: rotate(180deg);' : '')}
`;
