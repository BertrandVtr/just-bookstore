import { CartItem } from "./CartItem.ts";

export interface Cart {
    id: number,
    created_at: Date,
    updated_at: Date,
    is_archived: boolean,
    items?: CartItem[],
}
