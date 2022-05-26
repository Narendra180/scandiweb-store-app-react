import React from "react";
import ProductAttribute from "../product-atrribute/product-attribute.component";
import { addToCart } from "../../redux/redux-slices/cart-slice-folder/cart-slice";
import Price from "../price/price.component";
import withRedux from "../../hoc-components/withRedux";
import "./pdp-product-details.styles.scss";


class PdpProductDetails extends React.Component {

    constructor(props) {
        super(props);

        // we will have selected attribute values in this state.
        this.state = {}
        this.productDescriptionDivRef = React.createRef();
    }

    componentDidMount() {
        let initialSelectedAttributes = {};
        this.props.product.attributes.forEach((attributeObject,i) => {
            initialSelectedAttributes[attributeObject.name] = attributeObject.items[0].value;
        })
        this.setState(initialSelectedAttributes);

        if(!this.productDescriptionDivRef.current.textContent) {
            this.productDescriptionDivRef.current.appendChild(
                new DOMParser().parseFromString(this.props.product.description,"text/html").body.firstChild
            );
        }
    }

    addProductToCart = () => {
        const {id,name,brand,prices,gallery} = this.props.product;
        const productObject = {
            id,name,brand,prices,gallery,
            selectedAttributes: this.state,
            allProductAttributes: this.props.product.attributes
        }
        this.props.redux.dispatch(addToCart(productObject));
    }

    onProductAttributesSelectionChange = ({name,value}) => {
        this.setState({[name]: value});
    }

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
                                    onChange={this.onProductAttributesSelectionChange}
                                    value={this.state[attributeObject.name]}
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
                            <p>
                                <Price 
                                    prices={this.props.product.prices}
                                />
                            </p>                        
                        </div>
                    </div>    

                    <button
                        className="addtocart-btn"
                        onClick={this.addProductToCart}
                        disabled={!this.props.product.inStock}
                    >
                        Add To Cart
                    </button>          

                    <div className="product-description-text-container">
                        <div
                            className="product-description-div"
                            ref={this.productDescriptionDivRef}
                        >

                        </div>                       
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default withRedux(PdpProductDetails);