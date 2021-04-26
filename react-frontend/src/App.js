import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListTradeComponent from './components/ListTradeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateTradeComponent from './components/CreateTradeComponent';
import UpdateTradeComponent from './components/UpdateTradeComponent';
/*import ViewEmployeeComponent from './components/ListTradeComponent';*/

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListTradeComponent}></Route>
                          <Route path = "/trades" component = {ListTradeComponent}></Route>
                          <Route path = "/add-trade/:id" component = {CreateTradeComponent}></Route>
                          <Route path = "/update-trade/:id" component = {UpdateTradeComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
