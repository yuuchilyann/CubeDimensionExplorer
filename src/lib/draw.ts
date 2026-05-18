import type { CubeSettings, Edge, Point, Vertex } from '../types';
import { getCubeEdges, getCubeVertices, getHasseLayout } from './cube';

export function drawCube(
  canvas: HTMLCanvasElement,
  settings: CubeSettings,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const { dimension: dim, lineWidth: baseLineWidth, maxWidth, maxHeight, bwMode, visualSpacing } =
    settings;

  ctx.clearRect(0, 0, width, height);

  // 0D：只畫一個藍色原點
  if (dim === 0) {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.font = '20px monospace';
    ctx.fillStyle = '#111';
    ctx.fillText('0', width / 2 + 20, height / 2 + 5);
    return;
  }

  const vertices: Vertex[] = getCubeVertices(dim);
  const edges: Edge[] = getCubeEdges(dim);
  const layout: Point[] = getHasseLayout(
    vertices,
    width,
    height,
    dim,
    maxWidth,
    maxHeight,
    visualSpacing,
  );

  // 1D
  if (dim === 1) {
    ctx.strokeStyle = bwMode ? '#222' : '#2ecc40';
    ctx.lineWidth = baseLineWidth;
    ctx.setLineDash(bwMode ? [8, 8] : []);
    ctx.beginPath();
    ctx.moveTo(...layout[0]);
    ctx.lineTo(...layout[1]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(layout[0][0], layout[0][1], 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(layout[1][0], layout[1][1], 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '18px monospace';
    ctx.fillStyle = '#111';
    ctx.textAlign = 'center';
    ctx.fillText('0', layout[0][0], layout[0][1] - 16);
    ctx.fillText('1', layout[1][0], layout[1][1] - 16);
    ctx.textAlign = 'left';
    ctx.fillText('Hasse diagram of 1-cube', 20, 30);
    return;
  }

  // 通用：根據最高位元決定線段顏色
  for (const [i, j] of edges) {
    const highBit1 = vertices[i][0];
    const highBit2 = vertices[j][0];

    let strokeStyle: string;
    let strokeWidth: number;
    if (highBit1 === highBit2) {
      if (highBit1 === 0) {
        strokeStyle = bwMode ? '#222' : '#3498db';
        strokeWidth = bwMode ? baseLineWidth + 1.0 : baseLineWidth;
      } else {
        strokeStyle = bwMode ? '#222' : '#e74c3c';
        strokeWidth = bwMode ? baseLineWidth + 1.0 : baseLineWidth;
      }
    } else {
      strokeStyle = bwMode ? '#222' : '#2ecc40';
      strokeWidth = Math.max(1, baseLineWidth - 1);
    }

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(...layout[i]);
    ctx.lineTo(...layout[j]);
    ctx.stroke();
  }

  // 畫點
  for (let i = 0; i < vertices.length; i++) {
    const ones = vertices[i].reduce((a, b) => a + b, 0);
    ctx.beginPath();
    ctx.arc(layout[i][0], layout[i][1], 10, 0, 2 * Math.PI);
    if (ones === 0) ctx.fillStyle = '#3498db';
    else if (ones === dim) ctx.fillStyle = '#e74c3c';
    else ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // 二進位標註
  ctx.font = '16px monospace';
  ctx.fillStyle = '#111';
  ctx.textAlign = 'center';
  for (let i = 0; i < vertices.length; i++) {
    const binary = vertices[i].join('');
    ctx.fillText(binary, layout[i][0], layout[i][1] - 16);
  }
  ctx.textAlign = 'left';
  ctx.fillText('Hasse diagram of ' + dim + '-cube', 20, 30);
}
