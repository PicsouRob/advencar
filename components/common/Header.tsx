import Link from 'next/link';

import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className="py-4 md:py-6" x-data="{expanded: false}">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
                        <Link href="/" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Inicio </Link>

                        <Link href="/about" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Acerca de </Link>
                
                        <Link href="/contact" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Contacto </Link>
                    </div>

                    <Link
                        href="/signin"
                        className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header