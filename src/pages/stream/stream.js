import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from 'react-redux';
import { Table, Input, Button } from 'reactstrap';
import { updateCoinList } from '../../actions/getSymbols';
import numeral from 'numeral';
import NumberChange from './numberChange';
import './home.scss';

const client = new W3CWebSocket('wss://stream.binance.us:9443/stream');

class Stream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolData: {},
            timeRange: '1d',
            addingRow: false
        };
        this.holdingName = React.createRef();
        this.chartNumber = React.createRef();
        this.purchasePrice = React.createRef();
        this.holdingAmount = React.createRef();
        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.addHolding = this.addHolding.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.subScribeToStreams = this.subScribeToStreams.bind(this);
    }
    componentWillMount() {
        client.onopen = openMessage => {
            console.log('WebSocket Client Connected', openMessage);
            this.subScribeToStreams();
        };
        client.onmessage = (message) => {
            const { data: symbolData } = JSON.parse(message.data);

            if (symbolData && symbolData.s) {
                this.setState({[symbolData.s]: symbolData});
            }
        };
    }
  
    subScribeToStreams(newList) {
      const { coins } = this.props;
      const coinsToUse = newList || coins;
      const params = coinsToUse.map(item => {
          return `${item.coinPair.toLowerCase()}@ticker`;
      });
      client.send(JSON.stringify({
        method: "SUBSCRIBE",
        params,
        id: 1
      }));
    }

    handleChangeRange(e) {
      const { currentTarget } = e;
      const { value } = currentTarget;
      this.setState({
        timeRange: value
      });
    }

    addHolding() {
      const {
        holdingName: { current: holdingInput },
        chartNumber: { current: chartInput },
        purchasePrice: { current: purchaseInput },
        holdingAmount: { current: amountInput },
      } = this;
      const { coins, updateCoins } = this.props;

      coins.push({
        purchasedPrice: purchaseInput.value,
        coin: holdingInput.value,
        coinPair: `${holdingInput.value}USD`,
        ratio: amountInput.value,
        chartNum: chartInput.value
      });
      this.setState({ addingRow: false }, () => {
        updateCoins(coins);
        this.subScribeToStreams(coins);
      });
    }

    toggleAdd() {
      const { addingRow} = this.state;
      this.setState({addingRow: !addingRow});
    }

    render() {
        const { timeRange, addingRow } = this.state;
        const { coins } = this.props;

        let totalValue = 0;
        let totalPurchaseCost = 0;
        let totalCoins = 0;
    
        const getChangeClass = val => {
          let colorClass = 'grey';
    
          if (val > 0) {
            colorClass = 'green';
          }
          if (val < 0) {
            colorClass = 'red';
          }
    
          return colorClass;
        };
    
        const rows = coins.map(row => {
          const { coin, ratio, purchasedPrice, price, chartNum, coinPair } = row;
          const matchingSymbol = this.state[coinPair];
          const { c: lastPrice, p: change } = matchingSymbol || { c: null };
          totalPurchaseCost += Number(purchasedPrice);
          totalCoins += Number(ratio);
          const holdingValue = Number(lastPrice) * ratio;
          const gainLoss = holdingValue - purchasedPrice
          const percentChange = (gainLoss / purchasedPrice);
          totalValue += holdingValue;

          return (
            <tr key={coin}>
              <td><a href={`https://www.binance.us/en/trade/pro/${coin}_USD`} target="_blank">{coin}</a></td>
              <td>
                <img src={`https://s3.coinmarketcap.com/generated/sparklines/web/${timeRange}/2781/${chartNum}.svg`} loading="eager" />
              </td>
              <td>{numeral(purchasedPrice).format('$0,0.00')}</td>
              <td>{ratio}</td>
              <td>
                <NumberChange val={numeral(lastPrice).format('$0,0.00')} />
              </td>
              <td className={getChangeClass(gainLoss)}>
                <NumberChange val={numeral(gainLoss).format('$0,0.0000')} />
              </td>
              <td className={getChangeClass(percentChange)}>
                <NumberChange val={numeral(percentChange).format('0,0.0000%')} />
              </td>
              <td className={getChangeClass(gainLoss)}>
                <NumberChange showDirection val={numeral(holdingValue).format('$0,0.0000')} />
              </td>
            </tr>
          )
        });
    
        const totalGainLoss = totalValue - totalPurchaseCost;
        const totalPercentChange = (totalGainLoss / totalPurchaseCost);
        const addNewHoldingRow = addingRow && (
          <tr>
            <td><Input type="text" innerRef={this.holdingName}/></td>
            <td><Input type="text" innerRef={this.chartNumber}/></td>
            <td><Input type="text" innerRef={this.purchasePrice}/></td>
            <td><Input type="text" innerRef={this.holdingAmount}/></td>
            <td></td>
            <td></td>
            <td></td>
            <td><Button onClick={this.addHolding}>Add</Button></td>
          </tr>          
        );

        return (
          <div className="holdings">
            Crypto holdings streaming watchlist
            <Table dark hover>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>
                    <Input type="select" onChange={this.handleChangeRange} name="select" id="exampleSelect">
                      <option value="1d">1d Change</option>
                      <option value="7d">7d Change</option>
                      <option value="30d">30d Change</option>
                      <option value="60d">60d Change</option>
                      <option value="90d">90d Change</option>
                    </Input>
                  </th>
                  <th>Purchase Cost</th>
                  <th>Holdings</th>
                  <th>Share Price</th>
                  <th>Gain/Loss</th>
                  <th>Change</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {rows}
                {addNewHoldingRow}
              </tbody>
              <tfoot>
                <td>Totals:</td>
                <td></td>
                <td>{numeral(totalPurchaseCost).format('$0,0.00')}</td>
                <td>{numeral(totalCoins).format('0,0.0000')}</td>
                <td></td>
                <td className={getChangeClass(totalGainLoss)}>
                  <NumberChange val={numeral(totalGainLoss).format('$0,0.0000')} />
                </td>
                <td className={getChangeClass(totalPercentChange)}>
                  <NumberChange val={numeral(totalPercentChange).format('0,0.0000%')} />
                </td>
                <td className={getChangeClass(totalGainLoss)}>
                  <NumberChange showDirection val={numeral(totalValue).format('$0,0.0000')} />
                </td>
              </tfoot>
            </Table>
            <Button onClick={this.toggleAdd}>Add Holding</Button>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    coins: state.symbols.coins,
    myHoldings: state.symbols.myHoldings,
    fetching: state.symbols.fetchingSymbols
});

const mapDispatchToProps = dispatch => ({
  updateCoins: list => dispatch(updateCoinList(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
