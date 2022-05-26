import React from "react";
import { addToCart,removeItemFromCart } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import withRedux from "../../hoc-components/withRedux";
import { ReactComponent as PlusIcon } from '../../images/plus-square.svg';
import { ReactComponent as MinusIcon } from '../../images/minus-square.svg';
import { ReactComponent as CaretLeft} from "../../images/caret-left.svg";
import { ReactComponent as CaretRight} from "../../images/caret-right.svg";
import "./cart-item-thumbnails-quantity-changer.styles.scss";

class CartItemThumbnailsQunatityChanger extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeImage: 0
        };
    }

    handlePlusIconClick = () => {
        this.props.redux.dispatch(addToCart(this.props.product));
    }

    handleMinusIconClick = () => {
        this.props.redux.dispatch(removeItemFromCart(this.props.product));
    }

    handleRightImageChangerCaretClick = () => {
        if(this.state.activeImage < this.props.product.gallery.length-1)
            this.setState((prevState, prevProps) => {
                return {activeImage: prevState.activeImage + 1};
            });
    }

    handleLeftImageChangerCaretClick = () => {
        if(this.state.activeImage > 0)
            this.setState((prevState, prevProps) => {
                return {activeImage: prevState.activeImage - 1};
            });
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
                    style={{backgroundImage: `url(${this.props.product.gallery[this.state.activeImage]})`}}
                >
                    {
                        this.props.isCartPage && this.props.product.gallery.length > 1 
                        ?
                        <div
                            className="image-changer-arrow-container"
                        >
                            <button 
                                className={`left-arrow arrow-btn ${
                                        this.state.activeImage === 0?"arrow-disabled":""
                                    }`}
                                onClick={this.handleLeftImageChangerCaretClick}
                            >
                                <CaretLeft />
                            </button>

                            <button 
                                className={`right-arrow arrow-btn ${
                                        this.state.activeImage === (this.props.product.gallery.length-1)
                                        ?"arrow-disabled":""
                                    }`}
                                onClick={this.handleRightImageChangerCaretClick}
                            >
                                <CaretRight />
                            </button>
                        </div>      
                        :
                        ""
                    }
                                  
                </div>
            </div>
        )
    }
}

export default withRedux(CartItemThumbnailsQunatityChanger);