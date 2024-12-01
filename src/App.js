import {Route,Routes,useParams} from 'react-router-dom' 
import React from 'react';
import './App.css';

import Home from './components/Home/Home'
import Header from './components/Header/Header';
import CreateTransaction from './components/CreateTransaction/CreateTransaction'
import NotFound from './components/NotFound/NotFound'
import ViewTransaction from './components/ViewTransaction/ViewTransaction';
import DisplayTransaction from './components/DisplayTransaction/DisplayTransaction';

const ViewTransactionWrapper = (props) => {
  const { transactionID } = useParams();
  return <ViewTransaction {...props} transactionID={transactionID} />;
}

function App(){
  return(
    <div>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/api/transactions" Component={CreateTransaction} />
        <Route exact path="/api/view-transactions" Component={DisplayTransaction} />
        <Route path="/api/transactions/:transactionID/" element={<ViewTransactionWrapper />} />
        <Route path='*' Component={NotFound} />
      </Routes>
    </div>
  )
}

export default App;
