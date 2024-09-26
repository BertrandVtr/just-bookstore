export interface PaginationInterface {
    current_page: number,
    from: number,
    last_page: number,
}

export interface Paginated<T> extends PaginationInterface {
    data: T[],
}

export interface BookInterface {
    id: number,
    title: string,
    price: number,
    stock: number,
    volume: number,
    saga: string,
    image?: string,
}

export interface CartItemInterface {
    book: BookInterface,
    quantity: number,
}

export interface CartInterface {
    total_price: number,
    discount: number,
    discount_price: number,
    items: CartItemInterface[],
}

export interface OrderItemInterface {
    book_id: number,
    quantity: number,
}

export interface Order {
    id: number,
    total_price: number,
    discount: number,
    discount_price: number,
}
