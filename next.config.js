const withImages = require("next-images");
const { parsed: myEnv } = require("dotenv").config({
  path: ".env",
});
const webpack = require("webpack");
module.exports = withImages({
  webpack(config, { isServer }) {
    if (!isServer) {
      config.node = {
        fs: "empty",
        child_process: "empty",
      };
    }
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
});
