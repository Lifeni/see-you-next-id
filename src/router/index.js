import Vue from 'vue'
import Router from 'vue-router'

import NavBar from '@/components/NavBar'
import PostList from '@/components/PostList'
import SideBar from '@/components/SideBar'
import TalkBox from '@/components/TalkBox'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'root',
      components: {
        NavBar: NavBar,
        PostList: PostList,
        SideBar: SideBar,
        TalkBox: TalkBox,
      }
    }
  ]
})
