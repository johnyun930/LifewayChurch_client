import React, { ChangeEvent,  useContext, useState } from 'react';
import {Input ,Label,SubmitButton,SmallBox} from '../styles/FormStyle'
import { Link, RouterProps } from 'react-router-dom';
import {LoginContext,UserInfoContext} from '../states/LoginContext';
import {DomainContext} from '../states/DomainContext';
import axios from 'axios';






export const Login  =(props:RouterProps): JSX.Element =>{
    const [userName,setuserName] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const {setLogin} = useContext(LoginContext);
    const {setUser} = useContext(UserInfoContext);
    const domain = useContext(DomainContext);
    return( 
   
    <>
    <Label>Username</Label>
    <Input type="text" name="username" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setuserName(e.target.value);
    }}/>
    <Label>Password</Label>

    <Input  type="password" name="password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }}/>
    <SmallBox>Forgot password?</SmallBox>

    <SubmitButton type="submit" onClick = {(e)=>{
        e.preventDefault();
        axios.post(`${domain}/login`,{
            userName,
            password,
        },{withCredentials:true}).then((response)=>{
            if(response.data.errMessage){
                alert(response.data.errMessage)
            }else{
                setLogin(true);
                setUser(response.data);

                props.history.goBack();
            }

           
        })
    }} >Sign In</SubmitButton>
    </>
    )
}