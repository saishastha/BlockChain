import React, { Component } from 'react'
import TradeService from '../services/TradeService';

class CreateTradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
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
        this.saveOrUpdateTrade = this.saveOrUpdateTrade.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateTrade = (e) => {
        e.preventDefault();
        let trade = {FromParty: this.state.FromParty, ToParty: this.state.ToParty,
        Amount : trade.Amount,TradeDate : trade.TradeDate,Status : trade.Status};
        console.log('employee => ' + JSON.stringify(trade));

        // step 5
        if(this.state.TradeId === '_add'){
            TradeService.createTrade(trade).then(res =>{
                this.props.history.push('/trades');
            });
        }else{
            TradeService.updateTrade(trade, this.state.TradeId).then( res => {
                this.props.history.push('/trades');
            });
        }
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

    getTitle(){
        if(this.state.TradeId === '_add'){
            return <h3 className="text-center">Add Trade</h3>
        }else{
            return <h3 className="text-center">Update Trade Status</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
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
                                            <input placeholder="Email Address" name="Status" className="form-control"
                                                value={this.state.Status} onChange={this.changeStatusHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateTrade}>Save</button>
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

export default CreateTradeComponent
