import {createContext} from 'react';

export interface UserInfo {
    username: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean
    setUser: React.Dispatch<React.SetStateAction<UserInfo>>
}

export const LoginContext = createContext<any>(null);
export const UserInfoContext = createContext<UserInfo>({
    username: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    setUser: ()=>{}
});