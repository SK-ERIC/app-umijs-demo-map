import promdata from './promdata';

export type EdgeRoom = {
  name: string; //唯一且不变
  chineseName: string;
  lineName: string; // 机房所在的线路
  longitude: string;
  latitude: string;
  bandwidth: number;
  restrictedBandwidth: number;
  autoAdjustBandwidth: boolean;
  autoSwitchResolver: boolean;
  resolverEnable: boolean;
  vips: {
    vip: string;
    weight: number;
  }[];
  lines: string[]; // 承接了哪些线路的流量
  status: {
    // 当前机房状态
    lines: {
      // 数量应该少于或等于 self.lines，不存在的 line 表示没有承接流量
      bandwidth: number; // 线路承接了多少流量
      name: string;
    }[];
    resolver: {
      enable: boolean; //是否开启解析
      lastChange: string; // 这个字段上次变更的时间，时间格式 rfc3339
    };
  };
};

export type EdgeRoomPromItem = {
  metric: {
    room: string; // 把所有 room 一样的加起来就是这个机房的流量
    line: string; // 把所有 line 加起来就是这个线路的流量
  };
  value: [number, string];
};

export class EdgeRoomService {
  static GetEdgeRooms(): Promise<EdgeRoom[]> {
    return Promise.resolve([
      {
        name: 'qd-hongdao-1',
        chineseName: '青岛红岛1',
        autoAdjustBandwidth: false,
        autoSwitchResolver: false,
        bandwidth: 300000000000,
        lineName: 'cn_mobile_shandong',
        longitude:  '117.82',
        latitude: '36.86',
        lines: [
          'cn_mobile_shandong',
          'cn_mobile_neimenggu',
          'cn_mobile_shanxi',
          'cn_mobile_jiangsu',
          'cn_mobile_hebei',
          'cn_mobile_anhui',
          'cn_mobile_henan',
          'cn_mobile_zhejiang',
        ],
        nodePrefix: 'qd-hongdao-',
        priority: 10,
        resolverEnable: false,
        restrictedBandwidth: 300000000000,
        vips: [
          {
            vip: '120.220.211.130',
            weight: 10,
          },
          {
            vip: '2409:8c3c:1300:51c::ff',
            weight: 10,
          },
        ],
        status: {
          resolver: {
            enable: true,
            lastChange: '2023-06-01T13:47:02Z',
          },
          lastRecordChange: '2023-06-05T05:53:54.000Z',
          lines: [
            {
              name: 'cn_mobile_anhui',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_hebei',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_henan',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_jiangsu',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_neimenggu',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_shandong',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_shanxi',
              bandwidth: 0,
            },
            {
              bandwidth: 1000000000,
              name: 'cn_mobile_zhejiang',
            },
          ],
        },
      },
      {
        name: 'qd-hongdao-2',
        chineseName: '青岛红岛2',
        autoAdjustBandwidth: false,
        autoSwitchResolver: false,
        bandwidth: 300000000000,
        lineName: 'cn_mobile_shandong',
        longitude: '120.99',
        latitude: '36.49',
        lines: [
          'cn_mobile_shandong',
          'cn_mobile_neimenggu',
          'cn_mobile_shanxi',
          'cn_mobile_jiangsu',
          'cn_mobile_hebei',
          'cn_mobile_anhui',
          'cn_mobile_henan',
          'cn_mobile_zhejiang',
        ],
        nodePrefix: 'qd-hongdao-',
        priority: 10,
        resolverEnable: true,
        restrictedBandwidth: 300000000000,
        vips: [
          {
            vip: '120.220.211.130',
            weight: 10,
          },
          {
            vip: '2409:8c3c:1300:51c::ff',
            weight: 10,
          },
        ],
        status: {
          resolver: {
            enable: true,
            lastChange: '2023-06-01T13:47:02Z',
          },
          lastRecordChange: '2023-06-05T05:53:54.000Z',
          lines: [
            {
              name: 'cn_mobile_anhui',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_hebei',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_henan',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_jiangsu',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_neimenggu',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_shandong',
              bandwidth: 0,
            },
            {
              name: 'cn_mobile_shanxi',
              bandwidth: 0,
            },
            {
              bandwidth: 1000000000,
              name: 'cn_mobile_zhejiang',
            },
          ],
        },
      },
      {
        name: 'js-wx-xinqu',
        autoAdjustBandwidth: true,
        autoSwitchResolver: false,
        bandwidth: 60000000000,
        chineseName: '无锡',
        longitude: '120.39',
        latitude: '31.50',
        lineName: 'cn_mobile_jiangsu',
        lines: ['cn_mobile_jiangsu', 'cn_mobile_anhui'],
        nodePrefix: 'js-wx-xinqu-',
        priority: 2,
        resolverEnable: true,
        restrictedBandwidth: 55000000000,
        vips: [
          {
            vip: '36.155.107.61',
            weight: 5,
          },
          {
            vip: '36.155.107.60',
            weight: 5,
          },
          {
            vip: '2409:8c20:1831:050c::fe',
            weight: 5,
          },
          {
            vip: '2409:8c20:1831:050c::FD',
            weight: 5,
          },
        ],
        status: {
          lastRecordChange: '2023-06-05T06:11:50.000Z',
          resolver: {
            enable: true,
            lastChange: '2023-06-01T13:47:02Z',
          },
          lines: [
            {
              name: 'cn_mobile_anhui',
              bandwidth: 0,
            },
            {
              bandwidth: 19000000000,
              name: 'cn_mobile_jiangsu',
            },
          ],
        },
      },
    ]);
  }
  static GetEdgeRoomsBandwidth(): Promise<EdgeRoomPromItem[]> {
    return Promise.resolve(promdata);
  }
}
