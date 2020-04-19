export type MatchMethods =
  | 'Hamming'
  | 'Levenshtein'
  | 'Jaro-Winkler'
  | 'Jaccard'
  | 'Sorensen Dice'
  | 'Ratcliff-Obershelp';

export interface Product {
  domain: string;
  link: string;
  brand: string;
  product_name: string;
  score: number;
}
export type ProductsMethod = Record<MatchMethods, Array<Product>>;
