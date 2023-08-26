import React from 'react';
import '../../index.css';

const EmojiPicker = ({ emoji, onSelect, onClose }) => {
  return (
    <div>
      <div className="emoji-picker">
        <ul className="emoji-picker__list">
          {emoji &&
            emoji.map((symbol, index) => (
              <li key={`e${index}`}>
                <button
                  draggable
                  className="emoji-picker__control"
                  id={`e${index}`}
                  onClick={() => onSelect(symbol)}>
                  {symbol}
                </button>
              </li>
            ))}
        </ul>
        <span className="emoji-picker__caret" />
      </div>
      <div className="emoji-picker__shadow" onClick={onClose} />
    </div>
  );
};

export default EmojiPicker;
