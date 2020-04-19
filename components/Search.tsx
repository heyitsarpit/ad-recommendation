import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

import SearchBox from './styles/SearchBox';
import SearchButton from './styles/SearchButton';
import SearchInput from './styles/SearchInput';
import { getUrl } from '../lib/getURL';
import NProgress from 'nprogress';
import StringMatchSelector from './StringMatchSelector';
import { MatchMethods } from './types';

const searchImgPath = '/images/search.svg';

interface SearchProps {
  searchUrl: string;
  matchMethod: string;
  setProducts: (keys: string[]) => void;
  setSearchUrl: (url: string) => void;
  setError: (error: string) => void;
  setMatchMethod: (method: MatchMethods) => void;
}

const Search: React.FC<SearchProps> = ({
  searchUrl,
  setSearchUrl,
  setProducts,
  setError,
  matchMethod,
  setMatchMethod
}) => {
  const [url, setUrl] = useState(searchUrl);

  const doSearch = () => {
    const route = getUrl();
    NProgress.start();

    axios
      .post(route, {
        youtube_url: url,
        match_method: matchMethod
      })
      .then((res) => {
        setProducts(res.data);

        NProgress.done();
      })
      .catch((err) => {
        console.log(err);
        setError('An Error Occurred.');
        NProgress.done();
      });
  };

  const onQueryChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setUrl(value);
  const onQuerySearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (url) {
      setSearchUrl(url);
      doSearch();
    }
  };

  return (
    <SearchBox onSubmit={onQuerySearch}>
      <SearchInput
        value={url}
        onChange={onQueryChange}
        type="text"
        placeholder="Enter YouTube URL"
      />
      <StringMatchSelector setMatchMethod={setMatchMethod}/>
      <SearchButton type="submit">
        <img src={searchImgPath} />
      </SearchButton>
    </SearchBox>
  );
};

export default Search;
