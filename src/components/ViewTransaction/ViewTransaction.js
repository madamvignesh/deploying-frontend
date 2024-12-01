import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import './ViewTransaction.css'

const apiCallStatus = {
    success: "SUCCESS",
    initial: "INITIAL",
    isProgress: "ISPROGRESS",
    failure: "FAILURE",
  };

class ViewTransaction extends Component{
  // userId, amount, transactionID, transactionType, timestamp, status 
    state={
        transactionList:{},
        apiStatus: apiCallStatus.initial,
        selectedOptions: 'PENDING',
    }

    componentDidMount(){
      this.getTransaction()
    }

    getTransaction = async () =>{
        this.setState({apiStatus:apiCallStatus.isProgress})
        const { transactionID } = this.props; 
        try {
          const url = `https://deploying-backend-13.onrender.com/api/transactions/${transactionID}`; 
          console.log(url)
          const options = {
          method: 'GET',
          }
          const response = await fetch(url,options);
          if (response.ok) {
          const data = await response.json();
          const updateData ={
              transactionID: data.transaction_id,
              userId: data.user_id,
              amount: data.amount,
              transactionType: data.transaction_type,
              timestamp: data.timestamp,
              status: data.status,
            }
            console.log(updateData)
          this.setState({
              apiStatus: apiCallStatus.success,
              transactionList: updateData,
              selectedOptions: updateData.status,
          });
          } else {
            console.log(response.status)
          this.setState({ apiStatus: apiCallStatus.failure });
          }
      } catch (error) {
          console.log(error)
          this.setState({ apiStatus: apiCallStatus.failure });
      }
    }

    Loader = () => (
        <div className="loader-container">
          <ThreeDots color="#0000FF" height={50} width={50} />
        </div>
      );

      ErrorPage = () => (
        <div className="error-container">
          <h1>Error</h1>
          <p>Something went wrong! Please try again.</p>
        </div>
      );

      getChangeStatus = async () =>{
        this.setState({apiStatus: apiCallStatus.isProgress})
        const {selectedOptions} = this.state 
        const { transactionID } = this.props; 
        console.log(transactionID)
        const url = `https://deploying-backend-13.onrender.com/api/transactions/${transactionID}/`;
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: selectedOptions }),
        };
        const response = await fetch(url,options)
        if (response.ok){
          const data = await response.json()
          console.log(data)
          this.setState({
            apiStatus: apiCallStatus.success,
            selectedOptions: data.status,
          },this.getTransaction)
        } else {
          this.setState({apiStatus: apiCallStatus.failure})
        }
      }

      handleStatusChange = event  => {
        const newStatus = event.target.value;
        this.setState({selectedOptions: newStatus},this.getChangeStatus)
    };

      displaytransaction = () =>{
        const {transactionList,selectedOptions} = this.state
        const{userId,amount,transactionID,transactionType,timestamp,status} = transactionList
        return(
          <div className="transaction-item-container">
            <div className="transaction-details">
              <h1>User ID: {userId}</h1>
              <h1>Amount: {amount}</h1>
              <h1>Type: {transactionType}</h1>
            </div>
            <div className="transaction-details">
              <p><strong>Transaction ID: </strong>{transactionID}</p>
              <p><strong>Status: </strong>{status}</p>
              <p><strong>Time: </strong>{timestamp}</p>
            </div>
            {selectedOptions === 'PENDING' ? (
              <div className="status-update-container">
                <label htmlFor={`status-${transactionID}`} className="status-label">
                  Update Status:
                </label>
                <select
                  id={`status-${transactionID}`}
                  value={selectedOptions}
                  onChange={this.handleStatusChange}
                  className="status-dropdown"
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
            ) : null}
          </div>
        )
      }
    getTransactionData = () =>{
        const {apiStatus} = this.state
        switch (apiStatus) {
            case apiCallStatus.isProgress:
              return this.Loader();
            case apiCallStatus.failure:
              return this.ErrorPage();
            case apiCallStatus.success:
              return this.displaytransaction();
            default:
              return null;
        }
    }

    render(){
      const { transactionID } = this.props; 
      return(
          <div>
              <h2>Transaction Details of {transactionID}</h2>
              {this.getTransactionData()}
          </div>
      )
    }
}

export default ViewTransaction

