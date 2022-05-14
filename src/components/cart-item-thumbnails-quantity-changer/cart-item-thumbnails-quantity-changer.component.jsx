import React from "react";
import { ReactComponent as PlusIcon } from '../../images/plus-square.svg';
import { ReactComponent as MinusIcon } from '../../images/minus-square.svg';
import withRedux from "../../hoc-components/withRedux";
import "./cart-item-thumbnails-quantity-changer.styles.scss";

class CartItemThumbnailsQunatityChanger extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div
                className="cart-item-thumbnails-quantity-changer-container"
            >
                <div className="quantity-add-remove-btns-container">
                    <button className="add-btn q-ch-btn">
                       <PlusIcon />
                    </button>
                    <span className="qunatity-span"></span>
                    <button className="remove-btn q-ch-btn">
                        <MinusIcon />
                    </button>
                </div>
                <div 
                    className="items-images-carousel"
                >
                    <img src={this.props.product.gallery[0]}/>
                </div>
            </div>
        )
    }
}

export default CartItemThumbnailsQunatityChanger;