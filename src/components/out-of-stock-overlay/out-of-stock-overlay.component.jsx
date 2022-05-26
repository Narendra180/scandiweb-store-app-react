import React from "react";
import "./out-of-stock-overlay.styles.scss";

class OutOfStockOverlay extends React.Component {
    render() {
        return (
            <div className="out-of-stock-div" {...this.props}>
                <p className="oos-p">out of stock</p>
            </div>
        )
    }
}

export default OutOfStockOverlay;