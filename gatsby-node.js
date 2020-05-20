const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js");
    const productPage = path.resolve("./src/templates/product-details.js");
    const categoryPage = path.resolve("./src/templates/category-products.js");
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }

            allContentfulProduct {
              edges {
                node {
                  slug
                }
              }
            }

            allContentfulCategory {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulBlogPost.edges;
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          });
        });

        const products = result.data.allContentfulProduct.edges;
        products.forEach((product) => {
          createPage({
            path: `/${product.node.slug}`,
            component: productPage,
            context: {
              slug: product.node.slug,
            },
          });
        });

        const categories = result.data.allContentfulCategory.edges;
        categories.forEach((category) => {
          createPage({
            path: `/products/${category.node.slug}`,
            component: categoryPage,
            context: {
              slug: category.node.slug,
            },
          });
        });
      })
    );
  });
};
