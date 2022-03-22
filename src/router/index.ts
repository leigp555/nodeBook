import SignIn from "@/components/SignIn.vue"
import Register from '@/components/Register.vue'
import Node from '@/components/Node.vue'
import UserInfo from "@/components/UserInfo.vue"
import CurrentNode from "@/components/CurrentNode.vue"
import {createWebHashHistory,createRouter} from 'vue-router'
const history=createWebHashHistory()
export const router=createRouter({
    history:history,
    routes:[
        {path:'/',component:Node},
        {path:'/signIn',component:SignIn},
        {path:'/register',component:Register},
        {path:'/node',component:Node},
        {path:'/userInfo',component:UserInfo},
        {path:'/node/currentNode/:nodeId',component:CurrentNode}
    ]
})