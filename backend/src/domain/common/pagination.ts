export type OrderType = 'ASC' | 'DESC'

export type OrderPaginationOptions = {
  [key: string]: OrderType
}

export type PaginationOptions = {
  readonly page?: number,
  readonly limit?: number,
  readonly order?: OrderPaginationOptions
}

export type Paginated<T> = {
  readonly data: T[],
  readonly page: number,
  readonly limit: number
}
