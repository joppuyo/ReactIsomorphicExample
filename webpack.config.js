module.exports = {
  entry: './browser.jsx',
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
