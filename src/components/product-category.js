import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styles from "./product-category.module.scss";
import Price from "./Price";

const ProductCard = ({ name, price, brand, slug, image }) => {
  return (
    <article className={styles["card"]}>
      {image ? (
        <div className={styles["card__image"]}>
          <Img fluid={image[0].fluid} />
        </div>
      ) : null}
      <h3 className={styles["card__title"]}>
        <Link to={`/${slug}`}>
          {brand} {name}
        </Link>
      </h3>
      <p className={styles["card__price"]}>
        <Price>{price}</Price>
      </p>
    </article>
  );
};
export const ProductCategory = ({ name, product: products }) => {
  const slug = name.toLowerCase().replace(" ", "-");
  return (
    <div className={styles["category"]}>
      <h2 className={styles["category__name"]}>
        <Link to={`/products/${slug}`}>{name}</Link>
      </h2>
      <ul className={styles["category__list"]}>
        {products.map((product) => (
          <li key={product.sku}>
            <ProductCard {...product} key={product.sku} />
          </li>
        ))}
      </ul>
    </div>
  );
};
