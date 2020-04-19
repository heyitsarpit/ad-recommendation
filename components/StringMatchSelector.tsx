import { MatchMethods } from './types';
import styled from 'styled-components';

type StringMatch<T = MatchMethods> = Array<{ value: T; label: T }>;

interface MatchSelectorProps {
  setMatchMethod: (values: MatchMethods) => void;
}

const Selector = styled.select`
  outline: none;
  background-color: white;
  border: none;
  font-family: inherit;
  font-size: inherit;
`;
const OptionTag = styled.option``;

const StringMatchSelector: React.FC<MatchSelectorProps> = ({ setMatchMethod }) => {
  const Options: StringMatch = [
    { value: 'Jaccard', label: 'Jaccard' },
    { value: 'Hamming', label: 'Hamming' },
    { value: 'Levenshtein', label: 'Levenshtein' },
    { value: 'Jaro-Winkler', label: 'Jaro-Winkler' },
    { value: 'Sorensen Dice', label: 'Sorensen Dice' },
    { value: 'Ratcliff-Obershelp', label: 'Ratcliff-Obershelp' }
  ];

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMatchMethod(event.target.value as MatchMethods);
  };

  return (
    <Selector onChange={onSelectChange}>
      {Options.map((option) => {
        return (
          <OptionTag key={option.value} value={option.value}>
            {option.label}
          </OptionTag>
        );
      })}
    </Selector>
  );
};

export default StringMatchSelector;
