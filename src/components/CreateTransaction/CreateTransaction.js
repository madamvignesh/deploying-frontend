import { Component } from "react";
import "./CreateTransaction.css";
import DisplayTransaction from "../DisplayTransaction/DisplayTransaction";
import { v4 as uuidv4 } from 'uuid';

const apiCallStatus = {
    success: "SUCCESS",
    initial: "INITIAL",
    isProgress: "ISPROGRESS",
    failure: "FAILURE",
  };

class CreateTransaction extends Component {
  state = {
    apiStatus: apiCallStatus.initial,
    amount: "",
    transactionType: "DEPOSIT",
    userId: "",
    responseMessage: "",
  };

  onChangeType = (event) => {
    this.setState({ transactionType: event.target.value });
  };

  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  onChangeUser = event =>{
    this.setState({userId: event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ apiStatus: apiCallStatus.isProgress });

    const { amount, transactionType, userId } = this.state;
    const formData = {
      transaction_id: parseInt(uuidv4()),
      amount: parseFloat(amount),
      transaction_type: transactionType,
      user_id: parseInt(userId), 
      status: "PENDING",
      timestamp: new Date().toISOString()
    };
    console.log(formData)
    try {
      const url = "https://deploying-backend-13.onrender.com/api/transactions";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      if (response.ok) {
        this.setState({
          apiStatus: apiCallStatus.success,
          responseMessage: "Transaction created successfully!",
          amount: '', userId: '', transactionType: "DEPOSIT",
        }); 
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        this.setState({
          apiStatus: apiCallStatus.failure,
          responseMessage: "Transaction failed to create",
        });
      }
    } catch (error) {
        console.error("Fetch Error:", error);
        this.setState({
          apiStatus: apiCallStatus.failure,
          responseMessage: "Transaction failed to create",
        });
    }
  };

  render() {
    const { amount, transactionType, responseMessage,userId } = this.state;
    return (
      <div className="transactions-container">
        <div className="form-section">
          <h2>Create a New Transaction</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={this.onChangeAmount}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="transactionType">Transaction Type:</label>
              <select
                id="transactionType"
                name="transactionType"
                value={transactionType}
                onChange={this.onChangeType}
              >
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
              </select>
              <label htmlFor="user">User:</label>
              <input type='number' id='user' name="user" value={userId} onChange={this.onChangeUser} />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
          <DisplayTransaction />
      </div>
    );
  }
}

export default CreateTransaction
