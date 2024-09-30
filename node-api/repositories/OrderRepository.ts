import pool from "../config/db.ts";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Order } from "../models/Order.ts";

function convertRowDataToOrder(row: RowDataPacket): Order {
    return {
        id: row.id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        cart_id: row.cart_id,
        total_price: row.total_price,
        discount: row.discount,
        discount_price: row.discount_price,
        complete_saga_discount: row.complete_saga_discount,
        paired_volumes_discount: row.paired_volumes_discount,
    }
}

export async function createOrder(data: Partial<Order>): Promise<Order> {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const [{ insertId }] = await pool.query<ResultSetHeader>(`
        INSERT INTO orders (${fields.join(', ')})
        VALUES (${values.map(_ => '?').join(', ')})
    `, values)

    const [[row]] = await pool.query<RowDataPacket[]>(`
        SELECT *
        FROM orders
        WHERE id = ?
        LIMIT 1
    `, [insertId])

    return convertRowDataToOrder(row);
}
