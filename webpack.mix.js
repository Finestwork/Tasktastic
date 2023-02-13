const mix = require('laravel-mix');
require('laravel-mix-clean');

if (mix.inProduction()) {
    mix.clean({
        cleanOnceBeforeBuildPatterns: ['assets/css/**/*', 'assets/js/**/*'],
    });
    mix.options({
        terser: {
            extractComments: false,
        },
    });
}

mix.browserSync({
    proxy: '127.0.0.1:8000',
    open: false,
    notify: false,
});
mix.disableNotifications();
mix.sourceMaps(false, 'inline-source-map');

mix.js('resources/js/index.js', 'public/assets/js').vue({version: 3});

