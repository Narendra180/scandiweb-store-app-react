import React from "react";
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import "./product-card.styles.scss";


class ProductCard extends React.Component {

    render() {
        const {gallery,name,prices} = this.props.product;
        return (
            <div
                className="product-card"
            >                
                <div
                    className="product-img-div"
                    style={{backgroundImage: `url(${gallery[0]})`}}
                >
                    {/* <img className="product-img" src={gallery[0]} alt={name + " product"}/> */}
                    <button
                        className="add-to-cart-btn"
                    >
                        <CartIcon />
                    </button>
                </div>
                <p className="product-name-p pc-p">{name}</p>
                <p className="product-price-p pc-p">{prices[0].currency.symbol}{prices[0].amount}</p>                
            </div>
        );
    }
}

export default ProductCard;