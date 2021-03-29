import React, { ChangeEvent, useState,useContext } from 'react';
import axios from 'axios';
import {Input,SubmitButton,Label} from '../styles/FormStyle'
import {LoginContext,UserInfoContext} from '../states/LoginContext';
import { RouterProps } from 'react-router-dom';
import { DomainContext } from '../states/DomainContext';



export const Signup = (props: RouterProps): JSX.Element=>{
    const [userName,setuserName] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [firstName,setFirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const {setLogin} = useContext(LoginContext);
    const {setUser} = useContext(UserInfoContext);
    const domain = useContext(DomainContext);


    return(
            <>
            <Label>Username</Label>
            <Input type="text" name="userName" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setuserName(e.target.value);
            }} required/>
            <Label>Password</Label>
            <Input type="password" name="password" required  value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setPassword(e.target.value);
            }}/>
            <Label>FirstName</Label>
            <Input type="text" name="firstName"  required value={firstName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setFirstName(e.target.value)
            }}/>
            <Label>LastName</Label>
            <Input type="text" name="lastName" required  value={lastName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setLastName(e.target.value)
            }}/>
            <Label>Email</Label>
            <Input type="email" name="email" required value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{ 
                setEmail(e.target.value)
            }}/>
        <SubmitButton type="submit" onClick={(event)=>{
            event.preventDefault();
            if(!(userName&&password&&firstName&&lastName&&email)){
                alert("please fill up all the information please");
            }
            axios.post(`${domain}/signup`,{
                userName,
                password,
                firstName,
                lastName,
                email
            },{withCredentials:true}).then((response)=>{
            if(response.data.errorMessage){
                alert(response.data.errorMessage);
            }else{
                setLogin(true);
                setUser(response.data);
                props.history.push('/');
            }
            });
        }}>Sign Up</SubmitButton>
        </>
    )
}