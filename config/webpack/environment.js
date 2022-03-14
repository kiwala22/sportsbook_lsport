const { environment } = require("@rails/webpacker");
const webpack = require("webpack");
environment.plugins.prepend(
  "Provide",
  new webpack.ProvidePlugin({
    Rails: ["@rails/ujs"],
    $: "jquery/src/jquery",
    jQuery: "jquery/src/jquery",
    Popper: ["popper.js", "default"],
    moment: "moment/moment",
  })
);

const config = environment.toWebpackConfig();
config.resolve.alias = {
  jquery: "jquery/src/jquery",
};

const webp_loader = {
  rules: [
    {
      test: /\.(jpeg|png)$/i,
      loaders: ["file-loader", "webp-loader"],
    },
  ],
};

const less_loader = {
  test: /\.less$/,
  exclude: /\.scss$/,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
    },
    {
      loader: "less-loader",
      options: {
        javascriptEnabled: true,
      },
    },
  ],
};
const sass_loader = {
  test: /\.s[ac]ss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
  // ... other settings
};
// Define a second rule for only being used from less files
// This rule will only be used for converting our sass-variables to less-variables
const sass_loader_default = {
  test: /\.scss$/,
  issuer: /\.less$/,
  use: {
    loader: "./sassVarsToLess.js", // Change path if necessary
  },
};

environment.loaders.append("less", sass_loader);
environment.loaders.append("less", sass_loader_default);
environment.loaders.append("less", less_loader);
environment.loaders.append("webp", webp_loader);

environment.splitChunks();

module.exports = environment;
