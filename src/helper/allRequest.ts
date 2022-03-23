import {netRequest} from "@/helper/netRequest";

import {collectionType, loginObj, newNodePostType, nodeInfoType, userInfoData} from "@/type/type";
import {Router} from "vue-router";

//登录页
export const signIn = {
    request(userInfo: loginObj,router:Router) {
        return new Promise((resolve, reject) => {
            netRequest("/signIn", "POST", userInfo).then((res) => {
                router.push("/").then()
                getAvatar.request().then()
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//注册页
export const register = {
    request(userInfo: loginObj,router:Router) {
        return new Promise((resolve, reject) => {
            netRequest("/register", "POST", userInfo).then((res) => {
                router.push("/signIn").then()
                console.log(res)
                resolve("注册成功")
            }, (res) => {
                reject("注册失败")
                console.log(res)
            })
        })
    }
}
//获取用户头像并存在本地localstorage
export const getAvatar = {
    request() {
        return new Promise((resolve,reject) => {
            let data
            netRequest("/getAvatar", "GET").then((res) => {       //获取头像
                data = res as string
                window.localStorage.setItem("node-avatar", data)
                resolve({msg:"获取成功",update:true})
            }, (res) => {
                reject({msg:"获取失败",update:false})
                data = res as string
                window.localStorage.setItem("node-avatar", data)
            })
        })
    }
}
//更新头像
export const updateAvatar = {
    request(newAvatar:{srcData:string}) {
        return new Promise((resolve,reject) => {
            netRequest("/getAvatar", "POST",newAvatar).then(() => {
                window.localStorage.setItem("node-avatar", newAvatar.srcData)
                resolve({msg:"更新成功",update:true})
            }, () => {
               reject({msg:"更新失败",update:false})
            })
        })
    }
}
//获取用户登录状态成功返回{land:true,username:"xxx"}

export const getUserState={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/getUserState", "GET").then((res) => {
               resolve(res)
            }, (res) => {
               reject(res)
            })
        })
    }
}
//获取少量的笔记
export const getNodes={
    request(url:string,initRang:string){
        return new Promise((resolve,reject)=>{
            netRequest(url, "GET", {initRang}).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//加载更多笔记
export const getMoreNodes={
    request(url:string,initRang:string){
        return new Promise((resolve,reject)=>{
            netRequest(url, "GET",{initRang}).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}

//获取当前的笔记内容
export const getCurrentNode={
    request(url:string,nodeInfo:{nodeId:string,fileName:string}){
        return new Promise((resolve,reject)=>{
            netRequest(url, "GET",{...nodeInfo}).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}


//修改笔记
export const modifyNodeRse={
    request(data:nodeInfoType){
        return new Promise((resolve,reject)=>{
            netRequest("/modifyUserNode", "POST",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}

//修改收藏状态
export const modifyNodeRseCollection={
    request(data:collectionType){
        return new Promise((resolve,reject)=>{
            netRequest("/modifyUserNodeCollection", "POST",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}

//创建新的笔记

export const createNewNode={
    request(data:newNodePostType){
        return new Promise((resolve,reject)=>{
            netRequest("/createNewNode", "POST",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//删除笔记
export const deleteNodeRes={
    request(data:{nodeId:number}){
        return new Promise((resolve,reject)=>{
            netRequest("/deleteNode", "POST",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//还原
export const resetNode={
    request(data:{nodeId:number}){
        return new Promise((resolve,reject)=>{
            netRequest("/resetNode", "POST",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//永久删除
export const foreverDeleteRes={
    request(data:{nodeId:number}){
        return new Promise((resolve,reject)=>{
            netRequest("/foreverDelete", "POST",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//查找笔记
export const searchNodes={
    request(data:{value:string}){
        return new Promise((resolve,reject)=>{
                netRequest("/searchNodes", "GET",data).then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//退出登录
export const userSignOut={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/user/signOut", "POST").then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//获取用户设置的信息
export const getUserInfo={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/user/info","GET").then((res)=>{
                resolve(res)
            },(res)=>{
                reject(res)
            })
        })
    }
}
//修改用户设置的信息
export const saveUserInfo={
    request(data:userInfoData){
        return new Promise((resolve,reject)=>{
            netRequest("/user/info","POST",data).then((res)=>{
                resolve(res)
            },(res)=>{
                reject(res)
            })
        })
    }
}
//获取打卡状态
export const punchState={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/user/punchState","GET").then((res)=>{
                resolve(res)
            },(res)=>{
                reject(res)
            })
        })
    }
}
//打卡
export const punched={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/user/punched","GET").then((res)=>{
                resolve(res)
            },(res)=>{
                reject(res)
            })
        })
    }
}

