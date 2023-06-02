import useECharts from '@/hooks/useECharts';
import { useDebounceEffect, useReactive } from 'ahooks';
import { Table, message } from 'antd';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { cityMapData } from '../../data';
import { TMapData, TNodeInfo } from '../../type';
import { COLOR, DEFAULT_OPTION } from './config';
import styles from './index.less';

const enum ShowCardSource {
  // 区域
  AREA,
  // 节点
  NODE,
}

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

// 处理获取区域的 tooltip
const formatAreaTooltip = (params: any) => {
  const data = params.data as TMapData;
  const { name, nodeInfo } = data || {};
  if (!name) return;

  const hasNode = nodeInfo.length > 0;
  let str = '';

  // 渲染出每个节点的信息，使用table渲染，表格thead为： 覆盖区域的节点、区域带宽、节点状态
  if (hasNode) {
    const body = nodeInfo.map((node) => {
      return `<tr>
      <td>
      <span style="display: inline-block; margin-right: 5px; border-radius: 50%; width: 10px; height: 10px; background-color: ${
        node.state === 1 ? COLOR.NODE_ENABLE : COLOR.NODE_DISABLE
      }"></span>
      ${node.title}
      </td>
      <td>${node.bandwidth}Mbps</td>
    </tr>
    `;
    });

    // 总计
    const total = nodeInfo.reduce((acc, cur) => {
      return acc + cur.bandwidth;
    }, 0);

    // 表格最后一行，显示总计
    body.push(`<tr>
                <td>区域带宽总量</td>
                <td>${total}Mbps</td>
              </tr>`);

    str = `<table>
            <thead>
              <tr>
                <th>覆盖区域的节点</th>
                <th>区域带宽</th>
              </tr>
            </thead>
            <tbody>
              ${body.join('')}
            </tbody>
          </table>
          <style>
            th {
                padding: 2px 10px 2px 0;
                min-width: 60px;
              }
          </style>
          `;

    return `${str}`;
  }

  return `${name}：无节点`;
};

// 处理节点的 tooltip
const formatNodeTooltip = (params: any) => {
  const data = params.data.info as TNodeInfo;
};

