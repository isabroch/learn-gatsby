import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import { ProductCategory } from "../components/product-category";
import styles from "./products.module.scss";

class ProductIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const categories = get(this, "props.data.allContentfulCategory.edges");

    return (
      <Layout>
        <Helmet title={siteTitle} />
        <h1 className={styles["title"]}>Products</h1>
        <div className="wrapper">
          {categories.map(({ node }) => (
            <ProductCategory key={node.name} {...node} />
          ))}
        </div>
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
    allContentfulCategory(sort: { fields: name }) {
      edges {
        node {
          name
          product {
            brand
            category {
              name
            }
            image {
              fluid(
                maxWidth: 200
                maxHeight: 200
                resizingBehavior: SCALE
                toFormat: WEBP
              ) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            name
            price
            slug
          }
        }
      }
    }
  }
`;
