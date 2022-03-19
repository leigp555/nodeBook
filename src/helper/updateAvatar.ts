import {request} from "@/helper/netRequest";
export const updateAvatar=()=>{
    return new Promise((resolve,reject)=>{
        let data
        request("/getAvatar", "GET").then((res) => {       //获取头像
            data=res as string
            resolve(data)
            window.localStorage.setItem("node-avatar",data)
        },(error)=>{ reject(error)})
    })
}
