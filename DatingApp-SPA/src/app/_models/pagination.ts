export interface Pagination {
    currentPage: number;
    itemsForPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
