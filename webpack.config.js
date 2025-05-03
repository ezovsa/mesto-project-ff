// webpack.config.js
// webpack.config.js
const path                 = require('path');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    assetModuleFilename: 'images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,               // теперь без include — все .css
        use: [
          MiniCssExtractPlugin.loader, // вытаскиваем CSS в styles.css
          'css-loader'                 // обрабатываем @import и url()
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name][ext]' }
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][ext]' }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'src/images', to: 'images' }
    ]
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/pages/index.html'),
    filename: 'index.html',
    inject: 'body'
  }),
  new MiniCssExtractPlugin({
    filename: 'styles.css'
  })
  ],
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 8080
  },
  mode: 'development'
};
