import Link from 'next/link';
import { Car } from 'lucide-react';

const Logo: React.FC = () => {
    return (
        <Link href="/"
            className="flex items-center gap-2"
        >
            <Car className="size-8 text-foreground" />

            <h1 className="flex items-center text-[1.6rem] font-bold">
                Adven
                <span className="text-[#e85d04]">car</span>
            </h1>
        </Link>
    );
}

export default Logo;