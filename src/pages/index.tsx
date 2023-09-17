import { fetchAllTypes, fetchListPokemon } from "@/helpers/http";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { TApiResult, TPokemonResultApi } from "@/types/api";
import Main from "@/components/MainContent/Main";

export default function Home({
  listPokemon,
  listTypes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className='w-full min-h-screen flex pb-10 sm:flex-col bg-black-drop text-slate-400 p-6'>
      <Main listPokemon={listPokemon} listTypes={listTypes} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  listPokemon: TApiResult;
  listTypes: TPokemonResultApi[];
}> = async () => {
  const listPokemon: TApiResult = await fetchListPokemon("1000", "0");
  const listTypes: TPokemonResultApi[] = await fetchAllTypes();

  if (!listPokemon || !listTypes) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listPokemon,
      listTypes,
    },
  };
};
