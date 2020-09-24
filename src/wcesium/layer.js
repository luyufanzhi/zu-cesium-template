/*
 * @Author: wangchaoxu
 * @Date: 2020-07-16 16:47:59
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-24 10:09:56
 * @Description:图层添加
 */
//需要安装@dvgis/cesium-map,然后在mian.js中引入 import('@dvgis/cesium-map/build/cesium-map/cesium-map.min');
import config from './config';
import { for2 } from './core';
import { TdtImageryProvider } from 'w-cesium-basemap';
/**
 * @description: 添加图层
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
function addLayer(viewer) {
  removeAllLayer(viewer);
  let imgLayer = {
    style: 'default',
    layer: 'img_w',
    type: 'img',
    name: '图层',
    key: config.TIANDITU_KAY
  };
  viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(imgLayer));
  var ciaLayer = {
    layer: 'cia_w',
    style: 'default',
    type: 'cia',
    key: config.TIANDITU_KAY
  };
  viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(ciaLayer));
}
/**
 *  获取所有图层
 * @param {Object}  viewer对象
 * @return: {Array} 图层集合
 * @author: wangchaoxu
 */
function getAllLayer(viewer) {
  return viewer.imageryLayers._layers;
}
/**
 * 根据属性获取图层
 * @param {Object}  viewer对象
 * @param {String}  attr 参照属性
 * @param {String}  vval 参照属性值
 * @return:{Array}  符合属性的图层
 * @author: wangchaoxu
 */
function getLayerByAttr(viewer, attr, val) {
  const layers = getAllLayer(viewer);
  return layers.filter(item => item[attr] == val);
}

/**
 *删除所有图层
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
function removeAllLayer(viewer) {
  viewer.imageryLayers.removeAll();
}
/**
 * 根据属性删除图层
 * @param {type}
 * @return:
 * @author: wangchaoxu
 */
function removeLayerByAttr(viewer, attr, val) {
  const layers = getAllLayer(viewer);
  for2(layers, item => {
    if (item[attr] === val) viewer.imageryLayers.remove(item);
  });
}

export { addLayer, getAllLayer, getLayerByAttr, removeAllLayer, removeLayerByAttr };
