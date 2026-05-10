import type { OptionData } from "../types/OptionsData";

interface Props {
  history: OptionData[];
}

export const TradeHistory = ({ history }: Props) => {
  if (history.length === 0) {
    return (
      <div style={{ marginTop: '50px', textAlign: 'center', color: '#666' }}>
        <p>No trade history found. Start by analyzing a trade above!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Recent Trade Ledger
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: '#f8f9fa' }}>
              <th style={headerStyle}>Ticker</th>
              <th style={headerStyle}>Type</th>
              <th style={headerStyle}>Strike</th>
              <th style={headerStyle}>Expiry</th>
              <th style={headerStyle}>Stock Price</th>
              <th style={headerStyle}>Premium</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={cellStyle}>
                  <span style={tickerBadge}>{item.ticker}</span>
                </td>
                <td style={cellStyle}>{item.optionType}</td>
                <td style={cellStyle}>${item.strikePrice.toFixed(2)}</td>
                <td style={cellStyle}>{item.expiryDate}</td>
                <td style={cellStyle}>${item.underlyingPrice.toFixed(2)}</td>
                <td style={cellStyle}>${item.currentOptionPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Simple inline styles for clean architecture
const headerStyle: React.CSSProperties = {
  padding: '12px 10px',
  color: '#444',
  fontWeight: 600,
  fontSize: '0.9rem',
};

const cellStyle: React.CSSProperties = {
  padding: '12px 10px',
  fontSize: '0.85rem',
  color: '#333',
};

const tickerBadge: React.CSSProperties = {
  backgroundColor: '#e9ecef',
  padding: '4px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  color: '#007bff'
};