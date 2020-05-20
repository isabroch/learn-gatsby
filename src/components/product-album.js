import React from "react";
import Flickity from "react-flickity-component";
import "flickity/dist/flickity.min.css";
import "./product-album-flickity.css";
import styles from "./product-album.module.scss";

export const ProductAlbum = ({ children }) => {
  return (
    <Flickity className={styles["album"]} options={{ wrapAround: true }}>
      {React.Children.map(children, (slide) => (
        <div className={styles["album__main"]}>{slide}</div>
      ))}
    </Flickity>
  );
};
