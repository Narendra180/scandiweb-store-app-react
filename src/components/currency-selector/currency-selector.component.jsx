import React from "react";
import { apolloClient } from "../../index";
import { getAvailablecurrencies } from "../../gql-queries";
import "./currency-selector.styles.scss";


class CurrencySelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currenciesArray: [],
            isCurrenciesArrayLoading: true,
            isLoadingCurrenciesArrayLoadingFailed: false
        }
    }

    componentDidMount() {
        this.getAvailableCurrencies();
    }


    getAvailableCurrencies = async () => {
        try {
            const {data: {currencies: currenciesArray}} = await apolloClient.query(getAvailablecurrencies());
            this.setState({
                currenciesArray, 
                isCurrenciesArrayLoading: false,
                isLoadingCurrenciesArrayLoadingFailed: false
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        if(this.state.isLoadingCurrenciesArrayLoadingFailed) {
            return "Unable to load currencies, please try again later";
        }

        return (
            <div
                data-id="currency-switcher"
                className={`currencies-list-container ${
                    !this.props.isOpen?"hidden":"visible"
                }`}
            >
                {
                    this.state.isCurrenciesArrayLoading?
                    <p>Loading...</p>
                    :
                    <div
                        className="currency-list-items-container"
                        data-id="list-items-container"
                        onClick={this.props.onChange}
                    >
                        {
                            this.state.currenciesArray.map(currencyObject => {
                                return (
                                    <p
                                        data-id="list-item-p"
                                        key={currencyObject.symbol}
                                        data-label={currencyObject.label}
                                        data-symbol={currencyObject.symbol}
                                        className={
                                            `currency-p-list-item ${currencyObject.label===this.props.value.label?"selected":""}`
                                        }
                                    >
                                        {currencyObject.symbol} {currencyObject.label}
                                    </p>
                                )
                            })
                        }
                    </div>                    
                }
            </div>
        )
    }
}

export default CurrencySelector;