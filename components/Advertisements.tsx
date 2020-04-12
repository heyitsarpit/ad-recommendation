 import styled from 'styled-components';

interface AdProps {
  keyWords: string[];
}

const Recommendations = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0 0.5em;
  margin: 0 0.5em;
  color: ${props => props.theme.textPrimary};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 100vh;
  /* overflow-y: auto; */
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.2em 0.5em 0.2em 0;
  margin: 0.2em 0.2em 0.2em 0;

  .search-for {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.1em;
    font-weight: bold;
    text-decoration: none;
    color: ${props => props.theme.textPrimary};
  }
`;

const Anchor = styled.a`
  padding: 0.2em 0.5em 0.2em 0;
  margin: 0.2em 0.2em 0.2em 0;
  font-size: 0.9em;
  color: ${props => props.theme.textPrimaryDimmed};
`;

const AdList: React.FC<AdProps> = ({ keyWords }) => {
  return (
    <>
      {keyWords.map(word => {
        return (
          <ListItem key={word}>
            <div className="search-for">Search for "{word}"</div>
            <span>
              <Anchor
                href={`https://www.flipkart.com/search?q=${word}`}
                rel="noopener noreferrer"
                target="_blank">
                <img width="30px" src="/images/Flipkart.png" alt="flipkart"/>
              </Anchor>
              <Anchor
                href={`https://www.amazon.in/s?k=${word}`}
                rel="noopener noreferrer"
                target="_blank">
                <img width="30px" src="/images/Amazon.png" alt="amazon"/>
              </Anchor>
              <Anchor
                href={`https://www.google.com/search?q=${word}`}
                rel="noopener noreferrer"
                target="_blank">
                <img width="30px" src="/images/Google.png" alt="amazon"/>
              </Anchor>
            </span>
          </ListItem>
        );
      })}
    </>
  );
};

const Advertisement: React.FC<AdProps> = ({ keyWords }) => {
  return (
    <div>
      <Recommendations>Recommendations</Recommendations>
      <List>
        <AdList keyWords={keyWords} />
      </List>
    </div>
  );
};

export default Advertisement;
