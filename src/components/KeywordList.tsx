import styled from 'styled-components';

type Props = {
  keywords: Array<{
    id: number;
    title: string;
  }>;
  onClick?: (keywords: Array<number>) => void;
  selectedItem: Array<number>;
};

const KeywordList: React.FunctionComponent<Props> = ({ keywords, onClick, selectedItem }) => {
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
          <Keyword key={el.id} className={selectedItem.includes(el.id) ? 'selected' : ''} onClick={() => selectKeyword(el.id)}>
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
const Keyword = styled.button`
  background-color: transparent;
  border: 1px solid #888888;
  border-radius: 9999px;
  width: auto;
  cursor: pointer;
  margin-bottom: .3rem;

  &.selected {
    background-color: #1fc7c1;
    border-color: #1fc7c1;

    span {
      color: #111111;
    }
  }
`;

const KeywordText = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 .5rem;
  line-height: 1;
  height: 30px;
  color: #888888;
`;

export default KeywordList;