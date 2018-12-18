import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Poster from '@/components/page/Poster'
import manage from '@/components/page/manage'
import Order from '@/components/page/Order'
import Member from '@/components/page/Member'
import Goods from '@/components/page/Goods'
import login from '@/components/page/login'

Vue.use(Router)

const routes = [{
    path: '/',
    component: login
  }, {
    path: '/manage',
    name: '',
    component: manage,
    meta: ['海报管理'],
    children: [{
        path: '/poster',
        component: Poster,
        meta: ['海报管理', '首页海报'],
      }, {
        path: '/order',
        name:Order,
        component: Order,
        meta: ['订单管理','订单列表']
      },
      {
        path: '/goods',
        component: Goods,
        meta: ['商品管理','商品列表']
      },
      {
        path: '/member',
        name: 'Member',
        component: Member,
        meta: ['会员管理','会员列表']
      }
    ]
  },

]




export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
