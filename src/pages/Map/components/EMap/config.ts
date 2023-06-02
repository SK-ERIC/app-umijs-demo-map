// 颜色常量
export const COLOR = {
  // 区域颜色，区域所有节点不可用
  AREA_DISABLE: '#efa0bc',
  // 区域颜色，未覆盖、区域无节点
  AREA_NO_COVER: '#dff0fb',
  // 区域颜色，区域有节点，有节点可用
  AREA_ENABLE: '#2bbaed',
  // 节点颜色，节点不可用
  NODE_DISABLE: '#f73841',
  // 节点颜色，节点可用
  NODE_ENABLE: '#00ff00',
};

export const DEFAULT_OPTION = {
  tooltip: {
    trigger: 'item',
  },
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
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {},
    },
  },
};
