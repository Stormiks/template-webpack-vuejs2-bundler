/*
  autoprefixer - https://github.com/postcss/autoprefixer
  cssnano - https://github.com/hail2u/node-css-mqpacker
  css-mqpacker - HAS BEEN REMOVED! Do not use!
*/

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default', {
          /*
           ** Удаляем ли комментарии внутри и вокруг правил, селекторов и объявлений.
           ** отмеченые значком "!" останутся
           **
           ** https://cssnano.co/optimisations/discardcomments
           */
          discardComments: {
            removeAll: true
          },
          /*
           ** Удаляет ненужные префиксы в зависимости от browsersпараметра. Обратите внимание, 
           ** что по умолчанию, он не будет добавлять новые префиксы в файл CSS.
           **
           ** https://cssnano.co/optimisations/autoprefixer
           */
          autoprefixer: false,
          /*
           ** Сортирует объявления CSS на основе имен их свойств, 
           ** отсортированный CSS меньше при gzipped.
           **
           ** https://cssnano.co/optimisations/cssDeclarationSorter
           */
          cssDeclarationSorter: true,
          /*
           ** Сокращает CSS- calcвыражения везде, где это возможно, 
           ** обеспечивая совместимость и сжатие браузера.
           **
           ** https://cssnano.co/optimisations/calc
           */
          calc: true,
          /*
           ** Преобразует ключевые слова hex, hsl, rgb и CSS, 
           ** чтобы получить наименьшее эквивалентное значение цвета.
           **
           ** https://cssnano.co/optimisations/colormin
           */
          colormin: true,
          /*
           ** Удаляем ли дубликаты. Удаляются только точные совпадения
           **
           ** https://cssnano.co/optimisations/discardduplicates
           */
          discardDuplicates: true,
          /*
           ** Удаляем пустые правила, медиазапросы и правила с пустыми селекторами
           **
           ** https://cssnano.co/optimisations/discardempty
           */
          discardEmpty: true,
          /*
           ** Удаляет at-правила, которые имеют тот же идентификатор, что и другой
           **
           ** https://cssnano.co/optimisations/discardoverridden
           */
          discardOverridden: true,
          /*
           ** Удаляет at-правила, которые не имеют никакого отношения к файлу CSS
           **
           ** https://cssnano.co/optimisations/discardunused
           */
          discardUnused: false,
          /*
           ** Объединит правила, которые могут иметь несколько разные названия, 
           ** но делать то же самое
           **
           ** https://cssnano.co/optimisations/mergeidents
           */
          mergeIdents: false,
          /*
           ** Сворачивает длинные свойства в сокращенное представление и, где возможно, 
           ** также сворачивает верхние / правые / нижние / левые значения. 
           ** margin, paddingи borderlonghands.
           **
           ** https://cssnano.co/optimisations/mergelonghand
           */
          mergeLonghand: true,
          /*
           ** Объединяет смежные правила с помощью селекторов 
           ** и перекрывающихся пар свойство / значение
           **
           ** https://cssnano.co/optimisations/mergerules
           */
          mergeRules: true,
          /*
           ** Нормализует объявления шрифта и семейства шрифтов и может 
           ** преобразовывать ключевые слова жирности шрифта в числовые значения
           **
           ** https://cssnano.co/optimisations/minifyfontvalues
           */
          minifyFontValues: true,
          /*
           ** Убирает пробелы и нормализует параметры правила.
           **
           ** https://cssnano.co/optimisations/minifyparams
           */
          minifyParams: true,
          /*
           ** Нормализует параметры линейного и радиального градиента.
           **
           ** https://cssnano.co/optimisations/minifygradients
           */
          minifyGradients: true,
          /*
           ** Удаляет ненужные квалифицированные универсальные селекторы, 
           ** убирает кавычки атрибутов, обрезает и нормализует селекторные строки
           **
           ** https://cssnano.co/optimisations/minifyselectors
           */
          minifySelectors: true,
          /*
           ** Гарантирует, что @charsetв файле CSS присутствует только один элемент, 
           ** и перемещает его в верхнюю часть документа. Это предотвращает множественные, 
           ** недопустимые объявления, возникающие в результате простой конкатенации CSS. 
           ** Обратите внимание, что по умолчанию новые @charsetправила не будут добавлены в CSS.
           **
           ** https://cssnano.co/optimisations/normalizeCharset
           */
          normalizeCharset: true,
          /*
           ** Нормализует синтаксис двух значений для displayв синтаксис одного значения, 
           ** где это возможно.
           **
           ** https://cssnano.co/optimisations/normalizeDisplayValues
           */
          normalizeDisplayValues: true,
          /*
           ** Нормализует positionзначения в background, background-position, 
           ** -webkit-perspective-origin и perspective-origin свойства.
           **
           ** https://cssnano.co/optimisations/normalizePositions
           */
          normalizePositions: true,
          /*
           ** Сокращает синтаксис двух значений для background-repeatдо 
           ** синтаксиса с одним значением, где это возможно, как в самом 
           ** свойстве, так и в background сокращенном виде. 
           ** Также работает для mask-repeat.
           **
           ** https://cssnano.co/optimisations/normalizeRepeatStyle
           */
          normalizeRepeatStyle: true,
          /*
           ** Стандартизирует использование двойных (по умолчанию) или 
           ** одинарных строк в кавычках для лучшего сжатия gzip. 
           ** Можно также удалить разрывы строк, которые вставляются в 
           ** эстетических целях. Если вы предпочитаете одинарные кавычки, 
           ** вы можете установить preferredQuote: 'single'вместо.
           **
           ** https://cssnano.co/optimisations/normalizeString
           */
          normalizeString: true,
          /*
           ** Нормализует время перехода в animation, 
           ** animation-timing-function, transition и 
           ** transition-timing-function свойствах.
           **
           ** https://cssnano.co/optimisations/normalizeTimingFunctions
           */
          normalizeTimingFunctions: true,
          /*
           ** Эта оптимизация может преобразовывать unicode-range дескрипторы 
           ** для использования более коротких диапазонов подстановочных 
           ** знаков, когда конкретное значение соответствует критериям 
           ** подстановочных знаков. Значения будут преобразованы, когда код 
           ** совпадает 0 и находится fв одном и том же месте с обеих сторон диапазона. 
           ** Таким образом, u+2000-2fff может быть преобразован в u+2???, но u+2100-2fff останется как есть.
           **
           ** https://cssnano.co/optimisations/normalizeUnicode
           */
          normalizeUnicode: true,
          /*
           ** Нормализует строки URL. Он может удалить порты по умолчанию, 
           ** разрешить ненужный обход каталога и снять кавычки.
           **
           ** https://cssnano.co/optimisations/normalizeUrl
           */
          normalizeUrl: true,
          /*
           ** Удаляет пробелы внутри и вокруг правил, селекторов и объявлений, 
           ** а также удаляет последнюю точку с запятой внутри каждого селектора.
           **
           ** https://cssnano.co/optimisations/normalizeWhitespace
           */
          normalizeWhitespace: true,
          /*
           ** Свойства, затронутые этим преобразованием, могут принимать свои 
           ** аргументы в произвольном порядке. Этот модуль нормализует этот порядок, 
           ** облегчая дедупликацию.
           **
           ** https://cssnano.co/optimisations/orderedValues
           */
          orderedValues: true,
          /*
           ** Переименовывает в-правила, такие как @keyframes. Это может быть 
           ** потенциально небезопасно, если другие файлы JS / CSS используют данное правило.
           **
           ** https://cssnano.co/optimisations/reduceIdents
           */
          reduceIdents: false,
          /*
           ** Заменяет initial слово CSS на фактическое значение, 
           ** когда полученный результат меньше
           **
           ** https://cssnano.co/optimisations/reduceInitial
           */
          reduceInitial: true,
          /*
           ** Преобразует между функциями преобразования, когда существует сокращенный эквивалент.
           **
           ** https://cssnano.co/optimisations/reduceTransforms
           */
          reduceTransforms: true,
          /*
           ** Сжатие встроенных определений SVG с SVGO(https://github.com/svg/svgo).
           **
           ** https://cssnano.co/optimisations/svgo
           */
          svgo: false,
          /*
           ** Сортирует селекторы для каждого правила и удаляет дубликаты.
           **
           ** https://cssnano.co/optimisations/uniqueSelectors
           */
          uniqueSelectors: true,
          /*
           ** Перебазирует значения z-index. Это небезопасно, поскольку может 
           ** потенциально конфликтовать с другими таблицами стилей или стилями, 
           ** внедренными в JavaScript. Тем не менее, это безопасно, если ваш стековый 
           ** контекст был полностью извлечен в CSS.
           **
           ** https://cssnano.co/optimisations/ZIndex
           */
          ZIndex: false,
        }
      ]
    })
  ]
}
