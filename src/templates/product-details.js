import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Flickity from "react-flickity-component";
import "flickity/dist/flickity.min.css";
import "./product-album.css";
import Layout from "../components/layout";
import styles from "./product-details.module.scss";
import Price from "../components/Price";

const ProductAlbum = ({ children }) => (
  <Flickity className={styles["album"]} options={{ wrapAround: true }}>
    {children}
  </Flickity>
);

const ProductDetails = (product) => {
  return (
    <main className={styles["product"]}>
      <div className={styles["details"]}>
        <h1>{product.name}</h1>
        <p>
          {product.description
            ? product.description.internal.content
            : "No description available."}
        </p>
        <Price>{product.price}</Price>
      </div>
      <ProductAlbum>
        {product.image.map(({ fluid: fluidImage }) => {
          return (
            <div key={fluidImage.src} className={styles["album__main"]}>
              <Img fluid={fluidImage} />
            </div>
          );
        })}
      </ProductAlbum>
    </main>
  );
};

class ProductDetailsTemplate extends React.Component {
  render() {
    const product = get(this.props, "data.contentfulProduct");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    return (
      <Layout location={this.props.location}>
        <Helmet title={`${product.name} | ${siteTitle}`} />
        <ProductDetails {...product} />
      </Layout>
    );
  }
}

export default ProductDetailsTemplate;

export const pageQuery = graphql`
  query ProductBySlugQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulProduct(slug: { eq: $slug }) {
      name
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
`;
