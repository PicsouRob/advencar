import {
    Tooltip, TooltipContent,
    TooltipProvider, TooltipTrigger
} from "../ui/tooltip";

interface TooltipWrapperProps {
    text: string;
    children: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ 
    text, children
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>

                <TooltipContent>
                    <p
                        className=""
                    >
                        { text }
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default TooltipWrapper;