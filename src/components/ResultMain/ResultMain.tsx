import { fetchImagePokemon, fetchPokemon } from "@/helpers/http";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TPokemon } from "@/types/pokemon";
import { TData } from "@/types/redux";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const ResultMain = () => {
  const [result, setResult] = useState<TData[]>([]);
  const [pokemon, setPokemon] = useState<TPokemon>();
  const [urlImage, setUrlImage] = useState("");
  const [slides, setSlides] = useState<number>(0);

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

  const prevSlideHandler = () => {
    setSlides((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const nextSlideHandler = () => {
    setSlides((prev) =>
      prev === result.length - 1 ? result.length - 1 : prev + 1
    );
  };

  const reachQuestions = async () => {
    const results = useLocalStorage("store");
    const { dataQuestions } = results.result;
    setResult(dataQuestions);

    const correctPokemon = await fetchPokemon(
      dataQuestions[slides]?.answer.name
    );

    const urlImages = await fetchImagePokemon(
      dataQuestions[slides]?.answer.url
    );

    setPokemon(correctPokemon);
    setUrlImage(urlImages);
  };

  useEffect(() => {
    reachQuestions();
  }, [slides]);

  return (
    <>
      <Link
        href={"/pokemon-list"}
        className='flex justify-center items-center gap-2 h-[20px] p-2 font-bold absolute top-[1rem] right-[2rem] sm:right-[0.2rem] sm:text-sm sm:top-[0.5rem]'
      >
        Pokemon List <BsArrowRight className='font-bold' />
      </Link>
      <Link
        href={"/"}
        className='flex justify-center items-center gap-2 h-[20px] p-2 font-bold absolute top-[1rem] left-[2rem] sm:left-[0.2rem] sm:text-sm sm:top-[0.5rem]'
      >
        <BsArrowLeft className='font-bold' /> Home
      </Link>
      <div className='w-[200px] h-[200px] relative sm:w-[170px] sm:h-[170px]'>
        <Image
          src={`${urlImage ? urlImage : "/placeholder-img.png"}`}
          fill
          priority
          sizes='100%'
          alt='pokemon'
        />
      </div>
      <section className='pokemon-information'>
        <ul className='list-none'>
          <li className='text-sm flex justify-start items-center'>
            <div className='w-[70px]'>
              <span>Moves</span>
            </div>
            <span className='capitalize'>
              : {pokemonMoves ? pokemonMoves : ""}
            </span>
          </li>
          <li className='text-sm flex justify-start items-center'>
            <div className='w-[70px]'>
              <span>Weight</span>
            </div>
            <span>: {weight ? weight : ""}</span>
          </li>
          <li className='text-sm flex justify-start items-center'>
            <div className='w-[70px]'>
              <span>Height</span>
            </div>

            <span>: {height ? height : ""}</span>
          </li>
          <li className='text-sm flex justify-start items-center'>
            <div className='w-[70px]'>
              <span>Abilities</span>
            </div>

            <span className='capitalize'>
              : {pokemonAbilities ? pokemonAbilities : ""}
            </span>
          </li>
        </ul>
      </section>
      <section className='w-full flex justify-center items-center py-4 px-8'>
        <div className='border border-solid border-2 border-slate-400 rounded-lg p-8 flex justify-center items-center flex-col gap-3 sm:w-[290px] sm:p-2'>
          <p className='font-bold text-2xl'>Answer:</p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 w-[500px] sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-start'>
            {result &&
              result.map((res, indexRes) => {
                return (
                  indexRes === slides &&
                  res.questions.map((question, questionIndex) => {
                    return (
                      <div
                        className='flex justify-start items-center gap-1 pl-10'
                        key={questionIndex}
                      >
                        <input
                          type='radio'
                          id={`${question.name}`}
                          value={`${question.name}`}
                          disabled
                          name='answer'
                          className={`w-4 h-4 border-gray-300 sm:ml-10 ${
                            question.name === res.picked.name &&
                            question.name === res.answer.name
                              ? "bg-green-400"
                              : question.name === res.picked.name
                              ? "bg-red-400"
                              : question.name === res.answer.name
                              ? "bg-green-400"
                              : "bg-gray-300"
                          }`}
                        />
                        <label htmlFor={`${question.name}`}>
                          {questionIndex === 0
                            ? "a. "
                            : questionIndex === 1
                            ? "b. "
                            : questionIndex === 2
                            ? "c. "
                            : "d. "}
                          {question.name}
                        </label>
                      </div>
                    );
                  })
                );
              })}
          </div>
        </div>
      </section>
      <BiRightArrow
        className='text-8xl cursor-pointer absolute right-[10rem] sm:text-4xl sm:right-[2rem] sm:top-[11rem]'
        onClick={nextSlideHandler}
      />
      <BiLeftArrow
        className='text-8xl cursor-pointer absolute left-[10rem] sm:text-4xl sm:left-[2rem] sm:top-[11rem]'
        onClick={prevSlideHandler}
      />
    </>
  );
};

export default ResultMain;
