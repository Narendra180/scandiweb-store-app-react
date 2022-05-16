import React from "react";
import { addToCart,removeItemFromCart } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import withRedux from "../../hoc-components/withRedux";
import { ReactComponent as PlusIcon } from '../../images/plus-square.svg';
import { ReactComponent as MinusIcon } from '../../images/minus-square.svg';
import "./cart-item-thumbnails-quantity-changer.styles.scss";

class CartItemThumbnailsQunatityChanger extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    handlePlusIconClick = () => {
        this.props.redux.dispatch(addToCart(this.props.product));
    }

    handleMinusIconClick = () => {
        console.log("minus icon clicked",this.props.product);
        this.props.redux.dispatch(removeItemFromCart(this.props.product));
    }

    render() {
        return (
            <div
                className="cart-item-thumbnails-quantity-changer-container"
            >
                <div className="quantity-add-remove-btns-container">
                    <button 
                        className="add-btn q-ch-btn"
                        onClick={this.handlePlusIconClick}
                    >
                       <PlusIcon />
                    </button>
                    <span className="qunatity-span">{this.props.product.quantity}</span>
                    <button 
                        className="remove-btn q-ch-btn"
                        onClick={this.handleMinusIconClick}
                    >
                        <MinusIcon />
                    </button>
                </div>
                <div 
                    className="items-images-carousel"
                >
                    <img src={this.props.product.gallery[0]} />
                </div>
            </div>
        )
    }
}

export default withRedux(CartItemThumbnailsQunatityChanger);