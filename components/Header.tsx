import styled from 'styled-components';

const HeaderStyles = styled.div`
  color: ${props => props.theme.textPrimary};
  /* margin: 0 auto; */
  font-size: 1.8em;
  font-weight: bold;
  padding: 0.1em;
  font-family: monospace;
`;

const Header: React.FC = () => (
  <HeaderStyles>Proposing Contextually Relevant Products From YouTube Videos</HeaderStyles>
);

export default Header;
