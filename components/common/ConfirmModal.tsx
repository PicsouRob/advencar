"use client";

import { useState, useTransition } from 'react';
import { Loader } from 'lucide-react';

import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface ConfirmModalProps { 
    title: string;
    description: string;
    children: React.ReactNode;
    onConfirm: () => Promise<void>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
    title, description, onConfirm, children
}) => {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleConfirm = () => {
        startTransition(async () => {
            await onConfirm();

            setIsOpen(false);
            router.refresh();
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className=""
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter className='grid grid-cols-2 gap-2'>
                    <DialogClose className='border px-4 rounded hover:bg-gray-100'>Cancelar</DialogClose>

                    <Button className='font-semibold'
                        onClick={() => handleConfirm()}
                    >
                        {isPending && <Loader className="size-4 animate-spin" />}

                        {isPending ? "Confirmando..." : "Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmModal;