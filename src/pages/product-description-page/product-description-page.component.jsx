import React from "react";
import withRouter from "../../hoc-components/with-router";
import { gql } from "@apollo/client";
import { apolloClient } from "../../index";

import "./product-description-page.styles.scss";

// productId comes from params.
const getProductDetailsOf = (productId) => {
    const GET_PRODUCT_DETAILS = gql`
                                    query {
                                        product(id: "${productId}") {
                                        brand,
                                        name,
                                        gallery,
                                        attributes {
                                            name,
                                            type,
                                            items {
                                            displayValue,
                                            value,
                                            id
                                            }
                                        }
                                        }
                                    }
                                    `;
    return (
        {
            query: GET_PRODUCT_DETAILS
        }        
    )
}


class ProductDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            isProductObjectLoading: true,
            isLoadingProductObjectFailed: false,
            activeGalleryImageLink: ""
        }
    }

    componentDidMount() {
        this.getProductDetails();
    }

    getProductDetails = async () => {
        const { productId } = this.props.router.params;
        try {
            const {
                data: {
                    product: productObject,
                }
            } = await apolloClient.query(getProductDetailsOf(productId));
            this.setState({
                isProductObjectLoading: false,
                isLoadingProductObjectFailed: false,
                product: productObject,
                activeGalleryImageLink: productObject.gallery[0]
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {

        if(this.state.isLoadingProductObjectFailed) {
            return "Unable to load product, please try again later";
        }
        return (
            <div
                className="product-container"
            >
                {   
                    this.state.isProductObjectLoading
                    ?
                    <p>Loading...</p>
                    :
                    <div
                        className="product-image-gallery-description-container"
                    >
                        <div
                            className="product-images-gallery"
                        >
                            <div 
                                // clickable small images container
                                className="image-selector-container"
                            >
                                {
                                    this.state.product.gallery.map((imgLink,i) => {
                                        return (
                                            <div
                                                className="gallery-clickable-small-img-container"
                                                key={i}
                                            >
                                                <img 
                                                    src={imgLink}
                                                    alt={`${this.state.product.name}'s ${i+1}`}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div
                                // big image of selected image.
                                className="selected-image-container"
                            >
                                <img 
                                    src={this.state.activeGalleryImageLink} 
                                    alt={this.state.product.name}
                                />
                            </div>
                        </div>  

                        <div
                            className="product-description"
                        >   
                            <div
                                className="product-description-attributes-add-to-cart-container"
                            >
                                <h1 className="brand-name">{this.state.product.brand}</h1>
                                <h2 className="product-name">{this.state.product.name}</h2>
                                
                                {
                                    this.state.product.attributes.map((attrObj,i) => {
                                        return (
                                            <div
                                                className="attribute-details"
                                                key={i}
                                            >
                                                <h3 className="attribute-name">{attrObj.name}</h3>
                                                {
                                                    <div
                                                        className="attribute-values-container"
                                                    >
                                                        {
                                                            attrObj.items.map((valueObj,i) => {
                                                                return (
                                                                    attrObj.type === "swatch"
                                                                    ?
                                                                    <><span 
                                                                        key={valueObj.id}
                                                                        style={{
                                                                            backgroundColor: valueObj.value,
                                                                            display: "inline-block",
                                                                            width: "30px",
                                                                            height: "30px"
                                                                        }}
                                                                    >
                                                                        {/* {valueObj.value+"  "} */}                                                        
                                                                    </span><span>&nbsp;&nbsp;</span></>
                                                                    :
                                                                    <span 
                                                                        key={valueObj.id}
                                                                    >
                                                                        {valueObj.value+"  "}
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                }
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                                
                        </div>                            
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(ProductDescription);