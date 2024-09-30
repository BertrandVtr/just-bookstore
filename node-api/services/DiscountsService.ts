import { CartItem } from "../models/CartItem.ts";
import { Discounts } from "../types/Discounts.ts";

const DISCOUNTED_SAGAS: Record<string, number> = {
    'Harry Potter': 7
}

function range(start: number, end: number) {
    return [...Array(end - start + 1).keys()].map(index => index + start);
}

function extractSagaDiscountedItems(cartItems: CartItem[], maxVolume: number = 7) {
    const volumes = range(1, maxVolume);
    const cartItemsVolumes = cartItems.map(({ book }) => book!.volume);

    if (!volumes.every(volume => cartItemsVolumes.includes(volume))) {
        return [[], cartItems];
    }

    const count = Math.min(...cartItems.map(({ quantity }) => quantity));

    const sagaDiscountedItems = cartItems.map(item => ({ ...item, quantity: count }));
    const remaining = cartItems
        .map(item => ({ ...item, quantity: item.quantity - count }))
        .filter(({ quantity }) => quantity > 0)

    return [sagaDiscountedItems, remaining];
}

function extractPairedDiscountedItems(cartItems: CartItem[]) {
    let pairDiscountedItems: CartItem[] = [];

    cartItems.sort((a, b) => a.book!.volume - b.book!.volume);

    for (let i = 0; i + 1 < cartItems.length; i++) {
        const current = cartItems[i];
        const next = cartItems[i + 1];

        const quantity = Math.min(current.quantity, next.quantity);

        if (quantity > 0 && current.book?.volume && current.book.volume + 1 === next.book?.volume) {
            if (!pairDiscountedItems.some(({ id }) => id === current.id)) pairDiscountedItems = [...pairDiscountedItems, { ...current, quantity: 0 }];
            if (!pairDiscountedItems.some(({ id }) => id === next.id)) pairDiscountedItems = [...pairDiscountedItems, { ...next, quantity: 0 }];

            pairDiscountedItems = pairDiscountedItems.map((item) => [current.id, next.id].includes(item.id) ? { ...item, quantity: item.quantity + quantity } : item);
            current.quantity -= quantity;
            next.quantity -= quantity;
        }
    }

    return [pairDiscountedItems, cartItems.filter(({ quantity }) => quantity > 0)];
}

export function calculateDiscounts(cartItems: CartItem[]): Discounts {

    const completeSagaDiscountedItems: CartItem[] = [];
    const pairedVolumesDiscountedItems: CartItem[] = [];

    Object.entries(DISCOUNTED_SAGAS).forEach(([saga, maxVolume]) => {
        const sagaItems = cartItems.filter(({ book }) => book?.saga === saga).map(item => ({ ...item }));
        const [completeSaga, remaining] = extractSagaDiscountedItems(sagaItems, maxVolume);
        const [pairedVolumes] = extractPairedDiscountedItems(remaining);

        completeSagaDiscountedItems.push(...completeSaga);
        pairedVolumesDiscountedItems.push(...pairedVolumes);
    })

    const totalPrice = cartItems.reduce((total, { quantity, book }) => total + quantity * (book?.price || 0), 0);
    const completeSagaDiscount = 20 / 100 * completeSagaDiscountedItems.reduce((total, { quantity, book }) => total + quantity * (book?.price || 0), 0);
    const pairedVolumesDiscount = 10 / 100 * pairedVolumesDiscountedItems.reduce((total, { quantity, book }) => total + quantity * (book?.price || 0), 0);
    const totalDiscount = completeSagaDiscount + pairedVolumesDiscount;
    const totalDiscountedPrice = totalPrice - totalDiscount;

    return {
        total_price: totalPrice,
        discount: totalDiscount,
        discount_price: totalDiscountedPrice,
        complete_saga_discount: completeSagaDiscount,
        paired_volumes_discount: pairedVolumesDiscount,
    }
}
