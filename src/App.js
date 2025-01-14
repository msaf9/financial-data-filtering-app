// Import necessary hooks and styles
import { useEffect, useState } from 'react';
import './App.css';

// Define API key and base URL for fetching data
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`;

/**
 * The main component of the Financial Data Filtering App.
 * Manages state variables, fetches data from the API, handles filtering and sorting of data,
 * and renders the UI including a table of financial data and filter modal.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  // State variables to manage data, filters, and UI state
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    revenues: [],
    netIncomes: []
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Function to fetch data from the API
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
        setFilteredData(data);
        setFilterOptions({
          years: [...new Set(data.map(item => new Date(item.date).getFullYear()))],
          revenues: [...new Set(data.map(item => item.revenue))],
          netIncomes: [...new Set(data.map(item => item.netIncome))]
        });
      }
      console.log('Data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchAAPL(BASE_URL);
  }, []);

  // Function to handle changes in filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    let filtered = data;

    // Filter by start date
    if (filters.startDate) {
      filtered = filtered.filter(item => new Date(item.date).getFullYear() >= parseInt(filters.startDate));
    }

    // Filter by end date
    if (filters.endDate) {
      filtered = filtered.filter(item => new Date(item.date).getFullYear() <= parseInt(filters.endDate));
    }

    // Filter by minimum revenue
    if (filters.minRevenue) {
      filtered = filtered.filter(item => item.revenue >= parseInt(filters.minRevenue));
    }

    // Filter by maximum revenue
    if (filters.maxRevenue) {
      filtered = filtered.filter(item => item.revenue <= parseInt(filters.maxRevenue));
    }

    // Filter by minimum net income
    if (filters.minNetIncome) {
      filtered = filtered.filter(item => item.netIncome >= parseInt(filters.minNetIncome));
    }

    // Filter by maximum net income
    if (filters.maxNetIncome) {
      filtered = filtered.filter(item => item.netIncome <= parseInt(filters.maxNetIncome));
    }

    // Update the filtered data and close the modal
    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Function to reset filters to their default values
  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      minRevenue: '',
      maxRevenue: '',
      minNetIncome: '',
      maxNetIncome: ''
    });
    setFilteredData(data);
  };

  /**
   * Handles the sorting of data based on a specified key.
   * Toggles the sort direction between ascending and descending.
   *
   * @param {string} key - The key to sort the data by.
   */
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  /**
   * Returns the appropriate sort arrow based on the current sort configuration.
   *
   * @param {string} key - The key to check against the current sort configuration.
   * @returns {string} - The sort arrow indicating the sort direction.
   */
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-white-100">
        {/* Filter and Reset Buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            Filters
          </h2>
          <button
            onClick={resetFilters} // Resets applied filters
            className="p-2 bg-white-500 text-gray rounded hover:text-black"
          >
            Reset
          </button>
        </div>
        <div className="filters grid grid-cols-1 gap-4 mb-4">
          <div className="flex justify-between">
            <select
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange} // Updates the startDate filter
              className="p-2 border border-gray-200 rounded w-1/3"
            >
              <option value="">Start Year</option>
              {filterOptions.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {/* End Date Filter */}
            <select
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange} // Updates the endDate filter
              className="p-2 border border-gray-200 rounded w-1/3"
            >
              <option value="">End Year</option>
              {filterOptions.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {/* Minimum Revenue Filter */}
          <div>
            <label
              htmlFor="minRevenue"
              className="block text-l font-medium text-gray-700 mb-1"
            >
              Revenue
            </label>
            <div className="flex justify-between">
              <input
                type="number"
                name="minRevenue"
                onChange={handleFilterChange} // Updates the minRevenue filter
                className="p-2 border border-gray-200 rounded w-1/2.5"
                placeholder="Min Revenue"
              />
              {/* Maximum Revenue Filter */}
              <input
                type="number"
                name="maxRevenue"
                onChange={handleFilterChange} // Updates the maxRevenue filter
                className="p-2 border border-gray-200 rounded w-1/2.5"
                placeholder="Max Revenue"
              />
            </div>
            <input
              type="range"
              name="revenue"
              min={Math.min(...filterOptions.revenues)}
              max={Math.max(...filterOptions.revenues)}
              value={filters.maxRevenue}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({
                  ...filters,
                  maxRevenue: value
                });
              }}
              className="w-full mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="minNetIncome"
              className="block text-l font-medium text-gray-700 mb-1"
            >
              Net Income
            </label>
            <div className="flex justify-between">
              <input
                type="number"
                name="minNetIncome"
                onChange={handleFilterChange} // Updates the minNetIncome filter
                className="p-2 border border-gray-200 rounded w-1/2.5"
                placeholder="Min Net Income"
              />
              {/* Maximum Net Income Filter */}
              <input
                type="number"
                name="maxNetIncome"
                onChange={handleFilterChange} // Updates the maxNetIncome filter
                className="p-2 border border-gray-200 rounded w-1/2.5"
                placeholder="Max Net Income"
              />
            </div>
            <input
              type="range"
              name="netIncome"
              min={Math.min(...filterOptions.netIncomes)}
              max={Math.max(...filterOptions.netIncomes)}
              value={filters.maxNetIncome}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({
                  ...filters,
                  maxNetIncome: value
                });
              }}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>
      {/* Data Table */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Financial Data Filtering App</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('date')}>
                  Date {getSortArrow('date')}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('revenue')}>
                  Revenue {getSortArrow('revenue')}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('netIncome')}>
                  Net Income {getSortArrow('netIncome')}
                </th>
                <th scope="col" className="px-6 py-3">Gross Profit</th>
                <th scope="col" className="px-6 py-3">EPS (Earnings Per Share)</th>
                <th scope="col" className="px-6 py-3">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {/* Render Filtered Data Rows */}
              {sortedData.map((item) => (
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
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;
