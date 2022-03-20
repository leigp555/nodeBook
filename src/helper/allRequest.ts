import {netRequest} from "@/helper/netRequest";

import {loginObj} from "@/type/type";
import {Router} from "vue-router";

//登录页
export const signIn = {
    request(userInfo: loginObj,router:Router) {
        return new Promise((resolve, reject) => {
            netRequest("/signIn", "POST", userInfo).then(() => {
                router.push("/").then()
                getAvatar.request().then()
                resolve("登录成功")
            }, () => {
                reject("登录失败")
            })
        })
    }
}
//注册页
export const register = {
    request(userInfo: loginObj,router:Router) {
        return new Promise((resolve, reject) => {
            netRequest("/register", "POST", userInfo).then(() => {
                router.push("/signIn").then()
                resolve("注册成功")
            }, () => {
                reject("注册失败")
            })
        })
    }
}
//获取用户头像并存在本地localstorage
const getAvatar = {
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
    request(newAvatar:string) {
        return new Promise((resolve,reject) => {
            netRequest("/getAvatar", "PATCH",newAvatar).then((res) => {
                window.localStorage.setItem("node-avatar", newAvatar)
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
//获取所有的笔记
export const getAllNodes={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/getAllNode", "GET").then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//获取所有的收藏
export const getCollection={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/getCollection", "GET").then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}
//获取所有的回收站笔记
export const getGarbage={
    request(){
        return new Promise((resolve,reject)=>{
            netRequest("/getGarbage", "GET").then((res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            })
        })
    }
}

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