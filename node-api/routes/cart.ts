import { Router } from "express";
import { getCurrentCartAction, makeOrderAction, removeCartItemAction, updateCartItemQuantityAction } from "../controllers/CartController.ts";

const router = Router();

router.get('/', getCurrentCartAction)
router.patch('/item/:bookId/quantity', updateCartItemQuantityAction)
router.delete('/item/:bookId', removeCartItemAction)
router.post('/order', makeOrderAction)

export default router;
