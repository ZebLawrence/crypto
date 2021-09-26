import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import numeral from 'numeral';
import { requestGetSymbols } from '../../actions/getSymbols';
import './home.scss';

class Home extends Component {
  constructor(props){
    super(props);
    const {
      getSymbols,
    } = props;
    getSymbols();
    this.state = {
      defaultMessage: 'This is the message from class Home construction'
    };
  }

  render() {
    const { myHoldings } = this.props;
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

    const rows = myHoldings.map(row => {
      const { coin, ratio, purchasedPrice, price, chartNum } = row;
      totalPurchaseCost += purchasedPrice;
      totalCoins += ratio;
      const holdingValue = price * ratio;
      const gainLoss = holdingValue - purchasedPrice
      const percentChange = (gainLoss / purchasedPrice);
      totalValue += holdingValue;

      return (
        <tr key={coin}>
          <td><a href={`https://www.binance.us/en/trade/pro/${coin}_USD`} target="_blank">{coin}</a></td>
          <td>
            <img src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${chartNum}.svg`} loading="eager" />
          </td>
          <td>{numeral(purchasedPrice).format('$0,0.00')}</td>
          <td>{ratio}</td>
          <td>{numeral(price).format('$0,0.00')}</td>
          <td className={getChangeClass(gainLoss)}>{numeral(gainLoss).format('$0,0.0000')}</td>
          <td className={getChangeClass(percentChange)}>{numeral(percentChange).format('0,0.0000%')}</td>
          <td className={getChangeClass(gainLoss)}>{numeral(holdingValue).format('$0,0.0000')}</td>
        </tr>
      )
    });

    const totalGainLoss = totalValue - totalPurchaseCost;
    const totalPercentChange = (totalGainLoss / totalPurchaseCost);

    return (
      <div className="holdings">
        Crypto holdings
        <Table dark hover>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>7d Change</th>
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
          </tbody>
          <tfoot>
            <td>Totals:</td>
            <td></td>
            <td>{numeral(totalPurchaseCost).format('$0,0.00')}</td>
            <td>{numeral(totalCoins).format('0,0.0000')}</td>
            <td></td>
            <td className={getChangeClass(totalGainLoss)}>{numeral(totalGainLoss).format('$0,0.0000')}</td>
            <td className={getChangeClass(totalPercentChange)}>{numeral(totalPercentChange).format('0,0.0000%')}</td>
            <td className={getChangeClass(totalGainLoss)}>{numeral(totalValue).format('$0,0.0000')}</td>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  symbolsData: state.symbols.symbolsData,
  myHoldings: state.symbols.myHoldings,
  fetching: state.symbols.fetchingSymbols
});

const mapDispatchToProps = dispatch => ({
  getSymbols: () => dispatch(requestGetSymbols())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
