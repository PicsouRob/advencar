import {
    Car, CarFront, CarIcon, FileText, Fuel, HandCoins,
    LayoutDashboard, LucideIcon,
    ScanSearch,UserRound, UserRoundCheck, Users
} from "lucide-react";

type SidebarItem = {
    name: string;
    href: string;
    icon: LucideIcon;
}

export const sidebarData: SidebarItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Alquileres",
        href: "/dashboard/rentals",
        icon: HandCoins
    },
    {
        name: "Inspecciones",
        href: "/dashboard/inspections",
        icon: UserRoundCheck
    },
    {
        name: "Clientes",
        href: "/dashboard/customers",
        icon: Users
    },
    {
        name: "Empleados",
        href: "/dashboard/employees",
        icon: UserRound
    },
    {
        name: "Vehículos",
        href: "/dashboard/vehicles",
        icon: Car
    },
    {
        name: "Marcas",
        href: "/dashboard/brands",
        icon: CarFront
    },
    {
        name: "Modelos",
        href: "/dashboard/models",
        icon: ScanSearch
    },
    {
        name: "Tipos de Vehículos",
        href: "/dashboard/vehicles-types",
        icon: CarIcon
    },
    {
        name: "Tipos de combustible",
        href: "/dashboard/fuel-types",
        icon: Fuel
    },
    {
        name: "Reportes",
        href: "/dashboard/reports",
        icon: FileText
    }
];