import { EmojiPicker } from '../EmojiPicker/Picker';
import { emoji, codes } from '../../emoji-data';
import { Dispatch, SetStateAction } from 'react';

interface ToolBarProps {
  state: {
    mode: string;
    activeEmoji: string;
    pickerIsVisible: boolean;
    rows: number;
    cols: number;
  };
  setState: (param: ToolBarProps['state']) => void;
}

type SizeProps = Pick<ToolBarProps['state'], 'rows' | 'cols'>;

export const ToolBar = ({ state, setState }: ToolBarProps): JSX.Element => {
  /* Toggle the visibility of the emoji picker*/
  const toggleEmojiPicker = () => {
    setState({
      ...state,
      pickerIsVisible: !state.pickerIsVisible,
      mode: 'select',
    });
  };

  /**
   * Set the currently active emoji symbol
   * @param {String} emoji - the next active emoji
   */
  const updateActiveEmoji = (emoji: string) => {
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
  const onSizeChange = ({ rows, cols }: SizeProps) => {
    setState({ ...state, rows, cols });
  };
  return (
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
            onSelect={(symbol: string) => updateActiveEmoji(symbol)}
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
  );
};
