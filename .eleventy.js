module.exports = (eleventyConfig) => {

  // Copy static_assets folder to dist
  eleventyConfig.addPassthroughCopy("src/static_assets");
  // Copy admin (CMS) folder to dist
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    setUseGitIgnore: false
  }
};
