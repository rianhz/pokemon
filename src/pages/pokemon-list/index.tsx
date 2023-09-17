import MainListPokemon from "@/components/MainPokemonList/MainPokemonList";

const ListPokemon = () => {
  return (
    <div className='flex flex-col gap-4 justify-start items-center min-h-screen p-10 bg-black-drop text-slate-400'>
      <MainListPokemon />
    </div>
  );
};

export default ListPokemon;
