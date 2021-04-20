import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RouterProps, useParams } from 'react-router';
import styled from 'styled-components';
import { DomainContext } from '../states/DomainContext';
import { Input, Label, SubmitButton,Form,Message } from '../styles/FormStyle';

const Container = styled.div`
    width: 500px;
    height: 60vh;
    margin: 20px auto;
    padding: 100px 20px 0;
    border:1px solid #dadce0;
`
interface ParamProps{
    token: string
}

function ValidatePassword(password:string){
  
    let passwordCheck = /\w{5}/;
  
    const validPassword = passwordCheck.test(password);
     if(!validPassword){
        return false;
    }
    return true;
}


export const ResetPassword = (props:RouterProps)=>{
    const {token}:ParamProps = useParams();
    const domain = useContext(DomainContext);
    const [valid,setValid]= useState(false);
    useEffect(()=>{
        axios.get(`${domain}/auth/findtoken/${token}`).then((response)=>{
            if(!response.data.istoken){
                alert("Please change the password within 5min. Please try again");
                props.history.replace('/login');
            }else{
                setValid(true);
            }
        })
    },[])

    const [newpassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    return(
        <>
      {valid? <Container>
            <Message>Reset Password</Message>
            <Form>
            <Label>New Password</Label>
            <Input type="password" value={newpassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
            <Label>Confirm Password</Label>
            <Input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        <div>
        <SubmitButton onClick={(e)=>{
            e.preventDefault();
            if(newpassword!==confirmPassword){
                alert("Please write same password!");
                return;
            }else if(!ValidatePassword(newpassword)){
                alert("Please write more 5 characters for password!");

                return;
                }
            axios.patch(`${domain}/auth/findpassword`,{token,password:newpassword}).then((response)=>{
                console.log(response.data);
                if(response.data&&response.data.istoken===false){
                    alert("Valide time is over. Please try again");
                }else if(response.data.errMessage){
                    alert(response.data.errMessage);
                }else if(response.data.update){
                    alert("The password is changed successfully");
                }
                props.history.replace('/login');
            })

        }} center={true}>Change Password</SubmitButton>

        </div>
        </Form>
        </Container>:<></>}
</>
    )

}