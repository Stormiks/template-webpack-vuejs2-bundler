const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const fs = require('fs');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  dist: path.resolve(__dirname, "dist"),
  srcComponents: path.resolve(__dirname, "src/components"),
  srcLayouts: path.resolve(__dirname, "src/layouts"),
  srcRouter: path.resolve(__dirname, "src/router"),
  srcStore: path.resolve(__dirname, "src/store"),
  srcPages: path.resolve(__dirname, "src/pages"),
  srcAssets: path.resolve(__dirname, "src/assets/"),
  src: path.resolve(__dirname, "public"),
  srcAppJs: path.resolve(__dirname, "src/main.js"),
  assets: "assets/",
  assetsFonts: "assets/fonts",
  assetsImg: "assets/img",
  assetsSvg: "assets/svg",
  assetsLess: "assets/less",
  assetsScss: "assets/scss",
  assetsCss: "assets/css",
  srcAssetsLess: path.resolve(__dirname, "src/assets/less"),
  srcAssetsScss: path.resolve(__dirname, "src/assets/scss"),
  srcAssetsCss: path.resolve(__dirname, "src/assets/css"),
  srcAssetsImg: path.resolve(__dirname, "src/assets/img"),
  srcAssetsSvg: path.resolve(__dirname, "src/assets/svg"),
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = PATHS.src;
// const PAGES = fs
//   .readdirSync(PAGES_DIR)
//   .filter(fileName => fileName.endsWith(".html"));

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/main.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[contenthash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // css: ExtractTextPlugin.extract({
            //   use: 'css-loader',
            //   fallback: 'vue-style-loader'
            // }),
            less: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader!css-loader!less-loader'
            })
          },
          // postcss: [
          //   require('postcss')()
          // ]
        }
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              }
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
    }),
    /*
      Automatic creation any html pages (Don't forget to RERUN dev server!)
      See more:
      https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
      Best way to create pages:
      https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    */
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/index.html`,
      filename: `index.html`,
      title: 'Мой список аниме',
      hash: true,
    })
  ],
  resolve: {
    alias: {
      "@": PATHS.src,
      // "@pages": PATHS.srcPages,
      // "@assets": PATHS.srcAssets,
      // "@assetsImg": PATHS.srcAssetsImg,
      // "@assetsLess": PATHS.srcAssetsLess,
      // "@assetsScss": PATHS.srcAssetsScss,
      // "@assetsCss": PATHS.srcAssetsCss,
      // "@router": PATHS.srcRouter,
      // "@store": PATHS.srcStore,
      // "@layouts": PATHS.srcLayouts,
      // "@components": PATHS.srcComponents,
      // "@assetsSvg": PATHS.srcAssetsSvg,
      vue$: "vue/dist/vue.js"
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  optimization: {
    chunkIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    historyApiFallback: true,
  },
};
