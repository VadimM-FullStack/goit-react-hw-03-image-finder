import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ src, alt, largeImageURL, onThumbClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={src}
        alt={alt}
        data-largeimageurl={largeImageURL}
        onClick={onThumbClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onThumbClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
