import React, { Component } from 'react'
import TradeService from '../services/TradeService'

class ListTradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                trades: []
        }
        this.addTrade = this.addTrade.bind(this);
        this.editTrade = this.editTrade.bind(this);
        this.deleteTrade = this.deleteTrade.bind(this);
    }

    deleteTrade(tradeId){
        TradeService.deleteTrade(tradeId).then( res => {
            this.setState({trades: this.state.trades.filter(trade => trade.tradeId !== tradeId)});
        });
    }
    viewTrade(tradeId){
        this.props.history.push(`/view-trade/${tradeId}`);
    }
    editTrade(id){
        this.props.history.push(`/add-trade/${id}`);
    }

    componentDidMount(){
        TradeService.getTrades().then((res) => {
            this.setState({ trades: res.data});
        });
    }

    addTrade(){
        this.props.history.push('/add-trade/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Trade List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addTrade}> Add Trade</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> FromParty</th>
                                    <th> ToParty</th>
                                    <th> Amount</th>
                                    <th> TradeDate</th>
                                    <th> Amount</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.trades.map(
                                        trade =>
                                        <tr key = {trade.TradeId}>
                                             <td> { trade.FromParty} </td>
                                             <td> {trade.ToParty}</td>
                                             <td> {trade.Amount}</td>
                                              <td> {trade.TradeDate}</td>
                                              <td> {trade.Status}</td>
                                             <td>
                                                 <button onClick={ () => this.editTrade(trade.TradeId)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTrade(trade.TradeId)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTrade(trade.TradeId)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListTradeComponent
