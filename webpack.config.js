const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './packages/master/Public/Javascript/main.js'),
  },
  output: {
    path: path.resolve(__dirname, './packages/master/Public/dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
}