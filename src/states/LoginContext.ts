import {createContext} from 'react';

export interface UserInfo {
    userName: string,
    firstName: string,
    lastName: string,
    profile: string,
    level: number,
    setUser: React.Dispatch<React.SetStateAction<UserInfo>>
}

export const LoginContext = createContext<any>(null);
export const UserInfoContext = createContext<UserInfo>({
    userName: "",
    firstName: "",
    lastName: "",
    level: 0,
    profile: "",
    setUser: ()=>{}
});