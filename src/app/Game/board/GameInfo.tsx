import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/src/hooks/useRedux";

import { setTimer } from "@/src/store/bombSlice";

export default function GameInfo() {
  const dispatch = useAppDispatch();
  const { row, column, difficulty } = useAppSelector((state) => state.bomb.gameConfig);
  const { isGameEnd, timer, field } = useAppSelector((state) => state.bomb);
  const time = timer.timeCount;
  const coverField = field.coverField;

  let count = 0;
  coverField?.forEach((x) =>
    x?.forEach((y) => {
      if (y === "flag") {
        count++;
      }
    })
  );

  useEffect(() => {
    const timeId = setInterval(() => {
      dispatch(setTimer());
    }, 1000);

    if (isGameEnd) {
      clearInterval(timeId);
    }

    return () => clearInterval(timeId);
  }, [time, isGameEnd]);

  return (
    <header className="flex md:flex-row flex-col justify-center items-center m-6">
      <div className="md:m-4 m-0 w-[250px] text-xl px-3 md:py-2 bg-amber-300 text-gray-900 rounded shadow">
        폭탄수 : {Math.floor(row * column * difficulty)}
      </div>
      <div className="md:m-4 w-[250px] text-xl px-3 md:py-2 bg-amber-400 text-gray-900 rounded shadow">
        깃발수 : {count}
      </div>
      <div className="md:m-4 w-[250px] text-xl px-3 md:py-2 bg-amber-500 text-gray-900 rounded shadow">
        시간 : {time}
      </div>
    </header>
  );
}
