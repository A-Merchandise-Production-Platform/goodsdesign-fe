export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  timestamp: Date;
}

export interface ODataResponse<T> {
  '@odata.context': string;
  '@odata.count'?: number;
  value: T[];
}
