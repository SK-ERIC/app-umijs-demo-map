import { useEdgeRoomContext } from '@/contexts';
import useFillScreen from '@/hooks/useFillScreen';
import { useClickAway, useDebounceFn, useHover, useUpdateEffect } from 'ahooks';
import { Input, List, Popover } from 'antd';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { EdgeRoom } from '../../edgeRoom';
import { getBandwidthShare } from '../../helper';
import PopoverContent from './PopoverContent';
import styles from './index.less';

const Node: React.FC = () => {
  const liseRef = useRef(null);
  const isHoverList = useHover(liseRef);
  const nodeContainerRef = React.useRef<HTMLDivElement>(null);
  const nodeCardHeight = useFillScreen(nodeContainerRef, 500, 30);
  const { edgeRooms, activeEdgeRoom, setActiveEdgeRoom } = useEdgeRoomContext();
  const [searchValue, setSearchValue] = useState('');

  // 触发节点变化的方式：点击、悬浮
  const changeTypeRef = useRef<'click' | 'hover'>('hover');

  // useDebounceEffect(
  //   () => {
  //     const data = searchNodeInfo(searchValue, nodeRef.current, {
  //       keys: ['title', 'ipV4', 'ipV6'],
  //       caseSensitive: true,
  //     });
  //     // 排序
  //     const list = sortNodeData2(data);
  //     setNodeList(list);
  //   },
  //   [searchValue],
  //   {
  //     wait: 500,
  //   },
  // );

  useUpdateEffect(() => {
    if (!isHoverList && changeTypeRef.current === 'hover') {
      setActiveEdgeRoom(null);
    }
  }, [isHoverList]);

  useClickAway(() => {
    changeTypeRef.current = 'hover';
    setActiveEdgeRoom(null);
  }, liseRef);

  // 搜索节点名称、IP 地址
  const onSearch = (value: string) => {
    // setSearchValue(value);
  };

  // 点击的节点
  const handleItemClick = (item: EdgeRoom) => {
    changeTypeRef.current = 'click';
    setActiveEdgeRoom(item);
  };

  const { run: setHoverFunc } = useDebounceFn(
    (item: EdgeRoom) => {
      isHoverList && setActiveEdgeRoom(item);
    },
    {
      wait: 200,
    },
  );

  // 悬浮的节点
  const handleHoverItem = (item: EdgeRoom) => {
    if (changeTypeRef.current === 'click') {
      return;
    }

    changeTypeRef.current = 'hover';
    setHoverFunc(item);
  };

  return (
    <>
      <Input.Search
        placeholder="输入节点名称、IP 地址"
        onSearch={onSearch}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        enterButton
      />

      <div
        className={styles.listWrapper}
        ref={nodeContainerRef}
        style={{
          height: nodeCardHeight,
          overflow: 'auto',
        }}
      >
        <div ref={liseRef}>
          <List
            className={styles.listBox}
            itemLayout="horizontal"
            dataSource={edgeRooms}
            renderItem={(item, index) => (
              <Popover
                key={index + item.name}
                placement="right"
                title={item.name}
                content={<PopoverContent node={item} />}
                trigger="hover"
              >
                <List.Item
                  className={classNames(styles.listItem, {
                    [styles.active]: activeEdgeRoom?.name === item.name,
                  })}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => handleHoverItem(item)}
                >
                  <List.Item.Meta title={item.name} />
                  {item.resolverEnable ? (
                    <div>
                      带宽：
                      <span
                        style={{
                          color:
                            getBandwidthShare(
                              item.bandwidth,
                              item.restrictedBandwidth,
                            )?.share >= 0.9
                              ? 'red'
                              : 'inherit',
                        }}
                      >
                        {
                          getBandwidthShare(
                            item.bandwidth,
                            item.restrictedBandwidth,
                          ).sharePercent
                        }
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        color: 'red',
                      }}
                    >
                      已停用，待开启
                    </div>
                  )}
                </List.Item>
              </Popover>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Node;
