import React from "react";
import "./product-attribute.styles.scss";


class ProductAttribute extends React.Component {

    onAttributeValueClick = (obj) => {
        return (e) => {
            if(this.props.onChange) {
                this.props.onChange(obj);
            }
        }
    }

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
                                        className={`attribute-value ${
                                            (this.props.value === itemObject.value)?
                                            "selected-value":""
                                            }`}
                                        style={
                                            this.props.attributeObject.type !== "swatch"?{}:
                                            {
                                                backgroundColor: itemObject.value                                              
                                            }
                                        }
                                        onClick={this.onAttributeValueClick({
                                            name: this.props.attributeObject.name, 
                                            value: itemObject.value
                                        })}
                                    >
                                        {
                                            this.props.attributeObject.type !== "swatch"
                                            ?
                                            itemObject.value
                                            :
                                            <div className="sw-div"></div>
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