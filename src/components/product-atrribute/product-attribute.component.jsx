import React from "react";
import "./product-attribute.styles.scss";


class ProductAttribute extends React.Component {
    render() {
        return (
            <div
                className="attribute-selector-container"
            >
                <h3 className="attribute-name">{this.props.attributeObject.name+":"}</h3>
                {
                    <div
                        className={`attributes-container ${
                                (this.props.attributeObject.type !== "swatch")
                                ?"text-attr":"swatch-attr"
                            }`
                        }
                    >
                        {
                            this.props.attributeObject.items.map((itemObject,i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`attribute-value`}
                                        style={
                                            this.props.attributeObject.type !== "swatch"?{}:
                                            {
                                                backgroundColor: itemObject.value,
                                                width: "30px",
                                                height: "30px"
                                            }
                                        }
                                    >
                                        {
                                            this.props.attributeObject.type !== "swatch"
                                            ?
                                            itemObject.value
                                            :
                                            ""
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ProductAttribute;