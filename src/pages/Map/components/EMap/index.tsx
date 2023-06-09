import china_province_geo from '@/assets/china_province_geo.json';
import { useEdgeRoomContext } from '@/contexts';
import useECharts from '@/hooks/useECharts';
import useFillScreen from '@/hooks/useFillScreen';
import {
  useAsyncEffect,
  useDebounceEffect,
  useDeepCompareEffect,
  useReactive,
} from 'ahooks';
import { Table, message } from 'antd';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { EdgeRoom } from '../../edgeRoom';
import { lineToProvinceMap, provinceToLineMap } from '../../edgeRoom/map';
import { COLOR, DEFAULT_OPTION } from './config';
import styles from './index.less';

const enum ShowCardSource {
  // 区域
  AREA,
  // 节点
  NODE,
}

// 处理获取区域的 tooltip
const formatAreaTooltip = (params: any) => {
  const data = params.data as {
    name: string;
    value: number;
    edgeRooms: EdgeRoom[];
  };
  if (!data) return null;
  const { name, edgeRooms } = data;

  const cn_name = provinceToLineMap[name];

  const hasNode = edgeRooms.length > 0;
  let str = '';

  // 渲染出每个节点的信息，使用table渲染，表格thead为： 覆盖区域的节点、区域带宽、节点状态
  if (hasNode) {
    const body = edgeRooms.map((node) => {
      // 节点在该区域的带宽
      const bandwidth = node.status.lines.find(
        (line) => line.name?.split('_').pop() === cn_name,
      )?.bandwidth;

      return `<tr>
      <td>
      <span style="display: inline-block; margin-right: 4px; border-radius: 50%; width: 10px; height: 10px; background-color: ${
        node.resolverEnable ? COLOR.NODE_ENABLE : COLOR.NODE_DISABLE
      }"></span>
      ${node.chineseName}
      </td>
      <td>${bandwidth}</td>
    </tr>
    `;
    });

    // 总计
    const total = edgeRooms.reduce((acc, cur) => {
      const bandwidth = cur.status.lines.find(
        (line) => line.name?.split('_').pop() === cn_name,
      )?.bandwidth;
      return acc + bandwidth;
    }, 0);

    // 表格最后一行，显示总计
    body.push(`<tr>
                <td>区域带宽总量</td>
                <td>${total}</td>
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
  const data = params.data.edgeRoom as EdgeRoom;
  if (!data) return null;
  const { resolverEnable, chineseName } = data;

  return `<span style="display: inline-block; margin-right: 4px; border-radius: 50%; width: 10px; height: 10px; background-color: ${
    resolverEnable ? COLOR.NODE_ENABLE : COLOR.NODE_DISABLE
  }"></span>
  ${chineseName}`;
};

// 获取地理数据
const getGeoJson = async (adcode = 100000) => {
  try {
    // const res = await fetch(
    //   `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
    // );
    // const data = await res.json();
    const data = china_province_geo;
    return data;
  } catch (error) {
    message.error('获取地理数据失败');
  }
};

const getProvinceEdgeRoomMap = (edgeRooms: EdgeRoom[]) => {
  const provinceEdgeRoomMap = new Map<string, EdgeRoom[]>();

  edgeRooms.forEach((edgeRoom) => {
    const { lines } = edgeRoom;

    lines.forEach((line) => {
      const province = line.split('_').pop() || '';
      const provinceName = lineToProvinceMap[province];

      if (provinceEdgeRoomMap.has(provinceName)) {
        const value = provinceEdgeRoomMap.get(provinceName);
        provinceEdgeRoomMap.set(provinceName, [...value!, edgeRoom]);
      } else {
        provinceEdgeRoomMap.set(provinceName, [edgeRoom]);
      }
    });
  });

  return provinceEdgeRoomMap;
};

// 处理节点数据根据节点数据，得到地理数据
const getRegions = (edgeRooms: EdgeRoom[]) => {
  const provinceEdgeRoomMap = getProvinceEdgeRoomMap(edgeRooms);

  const regions: any = [];
  provinceEdgeRoomMap.forEach((value, key) => {
    // 是否所有机房都不可用
    const allEdgeRoomDisable = value.every((item) => !item.resolverEnable);
    if (allEdgeRoomDisable) {
      regions.push({
        name: key,
        edgeRooms: value,
        itemStyle: {
          areaColor: COLOR.AREA_DISABLE,
        },
      });
    } else {
      regions.push({
        name: key,
        edgeRooms: value,
        itemStyle: {
          areaColor: COLOR.AREA_ENABLE,
        },
      });
    }
  });
  return regions;
};

