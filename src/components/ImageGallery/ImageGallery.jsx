import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ imagesArray, onThumbClick, children }) => (
  <ul className={styles.ImageGallery}>
    {imagesArray.map(imageObj => {
      return (
        <ImageGalleryItem
          key={imageObj.id}
          id={imageObj.id}
          largeImageURL={imageObj.largeImageURL}
          src={imageObj.webformatURL}
          alt={imageObj.tags}
          onThumbClick={onThumbClick}
        />
      );
    })}
    {children}
  </ul>
);

ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  onThumbClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ImageGallery;
