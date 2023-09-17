import React from "react";

const Timer = ({
  timer,
  milisecond,
  currentSec,
}: {
  timer: number;
  milisecond: number;
  currentSec: number;
}) => {
  return (
    <div
      className={`bg-transparent flex flex-col justify-center items-center gap-1 p-4 rounded-full px-6 w-[130px] h-[130px] text-slate-400 border border-2 border-solid border-slate-400 sm:w-[60px] sm:h-[60px] sm:absolute sm:left-[1rem] sm:top-[10rem] ${
        timer < 20 && timer > 0 ? "animate-scaler" : "animate-none"
      } ${timer === 0 ? "hidden" : "block"}`}
    >
      <span
        className={`sm:absolute sm:top-[-2rem]  ${
          timer < 20 && timer > 0 ? "sm:hidden" : "sm:block"
        }`}
      >
        Time:
      </span>
      <div className='flex justify-center items-end'>
        <span
          className={`text-5xl sm:text-2xl
        `}
        >
          {timer}
        </span>
        <div className='flex gap-0.5 '>
          <span
            className={` w-[18px] sm:text-xs ${
              currentSec === 0 || timer === 20
                ? "hidden sm:hidden"
                : "block sm:block"
            }`}
          >
            .{milisecond}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
