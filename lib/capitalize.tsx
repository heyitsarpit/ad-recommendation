const capitalize = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

export default capitalize;
