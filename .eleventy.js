const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const md = require("markdown-it")()
const classy = require("markdown-it-classy")

module.exports = (eleventyConfig) => {
  // Syntax highlight plugin
  // Supported languages: https://prismjs.com/#languages-list
  eleventyConfig.addPlugin(syntaxHighlight)

  // Prevent clashing with static_assets folder (which is git-ignored)
  eleventyConfig.setUseGitIgnore(false)

  // Copy static_assets folder to dist
  eleventyConfig.addPassthroughCopy("src/static_assets")

  // Copy admin (CMS) folder to dist
  eleventyConfig.addPassthroughCopy("admin")

  // Register `markdownify` filter
  eleventyConfig.setLibrary("md", md)
  eleventyConfig.addFilter("markdownify", (string, method = "block") => {
    md.use(classy)

    if (method === "inline") {
      return md.renderInline(string)
    }

    return md.render(string)
  })

  // Register `unique` filter
  eleventyConfig.addFilter("unique", (list) => {
    const listStr = list.join()
    const sortedList = listStr.split(",").sort()
    const uniqueList = Array.from(new Set(sortedList))
    return uniqueList
  })

  // Filter arrays where items have provided property
  eleventyConfig.addFilter("withProperty", (array, property) =>
    array.filter((item) => item.hasOwnProperty(property))
  )

  // Source: https://griffa.dev/posts/tips-for-debugging-in-11ty/
  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
  })

  // Human date format
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  eleventyConfig.addFilter("humanDate", (date) => {
    return `${date.getDate()} ${
      MONTHS[date.getMonth()]
    }, ${date.getFullYear()}`
  })

  // Machine date
  eleventyConfig.addFilter("machineDate", (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  })

  // Source: https://11ty.rocks/eleventyjs/dates/
  eleventyConfig.addShortcode(
    "currentYear",
    () => `${new Date().getFullYear()}`
  )

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
      data: "_data",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk,md",
    setUseGitIgnore: false,
  }
}
