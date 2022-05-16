import React from "react";
import CartProductDetails from "../../components/cart-product-details/cart-product-details.component";
import CartItemThumbnailsQunatityChanger from "../../components/cart-item-thumbnails-quantity-changer/cart-item-thumbnails-quantity-changer.component";
import Price from "../../components/price/price.component";
import { selectCartCurrentActiveCurrency } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import withRedux from "../../hoc-components/withRedux";
import "./cart-page.styles.scss";


class CartPage extends React.Component {
    render() {
        return (
            <div
                className="cart-page-conainer"
            >
                <h1 className="cart-text-h1">cart</h1>

                <div className="cart-items-container">
                    {
                        this.props.redux.selectedStateValue.totalQuantity > 0
                        ?
                        Object.keys(this.props.redux.selectedStateValue.products).map((productId,i) => {
                            return (
                                this.props.redux.selectedStateValue.products[productId].map((productObject,i) => {
                                    return (
                                        <div className="cart-product-container" key={i}>
                                            <CartProductDetails 
                                                product={productObject}
                                            />
                                            <CartItemThumbnailsQunatityChanger 
                                                product={productObject}
                                            />
                                        </div>
                                    )
                                })
                            )
                        })
                        :
                        <div>
                            <p>There are no items in the cart.</p>
                        </div>
                    }
                </div>

                {
                    this.props.redux.selectedStateValue.totalQuantity > 0
                    ?
                    <div className="cart-summary-container">
                        <table
                            className="cart-summary-table"
                        >
                            <tbody>
                                <tr>
                                    <th>Tax 21%:</th>
                                    <td>
                                        <Price 
                                            isTax
                                            prices={this.props.redux.selectedStateValue.totalPrices}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Quantity:</th>
                                    <td>{this.props.redux.selectedStateValue.totalQuantity}</td>
                                </tr>
                                <tr>
                                    <th>Total:</th>
                                    <td>
                                        <Price 
                                            prices={this.props.redux.selectedStateValue.totalPrices}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            className="order-btn"
                        >
                            order
                        </button>
                    </div>
                    :
                    ""
                }
            </div>
        )
    }
}

export default withRedux(CartPage, selectCartCurrentActiveCurrency);