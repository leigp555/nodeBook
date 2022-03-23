import dayjs, {Dayjs} from "dayjs";

export interface FormState {
    username: string;
    password: string;
    checkPass?: string;
}

export interface loginObj {
    username: string | number,
    password: number | string,
}


export type userInfoData = {
    nickname: string,
    gender: string,
    phoneNumber: string
}

export interface getUserStateType {
    land: boolean,
    username: string
}

export interface nodeInfoType{
    title:string,
    article:string,
    nodeId:number,
    fileName:string
}

export interface newNodePostType{
    title:string,content:string,fileName:string,collection:boolean,timeAt:dayjs.Dayjs
}

export interface collectionType{
nodeId:number,currentCollectionState:boolean
}