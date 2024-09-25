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
}

export interface ItemInterface {
    id: number,
    title: string,
    price: number,
    volume?: number,
}

export interface CartItemInterface extends ItemInterface{
    quantity: number,
}
