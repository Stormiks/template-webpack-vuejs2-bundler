/* Base config:
   ========================================================================== */

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');

const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const {
  VueLoaderPlugin
} = require("vue-loader");

// Main const. Feel free to change it
const PATHS = {
  dist: path.join(__dirname, "../dist"),
  srcComponents: path.join(__dirname, "../src/components"),
  srcLayouts: path.join(__dirname, "../src/layouts"),
  srcRouter: path.join(__dirname, "../src/router"),
  srcStore: path.join(__dirname, "../src/store"),
  srcPages: path.join(__dirname, "../src/pages"),
  srcAssets: path.join(__dirname, "../src/assets/"),
  src: path.join(__dirname, "../src"),
  srcAppJs: path.join(__dirname, "../src/app.js"),
  assets: "assets/",
  assetsFonts: "assets/fonts",
  assetsImg: "assets/img",
  assetsSvg: "assets/svg",
  assetsLess: "assets/less",
  assetsScss: "assets/scss",
  assetsCss: "assets/css",
  srcAssetsLess: path.join(__dirname, "../src/assets/less"),
  srcAssetsScss: path.join(__dirname, "../src/assets/scss"),
  srcAssetsCss: path.join(__dirname, "../src/assets/css"),
  srcAssetsImg: path.join(__dirname, "../src/assets/img"),
  srcAssetsSvg: path.join(__dirname, "../src/assets/svg"),
  srcStatic: path.join(__dirname, "../src/static")
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = PATHS.src;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith(".html"));

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    main: ["@babel/polyfill", PATHS.src] // Входной файл с зависимостями (package.json - key:'{имя}.js')
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: "/"
  },
  optimization: {
    /*
     ** Объект конфигурации представляет поведение по умолчанию SplitChunksPlugin
     */
    splitChunks: {
      chunks: "async", // Какие чанки будут выбраны для оптимизации (all, asyncи initial)
      minSize: 30000, // Минимальный размер в байтах для генерируемого чанка.
      // minRemainingSize: 0, // избегаем модулей с 0 размером
      maxSize: 0,
      minChunks: 1, // Минимальное количество чанков, которые должны разделять модуль перед разбиением.
      maxAsyncRequests: 6, // Максимальное количество параллельных запросов при загрузке по требованию.
      // maxInitialRequests: 4,
      automaticNameDelimiter: "~", // Позволяет вам указать разделитель, который будет использоваться для сгенерированных имен
      automaticNameMaxLength: 30, // Позволяет установить максимальное количество символов для имен чанков, которые генерируются SplitChunksPlugin
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/, // устраняем проблему кроссплатформенности между ОС
          chunks: "all",
          /*
           ** Сообщает WebPack игнорировать splitChunks.minSize,
           ** splitChunks.minChunks, splitChunks.maxAsyncRequestsи splitChunks.maxInitialRequests
           */
          enforce: true
        }
      }
    }
  },
  module: {
    /*
     ** Подкллючение необходимых обработчиков/загрузчиков для файлов
     */
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      // Vue
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loader: {
            scss: "vue-style-loader!css-loader!sass-loader!less-loader"
          }
        }
      },
      // Fonts
      // // Fonts
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "file-loader",
      //   options: {
      //     name: "assets/fonts/[name].[ext]"
      //   }
      // },
      // images
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      // // icons (svg)
      {
        test: /\assets\/svg.*\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          publicPath: "/assets/svg/",
          runtimeCompat: true
        }
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader, // Извлекаем из компонентов стили
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // less
      {
        test: /\.less$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader, // Извлекаем из компонентов стили
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // css
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".js"],
    alias: {
      "@": PATHS.src,
      "@pages": PATHS.srcPages,
      "@assets": PATHS.srcAssets,
      "@assetsImg": PATHS.srcAssetsImg,
      "@assetsLess": PATHS.srcAssetsLess,
      "@assetsScss": PATHS.srcAssetsScss,
      "@assetsCss": PATHS.srcAssetsCss,
      "@router": PATHS.srcRouter,
      "@store": PATHS.srcStore,
      "@layouts": PATHS.srcLayouts,
      "@components": PATHS.srcComponents,
      "@static": PATHS.srcStatic,
      "@assetsSvg": PATHS.srcAssetsSvg,
      vue$: "vue/dist/vue.js"
    }
  },
  /*
   ** Какой тип исходной карты файлы в том или ином режиме генерировать
   */
  devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : "source-map",
  /*
   ** Плагины обработчики
   */
  plugins: [
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "lodash/lodash.js",
      Lodash: "lodash/lodash.js"
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assetsCss}/[name].[hash].css`
    }),
    new CopyWebpackPlugin([{
        from: `${PATHS.src}/${PATHS.assetsImg}`,
        to: `${PATHS.assetsImg}`
      },
      {
        from: `${PATHS.src}/${PATHS.assetsFonts}`,
        to: `${PATHS.assetsFonts}`
      },
      {
        from: `${PATHS.src}/${PATHS.assetsSvg}`,
        to: `${PATHS.assetsSvg}`
      },
      {
        from: `${PATHS.src}/static`,
        to: "./"
      }
    ]),

    /*
      Automatic creation any html pages (Don't forget to RERUN dev server!)
      See more:
      https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
      Best way to create pages:
      https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    */
    ...PAGES.map(
      page =>
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`
      })
    )
  ]
};
