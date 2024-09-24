export interface ItemInterface {
    id: number,
    title: string,
    price: number,
    volume?: number,
}

export interface CartItemInterface extends ItemInterface{
    quantity: number,
}
