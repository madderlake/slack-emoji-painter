import { useState } from 'react';
import { Grid } from '../EmojiGrid/Grid';
import { ToolBar } from './ToolBar';
import { Controls } from '../EmojiPaint/Controls';
import '../../index.css';

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;

interface PaintProps {
  emoji: string;
}
const EmojiPaint = ({ emoji }: PaintProps): JSX.Element => {
  const [state, setState] = useState({
    activeEmoji: emoji[0],
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    pickerIsVisible: false,
    mode: 'select',
  });
  const numCells = state.rows * state.cols;
  const [message, setMessage] = useState(new Array(numCells).fill(' '));
  const updateMessage = (index: number, content: string) => {
    let msgArr = [...message];
    msgArr[index] = content;
    setMessage(msgArr);
  };

  const emptyMessage = (word: string) => word === '' || word === ' ';
  const disabled = message.every(emptyMessage) ? true : false;
  const clearAllEmoji = () => {
    setMessage(new Array(numCells).fill('&nbsp;'));
  };
  const formattedMsg = (msg: string[]) => {
    let msgGrid = '';
    msg.map((word, i) => {
      msgGrid += word;
      if ((i + 1) % state.rows === 0) msgGrid += '\n';
    });
    return msgGrid;
  };

  const copyMessage = async () => {
    const gridMsg = formattedMsg(message);
    await navigator.clipboard.writeText(gridMsg);
  };

  /**
   * Update the canvas dimensions based on new height and/or width
   * @param {Object} dimensions - new dimensions
   * @param {Number} dimensions.rows - next height value
   * @param {Number} dimensions.cols - next width value
   */

  /**
   * Render the EmojiPaint component
   * //@return {ReactElement} - EmojiPaint element
   */
  return (
    <>
      <div className="emoji-paint">
        <ToolBar state={state} setState={setState} />
        <div className="emoji-paint__grid-container">
          <Grid
            rows={state.rows}
            cols={state.cols}
            mode={state.mode}
            activeEmoji={state.activeEmoji}
            message={message}
            updateMessage={updateMessage}
          />
        </div>

        <Controls
          clearEmoji={clearAllEmoji}
          copyMessage={copyMessage}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default EmojiPaint;
