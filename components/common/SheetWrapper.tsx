"use client";

import { Dispatch, SetStateAction } from "react";

import {
    Sheet, SheetContent, SheetDescription, SheetHeader,
    SheetTitle, SheetTrigger
} from "../ui/sheet";

interface SheetWrapperProps { 
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const SheetWrapper: React.FC<SheetWrapperProps> = ({
    title, description, trigger, children, setOpen, isOpen
}) => {
    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>

            <SheetContent className="flex flex-col"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <SheetHeader>
                    <SheetTitle>
                        {title}
                    </SheetTitle>

                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>

                <div className="h-full">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SheetWrapper;