import React from "react";
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import { addToCart } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import OutOfStockOverlay from "../out-of-stock-overlay/out-of-stock-overlay.component";
import withRedux from "../../hoc-components/withRedux";
import withRouter from "../../hoc-components/with-router";
import Price from "../price/price.component";
import "./product-card.styles.scss";


class ProductCard extends React.Component {

    navigateToProductDescription = (id) => {
        
        return (e) => {
            this.props.router.navigate(`/pdp/${id}`);
        }
    }

    addProductToCart = () => {
        let initialSelectedAttributes = {};
        this.props.product.attributes.forEach((attributeObject,i) => {
            initialSelectedAttributes[attributeObject.name] = attributeObject.items[0].value;
        })
        const {id,name,brand,prices,gallery} = this.props.product;
        const productObject = {
            id,name,brand,prices,gallery,
            selectedAttributes: initialSelectedAttributes,
            allProductAttributes: this.props.product.attributes
        }

        this.props.redux.dispatch(addToCart(productObject));
    }

    handleAddToCartIconClick = (e) => {
        e.stopPropagation();
        this.addProductToCart();
    }

    render() {
        const {gallery,name,brand,prices,id,inStock} = this.props.product;
        return (
            <div
                className="product-card-container"
                onClick={this.navigateToProductDescription(id)}
            >          
                <div
                    // className={`product-card ${!inStock?" out-of-stock":""}`}
                    className={`product-card`}
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
                    <p className="product-name-p pc-p">{brand} {name}</p>
                    <p className="product-price-p pc-p">
                        <Price 
                            prices={prices}
                        />
                    </p>                                

                    {
                        !inStock
                        ?
                        <OutOfStockOverlay />
                        :
                        ""
                    }
                    
                </div>                      
            </div>
        );
    }
}

export default withRedux(withRouter(ProductCard));