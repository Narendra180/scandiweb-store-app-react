import React from "react";
import "./pdp-product-images-gallery.styles.scss";

class PdpProductImagesGallery extends React.Component {

    changeBigGalleryImage = (e) => {
        // console.log(e.target.src);
        this.props.changeActiveBigGalleryImage(e.target.src);
    }

    render() {
        return (
            <div
                className="product-images-gallery"
            >
                <div 
                    // clickable small images container
                    className="image-selector-container"
                >
                    {
                        this.props.product.gallery.map((imgLink,i) => {
                            return (
                                <div
                                    className="gallery-clickable-small-img-container"
                                    key={i}
                                    onClick={this.changeBigGalleryImage}
                                >
                                    <img 
                                        src={imgLink}
                                        alt={`${this.props.product.name}'s ${i+1}`}
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
                        src={this.props.activeGalleryImageLink} 
                        alt={this.props.product.name}
                    />
                </div>

            </div>
        )
    }
}

export default PdpProductImagesGallery;