import CatalogItem from "../components/CatalogItem.tsx";
import { BookInterface, Paginated, PaginationInterface } from "../types.js";
import { fetchBooks } from "../api/booksApiClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [paginatedBooks, setPaginatedBooks] = useState<Paginated<BookInterface>>();

    const page = +(searchParams.get('page') ?? 1);

    function nextPage() {
        if (!paginatedBooks || paginatedBooks.current_page === paginatedBooks.last_page) {
            return;
        }

        searchParams.set('page', (paginatedBooks.current_page + 1).toString());
        setSearchParams(searchParams);
    }

    function prevPage() {
        if (!paginatedBooks || paginatedBooks.current_page === paginatedBooks.from) {
            return;
        }

        searchParams.set('page', (paginatedBooks.current_page - 1).toString());
        setSearchParams(searchParams);
    }

    useEffect(() => {
        const fetchBookList = async () => setPaginatedBooks(await fetchBooks(page));

        fetchBookList();
    }, [page])

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedBooks?.data.map((item, index) => <CatalogItem key={index} {...item} />)}
            </div>
            {paginatedBooks && <Pagination pagination={paginatedBooks} prevPage={prevPage} nextPage={nextPage}/>}
        </>
    );
};

const Pagination = ({ pagination, nextPage, prevPage }: {pagination: PaginationInterface, nextPage: Function, prevPage: Function}) => {
    return (
        <>
            {
                pagination.from !== pagination.last_page &&
                < div className="mt-8 flex justify-center gap-6">
                    <button
                        className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={pagination.current_page === 1}
                        onClick={() => prevPage()}
                    >
                        prev page
                    </button>
                    <span className="px-3 py-1 rounded-3xl bg-gray-300">{pagination.current_page}</span>
                    <button
                        className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={pagination.current_page === pagination.last_page}
                        onClick={() => nextPage()}
                    >
                        next page
                    </button>
                </div>
            }
        </>
    )
}

export default Home;
