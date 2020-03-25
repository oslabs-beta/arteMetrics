const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // mode
  mode: process.env.NODE_ENV,
  // entry
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  // dev server settings
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api/': 'http://localhost:3000'
    },
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  // loaders
  module: {
    rules: [
      // react loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // sass loader
      {
        test: /\.s?[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  }
};
