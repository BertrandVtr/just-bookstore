import pool from "../config/db.ts";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Book } from "../models/Book.ts";
import { PaginatedResult } from "../types/PaginatedResult.ts";

export function convertRowDataToBook(data: RowDataPacket): Book {
    return {
        id: data.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        title: data.title,
        saga: data.saga,
        volume: data.volume,
        image: data.image,
        price: data.price,
        stock: data.stock,
    }
}

export async function getBooksWithPagination(page: number, limit: number = 10): Promise<PaginatedResult<Book>> {
    const offset = (page - 1) * limit;

    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM books
        LIMIT ? OFFSET ?
    `, [limit, offset])

    const [[{ total }]] = await pool.query<RowDataPacket[]>(`
        SELECT COUNT(*) AS total
        FROM books
    `)

    return {
        data: rows.map(row => convertRowDataToBook(row)),
        limit,
        total,
        current_page: page,
        last_page: Math.ceil(total / limit),
    }
}

export async function findBook(id: number): Promise<Book | null> {
    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM books
        WHERE id = ?
        LIMIT 1
    `, [id])

    return row ? convertRowDataToBook(row) : null
}

export async function updateBook(bookId: number, data: Partial<Book>): Promise<Book> {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);

    await pool.query<ResultSetHeader>(`
        UPDATE books
        SET ${fields}
        WHERE id = ?
    `, [...values, bookId])

    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM books
        WHERE id = ?
        LIMIT 1
    `, [bookId])

    return convertRowDataToBook(rows[0]);
}
