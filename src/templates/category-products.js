import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { ProductCategory } from "../components/product-category";

const CategoryProductsTemplate = ({ data, location }) => {
  const category = data.contentfulCategory;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location}>
      <Helmet title={`${category.name} | ${siteTitle}`} />

      <div className="wrapper">
        <ProductCategory {...category} />
      </div>
    </Layout>
  );
};
export default CategoryProductsTemplate;

export const pageQuery = graphql`
  query ProductsByCategory($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulCategory(slug: { eq: $slug }) {
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
`;
