import { TPokemonResultApi } from "@/types/api";
import { TPokemonFilter } from "@/types/pokemon";

export const fetchPokemon = async (pokemonName: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POKEMON_BASEURL}/pokemon/${pokemonName}`
  );
  const pokemon = await response.json();

  return pokemon;
};

export const fetchListPokemon = async (limit: string, offset: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POKEMON_BASEURL}/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemon = await response.json();

  return pokemon;
};

export const fetchImagePokemon = async (url: string) => {
  const response = await fetch(url);
  const pokemon = await response.json();
  const urlImage = pokemon.sprites.front_default;

  return urlImage;
};

export const fetchListSearchingImagePokemon = async (
  arr: TPokemonResultApi[],
  searchPokemon: string
) => {
  const temporaryImage = [];
  const length = searchPokemon === "" ? 50 : arr.length;

  for (let i = 0; i < length; i++) {
    const img = await fetchImagePokemon(arr[i].url);
    temporaryImage.push({ name: arr[i].name, img: img });
  }

  const pokemonImg = await Promise.all(temporaryImage);

  return pokemonImg;
};

export const fetchListImagePokemon = async (
  arr: TPokemonFilter[],
  searchPokemon: string
) => {
  const temporaryImage = [];
  const length = !searchPokemon ? 24 : arr[0]?.pokemon.length;

  for (let i = 0; i < length; i++) {
    const img = await fetchImagePokemon(arr[0]?.pokemon[i]?.pokemon.url);
    if (img) {
      temporaryImage.push({ name: arr[0].pokemon[i].pokemon.name, img: img });
    }
  }

  const pokemonImg = await Promise.all(temporaryImage);

  return pokemonImg;
};

export const fetchAllTypes = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POKEMON_BASEURL}/type/`
  );
  const types = await response.json();
  const { results } = types;

  return results;
};

export const fetchPokemonDependsType = async (
  id: number,
  listTypes: TPokemonResultApi[]
) => {
  const temporaryData = [];

  for (let i = 1; i <= id; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${i}`);
    const types = await response.json();
    const { pokemon } = types;

    temporaryData.push({ name: listTypes[i - 1]?.name, pokemon });
  }

  const pokemonListByTypes = await Promise.all(temporaryData);

  return pokemonListByTypes;
};
