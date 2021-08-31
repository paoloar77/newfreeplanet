const path = require('path');
const webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const helpers = require('./helpers');

const baseConfig = {
  entry: {
    bundle: path.resolve(__dirname, '/src/main.ts'),
  },
  output: {
    filename: '[nametranslate].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.vue',
    ],
    alias: {
      vue: '@vue/compat',
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@boot': path.resolve(__dirname, 'src/boot/*'),
      '@costanti': path.resolve(__dirname, 'src/store/Modules/costanti.ts'),
      '@views': path.resolve(__dirname, 'src/views/index.ts'),
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@classes': path.resolve(__dirname, 'src/classes/index.ts'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
      '@css': path.resolve(__dirname, 'src/styles/variables.scss'),
      '@router': path.resolve(__dirname, 'src/router/index.ts'),
      '@validators': path.resolve(__dirname, 'src/utils/validators.ts'),
      '@methods': path.resolve(__dirname, 'src/utils/methods.ts'),
      '@filters': path.resolve(__dirname, 'src/utils/filters.ts'),
      '@api': path.resolve(__dirname, 'src/store/Api/index.ts'),
      '@paths': path.resolve(__dirname, 'src/store/Api/ApiRoutes.ts'),
      '@storemod': path.resolve(__dirname, 'src/store/Modules/*'),
      '@store/*': path.resolve(__dirname, 'src/store/*'),
      '@modules': path.resolve(__dirname, 'src/store/Modules/index.ts'),
      '@model': path.resolve(__dirname, 'src/model/index.ts'),
    },
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
          postcss: {
            plugins: [cssNext()],
            options: {
              sourceMap: true,
            },
          },
          cssSourceMap: true,
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'sass-loader', {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, 'src/styles/variables.scss'),
                esModule: true,
              },
            }],
            ts: 'ts-loader',
          },
        },
      },
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
      },
    }, {
      test: /\.(jpe?g|png|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      use: 'base64-inline-loader?limit=1000&nametranslate=[nametranslate].[ext]',
    }, {
      test: /\.(svg)(\?[a-z0-9=&.]+)?$/,
      use: 'base64-inline-loader?limit=4000&nametranslate=[nametranslate].[ext]',
    },
    ],
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/images/logo_M.png'),
      persistentCache: true,
      inject: true,
      background: '#fff',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/assets'),
    }]),
  ],
};

module.exports = baseConfig;
