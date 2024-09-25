export interface PaginationInterface {
    current_page: number,
    from: number,
    last_page: number,
}
export interface Paginated<T> extends PaginationInterface{
    data: T[],
}

export interface BookInterface {
    id: number,
    title: string,
    price: number,
    stock: number,
    volume: number,
    saga: string,
}

export interface CartItemInterface extends BookInterface {
    quantity: number,
}
