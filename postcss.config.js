module.exports = (env) => {
    const PLUGINS = [];

    const CSSNANO_CONFIG =
        env.mode === 'production'
            ? require('cssnano')({ preset: 'advanced' })
            : require('cssnano')({
                  preset: [
                      'advanced',
                      {
                          normalizeWhitespace: false,
                          discardComments: false,
                          reduceIdents: false,
                          zindex: false,
                      },
                  ],
              });

    const PURGE_CSS = require('@fullhuman/postcss-purgecss')({
        content: [
            './resources/views/**/*.blade.php',
            './resources/js/**/*.vue',
        ],
        defaultExtractor(content) {
            const contentWithoutStyleBlocks = content.replace(
                /<style[^]+?<\/style>/gi,
                ''
            );
            return (
                contentWithoutStyleBlocks.match(
                    /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
                ) || []
            );
        },
        safelist: [
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!(|.*?:)cursor-move).+-move$/,
            /^router-link(|-exact)-active$/,
            /data-v-.*/,
        ],
    });

    if (env.mode === 'production') {
        PLUGINS.push(PURGE_CSS);
    }
    PLUGINS.push(CSSNANO_CONFIG);

    return {
        plugins: PLUGINS,
    };
};
