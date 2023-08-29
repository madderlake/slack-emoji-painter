import React, { useState, useRef, type SyntheticEvent } from 'react';
//import { emoji, codes } from '../../emoji-data';
import { DEFAULT_ROWS, DEFAULT_COLS } from '../EmojiPaint';
import Grid from './Grid';
import { type GridProps } from './Grid';
import '../../index.css';

interface GridContainerProps
  extends Omit<GridProps, 'writeEmoji' | 'updateMessage'> {}

export const GridContainer = ({
  rows,
  cols,
  activeEmoji,
  mode,
}: GridContainerProps): JSX.Element => {
  rows = rows || DEFAULT_ROWS;
  cols = cols || DEFAULT_COLS;
  const cellW = 40;

  //const fontSize = cellW * 0.625;
  const numCells = rows * cols; /* */
  const [message, setMessage] = useState(new Array(numCells).fill(':blank'));
  const [disabled, setDisabled] = useState(true);

  // const tableRef = useRef<HTMLTableElement>(null);
  //const index = emoji.findIndex((el) => el === activeEmoji);
  //const code = codes[index] || '';

  const updateMessage = (index: number, content: string) => {
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

  const clearAllEmoji = () => {
    // cellRefs.current.forEach((cell) => {
    //   if (cell !== null) cell.childNodes[0].textContent = '';
    // });
    setDisabled(true);
  };

  return (
    <div className="emoji_grid__container">
      {/* {drawGrid(rows, cols)} */}
      <Grid
        rows={rows}
        cols={cols}
        mode={mode}
        activeEmoji={activeEmoji}
        updateDisabled={setDisabled}
        updateMessage={updateMessage}
      />
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
