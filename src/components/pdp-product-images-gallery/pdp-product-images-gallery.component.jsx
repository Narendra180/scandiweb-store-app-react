import React from "react";
import OutOfStockOverlay from "../out-of-stock-overlay/out-of-stock-overlay.component";
import "./pdp-product-images-gallery.styles.scss";

class PdpProductImagesGallery extends React.Component {

    changeBigGalleryImage = (e) => {
        this.props.changeActiveBigGalleryImage(e.target.src);
    }

    handleOutOfStockImageClick = (e) => {
        e.stopPropagation();
        this.props.changeActiveBigGalleryImage(e.currentTarget.dataset.link);
    }

    render() {
        const {product: {inStock,gallery,name},activeGalleryImageLink } = this.props;
        return (
            <div
                className="product-images-gallery"
            >
                <div 
                    // clickable small images container
                    className="image-selector-container"
                >
                    {
                        gallery.map((imgLink,i) => {
                            return (
                                <div
                                    className="gallery-clickable-small-img-container"
                                    key={i}
                                    onClick={this.changeBigGalleryImage}
                                >
                                    <img 
                                        src={imgLink}
                                        alt={`${name}'s ${i+1}`}
                                    />
                                    {
                                        !inStock
                                        ?
                                        <OutOfStockOverlay
                                            data-link={imgLink}
                                            onClick={this.handleOutOfStockImageClick}
                                        />
                                        :
                                        ""
                                    }
                                    
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
                        src={activeGalleryImageLink} 
                        alt={name}
                    />
                    {
                        !inStock
                        ?
                        <OutOfStockOverlay 
                        />
                        :
                        ""
                    }
                </div>

            </div>
        )
    }
}

export default PdpProductImagesGallery;