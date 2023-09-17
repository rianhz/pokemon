import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import HighScorer from "../HighScorer/HighScorer";
import { TApiResult, TPokemonResultApi } from "@/types/api";
import FormUserScore from "../FormUserScore/FormUserScore";
import Questions from "../Questions/Questions";
import { HIGHSCORE_USERS } from "@/helpers/variable";
import { addUsers } from "@/redux/features/usersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resetResult } from "@/redux/features/resultSlice";
import Timer from "../Timer/Timer";
import Button from "../Button/Button";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Main = ({
  listPokemon,
  listTypes,
}: {
  listPokemon: TApiResult;
  listTypes: TPokemonResultApi[];
}) => {
  const dispatch = useAppDispatch();
  const [startGame, setStartGame] = useState(false);

  const [timer, setTimer] = useState(20);
  const second = useRef<number>(0);
  second.current = timer;

  const [miliSecond, setmiliSecond] = useState(100);
  const milisecondRef = useRef<number>(0);
  milisecondRef.current = miliSecond;

  const secondInterval: MutableRefObject<undefined | NodeJS.Timeout> = useRef();
  const milisecondsInterval: MutableRefObject<undefined | NodeJS.Timeout> =
    useRef();

  const timerHandler = () => {
    secondInterval.current = setInterval(() => {
      if (second.current <= 1) {
        clearInterval(secondInterval.current);
      }

      setTimer((prev) => prev - 1);
    }, 1000);

    milisecondsInterval.current = setInterval(() => {
      if (second.current <= -1) {
        clearInterval(milisecondsInterval.current);
      }

      setmiliSecond((prev) => (prev === 0 ? 100 : prev - 1));
    }, 10);
  };

  const resetHandler = () => {
    clearInterval(secondInterval.current);
    clearInterval(milisecondRef.current);
    setTimer(20);
    setmiliSecond(100);
    setStartGame(false);
    dispatch(resetResult());
  };

  useEffect(() => {
    const list = localStorage.getItem("list");
    const types = localStorage.getItem("types");
    const highscore = localStorage.getItem("highscore-users");

    dispatch(resetResult());

    if (!list || !types) {
      localStorage.setItem("list", JSON.stringify(listPokemon));
      localStorage.setItem("types", JSON.stringify(listTypes));
    }

    HIGHSCORE_USERS.forEach((el, _) => {
      dispatch(addUsers(el));
    });

    if (!highscore) {
      localStorage.setItem("highscore-users", JSON.stringify(HIGHSCORE_USERS));
    }
  }, []);

  return (
    <>
      <Button
        onClick={resetHandler}
        type='button'
        className='absolute left-[7rem] top-[1rem] sm:left-[1rem] sm:text-sm sm:px-4 sm:py-1 sm:top-[1rem] sm:z-40'
      >
        Reset
      </Button>
      <Link
        href={`/pokemon-list`}
        className={`flex justify-center items-center gap-1 absolute right-[7rem] top-[1rem] sm:right-[1rem] sm:text-sm sm:px-4 sm:py-1 sm:top-[1rem] sm:z-40`}
      >
        Pokemon List <BsArrowRight className='text-slate-400 mt-[3px]' />
      </Link>
      <section className='w-[300px] h-screen flex justify-center pb-[8rem] items-end gap-4 sm:h-full sm:pb-0 sm:w-[80px]'>
        <Timer
          timer={timer}
          milisecond={miliSecond}
          currentSec={second.current}
        />
      </section>
      <section className='content grow flex flex-col justify-start pt-4 items-center gap-2 relative'>
        {timer === 0 ? (
          <FormUserScore />
        ) : (
          <Questions
            timerHandler={timerHandler}
            startGame={startGame}
            setStartGame={setStartGame}
          />
        )}
      </section>
      <section className='game w-[300px] h-screen flex justify-end pb-[15rem] items-start gap-4 flex-col sm:h-full sm:mt-[4rem] sm:flex-row sm:items-center sm:justify-center sm:w-full '>
        <HighScorer />
      </section>
    </>
  );
};

export default Main;
