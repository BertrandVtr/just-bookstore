import { Router } from "express";
import cartRoutes from "./cart.ts";
import booksRoutes from "./book.ts";

const router = Router();

router.use('/api/cart', cartRoutes)
router.use('/api/books', booksRoutes)

export default router;
