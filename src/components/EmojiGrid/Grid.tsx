import React, { type SyntheticEvent, useRef, MutableRefObject } from 'react';
import { emoji, codes } from '../../emoji-data';
export interface GridProps {
  rows: number;
  cols: number;
  activeEmoji: string;
  mode: string;
  tableRef?: React.RefObject<HTMLTableElement> | null;
  writeEmoji?: (e: MouseEvent | SyntheticEvent) => void;
  updateDisabled: (param: boolean) => void;
  updateMessage: (id: number, emoji: string) => void;
}

const Grid = ({
  rows,
  cols,
  mode,
  activeEmoji,
  tableRef,
  updateDisabled,
  updateMessage,
}: GridProps): JSX.Element => {
  const cellW = 40;
  const fontSize = cellW * 0.625;
  //    const numCells = rows * cols;
  const index = emoji.findIndex((el) => el === activeEmoji);
  const code = codes[index] || '';
  const cellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const makeRows: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const cells: number[] = [];
    for (let c = 0; c < cols; c++) {
      cells.push(c);
    }
    makeRows.push(cells);
  }

  const updateEmoji = (e: MouseEvent | SyntheticEvent) => {
    console.log('update emoji');
    if (e.target instanceof Element) {
      const id = Number(e.target.id);
      const targetRef = cellRefs.current[id];
      const childSpan = e.target.children[0];
      if (targetRef) {
        if (mode === 'select' || mode === 'paint') {
          childSpan.setAttribute('style', `fontSize: ${fontSize}px`);
          childSpan.textContent = activeEmoji;
          childSpan.setAttribute('data-code', code);
          updateDisabled(false);
          updateMessage(id, activeEmoji);
        } else {
          /* mode is Erase */
          childSpan.textContent = '';
          updateMessage(id, '');
        }
      }
    }
  };

  return (
    <table className={'emoji_paint__grid'} ref={tableRef}>
      <tbody>
        {makeRows.map((row, r) => {
          return (
            <tr key={r}>
              {row.map((_, c) => {
                const id = r * rows + c;
                return (
                  <td
                    key={id}
                    width={cellW}
                    height={cellW}
                    id={id.toString()}
                    ref={(el) => (cellRefs.current[id] = el)}
                    draggable={
                      mode === 'paint' || mode === 'erase' ? true : false
                    }
                    onDragOver={(e: SyntheticEvent) => updateEmoji(e)}
                    onClick={(e) => updateEmoji(e)}>
                    <span data-code=":blank" id={`r${r + 1}c${c + 1}`}>
                      {''}
                    </span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
