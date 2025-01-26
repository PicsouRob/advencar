import React from 'react';
import { TriangleAlertIcon } from 'lucide-react';

import { Alert } from '../ui/alert';

type ErrorMessageProps = {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <Alert variant="destructive"
            className="app-transition w-full flex items-center bg-red-50 gap-2 py-3 animate-in fade-in zoom-in"
        >
            <TriangleAlertIcon className="size-4" />

            <span className="text-sm flex-1">
                {error}
            </span>
        </Alert>
    );
}

export default ErrorMessage;