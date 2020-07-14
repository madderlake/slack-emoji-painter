import React, { Component } from 'react';
import EmojiPicker from '../EmojiPicker/emoji-picker';
import Grid from '../EmojiGrid/Grid';

import './emoji-paint.css';

export const DEFAULT_ROWS = 12;
export const DEFAULT_COLS = 12;

export default class EmojiPaint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeEmoji: this.props.emoji[0],
      rows: DEFAULT_ROWS,
      cols: DEFAULT_COLS,
      isEmojiPickerShowing: false,

      mode: 'select'
    };
  }

  /**
   * Toggle the visibility of the emoji picker
   */
  toggleEmojiPicker = () => {
    this.setState(({ isEmojiPickerShowing }) => ({
      isEmojiPickerShowing: !isEmojiPickerShowing,
      mode: 'select'
    }));
  };

  /**
   * Set the currently active emoji symbol
   * @param {String} emoji - the next active emoji
   */
  updateActiveEmoji = emoji => {
    this.setState(prevState => ({
      activeEmoji: emoji,
      isEmojiPickerShowing: false
    }));
  };

  /**
   * Update the canvas dimensions based on new height and/or width
   * @param {Object} dimensions - new dimensions
   * @param {Number} dimensions.rows - next height value
   * @param {Number} dimensions.cols - next width value
   */
  onSizeChange = ({ rows, cols }) => {
    return typeof rows === 'number' && typeof cols === 'number'
      ? this.setState(() => ({ rows, cols }))
      : null;
  };

  /**
   * Render the EmojiPaint component
   * //@return {ReactElement} - EmojiPaint element
   */
  render() {
    return (
      <div className="emoji-paint">
        <div className="emoji-paint__toolbar">
          <div className="emoji-paint__controls">
            <button
              className="emoji-paint__control"
              onClick={this.toggleEmojiPicker}
            >
              {this.state.activeEmoji}
            </button>
            <button
              className="emoji-paint__control"
              onClick={e => {
                this.setState({ mode: 'paint' });
              }}
            >
              <img
                className="emoji-paint__control_icon"
                src="brush.png"
                alt="brush"
              />
            </button>
            <button
              className="emoji-paint__control"
              onClick={e => {
                this.setState({ mode: 'erase' });
              }}
            >
              <img
                className="emoji-paint__control_icon"
                src="eraser.png"
                alt="eraser"
              />
            </button>
            {this.state.isEmojiPickerShowing && (
              <EmojiPicker
                emoji={this.props.emoji}
                codes={this.props.codes}
                onSelect={symbol => this.updateActiveEmoji(symbol)}
                onClose={() => this.toggleEmojiPicker()}
              />
            )}
          </div>
          <div>
            <label className="emoji-paint__dimension">
              Rows
              <input
                type="number"
                className="emoji-paint__dimension_input"
                onBlur={e =>
                  this.onSizeChange({
                    rows: Number(e.target.value),
                    cols: this.state.cols
                  })
                }
                defaultValue={this.state.rows}
              />
            </label>
            <label className="emoji-paint__dimension">
              Cols
              <input
                type="number"
                className="emoji-paint__dimension_input"
                onBlur={e =>
                  this.onSizeChange({
                    cols: Number(e.target.value),
                    rows: this.state.rows
                  })
                }
                defaultValue={this.state.cols}
              />
            </label>
          </div>
        </div>
        <div className="emoji-paint__grid-container">
          <Grid
            cols={this.state.cols}
            rows={this.state.rows}
            activeEmoji={this.state.activeEmoji}
            mode={this.state.mode}
          />
        </div>
      </div>
    );
  }
}
