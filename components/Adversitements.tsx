interface AdProps {
  keyWords: string[];
}

const Advertisement: React.FC<AdProps> = ({ keyWords }) => {
  return <div>{JSON.stringify(keyWords)}</div>;
};

export default Advertisement;
