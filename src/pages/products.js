import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import Img from "gatsby-image";
import styles from "./products.module.scss";
import Price from "../components/Price";

const ProductCard = ({ name, price, brand, slug, image }) => {
  return (
    <article className={styles["card"]}>
      {image ? (
        <div className={styles["card__image"]}>
          <Img fluid={image[0].fluid} />
        </div>
      ) : null}
      <h3 className={styles["card__title"]}>
        <Link to={`/products/${slug}`}>
          {brand} {name}
        </Link>
      </h3>
      <p className={styles["card__price"]}>
        <Price>{price}</Price>
      </p>
    </article>
  );
};

const ProductCategory = ({ name, products }) => {
  return (
    <div className={styles["category"]}>
      <h2 className={styles["category__name"]}>{name}</h2>
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

class ProductIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const categories = get(this, "props.data.allContentfulCategory.edges");

    return (
      <Layout>
        <Helmet title={siteTitle} />
        <h1 className={styles["page-title"]}>Products</h1>

        {categories.map(({ node }) => (
          <ProductCategory key={node.name} {...node} />
        ))}
      </Layout>
    );
  }
}

export default ProductIndex;

export const productQuery = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCategory {
      edges {
        node {
          name
          products {
            brand
            category {
              name
            }
            description {
              ... on contentfulProductDescriptionTextNode {
                internal {
                  content
                }
              }
            }
            image {
              fluid(maxWidth: 200, maxHeight: 200, resizingBehavior: SCALE) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            name
            price
            sku
            slug
            stock
          }
        }
      }
    }
  }
`;
