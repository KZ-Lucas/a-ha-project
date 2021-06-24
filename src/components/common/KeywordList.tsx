import styled from 'styled-components';
import { color } from '@constants';

type Props = {
  keywords: Array<{
    id: number;
    title: string;
  }>;
  onClick?: (keywords: Array<number>) => void;
  selectedItem: Array<number>;
  activeStyle?: string;
};
type KeywordStyle = {
  activeStyle?: string;
};

const KeywordList: React.FunctionComponent<Props> = ({ keywords, onClick, selectedItem, activeStyle }) => {
  const selectKeyword = (id: number) => {
    if (!onClick) { return; }
    if (selectedItem.includes(id)) {
      onClick(selectedItem.filter(itemId => itemId !== id));
    } else {
      onClick(selectedItem.concat(id));
    }
  };

  return (
    <KeywordWrapper>
      {
        keywords.map(el => (
          <Keyword key={el.id} className={selectedItem.includes(el.id) ? 'selected' : ''} onClick={() => selectKeyword(el.id)} activeStyle={activeStyle}>
            <KeywordText>
              {el.title}
            </KeywordText>
          </Keyword>
        ))
      }
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
    margin-left: .6rem;
  }
`;
const Keyword = styled.button<KeywordStyle>`
  background-color: transparent;
  border: 1px solid ${color.basic.gray};
  border-radius: 9999px;
  width: auto;
  cursor: pointer;
  margin-bottom: .3rem;

  &.selected {
    ${attr => attr.activeStyle ?
      attr.activeStyle :
      `
        background-color: ${color.pastel.skyBlue};
        border-color: ${color.pastel.skyBlue};
  
        span {
          color: ${color.pastel.black};
        }
      `
    }
  }
`;

const KeywordText = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 .5rem;
  line-height: 1;
  height: 30px;
  color: ${color.basic.gray};
`;

export default KeywordList;