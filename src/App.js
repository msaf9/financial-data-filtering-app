import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`;

function App() {
  const [data, setData] = useState([]);

  const fetchAAPL = async (url) => {
    if (!API_KEY) {
      console.error('API key is missing');
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        setData(data);
      }
      console.log('Data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAAPL(BASE_URL);
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <h1>Financial Data Filtering App</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Revenue</th>
            <th scope="col" className="px-6 py-3">Net Income</th>
            <th scope="col" className="px-6 py-3">Gross Profit</th>
            <th scope="col" className="px-6 py-3">EPS (Earnings Per Share)</th>
            <th scope="col" className="px-6 py-3">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">{item.revenue}</td>
              <td className="px-6 py-4">{item.netIncome}</td>
              <td className="px-6 py-4">{item.grossProfit}</td>
              <td className="px-6 py-4">{item.eps}</td>
              <td className="px-6 py-4">{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
