export interface CustomErrorWithData extends Error {
  data?: {
    message: string;
  };
}
