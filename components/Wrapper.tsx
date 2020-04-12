import { useState } from 'react';

import Search from './Search';
import Advertisement from './Adversitements';

const Wrapper: React.FC = () => {
  const [keyWords, setKeyWords] = useState([]);

  return (
    <div>
      <Search setKeyWords={setKeyWords} />
      <Advertisement keyWords={keyWords}/>
    </div>
  );
};

export default Wrapper;
