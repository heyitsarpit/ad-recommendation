import styled, { ThemeProvider } from 'styled-components';

import Meta from './Meta';
import GlobalStyles from './styles/GlobalStyles';
import { LightTheme } from './styles/Theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.3em;
  padding: 1em;
  min-height: 100vh;
`;

const Container = styled.div`
  color: ${props => props.theme.textPrimary};
  background: ${props => props.theme.bgColor};
`;

const Page: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={LightTheme}>
      <Meta />
      <GlobalStyles />
      <Wrapper>
        <Container>{children}</Container>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Page;
