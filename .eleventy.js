module.exports = (eleventyConfig) => {

  // Copy CSS folder to dist
  eleventyConfig.addPassthroughCopy("src/assets/css");

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
