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
      test: /\.(jpe?g|png)$/i,
      loaders: ["file-loader", "webp-loader"],
    },
  ],
};

const less_loader = {
  test: /\.less$/,
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
environment.loaders.append("less", less_loader);
environment.loaders.append("webp", webp_loader);

environment.splitChunks();

module.exports = environment;
