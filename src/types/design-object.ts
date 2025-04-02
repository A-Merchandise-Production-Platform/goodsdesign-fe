export interface DesignObject {
  view: string;
  type: string;
  layer: number;
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  src?: string;
  text?: string;
  fontSize?: number;
  fill?: string;
  fontFamily?: string;
}