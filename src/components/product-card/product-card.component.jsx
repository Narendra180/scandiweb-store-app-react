import React from "react";
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import withRouter from "../../hoc-components/with-router";
import "./product-card.styles.scss";


class ProductCard extends React.Component {

    navigateToProductDescription = (id) => {
        
        return (e) => {
            this.props.router.navigate(`/pdp/${id}`);
        }
    }

    render() {
        const {gallery,name,prices,id} = this.props.product;
        return (
            <div
                className="product-card"
                onClick={this.navigateToProductDescription(id)}
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

export default withRouter(ProductCard);