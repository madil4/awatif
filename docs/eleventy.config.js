module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/js/preline.js");

  return {
    dir: {
      input: "src",
      includes: "layout",
      output: "dist",
    },
  };
};
