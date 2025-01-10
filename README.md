# Financial Data Filtering App
A web application to fetch and analyze financial data for Apple Inc. (AAPL) using data from a public API. The app provides features like filtering, sorting, and displaying financial metrics in a responsive, user-friendly interface.

## Features
1. Fetch and Display Data
    - Retrieves annual income statement data for Apple Inc. using the Financial Modeling Prep API.
    - Displays key financial metrics in a tabular format, including:
    - Date: The fiscal year of the data.
    - Revenue
    - Net Income
    - Gross Profit
    - EPS (Earnings Per Share)
    - Operating Income

2. Filtering
    - Filter financial data based on:
    - Date Range: Specify start and end years.
    - Revenue: Filter by a user-defined revenue range.
    - Net Income: Filter by a user-defined net income range.

3. Sorting
    - Sort table data by:
    - Date: Ascending/Descending order.
    - Revenue: Ascending/Descending order.
    - Net Income: Ascending/Descending order.

4. Responsive Design
    - Ensures a seamless user experience on desktop, tablet, and mobile devices.
    - Styled using TailwindCSS for a clean and modern look.

## Technical Stack
- Frontend: React.js
- Styling: TailwindCSS
- API: [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements)
- Deployment: GitHub Pages

## Installation and Setup

### Prerequisites
- Node.js installed on your system.

### Steps to Run Locally
1. Clone the repository:
```git
git clone https://github.com/msaf9/financial-data-filtering-app.git
cd financial-data-filtering-app
```

2.	Install dependencies:
```npm
npm install
```

3. Add your Financial Modeling Prep API key:
>   - Create a .env file in the root directory.
>	- Add your API key to the file: 
>       - ```REACT_APP_API_KEY=your_api_key_here```

4.	Start the development server:
```npm
npm start
```

5.	Open the app in your browser at http://localhost:3000.

## Deployment

This project is deployed using GitHub Pages. To access the live version of the app, visit: [Financial Data Filtering App](https://msaf9.github.io/financial-data-filtering-app/).

URL: https://msaf9.github.io/financial-data-filtering-app/

## File Structure
```tree
financial-data-filtering-app/
├── public/
├── src/
│   ├── App.js            # Main application logic
│   ├── index.js          # React entry point
│── .env                  # API key configuration
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js    # TailwindCSS configuration
```


## Contributing
1.	Fork the repository.
2.	Create a feature branch:
```git
git checkout -b feature-name
```

3.	Commit your changes:
```git
git commit -m "Add feature-name"
```

4.	Push to your forked repository:
```git
git push origin feature-name
```

5.	Submit a pull request.

## Contact

For any questions or suggestions, feel free to reach out to me by opening a pull request.
