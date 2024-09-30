export interface PaginatedResult<T> {
    data: T[],
    total: number,
    current_page: number,
    last_page: number,
    limit: number,
}
