import '../../index.css';

interface PickerProps {
  emoji: string[];
  onSelect: (param: string) => void;
  onClose: () => void;
}
export const EmojiPicker = ({
  emoji,
  onSelect,
  onClose,
}: PickerProps): JSX.Element => {
  return (
    <div>
      <div className="emoji-picker">
        <ul className="emoji-picker__list">
          {emoji &&
            emoji.map((symbol: string, index: number) => (
              <li key={`e${index}`}>
                <button
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
