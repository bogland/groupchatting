type CustomRes<T> = {
  data: T;
  errorCode: ErrorCode;
  errorMsg: string;
};

export type Res<T> = {
  data: CustomRes<T>;
};

export enum ErrorCode {
  Success = 0,
  Error = 1,
}
