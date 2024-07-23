module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.ico");

  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",

    port: 4600,
    open: true,
  });

  return {
    dir: {
      input: "src",
      includes: "layout",
      output: "dist",
    },
  };
};
