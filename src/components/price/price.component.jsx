import React from "react";
import { selectCurrentActiveCurrency } from "../../redux/redux-slices/currency-slice-folder/currency-slice";
import withRedux from "../../hoc-components/withRedux";
import "./price.styles.scss";


class Price extends React.Component {

    state = {
        price: {
            "currency": {
              "symbol": "",
              "label": ""
            },
            "amount": 0
        }
    }

    isComponentAlreadyUpdated = false;

    getActivePrice = () => {
        const activePriceObject = this.props.prices.find(priceObject => {
            return priceObject.currency.label === this.props.redux.selectedStateValue.label;
        })

        if(activePriceObject) {
            this.setState({price: activePriceObject});
        } else {
            this.setState({
                price: {
                    "currency": {
                      "symbol": "",
                      "label": ""
                    },
                    "amount": 0
                }
            });
        }
    }

    componentDidMount() {
        if(this.props.prices.length)
            this.getActivePrice();
    }

    componentDidUpdate() {
        if(!this.isComponentAlreadyUpdated) {
            this.getActivePrice();       
            this.isComponentAlreadyUpdated = true; 
        } else {
            this.isComponentAlreadyUpdated = false; 
        }
    }

    render() {
        return(
            <span
                className="price-value-span"
            >
                {/* {
                    this.props.prices.find(priceObject => {
                        return priceObject
                    })
                } */}
                {this.state.price.currency.symbol}{
                    !this.props.isTax
                    ?
                    parseFloat(this.state.price.amount).toFixed(2)
                    :
                    parseFloat(this.state.price.tax).toFixed(2)
                }
            </span>
        );
    }
}

export default withRedux(Price,selectCurrentActiveCurrency);