import React from "react";
import withRouter from "../../hoc-components/with-router";
import { gql } from "@apollo/client";
import { apolloClient } from "../../index";

import "./product-description.styles.scss";

// productId comes from params.
const getProductDetailsOf = (productId) => {
    const GET_PRODUCT_DETAILS = gql`
                                    query {
                                        product(id: "${productId}") {
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
                    product: productObject
                }
            } = await apolloClient.query(getProductDetailsOf(productId));
            this.setState({
                isProductObjectLoading: false,
                isLoadingProductObjectFailed: false,
                product: productObject
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
                <h1>Product description</h1>
                {   
                    this.state.isProductObjectLoading
                    ?
                    <p>Loading...</p>
                    :
                    <div
                        className="product-description-container"
                    >
                        <h2>{this.state.product.name}</h2>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(ProductDescription);