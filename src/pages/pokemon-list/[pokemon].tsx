import { fetchPokemon } from "@/helpers/http";
import { TPokemon } from "@/types/pokemon";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { BsArrowLeft } from "react-icons/bs";

const DetailsPokemon = ({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const abilities = pokemon?.abilities;
  const height = pokemon?.height;
  const moves = pokemon?.moves;
  const weight = pokemon?.weight;

  const pokemonAbilities = useMemo(() => {
    const ability: string[] = [];

    abilities &&
      abilities.map((el, i) => {
        if (i < 2) {
          ability.push(el.ability.name);
        }
      });

    return ability.join(", ");
  }, [abilities]);

  const pokemonMoves = useMemo(() => {
    const move: string[] = [];

    moves &&
      moves.map((el, i) => {
        if (i < 2) {
          move.push(el.move.name);
        }
      });

    return move.join(", ");
  }, [moves]);

  return (
    <div className='flex justify-center items-start min-h-screen w-full relative p-8 sm:p-4 pb-[10rem] bg-black-drop text-slate-400 sm:pb-[5rem]'>
      <Link
        href={"/"}
        className='flex justify-center items-center gap-2 h-[20px] p-2 font-bold absolute top-[1rem] left-[2rem] sm:left-[0.2rem] sm:text-sm sm:top-[0.5rem]'
      >
        <BsArrowLeft className='font-bold' /> Home
      </Link>
      <div className='flex justify-center items-center w-full h-full flex-col gap-1'>
        <p className='font-bold text-5xl capitalize mt-6 sm:text-3xl sm:mt-8'>
          Pokemon {pokemon.name}
        </p>
        <div className='relative w-[200px] h-[200px] sm:w-[170px] sm:h-[170px]'>
          <Image
            src={`${
              pokemon.sprites.front_default
                ? pokemon.sprites.front_default
                : "/placeholder-img.png"
            }`}
            fill
            priority
            sizes='100%'
            alt='pokemon'
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-4 border border-2 border-solid border-gray-500 rounded-lg py-4 px-8 w-[550px] sm:w-[350px] '>
          <p className='font-bold text-2xl'>Pokemon Information:</p>
          <ul className='list-none flex flex-col gap-2'>
            <li className='text-sm flex justify-start items-center'>
              <div className='w-[200px] sm:w-[105px]'>
                <span>Moves</span>
              </div>
              <span className='capitalize'>
                : {pokemonMoves ? pokemonMoves : ""}
              </span>
            </li>
            <li className='text-sm flex justify-start items-center'>
              <div className='w-[200px] sm:w-[105px]'>
                <span>Weight</span>
              </div>
              <span>: {weight ? weight : ""}</span>
            </li>
            <li className='text-sm flex justify-start items-center'>
              <div className='w-[200px] sm:w-[105px]'>
                <span>Height</span>
              </div>
              <span>: {height ? height : ""}</span>
            </li>
            <li className='text-sm flex justify-start items-center'>
              <div className='w-[200px] sm:w-[105px]'>
                <span>Abilities</span>
              </div>
              <span className='capitalize'>
                : {pokemonAbilities ? pokemonAbilities : ""}
              </span>
            </li>
            <li className='text-sm flex justify-start items-center'>
              <div className='w-[200px] sm:w-[105px]'>
                <span>Base Experience</span>
              </div>
              <span className='capitalize'>
                : {pokemon.base_experience ? pokemon.base_experience : ""}
              </span>
            </li>
            <li className='text-sm flex justify-start items-start relative'>
              <div className='w-[200px] sm:w-[105px] items-self-start justify-self-start'>
                <span>Stats</span>
              </div>
              <div className='flex relative'>
                <ol className='list-decimal before:content-[""] before:w-[100%] before:h-[2px] before:bg-white mt-4 before:absolute before:left-0 before:top-[7px] w-full'>
                  {pokemon.stats.map((el, i) => {
                    return (
                      <li
                        className='capitalize flex text-sm justify-between gap-6 items-center w-full'
                        key={i}
                      >
                        <span>{el.stat.name ? el.stat.name : ""}</span>
                        <span>{el.base_stat}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsPokemon;

export const getServerSideProps: GetServerSideProps<{
  pokemon: TPokemon;
}> = async (context) => {
  try {
    const { pokemon: pokemonName } = context.query;
    const pokemon = await fetchPokemon(pokemonName as string);

    return { props: { pokemon } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
