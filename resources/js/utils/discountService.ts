import { CartItemInterface } from "../types";

function range(start: number, end: number) {
    return [...Array(end - start + 1).keys()].map(index => index + start);
}

function extractSagaDiscountedItems(cartItems: CartItemInterface[], maxVolume: number = 7) {
    const volumes = range(1, maxVolume);
    const cartItemsVolumes = cartItems.map(({ volume }) => volume);

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

function extractPairedDiscountedItems(cartItems: CartItemInterface[]) {
    let pairDiscountedItems: CartItemInterface[] = [];

    for (let i = 0; i + 1 < cartItems.length; i++) {
        const current = cartItems[i];
        const next = cartItems[i + 1];

        const quantity = Math.min(current.quantity, next.quantity);

        if (quantity > 0 && current.volume && current.volume + 1 === next.volume) {
            if (!pairDiscountedItems.some(({ id }) => id === current.id)) pairDiscountedItems = [...pairDiscountedItems, { ...current, quantity: 0 }];
            if (!pairDiscountedItems.some(({ id }) => id === next.id)) pairDiscountedItems = [...pairDiscountedItems, { ...next, quantity: 0 }];

            pairDiscountedItems = pairDiscountedItems.map((item) => [current.id, next.id].includes(item.id) ? { ...item, quantity: item.quantity + quantity } : item);
            current.quantity -= quantity;
            next.quantity -= quantity;
        }
    }

    return [pairDiscountedItems, cartItems.filter(({ quantity }) => quantity > 0)];
}

export function calculateDiscounts(cartItems: CartItemInterface[], saga: string = 'Harry Potter') {
    const sagaItems = cartItems.filter((item) => item.saga === saga).map(item => ({ ...item }));
    const [sagaDiscountedItems, remaining] = extractSagaDiscountedItems(sagaItems);
    const [pairedDiscountedItems] = extractPairedDiscountedItems(remaining);

    const sagaDiscount = 20 / 100 * sagaDiscountedItems.reduce((total, { quantity, price }) => total + quantity * price, 0);
    const pairedDiscount = 10 / 100 * pairedDiscountedItems.reduce((total, { quantity, price }) => total + quantity * price, 0);

    return {
        totalDiscount: (sagaDiscount + pairedDiscount),
        sagaDiscount: {
            items: sagaDiscountedItems.length,
            amount: sagaDiscount,
        },
        pairedDiscount: {
            items: pairedDiscountedItems.length,
            amount: pairedDiscount,
        },
    }
}
