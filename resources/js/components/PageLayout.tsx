import { PropsWithChildren } from "react";

const PageLayout = (props: PropsWithChildren) => {
    return (
        <body>
        <header className="bg-white shadow">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <a href="/" className="text-xl font-bold">Just Bookstore</a>
                <div className="text-gray-700">
                    <a href="/cart" className="flex items-center">
                        <span className="ml-2">Cart (0)</span>
                    </a>
                </div>
            </nav>
        </header>

        <main className="container mx-auto py-10">
            {props.children}
        </main>
        </body>
    )
}

export default PageLayout;
