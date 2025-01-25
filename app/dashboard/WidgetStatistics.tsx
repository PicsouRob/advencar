
type WidgetStatisticsProps = {
    compareTo: string;
    total: number;
    widgetFor: string;
    lastData: number;
    moneyStatistics?: boolean;
}

const WidgetStatistics: React.FC<WidgetStatisticsProps> = ({
    compareTo, total, widgetFor, lastData, moneyStatistics
}) => {
    return (
        <div className="space-y-1 border rounded p-2">
            <p className="text-sm font-medium leading-none">
                {widgetFor}
            </p>
            
            <p className="text-xl font-semibold"> { moneyStatistics && "$" } { total }</p>
            
            <p className="text-sm text-muted-foreground">
                <span className="">{ moneyStatistics && "$" } { lastData }</span> {compareTo}
            </p>
        </div>
    );
}

export default WidgetStatistics