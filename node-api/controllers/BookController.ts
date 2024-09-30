import { Request, Response } from 'express'
import { getBooksWithPagination } from "../repositories/BookRepository.ts";
import { Book } from "../models/Book.ts";
import { PaginatedResult } from "../types/PaginatedResult.ts";

export async function getBooksAction(req: Request, res: Response<PaginatedResult<Book>>) {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);

    res.json(await getBooksWithPagination(page, limit));
}
