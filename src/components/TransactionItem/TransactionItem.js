import './TransactionItem.css'
import {Link} from 'react-router-dom'
const TransactionItem = (props) =>{
    const{transactionsDetails} = props 
    return(
        <Link to={`/api/transactions/${transactionsDetails.transactionID}/`} className='no-underline'>
            <li className="transaction-item">
                <div className='transaction-item-heading'>
                    <h1 className='transaction-item-header'>User ID: {transactionsDetails.userId}</h1>
                    <h1 className='transaction-item-header'>Amount: {transactionsDetails.amount}</h1>
                    <h1 className='transaction-item-header'>Type: {transactionsDetails.transactionType}</h1>
                </div>
                <div className='transaction-item-details'>
                    <p><strong>Transaction ID: </strong>{transactionsDetails.transactionID}</p>
                    <p><strong>Status: </strong>{transactionsDetails.status}</p>
                    <p><strong>Time: </strong>{transactionsDetails.timestamp}</p>
                </div>
            </li>
        </Link>
    )
}

export default TransactionItem
