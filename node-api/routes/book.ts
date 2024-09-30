import { Router } from "express";
import { getBooksAction } from "../controllers/BookController.ts";

const router = Router();

router.get('/', getBooksAction)

export default router;
