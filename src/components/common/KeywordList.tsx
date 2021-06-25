import { useMemo } from 'react';
import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  /** 리스팅할 키워드 리스트 */
  keywords: Array<{
    id: number;
    title: string;
  }>;
  /** 키워드 클릭 이벤트 핸들러 */
  onClick?: (keywords: Array<number>) => void;
  /** 선택으로 표시할 키워드 리스트 */
  selectedItem: Array<number>;
  /** 선택 표시된 키워드 스타일 */
  activeStyle?: string;
  /** 선택 키워드 먼저 표시 여부 */
  activeFirst?: boolean;
};
type KeywordStyle = Partial<Pick<Props, 'activeStyle'>>;

const KeywordList: React.FunctionComponent<Props> = ({
  keywords,
  onClick,
  selectedItem,
  activeStyle,
  activeFirst,
}) => {
  // 키워드 선택 핸들러
  const selectKeyword = (id: number) => {
    if (!onClick) {
      return;
    }
    if (onClick && selectedItem.includes(id)) {
      onClick(selectedItem.filter((itemId) => itemId !== id));
    } else {
      onClick(selectedItem.concat(id));
    }
  };

  const renderCollection = useMemo(() => {
    if (activeFirst) {
      return keywords
        .filter(({ id }) => selectedItem.includes(id))
        .concat(keywords.filter(({ id }) => !selectedItem.includes(id)));
    } else {
      return keywords;
    }
  }, [activeFirst, keywords, selectedItem]);

  return (
    <KeywordWrapper>
      {renderCollection.map((el) => (
        <Keyword
          key={el.id}
          className={selectedItem.includes(el.id) ? 'selected' : ''}
          onClick={() => selectKeyword(el.id)}
          activeStyle={activeStyle}
        >
          <KeywordText>{el.title}</KeywordText>
        </Keyword>
      ))}
    </KeywordWrapper>
  );
};

KeywordList.defaultProps = {
  selectedItem: [],
};

const KeywordWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;

  button + button {
    margin-left: 0.6rem;
  }
`;
const Keyword = styled.button<KeywordStyle>`
  background-color: transparent;
  border: 1px solid ${color.basic.gray};
  border-radius: 9999px;
  width: auto;
  cursor: pointer;
  margin-bottom: 0.3rem;

  &.selected {
    ${(attr) =>
      attr.activeStyle
        ? attr.activeStyle
        : `
        background-color: ${color.pastel.skyBlue};
        border-color: ${color.pastel.skyBlue};
  
        span {
          color: ${color.pastel.black};
        }
      `}
  }
`;
const KeywordText = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 0.5rem;
  line-height: 1;
  height: 30px;
  color: ${color.basic.gray};
`;

export default KeywordList;
