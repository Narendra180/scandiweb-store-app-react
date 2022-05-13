import React from "react";
import withRouter from "../../hoc-components/with-router";
import { gql } from "@apollo/client";
import { apolloClient } from "../../index";
import PdpProductImagesGallery from "../../components/pdp-product-images-gallery/pdp-product-images-gallery.component";
import PdpProductDetails from "../../components/pdp-product-details/pdp-product-details.component";
import "./product-description-page.styles.scss";


// productId comes from params.
const getProductDetailsOf = (productId) => {
    const GET_PRODUCT_DETAILS = gql`
                                    query {
                                        product(id: "${productId}") {
                                            id,
                                            brand,
                                            name,
                                            inStock,
                                            description,
                                            prices {
                                                currency {
                                                    label,
                                                    symbol
                                                },
                                                amount
                                            },
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
        // console.log(this.props)
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

    changeActiveBigGalleryImage = (imgLink) => {
        this.setState({activeGalleryImageLink: imgLink});
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
                        className="product-image-gallery-details-container"
                    >                        
                        <PdpProductImagesGallery
                            activeGalleryImageLink={this.state.activeGalleryImageLink}
                            changeActiveBigGalleryImage={this.changeActiveBigGalleryImage}
                            product={this.state.product}                            
                        />

                        <PdpProductDetails 
                            product={this.state.product}
                        />

                    </div>
                    
                }
            </div>
        )
    }
}

export default withRouter(ProductDescription);