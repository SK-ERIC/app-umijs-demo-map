import { TMapData } from './type';

export const mapData: TMapData[] = [
  {
    name: '北京市',
    value: -1,
    adcode: 110000,
    nodeInfo: [
      {
        title: 'beijing-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '北京-东城区-节点1',
        ipV4: '121.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.9,
        coords: [116.405285, 39.904989],
        coverArea: ['北京市'],
      },
    ],
  },
  {
    name: '安徽省',
    value: -1,
    adcode: 340000,
    nodeInfo: [
      {
        title: 'qigndao-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '青岛节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.8,
        coords: [117.283042, 31.86119],
        coverArea: ['山东', '安徽'],
      },
    ],
  },
  {
    name: '山东省',
    value: -1,
    adcode: 370000,
    nodeInfo: [
      {
        title: 'qigndao-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: generateRandomNumber(),
        name: '青岛节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.4,
        coords: [121.385877, 37.540925],
        coverArea: ['山东', '安徽'],
      },
      {
        title: 'jinan-01',
        state: 0,
        bandwidth: generateRandomNumber(),
        maxBandwidth: generateRandomNumber(),
        name: '济南节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [117.000923, 36.675807],
        coverArea: ['山东'],
      },
      {
        title: 'jinan-02',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: generateRandomNumber(),
        name: '济南节点2',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [116.947921, 36.668205],
        coverArea: ['山东'],
      },
    ],
  },

  {
    name: '湖北省',
    value: -1,
    adcode: 420000,
    nodeInfo: [
      {
        title: 'wuhan-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '武汉节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [114.298572, 30.584355],
        coverArea: ['湖北'],
      },
      {
        title: 'wuhan-02',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '武汉节点2',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [114.298572, 30.584355],
        coverArea: ['湖北'],
      },
    ],
  },

  {
    name: '西藏自治区',
    value: -1,
    adcode: 540000,
    nodeInfo: [
      {
        title: 'qingdao-03',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 1238,
        name: '青岛节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 3093,
        bandwidthShare: 0.8,
        coords: [91.111891, 29.662557],
        coverArea: ['西藏'],
      },
    ],
  },
  {
    name: '四川省',
    value: -1,
    adcode: 510000,
    nodeInfo: [
      {
        title: 'sichuan-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '四川节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
        coverArea: ['四川省'],
      },
      {
        title: 'sichuan-02',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '四川节点2',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
        coverArea: ['四川省'],
      },
      {
        title: 'sichuan-03',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '四川节点3',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
        coverArea: ['四川省'],
      },
      {
        title: 'sichuan-04',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '四川节点4',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [104.065735, 30.659462],
        coverArea: ['四川省'],
      },
    ],
  },
  {
    name: '江苏省',
    value: -1,
    adcode: 320000,
    nodeInfo: [
      {
        title: 'jiangsu-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 1238,
        name: '青岛节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 3093,
        bandwidthShare: 0.8,
        coords: [120.301663, 31.574729],
        coverArea: ['无锡市'],
      },
    ],
  },
];

// 城市节点数据
export const cityMapData: TMapData[] = [
  {
    name: '无锡市',
    value: -1,
    nodeInfo: [
      {
        title: 'jiangsu-01',
        state: 1,
        bandwidth: generateRandomNumber(),
        maxBandwidth: 123,
        name: '江苏节点1',
        ipV4: '120.220.211.123',
        ipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 123,
        bandwidthShare: 0.6,
        coords: [120.301663, 31.574729],
        coverArea: ['无锡市'],
      },
    ],
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

// 生成 2-4 位数字
function generateRandomNumber() {
  // 生成一个 [0, 1) 范围内的随机小数
  const num = Math.random();
  let result;

  // 根据随机数的值确定数字的位数
  if (num < 0.1) {
    result = Math.floor(num * 10000);
  } else if (num < 0.5) {
    result = Math.floor(num * 1000);
  } else {
    result = Math.floor(num * 100);
  }

  // 取结果的后两位，确保生成的数字始终为 2-4 位
  return +result.toString().slice(-2);
}
