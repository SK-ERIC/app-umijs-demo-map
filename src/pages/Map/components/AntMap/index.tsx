import { AreaMap } from '@ant-design/charts';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
// import MapData from '@/assets/map.json'

const DemoAreaMap: React.FC = () => {
  const [data, setData] = useState({ type: 'FeatureCollection', features: [] });
  const [color, setColor] = useState('#b0eafc');

  const areaMapRef = useRef<any>(null);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = (
    url = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
  ) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [120.19382669582967, 30.258134],
      zoom: 3,
      pitch: 0,
      // dragPan: true,
    },
    source: {
      data: data,
      parser: {
        type: 'geojson',
      },
    },
    autoFit: true,
    style: {
      opacity: 1,
      stroke: '#fff',
      lineWidth: 0.8,
      lineOpacity: 1,
    },
    state: {
      active: true,
      select: {
        stroke: 'yellow',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
    },
    enabledMultiSelect: true,
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: 'black',
        opacity: 0.5,
        fontSize: 12,
        spacing: 1,
        padding: [15, 15],
      },
    },
    tooltip: {
      items: ['name', 'adcode'],
    },
    zoom: {
      position: 'bottomright',
    },
    // legend: {
    //   position: 'bottomleft',
    // },
  };

  const onReady = (plot) => {
    console.log('plot', plot);
  };

  const changeColor = () => {
    setColor('#f00');
  };

  const changeCity = () => {
    asyncFetch('https://geo.datav.aliyun.com/areas_v3/bound/320000_full.json');
  };

  return (
    <>
      <Button onClick={changeColor}>change color</Button>
      <Button onClick={changeCity}>江苏</Button>
      <AreaMap {...config} color={color} ref={areaMapRef} onReady={onReady} />
    </>
  );
};

export default DemoAreaMap;
