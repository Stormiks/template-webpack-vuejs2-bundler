<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Шаблон для разработки Frontend c использованием VueJS</h1>
  <p>
    Webpack - это модуль-упаковщик. Его основная цель - связывать файлы JavaScript для использования в браузере, но он также способен преобразовывать, связывать или упаковывать практически любой ресурс или ресурс.
  </p>
</div>


## Build Setup:

``` bash
# 1) Установить глобальные пакеты для дальнейшей работы с другими командами консоли
npm i -g webpack webpack-cli @vue @vue/cli @vue/cli-init @vue/cli-service @vue/cli-service-global jslint npx jshint node-sass sass less node-gyp yarn

# 2) Инициализировать проект/Развернуть пакеты прописаные в package.json, через менеджер "YARN"
# https://classic.yarnpkg.com/en/docs/
npm run yarn-install

# Инициализировать проект/Развернуть пакеты прописаные в package.json, через менеджер "YARN" в оффлайн режиме
# (нужна директория с тарболл файлами/npm пакеты в домашней папке пользователя)
# https://classic.yarnpkg.com/en/docs/offline-mirror
npm run yarn-install-offline

# Использовать, если не устанавливаются пакеты через команду "npm run yarn-install-offline"
npm run yarn-install-offline-force

# Запустить проверку установленных пакетов npm на совместимость, проверку наличия новых и прочего
npm run yarn-audit

# Запустить сервер с слежением за изменениями в файлах, c флагом сохрания маршрутов для работы приложения и работы с бэкенд-API и открыть по адресу http://localhost:8081/
npm run dev-api

# Запустить сервер с слежением за изменениями в файлах и открыть в браузере адрес http://localhost:8081/
npm run dev

# Запустить сборку всего проекта в конечный продукт
npm run build

```
## Alias path:
# Короткие пути необходимых в использовании при импорте в ".js", ".vue"
* @ - директория исходников
* _ - Lodash.js
* @pages
* @assets
* @assetsImg
* @assetsLess
* @assetsScss
* @assetsCss
* @router
* @store
* @layouts
* @dashboard
* @components
```

## Project Structure:

* `src/index.html` - Основное приложение входа VueJS
* `src/index.js` - Основной файл приложения, импортируются/включаются библиотеки, входные стили и другие глобальные подключения
* `src/App.vue` - Основное точка входа для компонентов Vue
* `src/assets/scss` - Пользовательские стили SCSS. Не забудьте импортировать главный входной файл в `index.js`: путь при использовании `@assetsScss/example.scss`
* `src/assets/less` - Пользовательские стили LESS. Не забудьте импортировать главный входной файл в `index.js`: путь при использовании `@assetsLess/example.less`
* `src/assets/css` - Также как и выше^. Не забудьте импортировать в файле `index.js`: путь при использовании `@assetsCss/example.css`
* `src/assets/img` - Директория для разного рода медиафайлов изображений: путь при использовании `@assetsImg/some.jpg`
* `src/components` - Папка с компонентами `.vue`
* `src/layouts` - Папка с компонентами-обёртками `.vue`
* `src/store` - Папка для подключения модулей хранящие состояние приложения
* `src/router` - Папка для подключения маршрутов страниц в приложении 
* `src/static/` - Папка с дополнительными статическими ресурсами, которые копируются в выходную папку

<div align="center">
  <h2>Settings:</h2>
</div>

## Main const:
Easy way to move all files.
Default:
``` js
const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, '../src'),
  // Path to Output dir
  dist: path.join(__dirname, '../dist'),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: 'assets/'
}
```
## Customize:
Change any folders:
``` js
const PATHS = {
  // src must be src
  src: path.join(__dirname, '../src'),
  // dist to public
  dist: path.join(__dirname, '../public'),
  // assets to static
  assets: 'static/'
}
```

## Import Another libs:
1. Install libs
2. Import libs in `./index.js`
``` js
// React example
import React from 'react'
// Bootstrap example
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Import only SASS or CSS libs:
1. Install libs
2. Go to `/assets/scss/utils/libs.scss`
3. Import libs in node modules
``` scss
// Sass librarys example:
@import '../../node_modules/spinners/stylesheets/spinners';
// CSS librarys example:
@import '../../node_modules/flickity/dist/flickity.css';
```

## Import js files:
1. Create another js module in `./js/` folder
2. Import modules in `./js/index.js` file
``` js
// another js file for example
import './common.js'
```

## HTML Dir Folder:
#### Default:
* .html dir: `./src`
* Configurations: in `./build/webpack.base.conf.js`
``` js
const PAGES_DIR = PATHS.src
```
**Usage:**
All files must be created in the `./src` folder.
Example:
``` bash
./src/index.html
./src/about.html
```

#### Change HTML Default Dir Folder:
Example for `./src/pages`:
1. Create folder for all html files in `./src`. Be like: `./src/pages`
2. Change `./build/webpack.base.conf.js` const PAGES_DIR:
``` js
// Old path
// const PAGES_DIR = PATHS.src

// Your new path
const PAGES_DIR = `${PATHS.src}/pages`
```
3. Rerun webpack dev server


**Usage:**
All files must be created in the `./src/pages` folder.
Example:
``` bash
./src/pages/index.html
./src/pages/about.html
```

## Create Another HTML Files:
#### Default: 
Automatic creation any html pages:
1. Create another html file in `./src` (main folder)
2. Open new page `http://localhost:8081/about.html` (Don't forget to RERUN dev server)
See more - [commit](https://github.com/vedees/webpack-template/commit/249e3ae3b4973a7300f271045178f9f5f431bb89)

#### Second method:
Manual (not Automaticlly) creation any html pages (Don't forget to RERUN dev server and COMMENT lines above)
1. Create another html file in `./src` (main folder)
2. Go to `./build/webpack.base.conf.js`
3. Comment lines above (create automaticlly html pages)
4. Create new page in html:
``` js
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/index.html`,
      filename: './index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/another.html`,
      filename: './another.html',
      inject: true
    }),
```
5. Open new page `http://localhost:8081/about.html` (Don't forget to RERUN dev server)

#### Third method: (BEST)
Сombine the first method and the second.
Example:
``` js
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`
    })),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/about/index.html`,
      filename: './about/index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/about/portfolio.html`,
      filename: './about/portfolio.html',
      inject: true
    }),
```


## Vue install:
Default: **already have**

1. Install vue
``` bash
npm install vue --save
```
2. Init vue `index.js`:
``` js
const app = new Vue({
  el: '#app'
})
```
3. Create div id app
``` html
<div id="app">
  <!-- content -->
</div>
```

## Vuex install:
1. Install vuex
``` bash
npm install vuex --save
```
2. Import Vuex
``` js
import store from './store'
```
3. Create index.js in `./store`
``` js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  // vuex content
})
```

## Add Vue Components:
Create your component in `/components/`

**HTML Usage:**
1. Init component in `index.js`:
``` js
Vue.component('example-component', './components/Example.vue')
```
2. Any html files:
``` html
 <example-component />
```

**VUE Usage:**
1. import components in .vue:
``` js
import example from '~/components/Example.vue'
```
2. Register component:
``` js
  components: {
    example
  }
```
3. Init in vue component:
``` html
<example />