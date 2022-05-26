import React from "react";
import CartProductDetails from "../cart-product-details/cart-product-details.component";
import CartItemThumbnailsQuantityChangerComponent from "../cart-item-thumbnails-quantity-changer/cart-item-thumbnails-quantity-changer.component";
import Price from "../price/price.component";
import { selectCartCurrentActiveCurrency } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import withRouter from "../../hoc-components/with-router";
import withRedux from "../../hoc-components/withRedux";
import "./cart-overlay.styles.scss";


class CartOverlay extends React.Component {

    handleViewBagClick = (e) => {
        this.props.cartOverlayClose();
        this.props.router.navigate("/cart");
    }

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
                        (
                        this.props.redux.selectedStateValue.totalQuantity > 0
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
                        <div className="noitemscart-p-div">
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
                                className="view-bag-btn vcbtn"
                                onClick={this.handleViewBagClick}
                            >
                                view bag
                            </button>
                            <button
                                className="checkout-btn vcbtn"
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

export default withRedux(withRouter(CartOverlay),selectCartCurrentActiveCurrency);