export interface CubeSettings {
  dimension: number;
  lineWidth: number;
  maxWidth: number;
  maxHeight: number;
  bwMode: boolean;
  visualSpacing: boolean;
}

export type Vertex = number[];
export type Edge = [number, number];
export type Point = [number, number];
