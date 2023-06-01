import useECharts from '@/hooks/useECharts';
import { Table, message } from 'antd';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import { TMapData, TNodeInfo } from '../../type';
import { geoJson } from './geojson';
import styles from './index.less';

// 颜色常量
const COLOR = {
  // 区域颜色，区域所有节点不可用
  AREA_DISABLE: '#efa0bc',
  // 区域颜色，未覆盖、区域无节点
  AREA_NO_COVER: '#dff0fb',
  // 区域颜色，区域有节点，有节点可用
  AREA_ENABLE: '#2bbaed',
  // 节点颜色，节点不可用
  NODE_DISABLE: '#f73841',
  // 节点颜色，节点可用
  NODE_ENABLE: '#00ffff',
};

const DEFAULT_OPTION = {
  tooltip: {
    trigger: 'item',
  },
  // dataRange: {
  //   left: 10,
  //   bottom: 10,
  //   icon: 'circle',
  //   align: 'left',
  //   splitList: [
  //     {
  //       start: 0,
  //       end: 0,
  //       label: '无机房',
  //       color: COLOR.AREA_NO_COVER,
  //     },
  //     {
  //       start: 1,
  //       end: 1,
  //       label: '有机房，且有节点可用',
  //       color: COLOR.AREA_ENABLE,
  //     },
  //     {
  //       start: 2,
  //       end: 2,
  //       label: '有机房，但所有节点不可用',
  //       color: COLOR.AREA_DISABLE,
  //     },
  //   ],
  // },

  visualMap: {
    type: 'piecewise',
    left: 10,
    bottom: 10,
    pieces: [
      {
        min: 0,
        max: 0,
        label: '无机房',
        color: COLOR.AREA_NO_COVER,
      },
      {
        start: 1,
        end: 1,
        label: '有机房，且有节点可用',
        color: COLOR.AREA_ENABLE,
      },
      {
        start: 2,
        end: 2,
        label: '有机房，但所有节点不可用',
        color: COLOR.AREA_DISABLE,
      },
      {
        start: 3,
        end: 3,
        label: '节点可用',
        color: COLOR.NODE_ENABLE,
      },
      {
        start: 4,
        end: 4,
        label: '节点不可用',
        color: COLOR.NODE_DISABLE,
      },
    ],
  },
};

// 处理地图背景根据节点的带宽占比变化及节点状态，输出 geo 中的 regions
const getRegions = (mapList: TMapData[]) => {
  const regions: any[] = [];
  mapList.forEach((item) => {
    // 先判别是否有节点信息，以及所有节点是否都可用
    const hasNode = item.nodeInfo.length > 0;
    const allNodeEnable = item.nodeInfo.every((node) => node.state === 1);
    if (hasNode && !allNodeEnable) {
      regions.push({
        name: item.name,
        itemStyle: {
          areaColor: COLOR.AREA_DISABLE,
        },
      });
    } else if (hasNode) {
      // 判断有节点，且有节点可用
      regions.push({
        name: item.name,
        itemStyle: {
          areaColor: COLOR.AREA_ENABLE,
        },
      });
    } else {
      regions.push({
        name: item.name,
        itemStyle: {
          areaColor: COLOR.AREA_NO_COVER,
        },
      });
    }
  });

  return regions;
};

// 预处理地图数据中的 value ,让其根据节点中的状态相关联
// 0：无机房，1：有机房，且有节点可用，2：有机房，但所有节点不可用
const getProcessedMapData = (mapList: TMapData[]): TMapData[] => {
  const mapData: TMapData[] = [];
  mapList.forEach((item) => {
    const hasNode = item.nodeInfo.length > 0;
    const allNodeEnable = item.nodeInfo.every((node) => node.state === 1);
    if (hasNode && !allNodeEnable) {
      mapData.push({
        ...item,
        value: 2,
      });
    } else if (hasNode) {
      mapData.push({
        ...item,
        value: 1,
      });
    } else {
      mapData.push({
        ...item,
        value: 0,
      });
    }
  });

  return mapData;
};

// 获取series中的data数据，为所有节点的数据，value 为 【经度，纬度，状态】
const getSeriesData = (nodeList: TNodeInfo[]) => {
  const seriesData: any[] = [];
  nodeList.forEach((node) => {
    seriesData.push({
      name: node.name,
      value: [...node.coords, node.state === 1 ? 3 : 4],
      info: node,
    });
  });

  return seriesData;
};

const EMap = ({
  mapList,
  nodeList,
  clickItem,
  hoverItem,
}: {
  mapList: TMapData[];
  nodeList: TNodeInfo[];
  clickItem: string;
  hoverItem: string;
}) => {
  const [ref, chart] = useECharts({
    options: DEFAULT_OPTION,
  });

  // 地图是否被选中状态
  const [selectedMap, setSelectedMap] = useState(false);

  useEffect(() => {
    message.info('clickItem' + clickItem);
  }, [clickItem]);

  const initMap = async (mapList: TMapData[]) => {
    // 根据mapList中的数据，设置地图；
    // 1. 地图上区域的颜色
    // 2. 地图上节点标记的位置及颜色
    const mapData = getProcessedMapData(mapList);
    const regions = getRegions(mapData);
    // 获取series中的data数据，为所有节点的数据，value 为 【经度，纬度，状态】
    const seriesData = getSeriesData(nodeList);

    echarts.registerMap('china', { geoJSON: geoJson });
    if (chart) {
      chart.setOption({
        geo: {
          map: 'china',
          // zoom: 1.1,
          roam: true,
          layoutSize: '100%',
          layoutCenter: ['50%', '50%'],
          itemStyle: {
            areaColor: COLOR.AREA_NO_COVER,
          },
          regions: regions,
        },

        series: [
          {
            type: 'map',
            name: '中国地图',
            geoIndex: 0,
            data: mapData,
            selectedMode: 'multiple',
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
            data: seriesData,
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
              color: COLOR.NODE_DISABLE,
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

  // 此为初始状态下，根绝node
  useEffect(() => {
    if (!chart) return;
    (async () => {
      await initMap(mapList);
    })();

    chart.on('click', function (params) {
      // console.log('params', params);
      // message.info('用户点击了地图上的区域：' + params.name);
    });

    // 监听选中区域的事件
    chart.on('selectchanged', function (params) {
      console.log('params', params);
      setSelectedMap(params.fromAction === 'select');
      message.info('用户选中了地图上的区域：' + params.fromAction);
    });
  }, [chart]);

  return (
    <div className={styles.map_wrapper}>
      <div style={{ width: '100%', height: '600px' }} ref={ref}></div>
      <div
        className={styles.node_panel}
        style={{ display: selectedMap ? 'block' : 'none' }}
      >
        {/* <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>覆盖</div>
          <div className={styles.value}></div>
        </div>
      </div> */}

        <Table
          dataSource={[
            {
              key: '1',
              name: '胡彦斌',
              value: 32,
            },
            {
              key: '2',
              name: '胡彦祖',
              value: 42,
            },
          ]}
          columns={[
            {
              title: '覆盖区域的节点',
              dataIndex: 'name',
            },
            {
              title: '区域带宽',
              dataIndex: 'value',
            },
          ]}
          pagination={false}
          bordered
          size="small"
          summary={(pageData) => {
            let total = pageData.reduce((sum, { value }) => sum + value, 0);
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>{total}</Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default EMap;
