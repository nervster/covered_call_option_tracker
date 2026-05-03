import {useEffect, useState} from 'react'
import axios from 'axios'

interface OptionData {
  ticker: string;
  strikePrice: number;
  expiryDate: string;
  optionType: 'CALL' | 'PUT';
  underlyingPrice: number;
  currentOptionPrice: number;
}

function App() {
  const [formData, setFormData] = useState<OptionData>({
    ticker: 'TSLA',
    strikePrice: 200,
    expiryDate: '',
    optionType: 'CALL',
    underlyingPrice: 210,
    currentOptionPrice: 5.50
  });

  const [analysis, setAnalysis] = useState<any>(null);
  const [history, setHistory] = useState<OptionData[]>([]);

  // Function to fetch all saved options from the backend
  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/options/all');
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  // Fetch history when the component first loads
  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        strikePrice: Number(formData.strikePrice),
        underlyingPrice: Number(formData.underlyingPrice),
        currentOptionPrice: Number(formData.currentOptionPrice)
      };
      const response = await axios.post('http://localhost:8080/api/options/analyze', payload);
      setAnalysis(response.data);
      await fetchHistory();
    } catch (err) {
      console.error("Analysis failed", err);
    }
  };

  return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui' }}>
        <h2>Options Strategy Engine</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input placeholder="Ticker (e.g. TSLA)" onChange={e => setFormData({...formData, ticker: e.target.value})} />
          <input type="number" placeholder="Strike Price" onChange={e => setFormData({...formData, strikePrice: Number(e.target.value)})} />
          <input type="date" onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
          <select onChange={e => setFormData({...formData, optionType: e.target.value as any})}>
            <option value="CALL">Call</option>
            <option value="PUT">Put</option>
          </select>
          <input type="number" placeholder="Current Stock Price" onChange={e => setFormData({...formData, underlyingPrice: Number(e.target.value)})} />

          <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Analyze Trade
          </button>
        </form>

        {analysis && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '5px solid #007bff' }}>
              <h3>Recommendation: {analysis.recommendation}</h3>
              <p><strong>Reasoning:</strong> {analysis.reasoning}</p>
              {analysis.targetRollCredit > 0 && <p><strong>Target Credit:</strong> ${analysis.targetRollCredit.toFixed(2)}</p>}
            </div>
        )}

        <div style={{ marginTop: '50px' }}>
          <h3>Trade History</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px' }}>Ticker</th>
              <th>Type</th>
              <th>Strike</th>
              <th>Expiry</th>
              <th>Stock Price</th>
              <th>Premium</th>
            </tr>
            </thead>
            <tbody>
            {history.map((item: any, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{item.ticker}</td>
                  <td>{item.optionType}</td>
                  <td>${item.strikePrice}</td>
                  <td>{item.expiryDate}</td>
                  <td>${item.underlyingPrice}</td>
                  <td>${item.currentOptionPrice}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default App