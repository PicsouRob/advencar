const DetailRow: React.FC<{
    label: string;
    value: string;
}> = ({
    label, value
}) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            <p className="text-sm font-medium leading-none">
                {label}
            </p>

            <p className="text-sm text-muted-foreground">
                {value}
            </p>
        </div>
    );
}

export default DetailRow;