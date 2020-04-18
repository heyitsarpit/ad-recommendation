import Select from 'react-select';
import { MatchMethods } from './styles/types';

type StringMatch<T = MatchMethods> = Array<{ value: T; label: T }>;

interface MatchSelectorProps {
  setMatchMethods: (values: string[]) => void;
}

const StringMatchSelector: React.FC<MatchSelectorProps> = ({ setMatchMethods }) => {
  const Options: StringMatch = [
    { value: 'Jaccard', label: 'Jaccard' },
    { value: 'Hamming', label: 'Hamming' },
    { value: 'Levenshtein', label: 'Levenshtein' },
    { value: 'Jaro-Winkler', label: 'Jaro-Winkler' },
    { value: 'Sorensen Dice', label: 'Sorensen Dice' },
    { value: 'Ratcliff-Obershelp', label: 'Ratcliff-Obershelp' }
  ];

  const onSelectChange = (event: React.ChangeEvent) => {
    console.log(event.target);
    // setMatchMethods();
  };

  return (
    <Select
      defaultValue={[Options[0]]}
      isMulti
      name="Match_Method"
      options={Options}
      className="Match_Method_Select"
      classNamePrefix="select"
      onChange={onSelectChange}
    />
  );
};

export default StringMatchSelector;
