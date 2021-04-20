import React, { ChangeEvent,  useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import {Input ,Label,SubmitButton,SmallBox, ErrMessage,Message} from '../styles/FormStyle'
import { Link, RouterProps } from 'react-router-dom';
import {LoginContext,UserInfoContext} from '../states/LoginContext';
import {DomainContext} from '../states/DomainContext';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';


enum PageStep{
    UserLogin = 0,
    FindUser = 1,
    PasswordLogin = 2,
    FindPassword =3,
    SuccessUser =4,
}




export const Login  =(props:RouterProps): JSX.Element =>{
    const [userName,setuserName] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const {setLogin} = useContext(LoginContext);
    const [errMessage,setErrMessage] = useState("");
    const {setUser} = useContext(UserInfoContext);
    const domain = useContext(DomainContext);
    const [user,isUser] = useState(false);
    const [color,setcolor] = useState<string|undefined>(undefined);
    const [page,setPage] = useState(PageStep.UserLogin);

    let form: JSX.Element = <></>
    
    switch(page){
        case PageStep.UserLogin:
            form = <><Label>Username</Label>
            <Input color={color} type="text" name="username" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setuserName(e.target.value);
            }}/>
            <ErrMessage>{errMessage}</ErrMessage>
        <SmallBox onClick={()=>setPage(PageStep.FindUser)}>Find username?</SmallBox>
        <SubmitButton center={true} top={"20px"} type="submit" onClick = {(e)=>{
         e.preventDefault();
            axios.post(`${domain}/login/user`,{
            userName,
            },{withCredentials:true}).then((response)=>{
            if(response.data){
                isUser(response.data);
                setPage(PageStep.PasswordLogin);
            }else{
                setErrMessage("계정을 찾을수 없습니다");
                setcolor("red");
            }         
            })

    }
    } >Next</SubmitButton></>
    break;
    case PageStep.PasswordLogin:
        form = <>
        <Label>Password</Label>
        <Input color={color} type="password" name="password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setPassword(e.target.value);
        }}/>
         <ErrMessage>{errMessage}</ErrMessage>
        <SmallBox onClick={()=>setPage(PageStep.FindPassword)}>Forgot Password?</SmallBox>
            <SubmitButton center={true} top={"20px"} type="submit" onClick = {(e)=>{
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
    });
    }
    } >Next</SubmitButton></>
    break;
    case PageStep.FindUser:
        form = <>
        <Label>Email</Label>
        <Input color={color} type="text" name="email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setEmail(e.target.value);
        }}/>
         <ErrMessage>{errMessage}</ErrMessage>
        <SmallBox onClick={()=>{setPage(PageStep.UserLogin)}}>Return to Login?</SmallBox>
            <SubmitButton center={true} top={"20px"} type="submit" onClick = {(e)=>{
        e.preventDefault();
        if(!isEmail(email)){
            return;
        }
     axios.post(`${domain}/auth/finduser`,{
        email
    },{withCredentials:true}).then((response)=>{
        if(response.data.auth){
            setPage(PageStep.SuccessUser);
        }else{
            setErrMessage("계정내에 등록된 이메일이 없습니다");
            setcolor("red");
        }
    });
    }
    } >Find User</SubmitButton></>
    break;
    case PageStep.FindPassword:
        form =<>
        <Label>Email</Label>
        <Input color={color} type="text" name="email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setEmail(e.target.value);
        }}/>
         <ErrMessage>{errMessage}</ErrMessage>
        <SmallBox onClick={()=>{setPage(PageStep.PasswordLogin)}}>Return to Login</SmallBox>
            <SubmitButton center={true} top={"20px"} type="submit" onClick = {(e)=>{
        e.preventDefault();
        if(!isEmail(email)){
            return;
        }
     axios.post(`${domain}/auth/findpassword`,{
         userName,
        email
    },{withCredentials:true}).then((response)=>{
        if(response.data.auth){
            setPage(PageStep.SuccessUser);
        }else{
            setErrMessage("계정에 등록된 이메일이 아닙니다");
            setcolor("red");
        }
    });
    }
    } >Find Password</SubmitButton></>
    break;
    case PageStep.SuccessUser:
        form = <>
        <Message>We sent the info to your email. Please check your email!</Message>
        <SubmitButton onClick={()=>setPage(PageStep.UserLogin)} center={true}>Go Back to Login</SubmitButton>
        </>
        break;
}
  

    useEffect(()=>{
        if(!user){
            setUser( {userName: "",
            firstName: "",
            lastName: "",
            isAdmin: false,
            setUser: ()=>{}
        });
        }else{
            setUser( {userName,
            firstName: "",
            lastName: "",
            isAdmin: false,
            setUser: ()=>{}
        });
    }},[user]);

    useEffect(()=>{
        setEmail("");
        if(page===PageStep.UserLogin){
            setUser( {userName: "",
            firstName: "",
            lastName: "",
            isAdmin: false,
            setUser: ()=>{}
        });
        setuserName("");
        }
    },[page]);
    
    return( 
   <>
   {form}
        </>
    // <>
    // {!user?<><Label>Username</Label>
    // <Input color={color} type="text" name="username" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
    //     setuserName(e.target.value);
    // }}/></>:<>
    // <Label>Password</Label>

    // <Input  type="password" name="password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
    //     setPassword(e.target.value);
    // }}/></>}
    // <ErrMessage>{errMessage}</ErrMessage>
    // <SmallBox>{user?"Find password?":"Find username?"}</SmallBox>

    // <SubmitButton center={true} top={"20px"} type="submit" onClick = {(e)=>{
    //     e.preventDefault();
    //    if(!user){
    //     axios.post(`${domain}/login/user`,{
    //         userName,
    //     },{withCredentials:true}).then((response)=>{
    //         if(response.data){
    //             isUser(response.data);
    //         }else{
    //             setErrMessage("계정을 찾을수 없습니다");
    //             setcolor("red");
    //         }
           
    //     })
    //     }else{
    //     axios.post(`${domain}/login`,{
    //         userName,
    //         password,
    //     },{withCredentials:true}).then((response)=>{
    //         if(response.data.errMessage){
    //             alert(response.data.errMessage)
    //         }else{
    //             setLogin(true);
    //             setUser(response.data);

    //             props.history.goBack();
    //         }

           
    //     })
    // }
    // }} >{user?"Sign In":"Next"}</SubmitButton>
    // </>
    )
}