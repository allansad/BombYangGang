import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import GameOver from "../GameOver";
import CongratsCard from "../CongratsCard";

import { isGameEnd, openAroundButtons, openButtons, setButtonState } from "../../services/bomb";

import gang1 from "../../assets/bombgang_1.png"

export default function GameField() {
  const [isWin, setIsWin] = useState(false);
  const gameOver = useSelector(state => state.bomb.gameOver);
  const field = useSelector(state => state.bomb.field);
  const { userId, row, column, bombRate } = useSelector(state => state.bomb.gameSetting);
  const bombCount = Math.floor(row * column * bombRate);
  const dispatch = useDispatch();
  let Opencount = 0;

  function changeButtonContents(row, column, index) {
    dispatch(setButtonState({ row, column, index }));
  }

  function handleLeftClick(column, row) {
    if (field.underField[column][row] === 9) {
      dispatch(isGameEnd());
    };

    dispatch(openButtons([column, row]));
  }

  function handleBothClick(e, column, row) {
    const clickType = e.buttons;
    const BOTH_CLICK = 3;

    if (clickType === BOTH_CLICK) {
      e.preventDefault();
      dispatch(openAroundButtons([column, row]))
    }
  }

  useEffect(() => {
    field.coverField?.forEach(x => (x?.forEach(y => { if (y === "open") { Opencount++ } })));

    if (bombCount === (row * column) - Opencount) {
      setIsWin(true);
    }

    if (isWin) {
      alert("승리");
    }
  });

  return (
    <div className="relative">
      <main onContextMenu={(e) => { e.preventDefault() }} className="grid grid-cols-9 grid-rows-9 border-4 border-amber-800 shadow-lg rounded bg-amber-100">
        {field.coverField.map((columnArray, column) => {
          return columnArray.map((element, row) => {
            switch (element) {
              case "covered":
                return (
                  <button
                    key={row + "-" + column}
                    onClick={() => handleLeftClick(column, row)}
                    onContextMenu={() => changeButtonContents(row, column, 1)}
                    className="custom-closeButton"
                  ></button>
                );

              case "flag":
                return (
                  <button
                    key={row + "-" + column}
                    onContextMenu={() => changeButtonContents(row, column, 2)}
                    className="custom-closeButton"
                  >
                    🚩
                  </button>
                );

              case "question":
                return (
                  <button
                    key={row + "-" + column}
                    onContextMenu={() => changeButtonContents(row, column, 0)}
                    className="custom-closeButton"
                  >
                    ?
                  </button>
                );

              case "open":
                return (
                  <div
                    key={row + "-" + column}
                    onMouseDown={(e) => handleBothClick(e, column, row)}
                    className="custom-openButton"
                  >
                    {field.underField[column][row] === 0 ? "" : field.underField[column][row]}
                  </div>
                );
            }
          });
        })}
      </main>
      {gameOver && createPortal(
            <GameOver />,
            document.body
          )}
      <img src={gang1} width="200px" className="absolute bottom-0 -right-[200px]" />
    </div>
  );
}
