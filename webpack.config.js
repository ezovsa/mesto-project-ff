// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./", // относительные URL для GitHub Pages
    clean: true,
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // выносим CSS в отдельный файл
          "css-loader", // обрабатываем @import и url()
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // копируем картинки в dist/images
        generator: { filename: "images/[name][ext]" },
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: "asset/resource", // копируем шрифты в dist/fonts
        generator: { filename: "fonts/[name][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/images", to: "images" }],
    }),
  ],
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 8080,
  },
  mode: "development",
};
