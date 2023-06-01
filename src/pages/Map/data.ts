import { TMapData, TNodePanel } from './type';

export const mapData: TMapData[] = [
  {
    name: '北京',
    value: 2,
    nodeInfo: [
      {
        title: 'beijing-01',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '北京-东城区-节点1',
        ipV4: '121.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.9,
        coords: [116.405285, 39.904989],
      },
    ],
  },
  {
    name: '天津',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '上海',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '重庆',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '河北',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '河南',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '云南',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '辽宁',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '黑龙江',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '湖南',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '安徽',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '山东',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [
      {
        title: 'qigndao-01',
        state: 0,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '青岛节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.4,
        coords: [121.385877, 37.540925],
      },
      {
        title: 'jinan-01',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '济南节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [117.000923, 36.675807],
      },
      {
        title: 'jinan-02',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '济南节点2',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [116.947921, 36.668205],
      },
    ],
  },
  {
    name: '新疆',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '江苏',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '浙江',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '江西',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '湖北',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [
      {
        title: 'wuhan-01',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '武汉节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [114.298572, 30.584355],
      },
      {
        title: 'wuhan-02',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '武汉节点2',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [114.298572, 30.584355],
      },
    ],
  },
  {
    name: '广西',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '甘肃',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '山西',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '内蒙古',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '陕西',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '吉林',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '福建',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '贵州',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '广东',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '青海',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '西藏',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '四川',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [
      {
        title: 'sichuan-01',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '四川节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
      },
      {
        title: 'sichuan-02',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '四川节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
      },
      {
        title: 'sichuan-03',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '四川节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
      },
      {
        title: 'sichuan-04',
        state: 1,
        bandwidth: 123,
        maxBandwidth: 123,
        name: '四川节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
      },
    ],
  },
  {
    name: '宁夏',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '海南',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '台湾',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '香港',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
  {
    name: '澳门',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [],
  },
];

export const getLineData = (() => {
  const category: any[] = [];
  let dottedBase = +new Date();
  const lineData: any[] = [];
  const barData: any[] = [];

  for (let i = 0; i < 20; i++) {
    const date = new Date((dottedBase += 1000 * 3600 * 24));
    category.push(
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
    );
    const b = Math.random() * 200;
    const d = Math.random() * 200;
    barData.push(b);
    lineData.push(d + b);
  }
  return { barData, category, lineData };
})();

export const chinaGeoCoordMap = {
  黑龙江: [127.9688, 45.368],
  内蒙古: [110.3467, 41.4899],
  吉林: [125.8154, 44.2584],
  北京市: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  重庆: [108.384366, 30.439702],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  上海: [121.4648, 31.2891],
};

// 覆盖区域的节点 - 区域带宽
export const PROVINCE_PANELS: TNodePanel[] = [
  {
    name: 'wx-01',
    value: 2341.23,
  },
  {
    name: 'hangzhou',
    value: 120.2,
  },
  {
    name: 'fj-01',
    value: 20.34,
  },
  {
    name: 'wuyuan-01',
    value: 0.0,
  },
];

// 覆盖地区名称 - 地区在该节点带宽
export const NODE_PANELS: TNodePanel[] = [
  {
    name: '山东',
    value: 2341.34,
  },
  {
    name: '安徽',
    value: 120.21,
  },
  {
    name: '河北',
    value: 20.0,
  },
  {
    name: '河南',
    value: 0.0,
  },
  {
    name: '云南',
    value: 0.0,
  },
  {
    name: '黑龙江',
    value: 0.0,
  },
];
