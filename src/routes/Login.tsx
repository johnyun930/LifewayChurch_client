import styled from 'styled-components';
import React, { ChangeEvent, useState } from 'react';
import Bible from '../images/bibleBackground.jpg';
import {Input as FormInput,SubmitButton} from './CreatingWorship'
import { Link } from 'react-router-dom';
const MainContainer = styled.div`
    width: 70%;
    height: 64.0vh;
    display:grid;
    grid-template-columns: 40% 60%;
    justify-items:center;
    align-items:center;
    margin: 0 auto 16vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

`
export const ImageContainer = styled.div`
    width:100%;
    height: 100%;
    background-color:black;
    background-image: url(${Bible});
    background-size: contain;
    background-repeat: no-repeat;
    filter: brightness(75%);
    margin: auto 0;
    border-radius: 10px 0px 0px 10px;


`
export const Heading = styled.h1`
    margin: 50px 0px 20px;

    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 2rem;
`

export const Text = styled.h3`
    margin: 30px 0px;
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 2rem;
    margin-top: 14%;
    font-size: 1.4rem;
`
export const SubText = styled(Text)`
    margin-top: 5%;
`

export const FormConatiner = styled.div`
    border-radius: 0px 10px 10px 0px;
    width: 100%;
    height:100%;
    background-color: #ef8d32;
`

export const Form = styled.form`
    width: 80%;
    height: 40%;
    margin: 100px auto;

`

export const LoginButton = styled(SubmitButton)`
    width:200px;
    height: 43px;
    color:black;
    font-weight:bold;
    margin: 20px auto;
    &:hover{
    color:black;

        background-color:#fceade
    }
`

export const Input = styled(FormInput)`
      width: 79%;
      margin: 20px auto;
`

export const Login  =(): JSX.Element =>{
    const [userName,setuserName] = useState<string>("");
    const [passowrd,setPassword] = useState<string>("");
    return( 
    <MainContainer>
        <FormConatiner>
            <Heading>Welcome Back!</Heading>
    <Form method="POST" action="http://localhost:8000/login">
    <Input type="text" name="userName" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setuserName(e.target.value);
    }} placeholder="UserName"/>
    <Input type="password" name="password" value={passowrd} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }} placeholder="Password"/>
    <LoginButton type="submit">Log in</LoginButton>
    <Link to="/signup"><LoginButton type="submit">Sign up</LoginButton></Link>
    </Form>
    </FormConatiner>
        <ImageContainer>
            <Text>풀은 마르고 꽃은 시드나 우리 하나님의 말씀은 영원히 서리라 하라 </Text>
            <SubText>(사 40:7)</SubText>
            
        </ImageContainer>
        
    </MainContainer>
    )
}