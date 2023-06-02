// 两种情况
// 覆盖地区名称 - 地区在该节点带宽
// 覆盖区域的节点 - 区域带宽
export type TNodePanel = {
  name: string;
  value: number;
};


// 节点
export type TNodeInfo = {
  title: string;
  // 状态
  state: number;
  // 当前带宽
  bandwidth: number;
  // 允许带宽上限
  maxBandwidth: number;
  // 中文名称
  name: string;
  // ipV4
  ipV4: string;
  // ipV6
  ipV6: string;
  // 机房带宽
  roomBandwidth: number;
  // 带宽占比 = 当前带宽值/节点允许跑的最大带宽值
  bandwidthShare: number;
  // 节点坐标
  coords: [number, number];
  // 覆盖的区域
  coverArea: string[];
}


// 地图数据
export type TMapData = {
  name: string;
  value: number;
  nodeInfo: TNodeInfo[];
  [key: string]: any;
}
