module.exports = {
  entry: "./dev/js/index.js",
  output: {
    path: "dist/js/",
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!sass-loader?sourceMap"
      }
    ]
  }
}
