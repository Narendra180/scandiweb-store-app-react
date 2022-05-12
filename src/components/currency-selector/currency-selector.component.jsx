import React from "react";
import { apolloClient } from "../../index";
import { gql } from "@apollo/client";
import "./currency-selector.styles.scss";

const getAvailablecurrencies = () => {
    const GET_AVAILABLE_CURRENCIES = gql`
                                        query {
                                            currencies {
                                            label,
                                            symbol
                                            }
                                        }
                                    `;
    return (
        {
            query: GET_AVAILABLE_CURRENCIES
        }
    )

}

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
                                // console.log(currencyObject);
                                return (
                                    <p
                                        data-id="list-item-p"
                                        key={currencyObject.symbol}
                                        className="currency-p-list-item"
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