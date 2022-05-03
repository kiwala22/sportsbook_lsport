const { environment } = require("@rails/webpacker");
const webpack = require("webpack");
const BrotliPlugin = require("brotli-webpack-plugin");
const zlib = require("zlib");
const CompressionPlugin = require("compression-webpack-plugin");
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

environment.plugins.prepend(
  "Provide",
  new BrotliPlugin({
    filename: "[path][base].br",
    algorithm: "brotliCompress",
    test: /\.(js|jsx|css|html|svg|webp)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
    deleteOriginalAssets: false,
    threshold: 10240,
    minRatio: 0.8,
  })
);

// environment.plugins.prepend(
//   "Provide",
//   new CompressionPlugin({
//     // test: /\.js(\?.*)?$/i,
//     test: /\.(js|jsx|css|html|svg|webp)$/,
//     filename: "[path].gz[query]",
//     algorithm: "gzip",
//     exclude: /.map$/,
//     deleteOriginalAssets: false,
//   })
// );

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

// environment.splitChunks();
environment.splitChunks((config) =>
  Object.assign({}, config, {
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 10000,
        maxSize: 150000,
      },
    },
  })
);

module.exports = environment;
