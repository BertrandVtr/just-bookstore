import { BookInterface, Paginated } from "../types";
import createAxiosApiClient from "../utils/createAxiosApiClient.ts";

const apiClient = createAxiosApiClient('/api/books');

export async function fetchBooks(page: number = 1, limit: number = 8): Promise<Paginated<BookInterface>> {
    const { data: paginatedData } = await apiClient.get<Paginated<BookInterface>>('', { params: { page, limit } });

    return paginatedData;
}
