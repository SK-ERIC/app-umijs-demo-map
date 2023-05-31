import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: 'rgba(0, 88, 255, 1)',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      icon: 'smile',
      component: './Table',
    },
    {
      name: '节点分布地图',
      path: '/map',
      icon: 'ApiOutlined',
      component: './Map',
    },
  ],
  npmClient: 'pnpm',
});
