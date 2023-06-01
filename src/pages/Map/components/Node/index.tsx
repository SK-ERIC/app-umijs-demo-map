import {
  useDebounceEffect,
  useDebounceFn,
  useHover,
  useUpdateEffect,
} from 'ahooks';
import { Divider, Input, List, Popover, message } from 'antd';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { searchNodeInfo, sortNodeData2 } from '../../helper';
import { TNodeInfo } from '../../type';
import styles from './index.less';

const PopoverContent = ({
  node: { bandwidth, maxBandwidth, name, ipV4, ipV6, roomBandwidth },
}: {
  node: TNodeInfo;
}) => {
  return (
    <div className={styles.popoverWrapper}>
      <div className={styles.item}>
        <div className={styles.label}>当前带宽</div>
        <div className={styles.value}>{bandwidth}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>允许带宽上限</div>
        <div className={styles.value}>{maxBandwidth}</div>
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
        <div className={styles.label}>ipV4</div>
        <div className={styles.value}>{ipV4}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>ipV6</div>
        <div className={styles.value}>{ipV6}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>机房带宽</div>
        <div className={styles.value}>{roomBandwidth}</div>
      </div>
    </div>
  );
};

const Node: React.FC<{
  nodeList: TNodeInfo[];
  setNodeList: React.Dispatch<React.SetStateAction<TNodeInfo[]>>;
  clickItem: string;
  setClickItem: React.Dispatch<React.SetStateAction<string>>;
  hoverItem: string;
  setHoverItem: React.Dispatch<React.SetStateAction<string>>;
  nodeRef: React.MutableRefObject<TNodeInfo[]>;
}> = ({
  nodeList,
  setNodeList,
  clickItem,
  setClickItem,
  hoverItem,
  setHoverItem,
  nodeRef,
}) => {
  const ContainerHeight = 600;
  const liseRef = useRef(null);
  const isHoverList = useHover(liseRef);

  const [searchValue, setSearchValue] = useState('');
  useDebounceEffect(
    () => {
      const data = searchNodeInfo(searchValue, nodeRef.current, {
        keys: ['title', 'ipV4', 'ipV6'],
        caseSensitive: true,
      });
      // 排序
      const list = sortNodeData2(data);
      setNodeList(list);
    },
    [searchValue],
    {
      wait: 500,
    },
  );

  useUpdateEffect(() => {
    if (!isHoverList && hoverItem) {
      setHoverItem('');
    }
  }, [isHoverList]);

  // 搜索节点名称、IP 地址
  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleItemClick = (item: TNodeInfo) => {
    setClickItem(item.title);
  };

  const { run: setHoverFunc } = useDebounceFn(
    (item: TNodeInfo) => {
      setHoverItem(item.title);
      message.info('悬浮的节点：' + item.title);
    },
    {
      wait: 200,
    },
  );

  // 悬浮的节点
  const handleHoverItem = (item: TNodeInfo) => {
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
        ref={liseRef}
        className={styles.listWrapper}
        style={{
          height: ContainerHeight,
          overflow: 'auto',
        }}
      >
        <List
          className={styles.listBox}
          itemLayout="horizontal"
          dataSource={nodeList}
          renderItem={(item, index) => (
            <Popover
              key={index}
              placement="right"
              title={item.title}
              content={<PopoverContent node={item} />}
              trigger="hover"
            >
              <List.Item
                className={classNames(styles.listItem, {
                  [styles.active]: clickItem === item.title,
                })}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => handleHoverItem(item)}
              >
                <List.Item.Meta title={item.title} />
                {item.state === 0 ? (
                  <div
                    style={{
                      color: 'red',
                    }}
                  >
                    已停用，待开启
                  </div>
                ) : (
                  <div>
                    带宽：
                    <span
                      style={{
                        color: item.bandwidthShare >= 0.9 ? 'red' : 'inherit',
                      }}
                    >
                      {item.bandwidthShare * 100}%
                    </span>
                  </div>
                )}
              </List.Item>
            </Popover>
          )}
        />
      </div>
    </>
  );
};

export default Node;
