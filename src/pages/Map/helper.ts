import { TNodeInfo } from './type';

// 节点数据排序， 降序
// 已停用的权重最高
// 已停用的按照节点名称排序
// 未停用的按照带宽占比排序
// 未停用的带宽占比相同的，按照节点名称排序
export function sortNodeData(nodeInfo: TNodeInfo[]): TNodeInfo[] {
  // 未停用的
  const unUsedNodeInfo = nodeInfo.filter((item) => item.state !== 0);
  // 已停用的
  const usedNodeInfo = nodeInfo.filter((item) => item.state === 0);
  // 未停用的按照带宽占比排序
  const unUsedNodeInfoSort = unUsedNodeInfo.sort(
    (a, b) => b.bandwidthShare - a.bandwidthShare,
  );
  // 已停用的按照节点名称排序
  const usedNodeInfoSort = usedNodeInfo.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return [...usedNodeInfoSort, ...unUsedNodeInfoSort];
}

// 使用稳定性较好、时间复杂度为 O(nlogn) 的归并排序
export function sortNodeData2(nodeInfo: TNodeInfo[]): TNodeInfo[] {
  // 已停用的权重最高
  const usedNodeInfo = nodeInfo.filter((item) => item.state === 0);
  // 未停用的按照带宽占比排序
  const unUsedNodeInfo = nodeInfo
    .filter((item) => item.state !== 0)
    .sort((a, b) => b.bandwidthShare - a.bandwidthShare);

  // 按照节点名称排序
  const merge = (left: TNodeInfo[], right: TNodeInfo[]) => {
    let i = 0,
      j = 0;
    const res: TNodeInfo[] = [];
    while (i < left.length && j < right.length) {
      if (
        (left[i].state === 0 && right[j].state === 0) ||
        (left[i].state !== 0 && right[j].state !== 0)
      ) {
        // 都满足条件，按名称排序
        if (left[i].name.localeCompare(right[j].name) <= 0) {
          res.push(left[i++]);
        } else {
          res.push(right[j++]);
        }
      } else {
        // 只有一个满足条件，放在前面
        if (left[i].state === 0) {
          res.push(left[i++]);
        } else {
          res.push(right[j++]);
        }
      }
    }
    while (i < left.length) {
      res.push(left[i++]);
    }
    while (j < right.length) {
      res.push(right[j++]);
    }
    return res;
  };

  return unUsedNodeInfo.length === 0
    ? usedNodeInfo
    : usedNodeInfo.length === 0
    ? unUsedNodeInfo
    : merge(usedNodeInfo, unUsedNodeInfo);
}

interface SearchOptions {
  // 需要搜索的字段
  keys: (keyof TNodeInfo)[];
  caseSensitive?: boolean; // 是否大小写敏感
}

// 支持根据nodeInfo中的制定字段，进行模糊搜索
export function searchNodeInfo<TNodeInfo>(
  value: string, // 需要搜索的值
  nodeInfoList: TNodeInfo[], // 需要搜索的数据
  options: SearchOptions, // 配置项
): TNodeInfo[] {
  const { keys = ['title', 'ipV4', 'ipV6'], caseSensitive = false } = options;
  const searchValue = caseSensitive ? value : value.toLowerCase();
  const filterFunc = (item: TNodeInfo) => {
    return keys.some((key) => {
      const val = item[key as keyof TNodeInfo] as string;
      const itemValue = caseSensitive ? val : val.toLowerCase();
      return itemValue.includes(searchValue);
    });
  };
  return nodeInfoList.filter(filterFunc);
}

// 带宽占比 = 当前带宽值 / 节点允许跑的最大带宽值 返回两种数据，一种是带宽百分数 (两位小数), 一种是带宽比值（四位小数）
export const getBandwidthShare = (
  bandwidth: number,
  maxBandwidth: number,
): {
  share: number;
  sharePercent: string;
} => {
  if (bandwidth === 0) {
    return {
      share: 0,
      sharePercent: '0%',
    };
  }
  const share = bandwidth / maxBandwidth;
  const shareStr = +share.toFixed(2);
  const sharePercent = +(share * 100).toFixed(2);

  return {
    share: shareStr,
    sharePercent: `${sharePercent}%`,
  };
};
