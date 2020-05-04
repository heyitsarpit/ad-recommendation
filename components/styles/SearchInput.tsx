import styled from 'styled-components'

const SearchInput = styled.input`
  background: ${(props) => props.theme.bgColor};
  border: none;
  width: 100%;
  height: 2em;
  font-size: 1em;
  font-family: ${(props) => props.theme.fontMain};
  color: ${(props) => props.theme.textPrimary};
  ::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }
  :focus {
    outline: none;
  }
`

export default SearchInput
