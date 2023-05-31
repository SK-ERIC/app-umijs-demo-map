export const mapData: any = [
  {
    name: '北京',
    value: 2,
    nodeInfo: [
      {
        name: '东城区节点1',
        value: 0,
        flow: 123,
      },
      {
        name: '东城区节点2',
        value: 1,
        flow: 123,
      },
    ],
  },
  {
    name: '天津',
    value: Math.round(Math.random() * 1000),
    nodeInfo: [
      {
        name: '河东区节点1',
        value: 1,
        flow: 223,
      },
      {
        name: '河东区节点2',
        value: 1,
        flow: 223,
      },
    ],
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
    nodeInfo: [],
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
    nodeInfo: [],
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
    nodeInfo: [],
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
