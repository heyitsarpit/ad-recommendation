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

const Error = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  margin: 1em;
  justify-content: center;
`;

const Wrapper: React.FC = () => {
  const [keyWords, setKeyWords] = useState([]);
  const [searchUrl, setSearchUrl] = useState('');
  const [error, setError] = useState('')

  return (
    <div>
      <Search setKeyWords={setKeyWords} searchUrl={searchUrl} setSearchUrl={setSearchUrl} setError={setError}/>
      {keyWords?.length ? (
        <AdBody>
          <Video youtube_url={searchUrl} />
          <Advertisement keyWords={keyWords} />
        </AdBody>
      ) : (
        <Error>{error}</Error>
      )}
    </div>
  );
};

export default Wrapper;
