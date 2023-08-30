import { useState } from 'react';
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
  const numCells = rows * cols; /* */
  const [message, setMessage] = useState(new Array(numCells).fill(' '));
  const emptyMessage = (word: string) => word === '' || word === ' ';
  const disabled = message.every(emptyMessage) ? true : false;

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
    setMessage(new Array(numCells).fill(''));
  };

  return (
    <div className="emoji_grid__container">
      {/* {drawGrid(rows, cols)} */}
      <Grid
        rows={rows}
        cols={cols}
        mode={mode}
        activeEmoji={activeEmoji}
        message={message}
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
