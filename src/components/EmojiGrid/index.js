import React, { useState, useRef } from 'react';
import { emoji, codes } from '../../emoji-data';
import { DEFAULT_ROWS, DEFAULT_COLS } from '../EmojiPaint';
import '../../index.css';

const Grid = ({ rows, cols, activeEmoji, mode }) => {
  rows = rows || DEFAULT_ROWS;
  cols = cols || DEFAULT_COLS;
  const maxGridWidth = 400;
  const cellW = maxGridWidth / cols;
  const fontSize = cellW * 0.625;
  const numCells = rows * cols;
  const [message, setMessage] = useState(new Array(numCells).fill(':blank'));
  const [disabled, setDisabled] = useState(true);

  const cellRefs = useRef([]);
  const index = emoji.findIndex((el) => el === activeEmoji);
  const code = codes[index] || '';

  const updateMessage = (index, content) => {
    let msgArr = [...message];
    msgArr[index] = content;
    setMessage(msgArr);
  };

  const copyMessage = () => {
    const newMessage = message.map((word) => (word === ':blank' ? ' ' : word));
    const finalMsg = newMessage.join('');
    return document.queryCommandSupported('copy')
      ? navigator.clipboard.writeText(finalMsg)
      : null;
  };

  /*  Add emoji, Paint emoji, or Erase emoji, depending on state: mode */
  const updateEmoji = (e) => {
    e.preventDefault();
    const tag = e.target.tagName;
    let id = tag === 'TD' ? e.target.id : e.target.parentElement.id;
    const cell = cellRefs.current[id];
    if (cell) {
      if (mode === 'select' || mode === 'paint') {
        cell.children[0].style.fontSize = fontSize + 'px';
        cell.children[0].textContent = activeEmoji;
        cell.children[0].setAttribute('data-code', code);
        setDisabled(false);
        updateMessage(id, activeEmoji);
      } else {
        /* mode is Erase */
        cell.children[0].textContent = '';
        updateMessage(id, '');
      }
    }
  };

  const clearAllEmoji = (e) => {
    e.preventDefault();
    const cellArr = cellRefs.current;
    cellArr.forEach((cell) => (cell.children[0].textContent = ''));
    setDisabled(true);
  };

  const drawGrid = (rows, cols) => {
    const makeRows = [];
    const rowLen = rows;
    for (let r = 0; r < rows; r++) {
      let cells = [];
      for (var c = 0; c < cols; c++) {
        const id = r * rowLen + c;
        cells.push(
          <td
            key={c}
            width={cellW}
            height={cellW}
            id={id}
            ref={(el) => (cellRefs.current[id] = el)}
            draggable={mode === 'paint' || mode === 'erase' ? true : false}
            onDragOver={(e) => updateEmoji(e)}
            onClick={(e) => updateEmoji(e)}>
            <span data-code=":blank" id={`r${r + 1}c${c + 1}`}>
              {''}
            </span>
          </td>
        );
      }

      makeRows.push(<tr key={r}>{cells}</tr>);
    }
    return makeRows;
  };

  return (
    <div className="emoji_grid__container">
      <table className={'emoji_paint__grid'}>
        <tbody>{drawGrid(rows, cols)}</tbody>
      </table>
      <div className="emoji-grid__toolbar">
        <div className="emoji-grid__controls">
          <button
            className="emoji-grid__control"
            onClick={clearAllEmoji}
            disabled={disabled}>
            <span>Clear</span>
          </button>
          <button
            className="emoji-grid__control btn_green"
            onClick={copyMessage}
            disabled={disabled}>
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
