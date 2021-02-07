module.exports = (eleventyConfig) => {
  const md =  require('markdown-it')({ });

  // Prevent clashing with static_assets folder (which is git-ignored)
  eleventyConfig.setUseGitIgnore(false);
  // Copy static_assets folder to dist
  eleventyConfig.addPassthroughCopy("src/static_assets");
  // Copy admin (CMS) folder to dist
  eleventyConfig.addPassthroughCopy("admin");

  // Register `markdownify` filter
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addFilter("markdownify", string => {
      return md.renderInline(string)
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
      data: "_data"
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk,md",
    setUseGitIgnore: false
  }
};
