import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  fetchListImagePokemon,
  fetchListSearchingImagePokemon,
  fetchPokemonDependsType,
} from "@/helpers/http";
import { TPokemonResultApi } from "@/types/api";
import { TList, TPokemonFilter } from "@/types/pokemon";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const MainListPokemon = () => {
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [pokemonImages, setPokemonImages] = useState<TList[]>([]);
  const [type, setType] = useState<TPokemonResultApi[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPokemon(e.target.value);
  };

  const debouncedSearch = useDebounce(searchPokemon, 1000);
  const debouncedFilter = useDebounce(selectedFilter, 1000);

  const goToDetails = (name: string) => {
    router.push(`/pokemon-list/${name}`);
  };

  useEffect(() => {
    searchPokemonList();
  }, [debouncedSearch, debouncedFilter]);

  const searchPokemonList = async () => {
    const types = useLocalStorage("types");
    setType(types);

    const pokemonListByTypes: TPokemonFilter[] = await fetchPokemonDependsType(
      18,
      types
    );

    if (debouncedFilter && searchPokemon) {
      const selectTypes: TPokemonFilter[] = pokemonListByTypes.filter(
        (el) => el.name === debouncedFilter
      );
      const { name, pokemon } = selectTypes[0];
      const filteredPokemon = pokemon.filter((el) =>
        el.pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
      );

      const pokemonImg = await fetchListImagePokemon(
        [{ name: name, pokemon: filteredPokemon }],
        debouncedFilter
      );
      setPokemonImages(pokemonImg);
    } else if (debouncedFilter) {
      const selectTypes: TPokemonFilter[] = pokemonListByTypes.filter(
        (el) => el.name === debouncedFilter
      );

      const pokemonImg = await fetchListImagePokemon(
        selectTypes,
        debouncedFilter
      );
      setPokemonImages(pokemonImg);
    } else {
      const list = useLocalStorage("list");
      const { results: allPokemon }: { results: TPokemonResultApi[] } = list;
      const allPokemons = allPokemon.filter((el) =>
        el.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

      const pokemonImg = await fetchListSearchingImagePokemon(
        allPokemons,
        debouncedSearch
      );

      setPokemonImages(pokemonImg);
    }
  };

  return (
    <>
      <Link
        href={"/"}
        className='flex justify-center items-center gap-2 h-[20px] p-2 font-bold absolute top-[1rem] left-[2rem] sm:left-[0.2rem] sm:text-sm sm:top-[0.5rem]'
      >
        <BsArrowLeft className='font-bold' /> Home
      </Link>
      <div className='flex flex-col justify-center w-full items-center gap-2 relative'>
        <h1 className='text-3xl font-bold'>Pokemon List</h1>
        <div className='flex justify-between flex-row-reverse w-[650px] items-center mt-4 relative sm:flex-col sm:w-full'>
          <input
            type='text'
            value={searchPokemon}
            onChange={onChangeHandler}
            className='w-[25rem] w-full transition duration-[0.5s] sm:w-full bg-transparent text-white'
            autoFocus={false}
            placeholder='example : pikachu'
          />
          {searchPokemon && (
            <AiFillCloseCircle
              className='absolute right-5 text-2xl cursor-pointer text-white'
              onClick={() => setSearchPokemon("")}
            />
          )}
          <select
            onChange={(e) => setSelectedFilter(e.target.value)}
            value={selectedFilter}
            id='filtered'
            className='bg-transparent text-white sm:w-full capitalize'
          >
            <option value='' className='text-sm capitalize text-black'>
              Type
            </option>
            {type?.map((el, i) => {
              return (
                <option
                  value={el.name}
                  key={i}
                  className='capitalize text-black'
                >
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-6 mt-4 sm:flex sm:justify-between sm:items-center sm:flex-wrap'>
        {pokemonImages.length > 0 ? (
          pokemonImages.map((img, i) => {
            return (
              <div
                className='relative w-[100px] h-[100px] border border-solid border-1 border-gray-500 m-0 sm:w-[90px] sm:h-[90px] m-1'
                key={i}
                onClick={() => goToDetails(img.name)}
              >
                <Image
                  src={img.img}
                  alt={`pokemon`}
                  fill
                  sizes='100%'
                  priority
                  className='hover:scale-125 transition duration-[0.5s]'
                />
              </div>
            );
          })
        ) : (
          <p className='text-center col-span-6 mt-6 sm:mt-4 font-bold'>
            Not found
          </p>
        )}
      </div>
    </>
  );
};

export default MainListPokemon;
