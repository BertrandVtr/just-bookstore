import { Request, Response } from 'express'
import { getCurrentCartWithDetails } from "../services/CartService.ts";
import { findBook } from "../repositories/BookRepository.ts";
import { getCurrentCart } from "../repositories/CartRepository.ts";
import { createCartItem, findCartItemBy, removeCartItem, updateCartItem } from "../repositories/CartItemRepository.ts";
import { createOrderFromCurrentCart } from "../services/OrderService.ts";

export const getCurrentCartAction = async (_req: Request, res: Response) => {
    res.json(await getCurrentCartWithDetails());
}

export const updateCartItemQuantityAction = async (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    const book = await findBook(bookId);

    if (book === null) {
        res.status(404).json({ error: `Book ${bookId} not found.` });
        return;
    }

    const cart = await getCurrentCart();
    const cartItem = await findCartItemBy({ cart_id: cart.id, book_id: bookId })

    const quantity = req.body.quantity;

    if (quantity > book.stock) {
        res.status(422).json({ error: 'Quantity is superior than stock' })
        return;
    }

    if (cartItem === null) {
        await createCartItem({ cart_id: cart.id, book_id: bookId, quantity })
        res.status(201).json(await getCurrentCartWithDetails())
        return;
    }

    await updateCartItem(cartItem.id, quantity)
    res.json(await getCurrentCartWithDetails());
}

export const removeCartItemAction = async (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    const book = await findBook(bookId);

    if (book === null) {
        res.status(404).json({ error: `Book ${bookId} not found.` });
        return;
    }

    const cart = await getCurrentCart();
    const cartItem = await findCartItemBy({ cart_id: cart.id, book_id: bookId })

    if (cartItem) {
        await removeCartItem(cartItem.id);
    }

    res.json(await getCurrentCartWithDetails());
}

export const makeOrderAction = async (_req: Request, res: Response) => {
    res.status(201).json({
        order: await createOrderFromCurrentCart(),
        cart: await getCurrentCartWithDetails(),
    });
}
