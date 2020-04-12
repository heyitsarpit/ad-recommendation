import { useState } from 'react';

import Search from './Search';
import Advertisement from './Advertisements';
import styled from 'styled-components';
import Video from './Video';

const AdBody = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  margin: 1em;
  justify-content: center;
`;

const Wrapper: React.FC = () => {
  const [keyWords, setKeyWords] = useState(['android', 'galaxy']);
  const [searchUrl, setSearchUrl] = useState('https://www.youtube.com/watch?v=2xiCVNwhrDU');

  return (
    <div>
      <Search setKeyWords={setKeyWords} searchUrl={searchUrl} setSearchUrl={setSearchUrl} />
      {keyWords.length ? (
        <AdBody>
          <Video youtube_url={searchUrl} />
          <Advertisement keyWords={keyWords} />
        </AdBody>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Wrapper;
