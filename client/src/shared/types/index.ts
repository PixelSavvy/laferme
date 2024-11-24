export type BaseResponse = {
  message?: string;
};

export type GetEntities<T> = BaseResponse & {
  data: T[];
};

export type GetEntity<T> = BaseResponse & {
  data: T;
};

export type AddEntity = BaseResponse;

export type UpdateEntity = BaseResponse & {
  id: number;
};

export type DeleteEntity = BaseResponse;

export type ErrorApiResponse = BaseResponse;
