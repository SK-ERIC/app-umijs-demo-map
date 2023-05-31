import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Divider, Input, List, Popover, Tabs, message } from 'antd';
import React from 'react';
import DemoAreaMap from './components/AntMap';
import EMap from './components/EMap';
import DemoLarkMap from './components/LarkMap';
import styles from './index.less';

const data = [
  ...Array.from(
    { length: 10 },
    (_, i) =>
      ({
        title: `青岛 - ${i}`,
        state: Math.random() > 0.5 ? 1 : 0,
        bandwidth: 2310.3123,
        bandwidthLimit: 10000,
        name: '青岛红岛',
        vipV4: '120.220.211.123',
        vipV6: '2402:4e00:1013:e500:0:9671:f018:4947',
        roomBandwidth: 5000,
        bandwidthUsage: 0.5,
      } as TNode),
  ),
];

type TNode = {
  // 当前宽带
  bandwidth: number;
  // 允许带宽上限
  bandwidthLimit: number;
  // 中文名称
  name: string;
  // vipV4
  vipV4: string;
  // vipV6
  vipV6: string;
  // 机房带宽
  roomBandwidth: number;
  // 带宽使用率
  bandwidthUsage: number;
  // 节点名称
  title: string;
  // 节点状态
  state: number;
};

// 中国节点地图
const Map: React.FC = () => {
  const onSearch = (value: string) => message.info(value);
  const ContainerHeight = 580;

  const PopoverContent = ({
    node: { bandwidth, bandwidthLimit, name, vipV4, vipV6, roomBandwidth },
  }: {
    node: TNode;
  }) => {
    return (
      <div className={styles.popoverWrapper}>
        <div className={styles.item}>
          <div className={styles.label}>当前带宽</div>
          <div className={styles.value}>{bandwidth}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>允许带宽上限</div>
          <div className={styles.value}>{bandwidthLimit}</div>
        </div>
        <Divider
          dashed
          style={{
            margin: '10px 0',
          }}
        />
        <div className={styles.item}>
          <div className={styles.label}>中文名称</div>
          <div className={styles.value}>{name}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>vipV4</div>
          <div className={styles.value}>{vipV4}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>vipV6</div>
          <div className={styles.value}>{vipV6}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>机房带宽</div>
          <div className={styles.value}>{roomBandwidth}</div>
        </div>
      </div>
    );
  };

  return (
    <PageContainer title={'节点分布与覆盖预览'}>
      <ProCard direction="row" ghost gutter={[10, 8]}>
        <ProCard colSpan={5} bordered>
          <Input.Search
            placeholder="输入节点名称、IP 地址"
            onSearch={onSearch}
            enterButton
          />

          <div
            className={styles.listWrapper}
            style={{
              height: ContainerHeight,
              overflow: 'auto',
            }}
          >
            <List
              className={styles.listBox}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <Popover
                  key={index}
                  placement="right"
                  title={item.title}
                  content={<PopoverContent node={item} />}
                  trigger="hover"
                >
                  <List.Item>
                    <List.Item.Meta title={item.title} />
                    <div>带宽：66%</div>
                  </List.Item>
                </Popover>
              )}
            />
          </div>
        </ProCard>
        <ProCard bordered>
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane tab={'Ant Design Charts'} key={'1'}>
              <div
                style={{
                  height: ContainerHeight,
                }}
              >
                <DemoAreaMap />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Echarts'} key={'2'}>
              <div
                style={{
                  height: ContainerHeight,
                }}
              >
                <EMap />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'AntV L7Plot'} key={'3'}>
              <div
                style={{
                  height: ContainerHeight,
                }}
              >
                <DemoLarkMap />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Map;
