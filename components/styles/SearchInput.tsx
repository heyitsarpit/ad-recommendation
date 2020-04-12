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
  @media only screen and (min-width: ${(props) => props.theme.minWidthSmall}px) and (max-width: ${(
      props
    ) => props.theme.maxWidthSmall}px) {
    font-size: 0.9em;
    ::placeholder {
      font-size: 0.7em;
    }
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.minWidthMedium}px) and (max-width: ${(props) => props.theme.maxWidthMedium}px) {
    ::placeholder {
      font-size: 0.8em;
    }
  }
`

export default SearchInput
