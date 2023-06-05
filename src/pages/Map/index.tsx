import { EdgeRoomProvider } from '@/contexts';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useUpdate } from 'ahooks';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import EMap from './components/EMap';
import Node from './components/Node';
import { mapData } from './data';
import { EdgeRoom, EdgeRoomService } from './edgeRoom';
import { TMapData, TNodeInfo } from './type';

// 中国节点地图
const Map: React.FC = () => {
  const update = useUpdate();

  const [mapList, setMapList] = useState<TMapData[]>(mapData);
  const [nodeList, setNodeList] = useState<TNodeInfo[]>([]);
  // 使用 ref 存储 node 节点原始数据，为了方便后续的数据处理，如搜索排序等
  const nodeRef = React.useRef<TNodeInfo[]>([]);

  const [clickItem, setClickItem] = useState('');
  const [hoverItem, setHoverItem] = useState('');

  //
  //
  const [edgeRooms, setEdgeRooms] = useState<EdgeRoom[]>([]);
  const [activeEdgeRoom, setActiveEdgeRoom] = useState<EdgeRoom | null>(null);
  //
  //

  // 获取节点数据
  const getEdgeRooms = async () => {
    const data = await EdgeRoomService.GetEdgeRooms();
    setEdgeRooms(data);
    console.log('data :>> ', data);
  };

  useEffect(() => {
    // TODO: 暂取模拟数据
    getEdgeRooms();

    // setMapList(mapData);
    // // 取出数据中所有的节点数据，
    // const nodeData = mapData.reduce((acc: TNodeInfo[], node: TMapData) => {
    //   return uniqWith(acc.concat(node.nodeInfo), (a, b) => a.title === b.title);
    // }, []);
    // // 根据排序规则排序
    // const list = sortNodeData2(nodeData);
    // setNodeList(list);
    // nodeRef.current = list;
    // message.info('数据加载成功');
  }, []);

  const refresh = () => {
    update();
    getEdgeRooms();
    setClickItem('');
    setHoverItem('');
    message.success('刷新成功');
  };

  return (
    <EdgeRoomProvider
      value={{
        edgeRooms,
        setEdgeRooms,
        activeEdgeRoom,
        setActiveEdgeRoom,
      }}
    >
      <PageContainer
        title={'节点分布与覆盖预览'}
        extra={<Button onClick={refresh}>刷新</Button>}
      >
        <ProCard direction="row" ghost gutter={[10, 8]}>
          <ProCard colSpan={5} bordered>
            <Node />
          </ProCard>
          <ProCard bordered>
            {/* <Alert
            message={
              <>
                白色区域，为当前灵境云节点未覆盖地区
                <br />
                红色表示覆盖该区域的所有节点（机房）不可用；橙色区域表示覆盖的节点带宽超过允许最大上限的
                95%
              </>
            }
            type="warning"
            closable
          /> */}
            <div>
              <EMap
                mapList={mapList}
                nodeList={nodeList}
                clickItem={clickItem}
                hoverItem={hoverItem}
              />
            </div>
          </ProCard>
        </ProCard>
      </PageContainer>
    </EdgeRoomProvider>
  );
};

export default Map;
