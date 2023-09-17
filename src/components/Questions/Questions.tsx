import { generateMathNumber } from "@/helpers/generator";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fetchImagePokemon, fetchPokemon } from "@/helpers/http";
import { addToResult } from "@/redux/features/resultSlice";
import { TPokemonResultApi } from "@/types/api";
import { TPokemon } from "@/types/pokemon";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Button from "../Button/Button";

const Questions = ({
  timerHandler,
  startGame,
  setStartGame,
}: {
  timerHandler: () => void;
  startGame: boolean;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const [questions, setQuestions] = useState<TPokemonResultApi[]>([]);
  const [correct, setCorrect] = useState<TPokemonResultApi>();
  const [urlImage, setUrlImage] = useState("");
  const [pokemon, setPokemon] = useState<TPokemon>();
  const [userAnswer, setUserAnswer] = useState<TPokemonResultApi>({
    name: "",
    url: "",
  });
  const [isError, setIsError] = useState("");

  const generateQuestion = async () => {
    const resultList = useLocalStorage("list");
    const { results } = resultList;

    const correctAnswer: TPokemonResultApi =
      results[generateMathNumber(results.length)];

    const tempPokemon = await fetchPokemon(correctAnswer.name);
    const urlImage = await fetchImagePokemon(correctAnswer.url);

    const question: TPokemonResultApi[] = Array.from([
      results[generateMathNumber(results.length)],
      results[generateMathNumber(results.length)],
      results[generateMathNumber(results.length)],
      correctAnswer,
    ]);

    setUrlImage(urlImage);
    setQuestions(question);
    setPokemon(tempPokemon);
    setCorrect(correctAnswer);
  };

  const startGameHandler = () => {
    setStartGame((prev) => !prev);
    timerHandler();
    generateQuestion();
  };

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

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (userAnswer?.name.length < 1 && userAnswer?.url.length < 1) {
      setIsError("Pick your answer!");
      return;
    }

    dispatch(
      addToResult({
        questions,
        picked: userAnswer,
        answer: correct,
      })
    );
    setIsError("");
    setUserAnswer({
      name: "",
      url: "",
    });
    generateQuestion();
  };

  return (
    <div className='flex justify-start items-center flex-col sm:z-30 sm:flex sm:flex-col sm:justify-center sm:items-center w-full'>
      <h1
        className={`text-4xl font-bold mt-1 mb-4 sm:text-2xl sm:mt-[2rem] sm:block ${
          startGame ? "hidden" : "block"
        }`}
      >
        Guess The Pokemon
      </h1>
      <div className='w-[120px] h-[120px] relative rounded-md mt-[4rem] sm:mt-2'>
        <Image
          src={`${
            urlImage.length > 0 && startGame ? urlImage : "/placeholder-img.png"
          }`}
          fill
          priority
          sizes='100%'
          alt='pokemon'
          className='rounded-md'
        />
      </div>
      <p className='cont-bold text-2xl font-bold mt-2'>Pokemon Information</p>
      <ul className='list-none'>
        <li className='text-sm flex justify-start items-center'>
          <div className='w-[70px]'>
            <span>Moves</span>
          </div>
          <span className='capitalize'>: {startGame ? pokemonMoves : ""}</span>
        </li>
        <li className='text-sm flex justify-start items-center'>
          <div className='w-[70px]'>
            <span>Weight</span>
          </div>
          <span>: {startGame ? weight : ""}</span>
        </li>
        <li className='text-sm flex justify-start items-center'>
          <div className='w-[70px]'>
            <span>Height</span>
          </div>

          <span>: {startGame ? height : ""}</span>
        </li>
        <li className='text-sm flex justify-start items-center'>
          <div className='w-[70px]'>
            <span>Abilities</span>
          </div>

          <span className='capitalize'>
            : {startGame ? pokemonAbilities : ""}
          </span>
        </li>
      </ul>
      {startGame ? (
        <div className='border border-solid border-2 border-gray-500 rounded-lg p-2 flex justify-center items-center flex-col gap-2 mt-6 w-[400px] sm:w-[310px] sm:p-2'>
          <p className='font-bold text-2xl'>Answer:</p>
          <form
            className='answer-choice grid grid-cols-2 grid-rows-2 gap-2 w-[400px] sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-start sm:pt-2'
            onSubmit={onSubmitHandler}
          >
            {questions.map((el, i) => {
              return (
                <div
                  className='flex justify-start items-center gap-1 pl-6 sm:ml-[4rem] sm:gap-4'
                  key={i}
                >
                  <input
                    type='radio'
                    id={`${el.name}`}
                    value={`${el.name}`}
                    name='answer'
                    onChange={() => {
                      setUserAnswer(el);
                    }}
                    checked={userAnswer?.name === el.name}
                  />
                  <label htmlFor={`${el.name}`}>
                    {i === 0
                      ? "a. "
                      : i === 1
                      ? "b. "
                      : i === 2
                      ? "c. "
                      : "d. "}
                    <span
                      className={`capitalize ${
                        el.name.length > 10 ? "text-xs" : ""
                      }`}
                    >
                      {el.name}
                    </span>
                  </label>
                </div>
              );
            })}
            {isError && (
              <p className='text-red-500 block text-center w-full col-span-2'>
                {isError}
              </p>
            )}
            <Button type='submit' className='col-span-2 w-[90%] mx-auto mt-4'>
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Button
          type='button'
          className='flex gap-2 justify-center items-center mt-[4rem]'
          onClick={startGameHandler}
        >
          <span className='text-md'>Start</span>
          <BsArrowRight />
        </Button>
      )}
    </div>
  );
};

export default Questions;
