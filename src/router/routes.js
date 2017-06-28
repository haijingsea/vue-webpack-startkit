/**
 * Created by Yinxiong on 2016/10/28.
 */

import { makeNavRoutes, makeVueRoutes } from 'utils/routes'

export const routes = [{
  text: '布局'
}, {
  path: '/',
  text: '仪表盘',
  icon: 'dashboard',
  exact: true,
  component: require('views/HomeView')
},
{
  path: '/typography',
  text: '文字',
  icon: 'font',
  component: require('views/Typography')
}, {
  text: '层级菜单',
  icon: 'group',
  children: [{
    path: '/lazy-view',
    text: '异步页面',
    component: () => import('views/LazyView')
  }, {
    path: '/sub-routes',
    alias: '/sub-routes/sub-1',
    text: '子页面',
    component: require('views/subRoute/SubRouteView'),
    children: [{
      path: 'sub-1',
      component: require('views/subRoute/SubRoute1View')
    }, {
      path: 'sub-2',
      component: () => import('views/subRoute/SubRoute2View')
    }]
  }]
}, {
  text: '多级子菜单',
  icon: 'group',
  children: [{
    text: '1级菜单',
    children: [{
      text: '2级菜单',
      children: [{
        text: '3级菜单'
      }]
    }]
  }]
}, {
  text: '基础元素'
}, {
  text: 'UI组件',
  icon: 'list',
  children: [{
    path: '/component/card',
    text: 'Card',
    component: require('views/components/Card')
  }, {
    path: '/component/nav',
    text: 'Nav',
    component: require('views/components/Nav')
  }, {
    path: '/component/form',
    text: 'Form',
    component: require('views/components/Form')
  }, {
    path: '/component/chart',
    text: 'Chart',
    component: require('views/components/Chart')
  }, {
    path: '/component/modal',
    text: 'Modal',
    component: require('views/components/Modal')
  }, {
    path: '/component/flyout',
    text: 'Flyout',
    component: require('views/components/Flyout')
  }, {
    path: '/component/pagination',
    text: 'Pagination',
    component: require('views/components/Pagination')
  }, {
    path: '/component/notify',
    text: 'Notify',
    component: require('views/components/Notify')
  }]
}, {
  text: '复合组件',
  icon: 'list',
  children: [
    {
      path: '/map/baidu',
      text: '地图',
      icon: 'map',
      component: require('views/Map')
    }
  ]
}, {
  text: 'Tester',
  path: '/tester',
  icon: 'list',
  component: require('views/Tester')
}]

export const routesForNav = makeNavRoutes(routes)
export const routesForVue = makeVueRoutes(routes)
