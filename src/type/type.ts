export interface FormState {
    username: string;
    password: string;
    checkPass?: string;
}

export interface loginObj{
    username:string|number,
    password:number|string,
}


export type userInfoData={
    nickname:string,
    gender:string,
    phoneNumber:string
}