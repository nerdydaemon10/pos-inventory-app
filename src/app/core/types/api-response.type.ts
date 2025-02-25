export type ApiResponse<T = undefined> = {
  success: boolean,
  message: string,
  code: number,
  data?: T
}