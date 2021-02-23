import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { FormConatiner, ImageContainer, Text,SubText,Heading,Form as LoginForm } from './Login';
import {Input,SubmitButton} from './CreatingWorship'


const MainContainer = styled.div`
    width: 70%;
    height: 64.0vh;
    display:grid;
    grid-template-columns: 60% 40%;
    justify-items:center;
    align-items:center;
    margin: 0 auto 16vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

`
const Form = styled(LoginForm)`
    margin:50px auto;
`

export const Singup = (): JSX.Element=>{
    const [username,setuserName] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [firstName,setFirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [email,setEmail] = useState<string>("");


    return(
        <MainContainer>
        <ImageContainer>
            <Text>풀은 마르고 꽃은 시드나 우리 하나님의 말씀은 영원히 서리라 하라 </Text>
            <SubText>(사 40:7)</SubText>
            
        </ImageContainer>
        <FormConatiner>
            <Heading>Welcome to Lifeway</Heading>
            <Form action="http://localhost:8000/signup" method="POST">
            <Input type="text" name="userName" placeholder="username" value={username} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setuserName(e.target.value);
            }}/>
            <Input type="password" name="password" placeholder="password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setPassword(e.target.value);
            }}/>
            <Input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setFirstName(e.target.value)
            }}/>

            <Input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setLastName(e.target.value)
            }}/>

            <Input type="email" name="email" placeholder="Email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{ 
                setEmail(e.target.value)
            }}/>
        <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
        </FormConatiner>
    </MainContainer>

        

    )
}