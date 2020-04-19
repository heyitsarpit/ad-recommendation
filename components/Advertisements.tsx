import styled from 'styled-components';
import { MatchMethods, ProductsMethod } from './types';

interface AdProps {
  productsWithMethod: ProductsMethod;
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 100vh;
  overflow: auto;
  max-height: calc(100vh - 20px);
`;

const MatchingMethod = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
`;

const Score = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1em;
  color: ${(props) => props.theme.textPrimary};
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.2em 0.5em 0.2em 0;
  margin: 0.2em 0.2em 0.2em 0;
  border-bottom: solid 1px ${(props) => props.theme.colorUnfocused};
  :hover {
    outline: none;
    opacity: 1;
    border-color: ${(props) => props.theme.textPrimary};
  }
  .search-for {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.1em;
    font-weight: bold;
    text-decoration: none;
    color: ${(props) => props.theme.textPrimary};
  }
`;

const Anchor = styled.a`
  padding: 0.2em 0.5em 0.2em 0;
  margin: 0.2em 0.2em 0.2em 0;
  font-size: 0.9em;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  color: ${(props) => props.theme.textPrimaryDimmed};
`;

const AnchorBrand = styled(Anchor)`
  font-size: 1em;

  color: ${(props) => props.theme.textSpecial};
`;

const Advertisement: React.FC<AdProps> = ({ productsWithMethod }) => {
  return (
    <>
      {Object.entries(productsWithMethod).map((MethodProduct, index) => {
        const [matchMethod, products] = MethodProduct;
        console.log(MethodProduct);
        return (
          <ListItem>
            <List>
              <MatchingMethod>{matchMethod}</MatchingMethod>
              {products.map((product) => {
                return (
                  <ListItem key={product.product_name}>
                    <Score>Score: {String(product.score).slice(0, 5)}</Score>
                    <div>
                      <AnchorBrand
                        href={`https://www.amazon.in/s?k=${product.brand} ${product.domain}`}
                        rel="noopener noreferrer"
                        target="_blank">
                        {product.brand} {product.domain}
                      </AnchorBrand>
                    </div>
                    <div>
                      <Anchor href={product.link} rel="noopener noreferrer" target="_blank">
                        {product.product_name}
                        {/* <img width="30px" src="/images/Amazon.png" alt="amazon" /> */}
                      </Anchor>
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </ListItem>
        );
      })}
    </>
  );
};

export default Advertisement;
