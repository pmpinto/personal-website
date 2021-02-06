module.exports = (eleventyConfig) => {

  // Prevent clashing with static_assets folder (which is git-ignored)
  eleventyConfig.setUseGitIgnore(false);
  // Copy static_assets folder to dist
  eleventyConfig.addPassthroughCopy("src/static_assets");
  // Copy admin (CMS) folder to dist
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
      data: "_data"
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    setUseGitIgnore: false
  }
};
