import useECharts from '@/hooks/useECharts';
import { message } from 'antd';
import * as echarts from 'echarts';
import { useEffect } from 'react';
import { mapData } from './data';
import { geoJson } from './geojson';

const DEFAULT_OPTION = {
  // visualMap: [
  //   {
  //     min: 0,
  //     max: 1000,
  //     left: 'left',
  //     top: 'bottom',
  //     text: ['高', '低'],
  //     calculable: false,
  //     orient: 'horizontal',
  //     inRange: {
  //       color: ['#e0ffff', '#006edd'],
  //     },
  //   },
  // ],
  tooltip: {
    trigger: 'item',
  },
};

const EMap = () => {
  const [ref, chart] = useECharts({
    options: DEFAULT_OPTION,
  });

  const initMap = async () => {
    echarts.registerMap('china', { geoJSON: geoJson });
    if (chart) {
      chart.setOption({
        geo: {
          map: 'china',
          zoom: 2,
          roam: true,
        },
        series: [
          {
            type: 'map',
            name: '中国地图',
            geoIndex: 0,
            data: mapData,
            selectedMode: 'multiple',
            itemStyle: {
              color: '#0f0',
            },
            tooltip: {
              formatter: (params) => {
                return `<div class="custom-tooltip">
               <div>
                  <div class="flex">
                    <p class="label"> wx-01 </p>
                    <p class="value">${params.value}</p>
                  </div>
                  <div class="flex">
                    <p class="label"> fj-01 </p>
                    <p class="value">${params.value}</p>
                  </div>
                  <div class="flex">
                    <p class="label"> huangzhou </p>
                    <p class="value">${params.value}</p>
                  </div>
                  <div class="flex">
                    <p class="label"> wuyuan-01 </p>
                    <p class="value">${params.value}</p>
                  </div>
               </div>
               <style>
               .flex {
                  display: flex;
               }
                .label {
                  width: 100px;
                  text-align: left;
                }
               </style>
               </div>`;
              },
            },
          },
          {
            name: '节点地图',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [
              {
                name: '上海陆家嘴-节点1',
                value: [121.47, 31.53, 55],
              },
              {
                name: '北京-节点1',
                value: [116.4, 39.9, 110],
              },
              {
                name: '重庆-节点1',
                value: [106.55, 29.56, 32], // value的前两项是经纬度坐标，第三项为污染度数据
              },
            ],
            effectType: 'ripple',
            showEffectOn: 'render',
            rippleEffect: {
              period: 10, // 动画的周期，秒数
              scale: 10, // 动画中波纹的最大缩放比例
              brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'
            },
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              color: (params) => {
                if (params.value[2] > 100) {
                  return '#f00';
                }
                return '#0f0';
              },
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
            },
            emphasis: {
              scale: 1.5,
            },
          },
        ],
      });
    }
  };

  // https://pic2.58cdn.com.cn/nowater/webim/big/n_v2685971145f924e49a6036b1628d6cd27.png
  // https://pic2.58cdn.com.cn/nowater/webim/big/n_v2ff0a5aea136e4372842b33795559a1b5.png

  useEffect(() => {
    if (!chart) return;
    (async () => {
      await initMap();
    })();

    chart.on('click', function (params) {
      console.log('params', params);
      message.info('用户点击了地图上的区域：' + params.name);
    });
  }, [chart]);

  return <div style={{ width: '100%', height: '600px' }} ref={ref}></div>;
};

export default EMap;
