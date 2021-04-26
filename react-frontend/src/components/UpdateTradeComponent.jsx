import React, { Component } from 'react'
import TradeService from '../services/TradeService';

class UpdateTradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            TradeId: this.props.match.params.TradeId,
                        FromParty: '',
                        ToParty: '',
                        Amount: 0,
                        TradeDate:Date().toLocaleString(),
                        Status: ''
        }
        this.changeFromPartyHandler = this.changeFromPartyHandler.bind(this);
        this.changeToPartyHandler = this.changeToPartyHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.updateTrade = this.updateTrade.bind(this);
    }

    componentDidMount(){
        TradeService.getTradeById(this.state.TradeId).then( (res) =>{
            let trade = res.data;
            this.setState({FromParty: trade.FromParty,
                                               ToParty: trade.ToParty,
                                               Amount : trade.Amount,
                                               TradeDate : trade.TradeDate,
                                               Status : trade.Status
            });
        });
    }

    updateTrade = (e) => {
        e.preventDefault();
        let trade = {FromParty: this.state.FromParty, ToParty: this.state.ToParty,
                                Amount : trade.Amount,TradeDate : trade.TradeDate,Status : trade.Status};
        console.log('trade => ' + JSON.stringify(trade));
        console.log('TradeId => ' + JSON.stringify(this.state.TradeId));
        TradeService.updateTrade(trade, this.state.TradeId).then( res => {
            this.props.history.push('/trades');
        });
    }
    
  changeFromPartyHandler= (event) => {
         this.setState({FromParty: event.target.value});
     }

     changeToPartyHandler= (event) => {
         this.setState({ToParty: event.target.value});
     }
     changeAmountHandler= (event) => {
         this.setState({Amount: event.target.value});
     }
     changeStatusHandler= (event) => {
         this.setState({Status: event.target.value});
     }
    cancel(){
        this.props.history.push('/trades');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update trade</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> From Party: </label>
                                            <input placeholder="From Party" name="FromParty" className="form-control"
                                                value={this.state.FromParty} onChange={this.changeFromPartyHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> To Party: </label>
                                            <input placeholder="To Party" name="ToParty" className="form-control"
                                                value={this.state.ToParty} onChange={this.changeToPartyHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Amount: </label>
                                            <input placeholder="Amount" name="Amount" className="form-control"
                                                value={this.state.Amount} onChange={this.changeAmountHandler}/>
                                        </div>
                                        <div className = "form-group">
                                        <label> Status: </label>
                                        <input placeholder="Status" name="Status" className="form-control"
                                        value={this.state.Status} onChange={this.changeStatusHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateTrade}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateTradeComponent
