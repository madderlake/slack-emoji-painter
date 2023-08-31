import React from 'react';
import '../../index.css';

interface ControlsProps {
  clearEmoji: () => void;
  disabled: boolean;
  copyMessage: () => void;
}
export const Controls = ({
  clearEmoji,
  disabled,
  copyMessage,
}: ControlsProps): JSX.Element => {
  return (
    <div className="emoji-grid__toolbar">
      <div className="emoji-grid__controls">
        <button
          className="emoji-grid__control"
          onClick={clearEmoji}
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
  );
};
