// eslint-disable-next-line no-undef
module.exports = {
  webpack(config, options) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.graphql$/,
            exclude: /node_modules/,
            use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
          },
          {
            test: /\.graphqls$/,
            exclude: /node_modules/,
            use: ['graphql-let/schema/loader'],
          },
          {
            test: /\.ya?ml$/,
            type: 'json',
            use: 'yaml-loader',
          },
        ],
      },
    }
  },
}
