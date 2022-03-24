import SignIn from "@/components/SignIn.vue"
import Register from '@/components/Register.vue'
import Node from '@/components/Node.vue'
import UserInfo from "@/components/UserInfo.vue"
import CurrentNode from "@/components/CurrentNode.vue"
import CreateNode from "@/components/CreateNode.vue"
import Tool from "@/components/Tool.vue"
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
        {path:'/node/currentNode/:fileName/:nodeId',component:CurrentNode},
        {path:'/createNode',component:CreateNode},
        {path:'/tools',component:Tool}
    ]
})