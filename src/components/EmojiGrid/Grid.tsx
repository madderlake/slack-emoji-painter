export interface GridProps {
  rows: number;
  cols: number;
  activeEmoji: string;
  mode: string;
  message: string[];
  updateMessage: (id: number, emoji: string) => void;
}

export const Grid = ({
  rows,
  cols,
  mode,
  activeEmoji,
  message,
  updateMessage,
}: GridProps): JSX.Element => {
  const cellW = 40;
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    // Handle cell click based on mode and activeEmoji
    const id = rowIndex * cols + colIndex;
    const content = mode === 'paint' || mode === 'select' ? activeEmoji : '';
    updateMessage(id, content);
  };

  return (
    <>
      <table className={'emoji_paint__grid'}>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => {
                const id = rowIndex * cols + colIndex;
                const content = message[id];
                return (
                  <td
                    key={id}
                    width={cellW}
                    height={cellW}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    draggable={mode === 'select' ? false : true}
                    onDragOver={() => handleCellClick(rowIndex, colIndex)}>
                    <span data-code=":blank">
                      {content === undefined ? '&nbsp;' : content}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
