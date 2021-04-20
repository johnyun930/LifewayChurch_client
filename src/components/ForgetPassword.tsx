import React, { ChangeEvent,  useContext, useState } from 'react';
import {Input ,Label,SubmitButton,SmallBox} from '../styles/FormStyle'
import { Link, RouterProps } from 'react-router-dom';
import {LoginContext,UserInfoContext} from '../states/LoginContext';
import {DomainContext} from '../states/DomainContext';
import axios from 'axios';






export const ForgetPassword  =(): JSX.Element =>{
    const [userName,setuserName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const domain = useContext(DomainContext);
    console.log("logging");
    return( 
   
    <>
    <Label>Username</Label>
    <Input type="text" name="username" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setuserName(e.target.value);
    }}/>
    <Label>Email</Label>

    <Input  type="text" name="email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value);
    }}/>
    <SmallBox><Link to="/login">Return to Login</Link></SmallBox>

    <SubmitButton center={true} top={"20px"} type="submit" onClick = {(e)=>{
        e.preventDefault();
        axios.post(`${domain}/login`,{
            userName,
            email,
        },{withCredentials:true}).then((response)=>{
            if(response.data.errMessage){
                alert(response.data.errMessage)
            }else{
             
            }

           
        })
    }} >Sign In</SubmitButton>
    </>
    )
}