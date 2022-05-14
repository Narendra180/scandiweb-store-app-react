import React from "react";
import CartProductDetails from "../cart-product-details/cart-product-details.component";
import cartItemThumbnailsQuantityChangerComponent from "../cart-item-thumbnails-quantity-changer/cart-item-thumbnails-quantity-changer.component";
import Price from "../price/price.component";
import { selectCartCurrentActiveCurrency } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import withRedux from "../../hoc-components/withRedux";
import "./cart-overlay.styles.scss";
import CartItemThumbnailsQuantityChangerComponent from "../cart-item-thumbnails-quantity-changer/cart-item-thumbnails-quantity-changer.component";


class CartOverlay extends React.Component {
    render() {

        return (
            <div
                className={`cart-overlay-container ${
                    this.props.isOpen?"visible":""
                }`}             
            >
                <div
                    className="cart-overlay-content"
                    onBlur={this.props.blurHandler}
                    tabIndex="0"
                >
                    <h3
                        className="mybag-h3"
                    >
                        <span>My Bag.</span> {
                        this.props.redux.selectedStateValue.totalQuantity
                        } items
                    </h3>
                    {
                        this.props.isOpen
                        ?
                        (Object.keys(this.props.redux.selectedStateValue.products).length
                        ?
                        <div
                            className="selected-product-details-container"
                        >
                            {
                                Object.keys(this.props.redux.selectedStateValue.products).map((productId) => {
                                    return (
                                        this.props.redux.selectedStateValue.products[productId].map((productObject,i) => {
                                            return (
                                                <div
                                                    className="cart-product-container"
                                                    key={i}
                                                >
                                                    <CartProductDetails 
                                                        product={productObject}
                                                    />

                                                    <CartItemThumbnailsQuantityChangerComponent
                                                        product={productObject}
                                                    />
                                                </div>
                                            );
                                        })
                                    )
                                })

                            }                            
                        </div>
                        :
                        <div>
                            <p>There are no items to in the cart.</p>
                        </div>
                        )
                        : 
                        ""
                    }
                    <div
                        className="totalprice-view-bag-checkout-btns-container"
                    >
                        <p
                            className="total-price-p"
                        >
                            <span className="label-span">Total</span>
                            <Price 
                                prices={this.props.redux.selectedStateValue.totalPrices}
                            />
                        </p>
                        <div
                            className="vc-btns-container"
                        >
                            <button 
                                className="view-bag-btn"
                            >
                                view bag
                            </button>
                            <button
                                className="checkout-btn"
                            >
                                check out
                            </button>
                        </div>                        
                    </div>
                </div>

            </div>
        )
    }
}

export default withRedux(CartOverlay,selectCartCurrentActiveCurrency);