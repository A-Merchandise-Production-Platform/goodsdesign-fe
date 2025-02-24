export * from './auth';
export * from './notification';
export * from './product';
export * from './upload';
export * from './user';

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
}

export interface ODataResponse<T> {
  '@odata.context': string;
  '@odata.count'?: number;
  value: T[];
}
