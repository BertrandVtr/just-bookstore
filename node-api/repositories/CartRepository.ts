import pool from "../config/db.ts";
import { Cart } from "../models/Cart.ts";
import { ResultSetHeader, RowDataPacket } from "mysql2";

function convertRowDataToCart(data: RowDataPacket): Cart {
    return {
        id: data.id,
        updated_at: data.updated_at,
        created_at: data.created_at,
        is_archived: !!data.is_archived
    };
}

export async function createCart(): Promise<Cart> {
    const [{ insertId }] = await pool.query<ResultSetHeader>(`
        INSERT INTO carts ()
        VALUES ()
    `)

    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM carts
        WHERE id = ?
        LIMIT 1
    `, [insertId])

    return convertRowDataToCart(row);
}

export async function getCurrentCart(): Promise<Cart> {
    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM carts
        WHERE is_archived = false
        ORDER BY created_at DESC
        LIMIT 1
    `)

    return row ? convertRowDataToCart(row) : await createCart();
}

export async function updateCart(cartId: number, data: Partial<Cart>): Promise<Cart> {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);

    await pool.query<ResultSetHeader>(`
        UPDATE carts
        SET ${fields}
        WHERE id = ?
    `, [...values, cartId])

    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM carts
        WHERE id = ?
        LIMIT 1
    `, [cartId])

    return convertRowDataToCart(row);
}
