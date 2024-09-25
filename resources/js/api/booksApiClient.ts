import axios from "axios";
import { BookInterface, Paginated } from "../types";

const apiClient = axios.create({ baseURL: '/api/books' });

export async function fetchBooks(page: number = 1, limit: number = 10): Promise<Paginated<BookInterface>> {
    const { data: paginatedData } = await apiClient.get<Paginated<BookInterface>>('', { params: { page, limit } });

    return paginatedData;
}
