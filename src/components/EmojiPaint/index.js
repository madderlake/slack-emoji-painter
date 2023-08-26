import React, { useState } from 'react';
import EmojiPicker from '../EmojiPicker';
import Grid from '../EmojiGrid';
import '../../index.css';

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;

const EmojiPaint = ({ emoji, codes }) => {
  const [state, setState] = useState({
    activeEmoji: emoji[0],
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    pickerIsVisible: false,
    mode: 'select',
  });

  /**
   * Toggle the visibility of the emoji picker
   */
  const toggleEmojiPicker = () => {
    setState(({ pickerIsVisible }) => ({
      ...state,
      pickerIsVisible: !pickerIsVisible,
      mode: 'select',
    }));
  };

  /**
   * Set the currently active emoji symbol
   * @param {String} emoji - the next active emoji
   */
  const updateActiveEmoji = (emoji) => {
    setState({
      ...state,
      activeEmoji: emoji,
      pickerIsVisible: false,
    });
  };

  /**
   * Update the canvas dimensions based on new height and/or width
   * @param {Object} dimensions - new dimensions
   * @param {Number} dimensions.rows - next height value
   * @param {Number} dimensions.cols - next width value
   */
  const onSizeChange = ({ rows, cols }) => {
    return typeof rows === 'number' && typeof cols === 'number'
      ? setState(() => ({ rows, cols }))
      : null;
  };

  /**
   * Render the EmojiPaint component
   * //@return {ReactElement} - EmojiPaint element
   */
  return (
    <div className="emoji-paint">
      <div className="emoji-paint__toolbar">
        <div className="emoji-paint__controls">
          <button
            className={`emoji-paint__control ${
              state.mode === 'select' ? 'active' : ''
            }`}
            onClick={toggleEmojiPicker}>
            {state.activeEmoji}
          </button>
          <button
            className={`emoji-paint__control ${
              state.mode === 'paint' ? 'active' : ''
            }`}
            onClick={(e) => {
              setState({ ...state, mode: 'paint' });
            }}>
            <img
              className="emoji-paint__control_icon"
              src="brush.png"
              alt="brush"
            />
          </button>
          <button
            className={`emoji-paint__control ${
              state.mode === 'erase' ? 'active' : ''
            }`}
            onClick={(e) => {
              setState({ ...state, mode: 'erase' });
            }}>
            <img
              className="emoji-paint__control_icon"
              src="eraser.png"
              alt="eraser"
            />
          </button>
          {state.pickerIsVisible && (
            <EmojiPicker
              emoji={emoji}
              codes={codes}
              onSelect={(symbol) => updateActiveEmoji(symbol)}
              onClose={() => toggleEmojiPicker()}
            />
          )}
        </div>
        <div>
          <label className="emoji-paint__dimension">
            Rows
            <input
              type="number"
              className="emoji-paint__dimension_input"
              onBlur={(e) =>
                onSizeChange({
                  rows: Number(e.target.value),
                  cols: state.cols,
                })
              }
              defaultValue={state.rows}
            />
          </label>
          <label className="emoji-paint__dimension">
            Cols
            <input
              type="number"
              className="emoji-paint__dimension_input"
              onBlur={(e) =>
                onSizeChange({
                  cols: Number(e.target.value),
                  rows: state.rows,
                })
              }
              defaultValue={state.cols}
            />
          </label>
        </div>
      </div>
      <div className="emoji-paint__grid-container">
        <Grid
          cols={state.cols}
          rows={state.rows}
          activeEmoji={state.activeEmoji}
          mode={state.mode}
        />
      </div>
    </div>
  );
};

export default EmojiPaint;
