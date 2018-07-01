'use strict';

/**
 * Webpack Config
 */
const fs = require('fs');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Make sure any symlinks in the project folder are resolved:

// plugins
// const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/styles'),
  varFile: path.join(__dirname, './src/styles/global/variables.less'),
  mainLessFile: path.join(__dirname, './src/styles/styles.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@heading-color',
    '@text-color',
    '@text-color-secondary',
    '@layout-header-background',
    '@layout-footer-background',
    '@body-background'
  ],
  indexFileName: 'public/index.html',
};

const themePlugin = new AntDesignThemePlugin(options);


// the path(s) that should be cleaned
let pathsToClean = [
  'dist',
  'build'
];

// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: false, // Write logs to console.
  dry: false
};

const ROOT = path.resolve(__dirname, './');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}
module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    // The build folder.
    path: path.resolve(__dirname, 'dist'),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'assets/[name].[hash:8].js',
    chunkFilename: 'assets/[name].[hash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
  },
  cache: true,
  devtool: "source-map", // enum  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  target: "web", // enum

  devServer: {
    contentBase: './src/index.js', // boolean | string | array, static file location
    port: 3000,
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      }, {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: path.join(__dirname, './.babelrc'),
            cacheDirectory: true
          }
        }
      }
    ]
  },
  // resolve alias (Absolute paths)
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/actions/'),
      appRedux: path.resolve(__dirname, 'src/appRedux/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      container: path.resolve(__dirname, 'src/container/'),
      mock: path.resolve(__dirname, 'src/mock/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      lngProvider: path.resolve(__dirname, 'src/lngProvider/'),
      util: path.resolve(__dirname, 'src/util/')
    },
    extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    themePlugin,
    new CopyWebpackPlugin([
      {
        from: root('src/assets'),
        to: root('dist/assets')
      }
    ]),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: './public/favicon.ico',
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "static/css/[name].[hash:8].css"
    })
  ]
};
