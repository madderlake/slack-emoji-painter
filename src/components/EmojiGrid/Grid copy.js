import React, { useRef, useEffect } from 'react';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../EmojiPaint/emoji-paint';

const Grid = props => {
  // const s = 28;
  const maxCanvasWidth = 400;
  const canvasHeight = (maxCanvasWidth / props.width) * props.height;
  const nX = props.width || DEFAULT_WIDTH;
  const nY = props.height || DEFAULT_HEIGHT;
  const canvasRef = useRef(null);
  console.log(props);
  //const ctx = canvasObj.getContext('2d');

  const drawGrid = ctx => {
    let s = maxCanvasWidth / props.width;
    let width = nX * s;
    let height = nY * s;

    //let s = Math.floor(width / nX);
    //let s = width / nX;
    console.log('😎');
    // let pX = Math.floor(width - (nX * s) / 2);
    // pX = pX > 0 ? pX / 2 : 0;
    // let nY = Math.floor(((height - pX) / (width - pX)) * nX)
    // let pY = height - nY * s;
    // let pL = Math.ceil(pX / 2) - 0.5;
    // let pT = Math.ceil(pY / 2) - 0.5;
    // let pR = width - nX * s - pL;
    // let pB = height - nY * s - pT;

    ctx.strokeStyle = 'lightgrey';
    //ctx.beginPath();
    // for (var x = pL; x <= width - pR; x += s) {
    //   ctx.moveTo(x, pT);
    //   ctx.lineTo(x, height - pB);
    // }
    // for (var y = pT; y <= height - pB; y += s) {
    //   ctx.moveTo(pL, y);
    //   ctx.lineTo(width - pR, y);
    // }
    // ctx.stroke();
    const emoji = props.emoji;
    console.log(emoji);
    const gridHeight = nY * s;
    const gridWidth = nX * s;
    for (let i = 0; i <= nX; i++) {
      const x = i * s;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gridHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= nY; i++) {
      const y = i * s;
      ctx.moveTo(0, y);
      ctx.lineTo(gridWidth, y);
      ctx.stroke();
    }

    //draw images
    const p = ctx.lineWidth; //padding
    for (let xCell = 0; xCell < nX; xCell++) {
      for (let yCell = 0; yCell < nY; yCell++) {
        const x = xCell * s;
        const y = yCell * s;
        ctx.fillStyle = 'dodgerblue';
        ctx.rect(x, y, s, s);
        //ctx.fillRect(x + p, y + p, s - p * 2, s - p * 2);
        ctx.font = s - s * 0.15 + 'px 😎';
        ctx.fillText(emoji, x + p * 3.25, y + s - p * 7);
        //     // ctx.stroke();
        //     //const img = new Image();
        //     // img.onload = function () {
        //     //   ctx.drawImage(img, x + p, y + p, s - p * 2, s - p * 2);
        //     // };

        //     // //           //TODO: set img.src to your api url instead of the dummyimage url.
        //     // img.src = `https://dummyimage.com/60x60/fff/666&text=${xCell + 1},${
        //     //   yCell + 1
        //     // }`;
      }
    }
  };
  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    drawGrid(ctx);
  });
  return <canvas ref={canvasRef} width={400} height={canvasHeight}></canvas>;
};

export default Grid;
