import { getViewportOffset } from '@/utils/dom';
import { useLayoutEffect, useState } from 'react';

const useFillScreen = (
  ref: React.MutableRefObject<HTMLElement | null>,
  minHeight = 0,
  offset = 0,
) => {
  const [height, setHeight] = useState<number>(0);
  useLayoutEffect(() => {
    if (ref.current) {
      const handleResize = () => {
        const { bottomIncludeBody } = getViewportOffset(ref.current!);
        setHeight(bottomIncludeBody - offset);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [ref.current, offset]);
  return height > minHeight ? height : minHeight;
};

export default useFillScreen;
