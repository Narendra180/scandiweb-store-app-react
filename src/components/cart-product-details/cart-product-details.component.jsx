import React from "react";
import ProductAttribute from "../product-atrribute/product-attribute.component";
import Price from "../price/price.component";
import "./cart-product-details.styles.scss";


class CartProductDetails extends React.Component {
    render() {
        return (
            <div
                className="cart-product-details-container"
            >
                <h1 className="brand-name-cpdc">{this.props.product.brand}</h1>
                <h2 className="product-name-cpdc">{this.props.product.name}</h2>
                <div className="attribute-value">
                    <p
                        className="price-p-cpdc"
                    >
                        <Price 
                            prices={this.props.product.prices}                        
                        />
                    </p>
                </div>
                {
                    this.props.product.allProductAttributes.map((attributeObject,i) => {
                        return (
                            <ProductAttribute 
                                key={i}
                                attributeObject={attributeObject}
                                value={this.props.product.selectedAttributes[attributeObject.name]}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default CartProductDetails;