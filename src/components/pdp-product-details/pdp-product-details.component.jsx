import React from "react";
import ProductAttribute from "../product-atrribute/product-attribute.component";

import "./pdp-product-details.styles.scss";


class PdpProductDetails extends React.Component {
    render() {
        return (
            <div
                className="product-details"
            > 
                <div
                    className="product-description-attributes-add-to-cart-container"
                >
                    <h1 className="brand-name">{this.props.product.brand}</h1>
                    <h2 className="product-name">{this.props.product.name}</h2>

                    {
                        this.props.product.attributes.map((attributeObject,i) => {
                            return (
                                <ProductAttribute
                                    key={i}
                                    attributeObject={attributeObject}
                                />
                            )
                        })
                    }

                    <div
                        className="price-attribute-container"
                    >
                        <h3 className="attribute-name">Price:</h3>
                        <div
                            className="attribute-value"
                        >
                            {
                                this.props.product.prices[0].currency.symbol+this.props.product.prices[0].amount
                            }
                        </div>
                    </div>    

                    <button
                        className="addtocart-btn"
                    >
                        Add To Cart
                    </button>          

                    <div className="product-description-text-container">
                        <div
                            dangerouslySetInnerHTML={{__html: `${this.props.product.description}`}}
                        >

                        </div>
                        {
                            // this.props.product.description
                            // this.props.product.description.substring(3,this.props.product.description.length-4)
                            // new DOMParser().parseFromString("<p>Hello</p>","text/html").body.firstChild.textContent
                        }
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default PdpProductDetails;