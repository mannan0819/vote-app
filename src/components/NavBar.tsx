import Link from "next/link";

export default function Nav() {
    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href={`/`}>
                    <a href="#" className="flex items-center">
                        <i className="bi bi bi-journals text-indigo-600 text-6xl p-2 mt-1" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Votes App</span>
                    </a>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 rounded-lg border  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        <li>
                            <Link href={`/`}>
                                <a href="#" className="block py-2 pr-4 pl-3 text-lg rounded md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md::hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/about`}>
                                <a href="#" className="block py-2 pr-4 pl-3 text-lg rounded md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md::hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent">About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/options/new`}>
                                <a href="#" className="block py-2 pr-4 pl-3 text-lg rounded md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md::hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Start A Vote</a>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>)

}