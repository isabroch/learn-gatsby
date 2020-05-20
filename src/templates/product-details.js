import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import styles from "./product-details.module.scss";
import Price from "../components/Price";
import { ProductAlbum } from "../components/product-album";

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
          return <Img key={fluidImage.src} fluid={fluidImage} />;
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
        fluid(maxWidth: 400, maxHeight: 400, resizingBehavior: SCALE) {
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
