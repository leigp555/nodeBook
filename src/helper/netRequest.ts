import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

interface requestOption{
    url:string,
    method:string,
    validateStatus:Function,
    params?:{},
    data?:{},
    withCredentials: boolean
}
export const request=(url:string,type="GET",data={})=>{
  return new Promise((resolve,reject)=>{
      let option:requestOption={
          url,
          method:type,
          validateStatus(status:number){
             return (status>=200&&status<300)||status===400
          },
          withCredentials: false
      }
      if(type.toLowerCase()==='get'){
         option.params=data
      }else{
          option.data=data
      }
      //@ts-ignore
      axios(option).then(res=>{
          if(res.status===200){
              resolve(res.data)
          }else{
              reject(res.data)
          }
      }).catch(()=>{
          reject({msg:"网络异常"})
      })
  })
}