// 0：无机房，1：有机房，且有节点可用，2：有机房，但所有节点不可用
const getMapData = (edgeRooms: EdgeRoom[]) => {
  const provinceEdgeRoomMap = getProvinceEdgeRoomMap(edgeRooms);
  const mapList: any[] = [];
  provinceEdgeRoomMap.forEach((value, key) => {
    // 是否所有机房都不可用
    const allEdgeRoomDisable = value.every((item) => !item.resolverEnable);
    if (allEdgeRoomDisable) {
      mapList.push({
        name: key,
        value: 2,
        edgeRooms: value,
      });
    } else {
      mapList.push({
        name: key,
        edgeRooms: value,
        value: 1,
      });
    }
  });
  return mapList;
};

// getSeriesData
const getSeriesData = (edgeRooms: EdgeRoom[]) => {
  const seriesList: any[] = [];
  edgeRooms.forEach((edgeRoom) => {
    const { longitude, latitude, resolverEnable, chineseName } = edgeRoom;

    seriesList.push({
      name: chineseName,
      value: [longitude, latitude, resolverEnable ? 3 : 4],
      edgeRoom: edgeRoom,
    });
  });

  return seriesList;
};

const EMap = () => {
  const { edgeRooms, activeEdgeRoom } = useEdgeRoomContext();

  const [ref, chart] = useECharts({
    options: DEFAULT_OPTION,
  });
  const mapHeight = useFillScreen(ref, 600, 30);

  // 是否显示卡片提示
  const [showCardTip, setShowCardTip] = useState(false);
  // 显示卡片的来源, 1: 区域，2：节点
  const [cardSource, setCardSource] = useState<ShowCardSource>(
    ShowCardSource.NODE,
  );

  const initEcharts = async (adcode = 100000, mapName = 'china') => {
    const mapData = getMapData(edgeRooms);
    const regions = getRegions(edgeRooms);
    const seriesData = getSeriesData(edgeRooms);

    // 可用节点数据
    const enableNodeData = seriesData.filter((item) => item.value[2] === 3);
    // 不可用节点数据
    const disableNodeData = seriesData.filter((item) => item.value[2] === 4);

    const json = await getGeoJson(adcode);

    echarts.registerMap(mapName, json);
    if (chart) {
      chart.setOption({
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
      });
    }
  };

  // https://pic2.58cdn.com.cn/nowater/webim/big/n_v2685971145f924e49a6036b1628d6cd27.png
  // https://pic2.58cdn.com.cn/nowater/webim/big/n_v2ff0a5aea136e4372842b33795559a1b5.png

  // 记录历史选中的区域，为了动态派发取消选中的事件
  const selectedHistory = useRef<any>(null);

  useAsyncEffect(async () => {
    if (!chart) return;
    await initEcharts();
  }, [chart]);

  // 注册事件
  useEffect(() => {
    if (!chart) return;

    // 监听选中区域的事件
    chart.off('selectchanged');
    chart.on('selectchanged', function (params) {
      if (params.fromAction === 'select') {
        console.log('params :>> ', params);
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

  // 监听列表click\hover事件，选中区域
  useDeepCompareEffect(() => {
    if (!chart) return;
    clearSelectedArea(chart);

    if (activeEdgeRoom) {
      const { lines } = activeEdgeRoom;
      const areas = lines.map((item) => {
        const province = item.split('_').pop();
        return lineToProvinceMap[province];
      });

      // 1. 设置选中的区域
      chart.dispatchAction({
        type: 'select',
        name: areas,
      });
    }
  }, [chart, activeEdgeRoom]);

  // 监听处理信息展示卡片，hover 或 click
  useDebounceEffect(
    () => {
      if (activeEdgeRoom) {
        setShowCardTip(true);
        setCardSource(ShowCardSource.NODE);
      } else {
        setShowCardTip(false);
      }
    },
    [activeEdgeRoom],
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
    if (!activeEdgeRoom) return;
    const { lines, status } = activeEdgeRoom;

    if (!lines || lines.length === 0) return;

    cardTable.dataSource = status.lines.map((item) => {
      const province = item.name.split('_').pop();
      const areaName = lineToProvinceMap[province];

      return {
        key: item.name,
        name: areaName,
        value: item.bandwidth,
      };
    });

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
        setNodeCardData();
      }
    },
    [showCardTip, cardSource, activeEdgeRoom],
    {
      wait: 100,
    },
  );

  return (
    <div className={styles.map_wrapper}>
      <div style={{ width: '100%', height: mapHeight }} ref={ref}></div>
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
