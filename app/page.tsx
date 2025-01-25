import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FileText } from "lucide-react";

import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Testimony from "@/components/home/Testimony";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import VehicleTypeDisponible from "@/components/common/VehicleType";

const Home: React.FC = async () => {   
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="overflow-x-hidden bg-gray-50">
      <Header />

      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-600 font-inter">Planea tus adventuras con Advencar</h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Alquila tu coche de manera rápida y
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative"> fácil </span>
              </span>
            </p>

            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-md font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Contactanos
              </Link>

              <a
                href="/about"
                className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-md font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:text-white focus:text-white hover:border-gray-900 focus:border-gray-900"
              >
                <FileText size={18} className="mr-2" />

                Saber más
              </a>
            </div>

            <p className="mt-8 text-base text-gray-500 font-inter">Tu viaje, tu camino, tu coche con comodidad</p>
          </div>
        </div>

        <div className="pb-12 pt-6">
          <div className="relative">
            <div className="absolute inset-0 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-10 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter" />
            </div>

            <div className="relative mx-auto">
              <div className="lg:max-w-6xl lg:mx-auto">
                <Image width={1000} height={1000} className="transform rounded-lg mx-auto" src="/images/car-hero.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VehicleTypeDisponible />
      <Testimony />
      <Footer />
    </div>
  );
}

export default Home;