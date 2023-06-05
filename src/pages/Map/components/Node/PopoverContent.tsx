import { Divider } from 'antd';
import { EdgeRoom } from '../../edgeRoom';
import styles from './index.less';

const PopoverContent = ({
  node: { bandwidth, name, restrictedBandwidth },
}: {
  node: EdgeRoom;
}) => {
  return (
    <div className={styles.popoverWrapper}>
      <div className={styles.item}>
        <div className={styles.label}>当前带宽</div>
        <div className={styles.value}>{bandwidth}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>允许带宽上限</div>
        <div className={styles.value}>{restrictedBandwidth}</div>
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
        {/* <div className={styles.value}>{ipV4}</div> */}
      </div>
      <div className={styles.item}>
        <div className={styles.label}>ipV6</div>
        {/* <div className={styles.value}>{ipV6}</div> */}
      </div>
      <div className={styles.item}>
        <div className={styles.label}>机房带宽</div>
        {/* <div className={styles.value}>{roomBandwidth}</div> */}
      </div>
    </div>
  );
};

export default PopoverContent;
