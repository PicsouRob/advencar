import { LoaderIcon } from "lucide-react";

const LoadingPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center size-full">
            <LoaderIcon className="animate-spin text-primary" />
        </div>
    );
}

export default LoadingPage;