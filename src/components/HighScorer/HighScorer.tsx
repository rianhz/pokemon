import { useAppSelector } from "@/hooks/useAppSelector";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TInitialState } from "@/types/redux";
import React, { useEffect, useState } from "react";

const HighScorer = () => {
  const [allUsers, setAllUsers] = useState<TInitialState[]>([]);
  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    const user = useLocalStorage("highscore-users");

    setAllUsers(user);
  }, [users]);

  return (
    <table className='ml-[1rem] sm:ml-0 w-[190px] sm:w-[290px] rounded-lg border border-2 border-separate border-gray-500'>
      <thead>
        <tr>
          <th className='py-4 border-b-2 border-solid border-b-gray-500'>
            High Score
          </th>
        </tr>
      </thead>
      <tbody>
        {allUsers
          ? allUsers
              .slice(0, 5)
              .sort((a, b) => b.score - a.score)
              .map((user, i) => {
                return (
                  <tr key={i}>
                    <td
                      className={`mt-1 flex justify-between px-[3rem] items-center w-full ${
                        i === 0 ? "pt-2" : i === 4 ? "pb-4" : ""
                      }`}
                    >
                      <span className='capitalize'>
                        {user.username.toLowerCase()}
                      </span>
                      <span className='self-justify-end'>{user.score}</span>
                    </td>
                  </tr>
                );
              })
          : users.map((user, i) => {
              return (
                <tr key={i}>
                  <td
                    className={`mt-1 flex justify-between px-[3rem] items-center w-full ${
                      i === 0 ? "pt-2" : i === 4 ? "pb-4" : ""
                    }`}
                  >
                    <span className='capitalize'>{user.username}</span>
                    <span>{user.score}</span>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};

export default HighScorer;