// 获取地理数据
const getGeoJson = async (adcode = 100000) => {
  try {
    const res = await fetch(
      `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    message.error('获取地理数据失败');
  }
};

// 处理节点数据 得到 series 中的 data、
const getMapData = () => {};

const echartsMapClick = () => {};

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

  // 是否显示卡片提示
  const [showCardTip, setShowCardTip] = useState(false);
  // 地图数据
  const mapListDataRef = useRef<TMapData[]>([]);
  // 显示卡片的来源, 1: 区域，2：节点
  const [cardSource, setCardSource] = useState<ShowCardSource>(
    ShowCardSource.NODE,
  );
  // 选中的节点或区域
  const selectedData = useReactive<{
    type: ShowCardSource;
    data: TMapData | TNodeInfo | null;
  }>({
    type: ShowCardSource.NODE,
    data: null,
  });

  const initEcharts = async (
    mapList: TMapData[],
    adcode = 100000,
    mapName = 'china',
  ) => {
    // 根据mapList中的数据，设置地图；
    // 1. 地图上区域的颜色
    // 2. 地图上节点标记的位置及颜色
    const mapData = getProcessedMapData(mapList);
    mapListDataRef.current = mapData;
    const regions = getRegions(mapData);
    console.log('mapData', mapData)
    const nodeList = mapData.reduce((acc, cur) => acc.concat(cur.nodeInfo), []);
    // 获取series中的data数据，为所有节点的数据，value 为 【经度，纬度，状态】
    const seriesData = getSeriesData(nodeList);
    // 可用节点数据
    const enableNodeData = seriesData.filter((item) => item.value[2] === 3);
    // 不可用节点数据
    const disableNodeData = seriesData.filter((item) => item.value[2] === 4);

    const json = await getGeoJson(adcode);

    echarts.registerMap(mapName, json);
    if (chart) {
      chart.setOption(
        {
          ...DEFAULT_OPTION,
          geo: {
            map: mapName,
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
              name: mapName,
              geoIndex: 0,
              data: mapData,
              selectedMode: 'multiple',
              tooltip: {
                formatter: formatAreaTooltip,
              },
            },
            {
              name: '可用节点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: enableNodeData,
              effectType: 'ripple',
              showEffectOn: 'render',
              rippleEffect: {
                period: 10, // 动画的周期，秒数
                scale: 10, // 动画中波纹的最大缩放比例
                brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'
              },
              symbolSize: 2,
              symbol: 'circle',
              label: {
                formatter: '{b}',
                position: 'right',
                show: true,
                padding: [0, 0, 0, 5],
              },
              tooltip: {
                formatter: formatNodeTooltip,
              },
              emphasis: {
                scale: 1.5,
              },
            },
            {
              name: '不可用节点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: disableNodeData,
              effectType: 'ripple',
              showEffectOn: 'render',
              rippleEffect: {
                period: 1, // 动画的周期，秒数
                scale: 20, // 动画中波纹的最大缩放比例
                brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'
              },
              symbolSize: 6,
              symbol: 'circle',
              label: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
              tooltip: {
                formatter: formatNodeTooltip,
              },
              emphasis: {
                scale: 1.5,
              },
            },
          ],
        },
        true,
      );
    }
  };

  // https://pic2.58cdn.com.cn/nowater/webim/big/n_v2685971145f924e49a6036b1628d6cd27.png
  // https://pic2.58cdn.com.cn/nowater/webim/big/n_v2ff0a5aea136e4372842b33795559a1b5.png

  // 记录历史选中的区域，为了动态派发取消选中的事件
  const selectedHistory = useRef<any>(null);

  // 此为初始状态下，根绝node
  useEffect(() => {
    if (!chart) return;
    (async () => {
      await initEcharts(mapList);
    })();
  }, [chart]);

  // echarts 点击事件
  const echartsMapClick = async (params: any) => {
    if (!chart) return;
    if (params.data?.adcode) {
      initEcharts(cityMapData, params.data.adcode, params.data.name);
    }
  };

  // 双击事件
  const onMapDblClick = (e) => {
    initEcharts(mapList);
  };

  // getGetJson
  // getMapData
  // initEcharts
  // echartsMapClick

  // 注册事件
  useEffect(() => {
    if (!chart) return;

    chart.off('click');
    chart.on('click', echartsMapClick);

    chart.on('dblclick', () => {
      message.info('用户双击了地图');
    });

    // 监听选中区域的事件
    chart.off('selectchanged');
    chart.on('selectchanged', function (params) {
      if (params.fromAction === 'select') {
        selectedHistory.current = {
          index: params.fromActionPayload.dataIndexInside,
          name: params.fromActionPayload.name,
        };
      }
    });
  }, [chart]);

  // 清除选中的区域
  const clearSelectedArea = (chart) => {
    const { index, name } = selectedHistory.current || {};
    if (!index && !name) return;
    if (name) {
      chart.dispatchAction({
        type: 'unselect',
        name: name,
      });
    } else {
      chart.dispatchAction({
        type: 'unselect',
        dataIndex: index,
      });
    }
  };

  // 监听列表点击事件，选中区域
  useEffect(() => {
    if (!chart) return;
    // 查找到该节点的数据
    const nodeData = nodeList.find((item) => item.title === clickItem);

    if (clickItem) {
      // 先清除上一次选中的区域
      clearSelectedArea(chart);
      // 1. 设置选中的区域
      chart.dispatchAction({
        type: 'select',
        name: nodeData?.coverArea,
      });
    } else {
      clearSelectedArea(chart);
    }
  }, [clickItem]);

  // 监听列表hover事件，选中区域
  useDebounceEffect(
    () => {
      if (!chart || clickItem) return;
      // 查找到该节点的数据
      const nodeData = nodeList.find((item) => item.title === hoverItem);

      if (hoverItem) {
        // 先清除上一次选中的区域
        clearSelectedArea(chart);
        // 1. 设置选中的区域
        chart.dispatchAction({
          type: 'select',
          name: nodeData?.coverArea,
        });
      } else {
        clearSelectedArea(chart);
      }
    },
    [hoverItem],
    {
      wait: 100,
    },
  );

  // 监听处理信息展示卡片，hover 或 click
  useDebounceEffect(
    () => {
      if (hoverItem || clickItem) {
        setShowCardTip(true);
        setCardSource(ShowCardSource.NODE);
      } else {
        setShowCardTip(false);
      }
    },
    [hoverItem, clickItem],
    {
      wait: 100,
    },
  );

  const cardTable = useReactive<{
    dataSource: any[];
    columns: any[];
  }>({
    dataSource: [],
    columns: [],
  });

  // 设置节点card显示数据
  const setNodeCardData = () => {
    const nodeData = nodeList.find((item) =>
      [clickItem, hoverItem].includes(item.title),
    );
    // 得到该节点覆盖的区域名称
    const { coverArea } = nodeData || { coverArea: [] };
    // 通过区域名称查找到该区域该节点的带宽
    const areaData = coverArea.map((item, i) => {
      // 找到该区域
      const area = mapListDataRef.current.find((area) => area.name === item);
      // 找到该节点
      const node = area?.nodeInfo.find((node) =>
        [clickItem, hoverItem].includes(node.title),
      );

      return {
        key: i + '-area',
        name: item,
        value: node?.bandwidth,
      };
    });
    cardTable.dataSource = areaData;

    cardTable.columns = [
      {
        title: '覆盖区域的节点',
        dataIndex: 'name',
      },
      {
        title: '区域带宽',
        dataIndex: 'value',
      },
    ];
  };

  // 处理卡片的显示数据
  useDebounceEffect(
    () => {
      if (!showCardTip) return;
      // 显示数据
      if (cardSource === ShowCardSource.AREA) {
        // 1. 区域被选中,覆盖区域的节点及区域带宽
      } else {
        // 2. 节点被选中,显示该节点覆盖的地区名称及地区在该节点带宽
        // 如果 click 有值，优先显示 click 的数据，不触发 hover 的数据显示
        setNodeCardData();
      }
    },
    [showCardTip, cardSource, clickItem],
    {
      wait: 100,
    },
  );

  // 处理卡片的显示数据
  useDebounceEffect(
    () => {
      if (!showCardTip || clickItem) return;
      // 显示数据
      if (cardSource === ShowCardSource.AREA) {
        // 1. 区域被选中,覆盖区域的节点及区域带宽
      } else {
        // 2. 节点被选中,显示该节点覆盖的地区名称及地区在该节点带宽
        // 如果 click 有值，优先显示 click 的数据，不触发 hover 的数据显示
        setNodeCardData();
      }
    },
    [showCardTip, cardSource, clickItem, hoverItem],
    {
      wait: 100,
    },
  );

  return (
    <div className={styles.map_wrapper}>
      <div
        style={{ width: '100%', height: '600px' }}
        ref={ref}
        onDoubleClick={onMapDblClick}
      ></div>
      <div
        className={styles.node_panel}
        style={{
          display:
            showCardTip && cardTable.dataSource.length ? 'block' : 'none',
        }}
      >
        {/* <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>覆盖</div>
          <div className={styles.value}></div>
        </div>
      </div> */}

        <Table
          dataSource={cardTable.dataSource}
          columns={cardTable.columns}
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
