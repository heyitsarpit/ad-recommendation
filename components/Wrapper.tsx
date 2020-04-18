import { useState } from 'react';

import Search from './Search';
import Advertisement from './Advertisements';
import styled from 'styled-components';
import Video from './Video';
import { MatchMethods } from './styles/types';
import StringMatchSelector from './StringMatchSelector';

const AdBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em;
  justify-content: flex-start;
  align-items: center;
`;

const Recommendations = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0 0.5em;
  margin: 0 0.5em;
  color: ${(props) => props.theme.textPrimary};
`;

const AdRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  overflow-x: auto;
  max-width: 90vw;
`;

const Error = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  margin: 1em;
  justify-content: center;
`;

const Wrapper: React.FC = () => {
  const [keyWords, setKeyWords] = useState(['one, two, ex']);
  const [matchMethods, setMatchMethods] = useState(['Jaccard Index']);
  const [searchUrl, setSearchUrl] = useState('https://www.youtube.com/watch?v=2xiCVNwhrDU');
  const [error, setError] = useState('');

  return (
    <div>
      <Search
        setKeyWords={setKeyWords}
        searchUrl={searchUrl}
        setSearchUrl={setSearchUrl}
        setError={setError}
      />
      {/* <StringMatchSelector setMatchMethods={setMatchMethods}/> */}

      {keyWords?.length ? (
        <AdBody>
          <Video youtube_url={searchUrl} />
          <Recommendations>Recommendations</Recommendations>
          <AdRow>
            <Advertisement keyWords={keyWords} matchMethods={matchMethods} />
          </AdRow>
        </AdBody>
      ) : (
        <Error>{error}</Error>
      )}
    </div>
  );
};

export default Wrapper;
