module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");

  return {
    dir: {
      input: "src",
      includes: "layout",
      output: "dist",
    },
  };
};
