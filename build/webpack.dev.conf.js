/* Development config:
   ========================================================================== */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  // watchOptions: {
  //   ignored: /[\\/]node_modules[\\/]/
  // },

  // performance: {
  /*
   ** Включает / выключает подсказки. Кроме того, он сообщает webpack,
   ** чтобы он выдавал либо ошибку, либо предупреждение при обнаружении подсказок.
   */
  // hints: 'warning' // string = 'warning': 'error' | 'warning' boolean: false
  // },
  devServer: {
    historyApiFallback: true, // включаем историю, при использовании index.html
    proxy: {
      "/api": {
        target: "http://localhost:8081/"
      }
    },
    hot: false,
    /*
     ** Сообщает devServerо записи сгенерированных ресурсов на диск.
     ** Вывод записывается в каталог output.path .
     */
    // writeToDisk: true,
    /*
     ** Скажите dev-server, чтобы он смотрел файлы,
     ** обслуживаемые devServer.contentBaseопцией.
     ** Это отключено по умолчанию. Если этот параметр включен,
     ** изменения файла будут запускать полную перезагрузку страницы.
     */
    // watchContentBase: true,
    // info: true, // Вывод информации. Он включен по умолчанию.
    // color: true, // Включает / отключает цвета на консоли.
    // serveIndex: true, // serveIndex middleware генерирует списки каталогов при просмотре каталогов, которые не имеют файла index.html.
    // lazy: false, // Включить ленивую перезагрузку страницы
    // liveReload: true, // По умолчанию dev-сервер перезагрузит / обновит страницу при обнаружении изменений файла.
    noInfo: true, // Сообщает dev-серверу о подавлении сообщений, таких как информация о пакете webpack.
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8082,
    overlay: {
      warnings: true,
      errors: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
