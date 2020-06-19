import { useState, useEffect } from 'react';

import Search from './Search';
import Advertisement from './Advertisements';
import styled from 'styled-components';
import Video from './Video';
import { MatchMethods, ProductsMethod } from './types';

const AdBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em;
  justify-content: flex-start;
  align-items: flex-start;
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
  grid-template-columns: 2fr 1fr;
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
  const [products, setProducts] = useState([]);
  const [matchMethod, setMatchMethod] = useState('Jaccard' as MatchMethods);
  const [searchUrl, setSearchUrl] = useState('https://www.youtube.com/watch?v=2xiCVNwhrDU');
  const [error, setError] = useState('');
  const [productsWithMethod, setProductsWithMethod] = useState({} as ProductsMethod);

  useEffect(() => {
    const newProds = { ...productsWithMethod };
    newProds[matchMethod] = products;

    setProductsWithMethod(newProds);
  }, [products]);

  useEffect(() => {
    setProductsWithMethod([] as any);
  }, [searchUrl]);

  return (
    <div>
      <Search
        setProducts={setProducts}
        searchUrl={searchUrl}
        setSearchUrl={setSearchUrl}
        setError={setError}
        matchMethod={matchMethod}
        setMatchMethod={setMatchMethod}
      />

      {products?.length ? (
        <AdBody>
          <Video youtube_url={searchUrl} />
          <Recommendations>Recommendations</Recommendations>
          <AdRow>
            <Advertisement productsWithMethod={productsWithMethod} />
          </AdRow>
        </AdBody>
      ) : (
        <Error>{error}</Error>
      )}
    </div>
  );
};

export default Wrapper;
