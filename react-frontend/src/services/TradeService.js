import axios from 'axios';

const TRADE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class TradeService {

    getTrades(){
        return axios.get(TRADE_API_BASE_URL);
    }

    createTrade(trade){
        return axios.post(TRADE_API_BASE_URL, trade);
    }

    getTradeById(tradeId){
        return axios.get(TRADE_API_BASE_URL + '/' + tradeId);
    }

    updateTrade(trade, tradeId){
        return axios.put(TRADE_API_BASE_URL + '/' + tradeId, trade);
    }

    deleteTrade(tradeId){
        return axios.delete(TRADE_API_BASE_URL + '/' + tradeId);
    }
}

export default new TradeService()