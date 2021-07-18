/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const webpack = require('webpack');
const fs = require('fs')
const path = require('path')
const withOptimizedImages = require('next-optimized-images');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('static/styles.css');
const withFonts = require('next-fonts')
const zopfli = require('@gfx/zopfli');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withTypescript = require('@zeit/next-typescript')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const MergeLessPlugin = require('antd-pro-merge-less');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const outFile = path.join(__dirname, '.temp/ant-design-pro.less');
const stylesDir = path.join(__dirname, './src');

const isProd = process.env.NODE_ENV === 'production'

if (process.env.NODE_ENV === "production") {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.production') });
} else {
  require('dotenv').config();
}

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let extractCssInitialized = false

const cssLoaderConfig = ({
  cssModules = false,
  dev,
  isServer,
  cssLoaderOptions = {},
  loaders = []
}) => {

  // We have to keep a list of extensions for the splitchunk config

  let postcssLoader;

  const cssLoader = {
    loader: isServer ? 'css-loader/locals' : 'css-loader',
    options: Object.assign(
      {},
      {
        modules: cssModules,
        minimize: !dev,
        sourceMap: dev,
        importLoaders: loaders.length + (postcssLoader ? 1 : 0)
      },
      cssLoaderOptions
    )
  }

  // When not using css modules we don't transpile on the server
  if (isServer && !cssLoader.options.modules) {
    return ['ignore-loader']
  }

  // When on the server and using css modules we transpile the css
  if (isServer && cssLoader.options.modules) {
    return [cssLoader, postcssLoader, ...loaders].filter(Boolean)
  }

  return [
    !isServer && dev && 'extracted-loader',
    !isServer && MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    ...loaders
  ].filter(Boolean)
}

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => { }
}

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)
// console.log("themeVariables: ", themeVariables)

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { }
}

const cssLoaderOptions = {
  modules: true,
  getLocalIdent: (context, localIdentName, localName) => {
    if (
      context.resourcePath.includes('node_modules') ||
      context.resourcePath.includes('ant.design.pro.less') ||
      context.resourcePath.includes('global.less')
    ) {
      return localName;
    }
    const match = context.resourcePath.match(/(layouts|pages|componentDashs)(.*)/);
    // console.log("cdfsfdsfdfd match: %o", match)
    if (match && match[1] && match[0].indexOf('.less') !== -1) {
      const antdProPath = match[0].replace('.less', '');
      const arr = antdProPath
        .split('/')
        .map(a => a.replace(/([A-Z])/g, '-$1'))
        .map(a => a.toLowerCase());
      // console.log("cdfsfdsfdfd arr: ", arr)
      return `antd-pro-${arr.join('-')}-${localName}`.replace(/--/g, '-');
    }
    return localName;
  }
};

const lessLoaderOptions = {
  javascriptEnabled: true,
  modifyVars: {
    navTheme: 'dark', // theme for nav menu
    primaryColor: '#1890FF', // primary color of ant design
    layout: 'sidemenu', // nav menu position: sidemenu or topmenu
    contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: false, // sticky header
    autoHideHeader: false, // auto hide header
    fixSiderbar: false, // sticky siderbar
    ...themeVariables // make your antd custom effective
  }
};

module.exports = withTypescript(withFonts(withOptimizedImages({
  // useFileSystemPublicRoutes: false,
  assetPrefix: isProd ? process.env.APP_URL : '',
  publicRuntimeConfig: {
    ...process.env,
    APP_NAME: process.env.APP_NAME,
    APP_TYPE: process.env.APP_TYPE,
    PORT: process.env.PORT,
    APP_URL: process.env.APP_URL,
    CSS_URL: process.env.CSS_URL,
    API_SERVER: process.env.API_SERVER,
    IMAGE_SERVER: process.env.IMAGE_SERVER,
    SITE_SAN_PHAM: process.env.SITE_SAN_PHAM,
    SITE_THONG_TIN: process.env.SITE_THONG_TIN,
  },
  lessLoaderOptions,
  cssModules: true,
  cssLoaderOptions,
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.devtool = 'source-map'
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }


    const fileExtensions = new Set()
    const extensions = ['less', 'css']
    for (const extension of extensions) {
      fileExtensions.add(extension)
    }

    config.module.rules.push({
      test: /\.less$/,
      use: cssLoaderConfig({
        cssModules: true,
        dev,
        isServer,
        cssLoaderOptions,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      }),
      exclude: [
        /node_modules/
      ],
    })

    config.module.rules.push({
      test: /\.css$/,
      use: cssLoaderConfig({
        dev,
        isServer,
        cssLoaderOptions
      }),
      /* include: [
        /components/
      ], */
      exclude: [
        /node_modules/
      ],
    })

    config.module.rules.push({
      test: /\.(less|css)$/,
      use: cssLoaderConfig({
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ],
        cssLoaderOptions
      }),
      include: [
        /node_modules/
      ],
    })



    if (!isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: new RegExp(`\\.+(${[...fileExtensions].join('|')})$`),
        chunks: 'all',
        enforce: true
      }
    }

    if (!isServer && !extractCssInitialized) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: dev
            ? 'static/css/[name].css'
            : 'static/css/[name].[contenthash:8].css',
          chunkFilename: dev
            ? 'static/css/[name].chunk.css'
            : 'static/css/[name].[contenthash:8].chunk.css'
        })
      )
      extractCssInitialized = true
    }


    /* config.resolve.alias['redux-cookies-middleware'] = path.join(
      __dirname,
      'packages',
      'redux-cookies-middleware',
      'src',
    ) */
    config.resolve.alias['dva'] = path.join(
      __dirname,
      'node_modules',
      'dva-no-router'
    )
    config.resolve.alias['dva'] = path.join(
      __dirname,
      'lib',
    )
    config.resolve.plugins = [
      ...config.resolve.plugins || [],
      new TsConfigPathsPlugin(),
    ],

      config.plugins.push(new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }))
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.browser': 'true'
      })
    )
    if (isProd) {
      config.mode = "production"
      config.plugins.push(new CopyWebpackPlugin([
        { from: './static', to: 'static' },
       // { from: './static/fonts', to: 'static/fonts' },
       // { from: './static/css', to: 'static/css' },
      ],
        { copyUnmodified: false }
      ))

      /* config.plugins.push(
        new CompressionPlugin({
          cache: true,
          compressionOptions: {
            numiterations: 15
          },
          // test: /\.js$|\.css$|\.html$/,
          // threshold: 10240,
          // minRatio: 0.8, 
          // asset: "[path].gz[query]",
          // algorithm: "gzip",
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          }
        })
      ); */
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^http?.*/
            }
          ]
        })
      )
    } 
    // else {
    //   config.plugins.push(new CopyWebpackPlugin([
    //     { from: './static/dashBoard/images', to: 'static/images' },
    //   ],
    //     { copyUnmodified: false }
    //   ))
    // }

    config.plugins.push(new MergeLessPlugin({
      stylesDir,
      outFile,
    }));

    config.plugins.push(new AntDesignThemePlugin(
      {
        antDir: path.join(__dirname, './node_modules/antd'),
        stylesDir,
        varFile: path.join(__dirname, './node_modules/antd/lib/style/themes/default.less'),
        mainLessFile: outFile, //     themeVariables: ['@primary-color'],
        indexFileName: 'index.html',
        generateOne: true,
        lessUrl: 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js',
      },
    ));

    return config
  }
})))
