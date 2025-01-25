"use client";

import {
    Sheet, SheetContent, SheetDescription, SheetHeader,
    SheetTitle, SheetTrigger
} from "../ui/sheet";

interface SheetWrapperProps { 
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const SheetWrapper: React.FC<SheetWrapperProps> = ({
    title, description, trigger, children
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>

            <SheetContent className="flex flex-col"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <div className="h-full">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SheetWrapper;