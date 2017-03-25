var path = require("path");
var webpack = require('webpack');

var config = {
  entry: {
    '@ngui/datetime-picker': path.join(__dirname, 'src', 'index.ts')
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.html']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "datetime-picker.umd.js",
    library: ["datetime-picker"],
    libraryTarget: "umd"
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { // Support for .ts files.
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      }
    ]
  }
};

if (process.env.NODE_ENV === 'prod') {
  config.module.loaders.push({
    test: /\.ts$/, loader: 'strip-loader?strip[]=debug,strip[]=console.log'
  });
}

module.exports = config;
