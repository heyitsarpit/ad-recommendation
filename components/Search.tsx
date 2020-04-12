import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

import SearchBox from './styles/SearchBox';
import SearchButton from './styles/SearchButton';
import SearchInput from './styles/SearchInput';
import { getUrl } from '../lib/getURL';
import NProgress from 'nprogress';

const searchImgPath = '/images/search.svg';

interface SearchProps {
  setKeyWords: (keys: string[]) => void;
  searchUrl: string;
  setSearchUrl: (url: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchUrl, setSearchUrl, setKeyWords }) => {
  const [url, setUrl] = useState(searchUrl)

  const doSearch = () => {
    const route = getUrl();
    NProgress.start();

    axios
      .post(route, {
        youtube_url: url
      })
      .then(res => {
        setKeyWords(res.data);

        NProgress.done();
      })
      .catch(err => {
        console.log(err);
        NProgress.done();
      });
  };

  const onQueryChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      setUrl(value)
    }
  };

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
      <SearchButton type="submit">
        <img src={searchImgPath} />
      </SearchButton>
    </SearchBox>
  );
};

export default Search;