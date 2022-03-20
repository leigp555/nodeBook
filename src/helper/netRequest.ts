import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials=true
axios.defaults.timeout = 3000;
interface requestOption {
    url: string,
    method: string,
    validateStatus: Function,
    params?: {},
    data?: {}
}
export const netRequest = (url: string, type = "GET", data = {}) => {
    return new Promise((resolve, reject) => {
        let option: requestOption = {
            url,
            method: type,
            validateStatus(status: number) {
                return (status >= 200 && status < 300) || status === 400
            },
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        //@ts-ignore
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch(() => {
            reject({msg: "网络异常"})
        })
    })
}


