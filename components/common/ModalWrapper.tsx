import { Dispatch, SetStateAction } from 'react';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader,
    DialogTitle, DialogTrigger
} from '../ui/dialog';

interface ModalWrapperProps { 
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    title, description, trigger, children, open, setOpen
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="overflow-hidden"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}

export default ModalWrapper;