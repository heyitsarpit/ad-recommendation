import styled from 'styled-components'

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  border-bottom: solid 1px ${(props) => props.theme.colorUnfocused};
  opacity: 0.8;
  margin: 0 auto;
  :hover {
    outline: none;
    opacity: 1;
    border-color: ${(props) => props.theme.textPrimary};
  }
`

export default SearchBox
