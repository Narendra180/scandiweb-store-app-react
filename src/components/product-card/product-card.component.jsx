import React from "react";
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import withRouter from "../../hoc-components/with-router";
import Price from "../price/price.component";
import "./product-card.styles.scss";


class ProductCard extends React.Component {

    navigateToProductDescription = (id) => {
        
        return (e) => {
            this.props.router.navigate(`/pdp/${id}`);
        }
    }

    handleAddToCartIconClick = (e) => {
        e.stopPropagation();
        console.log("clicked");
    }

    render() {
        const {gallery,name,prices,id,inStock} = this.props.product;
        return (
            <div
                className="product-card-container"
                onClick={this.navigateToProductDescription(id)}
            >          
                <div
                    className={`product-card ${!inStock?" out-of-stock":""}`}
                >
                    <div
                        className="product-img-div"
                        style={{backgroundImage: `url(${gallery[0]})`}}
                    >
                        {/* <img className="product-img" src={gallery[0]} alt={name + " product"}/> */}
                        <button
                            className="add-to-cart-btn"
                            onClick={this.handleAddToCartIconClick}
                        >
                            <CartIcon />
                        </button>
                    </div>
                    <p className="product-name-p pc-p">{name}</p>
                    <p className="product-price-p pc-p">
                        <Price 
                            prices={prices}
                        />
                    </p>                                


                    <div className="out-of-stock-div">
                        <p className="oos-p">out of stock</p>
                    </div>
                </div>                      
            </div>
        );
    }
}

export default withRouter(ProductCard);