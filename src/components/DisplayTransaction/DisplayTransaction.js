import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";

import TransactionItem from '../TransactionItem/TransactionItem';
import './DisplayTransaction.css';

const apiCallStatus = {
    success: "SUCCESS",
    initial: "INITIAL",
    isProgress: "ISPROGRESS",
    failure: "FAILURE",
};

class DisplayTransaction extends Component {
    state = {
        transactions: [],
        apiStatus: apiCallStatus.initial,
        searchUserId: '',
    }

    componentDidMount() {
        this.fetchTransactions(); // Optionally, you can call this only on a button press
    }

    fetchTransactions = async () => {
        const {searchUserId} = this.state 
        this.setState({ apiStatus: apiCallStatus.isProgress });
        console.log("Fetching")
        try {
            const url = `https://deploying-backend-13.onrender.com/api/transactions/?user_id=${searchUserId}`;
            const options = {
                method: 'GET',
            };
            const response = await fetch(url, options);
    
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched Data:', data);
    
                const updateData = data.map(each => ({
                    transactionID: each.transaction_id,
                    userId: each.user_id,
                    amount: each.amount,
                    transactionType: each.transaction_type,
                    timestamp: each.timestamp,
                    status: each.status,
                }));
    
                this.setState({
                    apiStatus: apiCallStatus.success,
                    transactions: updateData,
                });
            } else {
                this.setState({ apiStatus: apiCallStatus.failure });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            this.setState({ apiStatus: apiCallStatus.failure });
        }
    };
    
    Loader = () => (
        <div className="loader-container">
            <ThreeDots color="#0000FF" height={50} width={50} />
        </div>
    );

    handleSearchChange = (event) => {
        this.setState({ searchUserId: event.target.value });
    };

    ErrorPage = () => (
        <div className="error-container">
            <h1>Error</h1>
            <p>Something went wrong! Please try again.</p>
        </div>
    );

    renderTransactions = () => {
        const { transactions } = this.state;
        if (transactions.length > 0) {
            return (
                <ul>
                    {transactions.map(eachTnx => (
                        <TransactionItem transactionsDetails={eachTnx} key={eachTnx.transactionID} />
                    ))}
                </ul>
            );
        } 
        return <p>No transactions found for this user.</p>;
    };

    getTransactionsDetails = () => {
        const { apiStatus } = this.state;
        switch (apiStatus) {
            case apiCallStatus.isProgress:
                return this.Loader();
            case apiCallStatus.failure:
                return this.ErrorPage();
            case apiCallStatus.success:
                return this.renderTransactions();
            default:
                return null;
        }
    };

    render() {
        const { searchUserId } = this.state;
        return (
            <div className="output-section">
                <div className="output-heading">
                    <h2>All Transactions</h2>
                    <div className="search-cont">
                        <input
                            type="text"
                            id="search-user"
                            value={searchUserId}
                            onChange={this.handleSearchChange}
                            placeholder="Enter User ID"
                            className="search-input"
                        />
                        <button onClick={this.fetchTransactions} className="fetch-button">
                            View Transactions
                        </button>
                    </div>
                </div>
                {this.getTransactionsDetails()}
            </div>
        );
    }
}

export default DisplayTransaction;
