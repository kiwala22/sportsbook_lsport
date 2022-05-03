process.env.NODE_ENV = process.env.NODE_ENV || "production";

const environment = require("./environment");
module.exports = {
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: false,
};

module.exports = environment.toWebpackConfig();
