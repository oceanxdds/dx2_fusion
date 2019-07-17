const mix = require('laravel-mix');
//require('laravel-mix-bundle-analyzer');
require('laravel-mix-polyfill');

mix
  .js('src/js/index.js', 'dist/bundle.js')
  .sass('src/scss/app.scss', 'dist/bundle.css')
  .options({
    processCssUrls: false
  })
  .extract()
  .webpackConfig({
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm.js',
      },
    },
  })
  .polyfill({
    enabled: true,
    useBuiltIns: "usage",
    targets: {"ie": 11}
  });

  //mix.bundleAnalyzer();