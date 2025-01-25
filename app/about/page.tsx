import Image from 'next/image';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Testimony from '@/components/home/Testimony';
import VehicleTypeDisponible from '@/components/common/VehicleType';

const About = () => {
    return (
        <div className="">
            <Header />

            <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
                        <div className="relative lg:mb-12">
                            <Image width={200} height={200}
                                className="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg" alt=""
                            />
                            
                            <div className="pl-12 pr-6">
                                <Image width={1000} height={1000} className="relative rounded-md" src="/images/car4.jpg" alt="" />
                            </div>
                        </div>

                        <div className="2xl:pl-16">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">We make things easy for projects.</h2>
                            <p className="text-xl leading-relaxed text-gray-900 mt-9">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia conse duis enim velit mollit. Exercitation veniam.</p>
                            <p className="mt-6 text-xl leading-relaxed text-gray-900">Velit officia conse duis enim velit mollit. Exercit ation veniam consequat sunt nostrud amet.</p>
                        </div>
                    </div>
                </div>
            </section>

            <VehicleTypeDisponible />

            <section className="py-10 bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <h2 className="pb-6 text-2xl font-bold leading-tight text-black lg:leading-tight">Necesitas un coche? Entonces contacta con nosotros.</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-8 xl:gap-x-20">
                        <div className="flex items-start">
                            <svg className="flex-shrink-0 w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <div className="ml-6">
                                <p className="text-base font-medium text-black/50">Llama a nuestro servicio</p>
                                <p className="mt-4 text-xl font-medium text-gray-900">(809) 429-8594</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <svg className="flex-shrink-0 w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="ml-6">
                                <p className="text-base font-medium text-black/50">Envíanos un correo</p>
                                <p className="mt-4 text-xl font-medium text-gray-900">advencar@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <svg className="flex-shrink-0 w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="ml-6">
                                <p className="text-base font-medium text-black/50">Dirección</p>
                                <p className="mt-4 text-xl font-medium leading-relaxed text-gray-900">Av. Francia, #82 Santo Domingo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimony />

            <Footer />
        </div>
    );
}

export default About;