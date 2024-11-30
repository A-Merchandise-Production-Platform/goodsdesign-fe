export interface ApiResponse<T> {
  isSuccess: boolean
  data: T | null
  message: string
  timestamp: Date
}
