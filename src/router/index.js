import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import PostList_Hot from '@/components/PostList_Hot'
import PostList_Timeline from '@/components/PostList_Timeline'
import SideBar_Post from '@/components/SideBar_Post'
import SideBar_Talk from '@/components/SideBar_Talk'
import TalkBox from '@/components/TalkBox'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/timeline',
    }, {
      path: '/timeline',
      name: 'timeline',
      components: {
        MainContent: PostList_Timeline,
        SideBar: SideBar_Post,
      }
    },
    {
      path: '/talk',
      name: 'talkbox',
      components: {
        MainContent: TalkBox,
        SideBar: SideBar_Talk,
      }
    },
    {
      path: '/hot',
      name: 'hot',
      components: {
        MainContent: PostList_Hot,
        SideBar: SideBar_Post,
      }
    }
  ]
})
