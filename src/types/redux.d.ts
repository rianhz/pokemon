import { TPokemonResultApi } from "./api";

export interface TData {
  questions: TPokemonResultApi[];
  picked: TPokemonResultApi;
  answer: TPokemonResultApi;
}
export type TInitialState = {
  username: string;
  score: number;
  dataQuestions: TData[];
};
