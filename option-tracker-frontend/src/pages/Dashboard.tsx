import { useOptions } from "../api/hooks/useOptions";
import { OptionForm } from "../features/components/OptionsForm";
import { TradeHistory } from "../features/components/TradeHistory";


export const Dashboard = () => {
    const { historyQuery, analyzeMutation } = useOptions();

    const handleAnalyze = (formData: any) => {
        analyzeMutation.mutate(formData);
    };

    console.log("rendered")

    return (
        <div style={{ margin: '0 auto' }}>
            <h2>Options Strategy Engine</h2>

            <OptionForm onAnalyze={handleAnalyze} />

            {analyzeMutation.isPending && <p>Analyzing trade...</p>}

            {analyzeMutation.data && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#f0f7ff' }}>
                    <h4>{analyzeMutation.data.data.recommendation}</h4>
                    <p>{analyzeMutation.data.data.reasoning}</p>
                </div>
            )}

            {historyQuery.isLoading ? (
                <p>Loading history...</p>
            ) : (
                <TradeHistory history={historyQuery.data || []} />
            )}
        </div>
    );
};