import { ResizeObserver } from '@juggle/resize-observer';
import type * as echartsWithAll from 'echarts';
import type * as coreEcharts from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { CurrentEcharts, CurrentEchartsInstance } from './helper';
import { dispose, getInitAnimationDuration, handleChartResize } from './helper';

function useECharts<T extends HTMLDivElement>(props: {
  options: EChartsOption;
  echarts: typeof coreEcharts;
}): [MutableRefObject<T | null>, coreEcharts.ECharts | undefined];

function useECharts<T extends HTMLDivElement>(props: {
  options: EChartsOption;
}): [MutableRefObject<T | null>, echartsWithAll.ECharts | undefined];

function useECharts<T extends HTMLDivElement>(props: {
  options: EChartsOption;
  echarts?: typeof coreEcharts;
}) {
  const { options, echarts } = props;

  const echartsRef = useRef<CurrentEcharts | undefined>(echarts);

  const chartRef = useRef<CurrentEchartsInstance>();

  const initialOptRef = useRef(options);

  const resizeObserverRef = useRef(
    new ResizeObserver(() => {
      handleChartResize(chartRef.current);
    }),
  );

  const ref = useRef<T | null>(null);

  const [chart, setChart] = useState<CurrentEchartsInstance>();

  const initEchartsInstance = () =>
    new Promise<CurrentEchartsInstance>((resolve) => {
      const _echarts = echartsRef.current as CurrentEcharts;

      const _ele = ref.current;
      if (!_ele) {
        return;
      }
      _echarts.init(_ele);

      const echartsInstance = _echarts.getInstanceByDom(
        _ele,
      ) as coreEcharts.ECharts;

      echartsInstance?.on('finished', () => {
        const width = _ele.clientWidth;
        const height = _ele.clientHeight;

        dispose(_ele, _echarts);

        chartRef.current = _echarts.init(_ele, undefined, {
          width,
          height,
        });

        const _chart = chartRef.current;

        setChart(_chart);

        handleChartResize(_chart);

        _chart.setOption(initialOptRef.current);

        resolve(_chart);
      });
    });

  const getEcharts = async () => {
    if (echartsRef.current) {
      return;
    }

    echartsRef.current = (await import('echarts')) as typeof echartsWithAll;
  };

  const handleResize = (val: CurrentEchartsInstance) => {
    const _ele = ref.current;
    const _chart = val;

    if (!_ele || _chart.isDisposed()) {
      return;
    }

    const _duration = getInitAnimationDuration(_chart);

    const timer = window.setTimeout(() => {
      resizeObserverRef.current.observe(_ele);
    }, _duration);

    return timer;
  };

  useEffect(() => {
    let timer: number | undefined;
    (async () => {
      await getEcharts();
      const _chart = await initEchartsInstance();
      timer = handleResize(_chart);
    })();

    return () => {
      timer && window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const _temp = resizeObserverRef.current;
    const _ele = ref.current;
    const _echarts = echartsRef.current;
    return () => {
      dispose(_ele, _echarts);
      _temp.disconnect();
    };
  }, []);

  return [ref, chart];
}

export default useECharts;
