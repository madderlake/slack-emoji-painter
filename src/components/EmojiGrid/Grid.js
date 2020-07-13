import React, { useState, useRef } from 'react';
import { emoji, codes } from '../../emoji-data';
import './grid.css';

const Grid = ({ rows, cols, activeEmoji, mode }) => {
  // const s = 28;
  const maxGridWidth = 400;
  const numCells = rows * cols;
  const [message, setMessage] = useState(new Array(numCells).fill(':blank'));
  const index = emoji.findIndex(el => el === activeEmoji);
  const code = codes[index] || '';

  const cellRefs = useRef([]);

  const updateMessage = (index, content) => {
    let msgArr = [...message];
    msgArr[index] = content;
    setMessage(msgArr);
  };
  const addEmoji = e => {
    e.preventDefault();
    const id = e.target.id;
    const cell = cellRefs.current[id];
    //console.log(cell);
    cell.children[0].textContent = activeEmoji;
    cell.children[0].setAttribute('data-code', code);
    updateMessage(id, code);
  };
  const paintEmoji = e => {
    e.preventDefault();
    const tag = e.target.tagName;
    let id = tag === 'TD' ? (id = e.target.id) : e.target.parentElement.id;
    const cell = cellRefs.current[id];
    if (cell) {
      cell.children[0].textContent = activeEmoji;
      cell.children[0].setAttribute('data-code', code);
    }
    updateMessage(id, code);
  };
  const eraseEmoji = e => {
    e.preventDefault();
    const id = e.target.parentElement.id;
    const cell = cellRefs.current[id];
    cell.children[0].textContent = '';
    updateMessage(id, '');
  };
  const clearAllEmoji = e => {
    e.preventDefault();
    const cellArr = cellRefs.current;
    cellArr.forEach(cell => (cell.children[0].textContent = ''));
  };
  const onDragOver = e => {
    e.preventDefault();
    switch (mode) {
      case 'paint':
        e.preventDefault();
        return paintEmoji(e);
      case 'erase':
        return eraseEmoji(e);
      default:
        return null;
    }
  };
  const onDrop = e => {
    switch (mode) {
      case 'paint':
        e.preventDefault();
        return addEmoji(e);
      case 'erase':
        return eraseEmoji(e);
      default:
        return null;
    }
  };
  const onClickCell = e => {
    switch (mode) {
      case 'paint':
        return addEmoji(e);
      case 'select':
        return addEmoji(e);
      case 'erase':
        return eraseEmoji(e);
      default:
        return false;
    }
  };

  //useEffect(() => console.log('use effect'));

  const drawGrid = (rows, cols) => {
    let cellW = maxGridWidth / cols;
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
            onDragOver={e => onDragOver(e)}
            //onDrop={e => onDrop(e)}
            ref={el => (cellRefs.current[id] = el)}
            onClick={e => onClickCell(e)}
          >
            <span draggable data-code=":blank" id={`r${r + 1}c${c + 1}`}>
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
    <div>
      <table className={'emoji_paint__grid'}>
        <tbody>{drawGrid(rows, cols)}</tbody>
      </table>
      <div className="emoji-grid__toolbar">
        <div className="emoji-grid__controls">
          <button
            className="emoji-grid__control"
            onClick={clearAllEmoji}
            // disabled={true}
          >
            <span>Clear</span>
          </button>
          <button
            className="emoji-grid__control btn_green"
            onClick={clearAllEmoji}
            // disabled={true}
          >
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
