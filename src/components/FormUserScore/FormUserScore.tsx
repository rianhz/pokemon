import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { addUsers } from "@/redux/features/usersSlice";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const FormUserScore = () => {
  const [isShow, setIsShow] = useState(false);
  const [isDone, setDone] = useState(false);
  const dataUser = useAppSelector((state) => state.result);

  const resultRedux = useAppSelector((state) => state.result);

  const [username, setUsername] = useState<string>("");
  const [isError, setIsError] = useState<string>("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (e.target.value === "" || e.target.value.length > 5) {
      setIsError("Min 1-6 characters!");
    } else {
      setIsError("");
    }
  };

  const score = useAppSelector((state) => state.result.score);
  const dispatch = useAppDispatch();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const copied = useLocalStorage("highscore-users");
    copied.push({ ...dataUser, username });
    copied.sort((a: any, b: any) => {
      return b.score - a.score;
    });

    localStorage.setItem("highscore-users", JSON.stringify(copied));

    dispatch(addUsers({ ...dataUser, username }));
    setDone((prev) => !prev);
  };

  useEffect(() => {
    const usersHighScores = useLocalStorage("highscore-users");

    const isHighscore = usersHighScores
      .slice(0, 5)
      .some((el: any) => resultRedux.score > el.score);
    setIsShow(isHighscore);
  }, [resultRedux]);

  return (
    <div className='min-h-screen w-full flex justify-center items-start relative '>
      <p
        className={`text-center w-[10rem] absolute font-bold text-2xl uppercase sm:text-sm sm:mt-[2rem] ${
          isDone ? "hidden" : "block"
        }`}
      >
        Times Up!
      </p>
      {isShow && !isDone && (
        <div
          className={`flex flex-col justify-center items-center gap-2 mt-[1rem]`}
        >
          <span className='font-bold text-2xl uppercase mt-[2rem]'>
            Your Score
          </span>
          <span className='font-bold text-4xl uppercase border border-2 border-solid border-black px-10 py-4'>
            {score}
          </span>
          <form
            className='flex flex-col justify-center items-center gap-2 mt-[2rem] w-[400px] sm:w-[290px]'
            onSubmit={onSubmitHandler}
          >
            <span className='font-bold'>New High Score</span>
            <input
              className='w-full transition duration-[0.5s] py-2 text-black'
              type='text'
              onChange={onChangeHandler}
            />
            {isError && <span className='text-red-500'>{isError}</span>}
            <button
              type='submit'
              className='py-2 px-6 rounded-lg border border-2 border-solid border-gray-400 font-bold uppercase transition duration-[0.5s] hover:bg-gray-300'
              disabled={isError.length > 0 || username === ""}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {!isShow && !isDone && (
        <p className='absolute text-6xl sm:text-3xl top-[5rem]'>Try Again!</p>
      )}

      <p
        className={`absolute top-[40%] text-3xl font-bold ${
          isDone ? "block" : "hidden"
        }`}
      >
        Thank you
      </p>

      <Link
        href={`/result`}
        className={`border border-1 border-solid border-gray-500 rounded-lg px-8 py-4 absolute bottom-[4rem] left-[50%] translate-x-[-50%] sm:left-[50%] ${
          isError.length > 0 || username === ""
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        Result List
      </Link>
    </div>
  );
};

export default FormUserScore;
