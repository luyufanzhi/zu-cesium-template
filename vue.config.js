/*
 * @Author: wangchaoxu
 * @Date: 2020-05-12 17:17:38
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-16 15:42:53
 * @Description: vue配置文件
 */
'use strict';
const path = require('path');
const cesiumSource = './node_modules/cesium/Source'; //cesium的目录
const webpack = require('webpack');
const CopywebpackPlugin = require('copy-webpack-plugin'); //复制文件
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //gzip压缩
const TerserPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'json', 'txt'];
const env = process.env.NODE_ENV;
let resolve = dir => {
  return path.resolve(__dirname, dir);
};
console.log(`==========当前运行环境:${env}=========`);
module.exports = {
  publicPath: env === 'production' ? './' : './',
  productionSourceMap: env === 'development',
  devServer: {
    host: '0.0.0.0',
    open: true,
    hot: true,
    port: 3000,
    proxy: {
      '/baiduApi': {
        target: 'https://restapi.amap.com', //访问地址
        changeOrigin: true,
        secure: false, //只有代理https 地址需要次选项
        logLevel: 'debug', //可以打印出代理后请求的
        pathRewrite: {
          '^/baiduApi': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if (env === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }),
        new TerserPlugin({
          extractComments: true,
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            extractComments: 'all',
            compress: {
              drop_console: true
            }
          }
        })
      );
    }
  },
  chainWebpack: config => {
    config.resolve.extensions.add('.js').add('.vue');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@images', resolve('src/images'))
      .set('@cmp', resolve('src/components'))
      .set('@views', resolve('src/views'));
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        { from: path.join(cesiumSource, 'Workers'), to: 'resources/Workers' },
        { from: path.join(cesiumSource, 'Assets'), to: 'resources/Assets' },
        { from: path.join(cesiumSource, 'Widgets'), to: 'resources/Widgets' },
        {
          from: path.join(cesiumSource, 'ThirdParty'),
          to: 'resources/ThirdParty'
        }
      ]
    ]);
    config.plugin('define').use(webpack.DefinePlugin, [{ CESIUM_BASE_URL: JSON.stringify('./resources/') }]);
    if (env === 'production') {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch');
      // 移除 preload 插件
      config.plugins.delete('preload');
    }
  }
};
