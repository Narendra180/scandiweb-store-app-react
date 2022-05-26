import React from "react";
import { apolloClient } from '../../index';
import { getProductsOf } from "../../gql-queries";
import ProductCard from "../../components/product-card/product-card.component";
import "./product-cards-list.styles.scss";


class ProductCardsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isProductsLoading: true,
            isLoadingProductsFailed: false,
        }
    }

    isComponentUpdatedAlready = false;

    componentDidMount() {
        this.getProductsOfReceivedCategoryName();
    }

    componentDidUpdate() {
        if(!this.isComponentUpdatedAlready) {
            this.getProductsOfReceivedCategoryName();
            this.isComponentUpdatedAlready = true;
        } else {
            this.isComponentUpdatedAlready = false;
        }
    }

    getProductsOfReceivedCategoryName = async () => {
        try {
            const {
                data: {
                    category: {products: productsArray}
                }
            } = await apolloClient.query(getProductsOf(this.props.categoryName));

            this.setState({
                isProductsLoading: false,
                isLoadingProductsFailed: false,
                products: productsArray
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        if(this.state.isLoadingProductsFailed) {
            return "Unable to load products, please try again later";
        }
        return (
            <div 
                className="products-list-container"
            >
                <h1 className="pcl-h1-category-name">{this.props.categoryName}</h1>
                {
                    this.state.isProductsLoading
                    ?
                    <p>Loading...</p>
                    :
                    <div
                        className="product-cards-list-container "
                    >
                        {
                            this.state.products.map((product) => {
                                return (
                                    <ProductCard 
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            })
                        }
                    </div>                    
                }
            </div>
        )        
    }
}

export default ProductCardsList;