import type { Edge, Point, Vertex } from '../types';

/** 取得 n-cube 的所有頂點（以二進位陣列表示） */
export function getCubeVertices(n: number): Vertex[] {
  const vertices: Vertex[] = [];
  const total = 1 << n;
  for (let i = 0; i < total; i++) {
    const arr: number[] = [];
    for (let j = 0; j < n; j++) arr.push((i >> j) & 1);
    vertices.push(arr);
  }
  return vertices;
}

/** 取得 n-cube 的所有邊（只差一位的連線） */
export function getCubeEdges(n: number): Edge[] {
  const edges: Edge[] = [];
  const total = 1 << n;
  for (let i = 0; i < total; i++) {
    for (let j = 0; j < n; j++) {
      const neighbor = i ^ (1 << j);
      if (i < neighbor) edges.push([i, neighbor]);
    }
  }
  return edges;
}

/**
 * Hasse diagram：分層排列所有頂點。
 *
 * - 第 l 層放 1 的個數為 l 的頂點。
 * - l=0 在最下方，l=n 在最上方。
 * - 4D 以上：為每一層添加水平偏移避免垂直對齊。
 * - visualSpacing：高位元不同時多加間距。
 */
export function getHasseLayout(
  vertices: Vertex[],
  width: number,
  height: number,
  n: number,
  maxWidth: number,
  maxHeight: number,
  visualSpacing = false,
): Point[] {
  const layers: { idx: number; v: Vertex }[][] = Array.from(
    { length: n + 1 },
    () => [],
  );
  vertices.forEach((v, idx) => {
    const ones = v.reduce((a, b) => a + b, 0);
    layers[ones].push({ idx, v });
  });

  // 先計算所有層的寬度，找出最寬的層
  let maxLayerWidth = 0;
  const layerWidths: number[] = [];
  for (let l = 0; l <= n; l++) {
    const count = layers[l].length;
    const gap = Math.max(
      60,
      Math.min((maxWidth - 100) / (count - 1 || 1), 300),
    );
    const layerWidth = (count - 1) * gap;
    layerWidths[l] = layerWidth;
    maxLayerWidth = Math.max(maxLayerWidth, layerWidth);
  }

  const layout: Point[] = new Array(vertices.length);
  const effectiveHeight = maxHeight;
  const layerHeight = effectiveHeight / (n + 2);
  const startY = (height - effectiveHeight) / 2;

  for (let l = 0; l <= n; l++) {
    const y = startY + effectiveHeight - layerHeight * (l + 1);
    const sorted = layers[l].slice().sort((a, b) => {
      const aVal = parseInt(a.v.join(''), 2);
      const bVal = parseInt(b.v.join(''), 2);
      return aVal - bVal;
    });
    const count = sorted.length;
    const gap = Math.max(
      60,
      Math.min((maxWidth - 100) / (count - 1 || 1), 300),
    );
    const startX = width / 2 - (gap * (count - 1)) / 2;

    let layerOffset = 0;
    if (n >= 4) {
      const widthDifference = maxLayerWidth - layerWidths[l];
      const maxOffset = Math.min(gap * 0.25, 40);
      const offsetRatio = widthDifference / (maxLayerWidth || 1);
      const direction = l % 2 === 0 ? 1 : -1;
      layerOffset = direction * offsetRatio * maxOffset;
    }

    const xArr: number[] = [];
    if (visualSpacing && count > 1) {
      const extraGap = Math.max(40, gap * 0.5);
      let prevHighBit = sorted[0].v[0];
      let x = startX;
      xArr.push(x);
      for (let i = 1; i < count; i++) {
        const currHighBit = sorted[i].v[0];
        if (currHighBit !== prevHighBit) x += extraGap;
        x += gap;
        xArr.push(x);
        prevHighBit = currHighBit;
      }
    }

    for (let i = 0; i < count; i++) {
      let x: number;
      if ((l === 0 || l === n) && count === 1) {
        x = width / 2;
      } else {
        x =
          visualSpacing && count > 1
            ? xArr[i] + layerOffset
            : startX + i * gap + layerOffset;
      }
      layout[sorted[i].idx] = [x, y];
    }
  }
  return layout;
}
