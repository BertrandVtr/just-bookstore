import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db.ts";
import { CartItem } from "../models/CartItem.ts";
import { convertRowDataToBook } from "./BookRepository.ts";

function convertRowDataToCartItem(row: RowDataPacket): CartItem {
    return {
        id: row.id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        quantity: row.quantity,
        book_id: row.book_id,
        cart_id: row.cart_id,
        book: convertRowDataToBook({ ...row, id: row.book_id }),
    }
}

export async function getCartItems(cartId: number) {
    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT ci.id,
               ci.cart_id,
               ci.quantity,
               ci.book_id,
               b.title,
               b.saga,
               b.volume,
               b.image,
               b.price,
               b.stock
        FROM cart_items as ci
                 JOIN books as b on ci.book_id = b.id
        WHERE ci.cart_id = ?
    `, [cartId])

    return rows.map(row => convertRowDataToCartItem(row));
}

export async function findCartItem(cartItemId: number): Promise<CartItem | null> {
    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT ci.id,
               ci.cart_id,
               ci.quantity,
               ci.book_id,
               b.title,
               b.saga,
               b.volume,
               b.image,
               b.price,
               b.stock
        FROM cart_items as ci
                 JOIN books as b on ci.book_id = b.id
        WHERE ci.id = ?
        LIMIT 1
    `, [cartItemId])

    return row ? convertRowDataToCartItem(row) : null;
}

export async function findCartItemBy(criteria: Partial<CartItem>): Promise<CartItem | null> {
    const fields = Object.keys(criteria).map((key) => `ci.${key} = ?`).join(' AND ');
    const values = Object.values(criteria);

    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT ci.id,
               ci.cart_id,
               ci.quantity,
               ci.book_id,
               b.title,
               b.saga,
               b.volume,
               b.image,
               b.price,
               b.stock
        FROM cart_items as ci
                 JOIN books as b on ci.book_id = b.id
        WHERE ${fields}
        LIMIT 1
    `, values)

    return row ? convertRowDataToCartItem(row) : null;
}

export async function createCartItem({ cart_id, book_id, quantity = 1 }: Partial<CartItem>): Promise<CartItem> {
    const [{ insertId }] = await pool.query<ResultSetHeader>(`
        INSERT INTO cart_items (cart_id, book_id, quantity)
        VALUES (?, ?, ?)
    `, [cart_id, book_id, quantity])

    return (await findCartItem(insertId))!
}

export async function updateCartItem(cartItemId: number, quantity: number): Promise<CartItem> {
    const [{ insertId }] = await pool.query<ResultSetHeader>(`
        UPDATE cart_items
        SET quantity = ?
        WHERE id = ?
    `, [Math.max(0, quantity), cartItemId])

    return (await findCartItem(insertId))!
}

export async function removeCartItem(cartItemId: number): Promise<boolean> {
    const [{ affectedRows }] = await pool.query<ResultSetHeader>(`
        DELETE FROM cart_items WHERE id = ?
    `, [cartItemId])

    return affectedRows > 0
}
