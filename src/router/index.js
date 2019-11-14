import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login'
import register from '@/components/register'
import forget from '@/components/forget'

import sao from '@/components/sao'

import home from '@/components/home'

import my from '@/components/my'
import share from '@/components/share'
import fans from '@/components/fans'

import setting from '@/components/setting/setting.vue'
import opinion from '@/components/setting/opinion.vue'

import kefu from '@/components/my_xwt/kefu.vue'
import member from '@/components/my_xwt/member.vue'
import regmum from '@/components/my_xwt/regmum.vue'
import personal from '@/components/my_xwt/personal.vue'
import changepwd from '@/components/my_xwt/changepwd.vue'
import erjipwd from '@/components/my_xwt/erjipwd.vue'
import moneycode from '@/components/my_xwt/moneycode.vue'
import upgrade from '@/components/my_xwt/upgrade.vue'


import myAss from '@/components/asset/myAss.vue'
import exchange from '@/components/asset/exchange.vue'
import change_ltq from '@/components/asset/change_ltq.vue'
import submit from '@/components/asset/submit.vue'
import record from '@/components/asset/record.vue'
import withdraw from '@/components/asset/withdraw.vue'
import withdraw_jili from '@/components/asset/withdraw_jili.vue'
import zhuanchu from '@/components/asset/zhuanchu.vue'
import bill from '@/components/asset/bill.vue'
import performance from '@/components/asset/performance.vue'
import fuxiao from '@/components/asset/fuxiao.vue'

import index from '@/components/shop/index.vue'
import merchant from '@/components/shop/merchant.vue'
import alliance from '@/components/shop/alliance.vue'
import details from '@/components/shop/details.vue'
import pay from '@/components/shop/pay.vue'
import myorder from '@/components/shop/myorder.vue'
import order_det from '@/components/shop/order_det.vue'
import expressage from '@/components/shop/expressage.vue'
import address from '@/components/shop/address.vue'
import AddressEdit from '@/components/shop/AddressEdit'
import AddressAdd from '@/components/shop/AddressAdd'
import scanQR from '@/components/shop/scanQR'
import pay_suc from '@/components/shop/pay_suc'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
          path: '/my',
          name: 'my',
          component: my
        },
        {
          path: '/index',
          name: 'index',
          component: index,
          meta: {
            keepAlive: true //为需要保留滚动条的组件开启缓存
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register/:code',
      name: 'register',
      component: register
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },

    {
      path: '/share',
      name: 'share',
      component: share
    },
    {
      path: '/fans',
      name: 'fans',
      component: fans
    },
    {
      path: '/kefu',
      name: 'kefu',
      component: kefu
    },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/regmum',
      name: 'regmum',
      component: regmum
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/changepwd/:phone',
      name: 'changepwd',
      component: changepwd
    },
    {
      path: '/erjipwd/:phone',
      name: 'erjipwd',
      component: erjipwd
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/opinion',
      name: 'opinion',
      component: opinion
    },
    {
      path: '/myAss',
      name: 'myAss',
      component: myAss
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange
    },
    {
      path: '/change_ltq',
      name: 'change_ltq',
      component: change_ltq
    },
    {
      path: '/submit/:wallet',
      name: 'submit',
      component: submit
    },
    {
      path: '/record',
      name: 'record',
      component: record
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/withdraw_jili',
      name: 'withdraw_jili',
      component: withdraw_jili
    },
    {
      path: '/zhuanchu',
      name: 'zhuanchu',
      component: zhuanchu
    },
    {
      path: '/bill',
      name: 'bill',
      component: bill
    },
    {
      path: '/performance',
      name: 'performance',
      component: performance
    },
    {
      path: '/fuxiao',
      name: 'fuxiao',
      component: fuxiao
    },
    {
      path: '/moneycode',
      name: 'moneycode',
      component: moneycode
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: upgrade
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: merchant,
      meta: {
        keepAlive: true //为需要保留滚动条的组件开启缓存
      },
    },
    {
      path: '/alliance',
      name: 'alliance',
      component: alliance,
      meta: {
        keepAlive: true //为需要保留滚动条的组件开启缓存
      },
    },
    {
      path: '/details/:order',
      name: 'details',
      component: details
    },
    {
      path: '/pay/:order/:add',
      name: 'pay',
      component: pay
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/order_det/:id',
      name: 'order_det',
      component: order_det
    },
    {
      path: '/expressage/:order',
      name: 'expressage',
      component: expressage
    },
    {
      path: '/address/:pay',
      name: 'address',
      component: address
    },
    {
      path: '/AddressEdit/:pay/:item',
      name: 'AddressEdit',
      component: AddressEdit
    },
    {
      path: '/AddressAdd/:pay',
      name: 'AddressAdd',
      component: AddressAdd
    },
    {
      // 
      path: '/scanQR/:phone/:token',
      name: 'scanQR',
      component: scanQR
    },
    {
      path: '/pay_suc/:phone/:count',
      name: 'pay_suc',
      component: pay_suc
    },
    {
      path: '/sao',
      name: 'sao',
      component: sao
    }
  ]
})
