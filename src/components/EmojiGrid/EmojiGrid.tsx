import React, { useState, useRef, forwardRef, SyntheticEvent } from 'react';
import { emoji, codes } from '../../emoji-data';
import { DEFAULT_ROWS, DEFAULT_COLS } from '../EmojiPaint';
import '../../index.css';

interface GridProps {
  rows: number;
  cols: number;
  activeEmoji: string;
  mode: string;
}
export const Grid = ({
  rows,
  cols,
  activeEmoji,
  mode,
}: GridProps): JSX.Element => {
  rows = rows || DEFAULT_ROWS;
  cols = cols || DEFAULT_COLS;
  const maxGridWidth = 400;
  const cellW = maxGridWidth / cols;
  const fontSize = cellW * 0.625;
  const numCells = rows * cols;
  const [message, setMessage] = useState(new Array(numCells).fill(':blank'));
  const [disabled, setDisabled] = useState(true);

  const cellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
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
  const updateEmoji = (e: MouseEvent | SyntheticEvent) => {
    if (e.target instanceof Element) {
      const id = e.target.id;
      const targetRef = cellRefs.current[id];
      const childSpan = e.target.children[0];
      if (targetRef) {
        console.log(id, targetRef);
        if (mode === 'select' || mode === 'paint') {
          childSpan.setAttribute('style', `fontSize: ${fontSize}px`);
          childSpan.textContent = activeEmoji;
          childSpan.setAttribute('data-code', code);
          setDisabled(false);
          updateMessage(id, activeEmoji);
        } else {
          /* mode is Erase */
          childSpan.textContent = '';
          updateMessage(id, '');
        }
      }
    }
  };

  const clearAllEmoji = (e: SyntheticEvent) => {
    e.preventDefault();
    const cellArr = cellRefs.current;
    cellArr.forEach((cell) => {
      if (cell !== null) cell.childNodes[0].textContent = '';
    });
    setDisabled(true);
  };

  const drawGrid = (rows: number, cols: number) => {
    const makeRows: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const cells: number[] = [];
      for (let c = 0; c < cols; c++) {
        cells.push(c);
      }
      makeRows.push(cells);
    }
    return (
      <table className={'emoji_paint__grid'}>
        <tbody>
          {makeRows.map((row, r) => {
            return (
              <tr key={r}>
                {row.map((_, c) => {
                  const id = r * rows + c;
                  return (
                    <td
                      key={id}
                      width={cellW}
                      height={cellW}
                      id={id.toString()}
                      ref={(el) => (cellRefs.current[id] = el)}
                      draggable={
                        mode === 'paint' || mode === 'erase' ? true : false
                      }
                      onDragOver={(e: SyntheticEvent) => updateEmoji(e)}
                      onClick={(e) => updateEmoji(e)}>
                      <span data-code=":blank" id={`r${r + 1}c${c + 1}`}>
                        {''}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="emoji_grid__container">
      {drawGrid(rows, cols)}
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
