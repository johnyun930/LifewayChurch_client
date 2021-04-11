import React, { ChangeEvent, useState,useContext } from 'react';
import axios from 'axios';
import {Input,SubmitButton,Label} from '../styles/FormStyle'
import {LoginContext,UserInfoContext} from '../states/LoginContext';
import { RouterProps } from 'react-router-dom';
import { DomainContext } from '../states/DomainContext';
import isEmail from 'validator/lib/isEmail';

function ValidationCheck(username: string,password:string,firstName:string,lastName:string,email:string){
    let usernameCheck = /^[A-z]+\w{4}$/;
    let nameCheck = /^[A-z]{2,}$/;
    let passwordCheck = /\w{5}/;
    const validEmail =  isEmail(email)
    const validUser = usernameCheck.test(username);
    const validFirstName = nameCheck.test(firstName);
    const validLastName = nameCheck.test(lastName);
    const validPassword = passwordCheck.test(password);

    if(!validEmail){
        alert("Please write Correct Email!");
        return false;
    }
    if(!validFirstName){
        alert("Please write Correct First Name!");
        return false;
    } if(!validLastName){
        alert("Please write Correct Last Name!");
        return false;
    } if(!validUser){
        alert("Please start with alphabet and more 5 characters for userName");
        return false;
    } if(!validPassword){
        alert("Please write more 5 characters for password!");
        return false;
    }
    return true;
}


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
        <SubmitButton center={true} top={"20px"} type="submit" onClick={(event)=>{
            event.preventDefault();
            if(!(userName&&password&&firstName&&lastName&&email)){
                alert("please fill up all the information please");
            }else if(!ValidationCheck(userName,password,firstName,lastName,email)){
                return
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