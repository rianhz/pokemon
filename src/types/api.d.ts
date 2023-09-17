export type TApiResult = {
  count: number;
  next: string;
  previous: string;
  results: TPokemonResultApi[];
};

export type TPokemonResultApi = {
  name: string;
  url: string;
};
